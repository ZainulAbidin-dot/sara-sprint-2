import bcrypt from 'bcrypt';
import { randomBytes } from 'crypto';
import mongoose from 'mongoose';
import { z } from 'zod';

import { DiseaseTypeModel } from '@/models/disease-type.model.js';
import { DoctorModel } from '@/models/doctor.model.js';
import { DonorAcquirerModel } from '@/models/donor.model.js';
import { PatientMedicalHistoryModel } from '@/models/medicalHistory.model.js';
import { PatientModel } from '@/models/patient.model.js';
import { TrialModel } from '@/models/trial.model.js';
import { UserModel } from '@/models/user.model.js';

import { ApiSuccessResponse } from '@/lib/api-response.js';
import { AppRequestHandler } from '@/lib/app-request-handler.js';
import { checkAuth } from '@/lib/check-auth.js';
import { handleBase64Upload } from '@/lib/file-upload.js';
import HttpError from '@/lib/http-error.js';

import { requestSchema } from './update-validation.js';

type TUpdateRequest = z.infer<typeof requestSchema>;

const requestHandler: AppRequestHandler<TUpdateRequest> = async ({
  request,
  requestBody,
}) => {
  const authUser = await checkAuth(request, 'any');

  if (authUser.userType !== requestBody.userType) {
    throw new HttpError({
      message: 'User type mismatch',
      statusCode: 400,
      name: 'BadRequestError',
    });
  }

  const hashedPassword = await bcrypt.hash(
    requestBody.userDetails.password,
    10
  );
  requestBody.userDetails.password = hashedPassword;

  let user: mongoose.Document | null = null;
  if (requestBody.userType === 'patient') {
    user = await handlePatientUpdate(requestBody, authUser);
  } else if (requestBody.userType === 'doctor') {
    user = await handleDoctorUpdate(requestBody, authUser);
  } else if (requestBody.userType === 'donorAcquirer') {
    user = await handleDonorAcquirerUpdate(requestBody, authUser);
  } else {
    throw new HttpError({
      message: 'Invalid user type',
      statusCode: 400,
      name: 'BadRequestError',
    });
  }

  if (user) {
    const { password, ...userDetails } = user.toObject();

    return new ApiSuccessResponse({
      message: 'User updated successfully',
      data: {
        user: userDetails,
      },
      statusCode: 200,
    });
  } else {
    throw new HttpError({
      message: 'User update failed',
      statusCode: 500,
      name: 'InternalServerError',
    });
  }
};

export const updateMyProfile = {
  requestSchema,
  requestHandler,
};

//#region Private functions
async function handlePatientUpdate(
  data: Extract<TUpdateRequest, { userType: 'patient' }>,
  existingUser: mongoose.Document
) {
  const disease = await DiseaseTypeModel.findById(
    data.medicalHistory.diseaseId
  );
  if (!disease) {
    throw new HttpError({
      message: 'Disease not found',
      statusCode: 404,
      name: 'NotFoundError',
    });
  }

  if (data.patientDetails.idVerification) {
    data.patientDetails.idVerification = await handleBase64Upload(
      data.patientDetails.idVerification,
      randomBytes(16).toString('hex')
    );
  }

  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    // await existingUser.updateOne(data.userDetails, { session });
    await UserModel.findOneAndUpdate(
      { _id: existingUser._id },
      data.userDetails,
      { session }
    );

    const patient = await PatientModel.findOneAndUpdate(
      { user: existingUser._id },
      data.patientDetails,
      { new: true, session }
    );

    if (!patient) {
      throw new HttpError({
        message: 'Patient not found',
        statusCode: 404,
        name: 'NotFoundError',
      });
    }

    await PatientMedicalHistoryModel.findOneAndUpdate(
      { patient: patient._id },
      { ...data.medicalHistory, disease: disease },
      { new: true, session }
    );

    await session.commitTransaction();

    return existingUser;
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    await session.endSession();
  }
}

async function handleDoctorUpdate(
  data: Extract<TUpdateRequest, { userType: 'doctor' }>,
  existingUser: mongoose.Document
) {
  if (data.doctorDetails.license) {
    data.doctorDetails.license = await handleBase64Upload(
      data.doctorDetails.license,
      randomBytes(16).toString('hex')
    );
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    await UserModel.findOneAndUpdate(
      { _id: existingUser._id },
      data.userDetails,
      { session }
    );

    const doctor = await DoctorModel.findOneAndUpdate(
      { user: existingUser._id },
      data.doctorDetails,
      { new: true, session }
    );

    if (doctor) {
      await TrialModel.updateMany(
        { conductedBy: doctor._id },
        data.trialDetails,
        { session }
      );
    } else {
      throw new HttpError({
        message: 'Doctor not found',
        statusCode: 404,
        name: 'NotFoundError',
      });
    }

    await session.commitTransaction();

    return existingUser;
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
}

async function handleDonorAcquirerUpdate(
  data: Extract<TUpdateRequest, { userType: 'donorAcquirer' }>,
  existingUser: mongoose.Document
) {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    await UserModel.findOneAndUpdate(
      { _id: existingUser._id },
      data.userDetails,
      { session }
    );

    await DonorAcquirerModel.findOneAndUpdate(
      { user: existingUser._id },
      data.donorAcquirerDetails,
      { new: true, session }
    );

    await session.commitTransaction();

    return existingUser;
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
}

//#endregion
