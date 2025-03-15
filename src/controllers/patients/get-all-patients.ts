import { z } from 'zod';

import { MatchModel } from '@/models/match.model.js';
import { PatientMedicalHistoryModel } from '@/models/medicalHistory.model.js';
import { PatientModel } from '@/models/patient.model.js';

import { ApiSuccessResponse } from '@/lib/api-response.js';
import { AppRequestHandler } from '@/lib/app-request-handler.js';
import HttpError from '@/lib/http-error.js';

const requestSchema = z.object({});

type TGetAllDiseaseRequest = z.infer<typeof requestSchema>;

const requestHandler: AppRequestHandler<TGetAllDiseaseRequest> = async ({
  request,
}) => {
  const currentUserId = request.session.userId;

  if (!currentUserId) {
    throw new HttpError({
      statusCode: 401,
      name: 'Unauthorized',
      message: 'You need to be logged in to access this route',
    });
  }

  const myMatches = await MatchModel.find({
    $or: [{ user1: currentUserId }, { user2: currentUserId }],
  }).lean();

  const myMatchedUserIds = myMatches.map((match) => {
    if (match.user1.toString() === currentUserId) {
      return match.user2;
    }
    return match.user1;
  });

  const patients = await PatientModel.find({
    user: { $nin: myMatchedUserIds },
  })
    .populate('user')
    .lean();
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
