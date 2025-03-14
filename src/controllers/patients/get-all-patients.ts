import { z } from 'zod';

import { PatientMedicalHistoryModel } from '@/models/medicalHistory.model.js';
import { PatientModel } from '@/models/patient.model.js';

import { ApiSuccessResponse } from '@/lib/api-response.js';
import { AppRequestHandler } from '@/lib/app-request-handler.js';

const requestSchema = z.object({});

type TGetAllDiseaseRequest = z.infer<typeof requestSchema>;

const requestHandler: AppRequestHandler<TGetAllDiseaseRequest> = async ({}) => {
  const patients = await PatientModel.find().populate('user');

  for (const patient of patients) {
    const medicalHistory = await PatientMedicalHistoryModel.find({
      patient: patient._id,
    });
    patient.medicalHistory = medicalHistory;
  }

  return new ApiSuccessResponse({
    statusCode: 200,
    data: patients,
    message: 'Patients fetched successfully',
  });
};

export const getAllPatients = {
  requestSchema,
  requestHandler,
};
