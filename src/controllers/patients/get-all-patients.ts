import { z } from 'zod';

import { PatientMedicalHistoryModel } from '@/models/medicalHistory.model.js';
import { PatientModel } from '@/models/patient.model.js';

import { ApiSuccessResponse } from '@/lib/api-response.js';
import { AppRequestHandler } from '@/lib/app-request-handler.js';

const requestSchema = z.object({});

type TGetAllDiseaseRequest = z.infer<typeof requestSchema>;

const requestHandler: AppRequestHandler<TGetAllDiseaseRequest> = async ({}) => {
  const patients = await PatientModel.find().populate('user').lean();
  const patientsWithHistory = [];

  for (const patient of patients) {
    const medicalHistory = await PatientMedicalHistoryModel.findOne({
      patient: patient._id,
    })
      .populate('disease')
      .lean();

    patientsWithHistory.push({
      ...patient,
      medicalHistory: medicalHistory || null,
    });
  }

  return new ApiSuccessResponse({
    statusCode: 200,
    data: patientsWithHistory,
    message: 'Patients fetched successfully',
  });
};

export const getAllPatients = {
  requestSchema,
  requestHandler,
};
