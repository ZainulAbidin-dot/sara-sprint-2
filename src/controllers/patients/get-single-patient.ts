import { z } from 'zod';

import { PatientMedicalHistoryModel } from '@/models/medicalHistory.model.js';
import { PatientModel } from '@/models/patient.model.js';
import { UserModel } from '@/models/user.model.js';

import { ApiErrorResponse, ApiSuccessResponse } from '@/lib/api-response.js';
import { AppRequestHandler } from '@/lib/app-request-handler.js';
import HttpError from '@/lib/http-error.js';

const requestSchema = z.object({});

type TGetSinglePatientRequest = z.infer<typeof requestSchema>;

const requestHandler: AppRequestHandler<TGetSinglePatientRequest> = async ({
  request,
}) => {
  const { patientId } = request.params;

  const patient = await UserModel.findById(patientId).select('-password');

  if (!patient)
    throw new HttpError({
      statusCode: 404,
      message: 'No patient found',
      name: 'Not Found Error',
    });

  return new ApiSuccessResponse({
    statusCode: 200,
    data: patient,
    message: 'Patient fetched successfully',
  });
};

export const getSinglePatient = {
  requestSchema,
  requestHandler,
};
