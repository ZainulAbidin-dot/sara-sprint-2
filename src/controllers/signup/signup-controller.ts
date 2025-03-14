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
import { handleBase64Upload } from '@/lib/file-upload.js';
import HttpError from '@/lib/http-error.js';

import { requestSchema } from './signup-validation.js';

type TSignupRequest = z.infer<typeof requestSchema>;

const requestHandler: AppRequestHandler<TSignupRequest> = async ({
  request,
  requestBody,
}) => {
  const existingUser = await UserModel.findOne({
    email: requestBody.userDetails.email,
  });

  if (existingUser) {
    throw new HttpError({
      message: 'Email already exists',
      statusCode: 409,
      name: 'ConflictError',
    });
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(
    requestBody.userDetails.password,
    10
  );
  requestBody.userDetails.password = hashedPassword;

  let userId: string | null = null;
  if (requestBody.userType === 'patient') {
    userId = await handlePatientCreate(requestBody);
  } else if (requestBody.userType === 'doctor') {
    userId = await handleDoctorCreate(requestBody);
  } else if (requestBody.userType === 'donorAcquirer') {
    userId = await handleDonorAcquirerCreate(requestBody);
  } else {
    throw new HttpError({
      message: 'Invalid user type',
      statusCode: 400,
      name: 'BadRequestError',
    });
  }

  if (userId) {
    // create session for this user.
    request.session.userId = userId;

    return new ApiSuccessResponse({
      message: 'User registered successfully',
      data: null,
      statusCode: 201,
    });
  } else {
    throw new HttpError({
      message: 'User registration failed',
      statusCode: 500,
      name: 'InternalServerError',
    });
  }
};

export const signupController = {
  requestSchema,
  requestHandler,
};

//#region Private functions
async function handlePatientCreate(
  data: Extract<TSignupRequest, { userType: 'patient' }>
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

    const user = await new UserModel({
      ...data.userDetails,
      userType: 'patient',
    }).save({ session });

    const patient = await new PatientModel({
      ...data.patientDetails,
      user: user._id,
    }).save({ session });

    await new PatientMedicalHistoryModel({
      ...data.medicalHistory,
      patient: patient._id,
      disease: disease,
    }).save({ session });

    await session.commitTransaction();

    return user._id as string;
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    await session.endSession();
  }
}

async function handleDoctorCreate(
  data: Extract<TSignupRequest, { userType: 'doctor' }>
) {
  data.doctorDetails.license = await handleBase64Upload(
    data.doctorDetails.license,
    randomBytes(16).toString('hex')
  );

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const user = await new UserModel({
      ...data.userDetails,
      userType: 'doctor',
    }).save({ session });

    const doctor = await new DoctorModel({
      ...data.doctorDetails,
      user: user._id,
    }).save({ session });

    await new TrialModel({
      ...data.trialDetails,
      conductedBy: doctor._id,
    }).save({ session });

    await session.commitTransaction();

    return user._id as string;
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
}

async function handleDonorAcquirerCreate(
  data: Extract<TSignupRequest, { userType: 'donorAcquirer' }>
) {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const user = await new UserModel({
      ...data.userDetails,
      userType: 'doctor',
    }).save({ session });

    const donorAcquirer = await new DonorAcquirerModel({
      ...data.donorAcquirerDetails,
      user: user._id,
    }).save({ session });

    await session.commitTransaction();

    return user._id as string;
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
}

//#endregion
