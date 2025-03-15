import { z } from 'zod';

import { DoctorModel } from '@/models/doctor.model.js';
import { PatientModel } from '@/models/patient.model.js';
import { TrialModel } from '@/models/trial.model.js';
import { UserModel } from '@/models/user.model.js';

import { ApiSuccessResponse } from '@/lib/api-response.js';
import { AppRequestHandler } from '@/lib/app-request-handler.js';
import { checkAuth } from '@/lib/check-auth.js';
import HttpError from '@/lib/http-error.js';

const requestSchema = z.object({});

type TRequest = z.infer<typeof requestSchema>;

const requestHandler: AppRequestHandler<TRequest> = async ({ request }) => {
  const authUser = await checkAuth(request, 'any');

  if (authUser.userType === 'doctor') {
    const doctorProfile = await DoctorModel.findOne({
      user: authUser._id,
    }).lean();

    if (!doctorProfile) {
      throw new HttpError({
        message: 'Doctor profile not found',
        statusCode: 404,
        name: 'NotFound',
      });
    }

    const doctorTrials = await TrialModel.findOne({
      conductedBy: doctorProfile._id,
    }).lean();

    return new ApiSuccessResponse({
      data: {
        user: authUser,
        doctorProfile,
        doctorTrials,
      },
    });
  }

  throw new HttpError({
    message: 'User type not supported',
    statusCode: 400,
    name: 'BadRequest',
  });
};

export const getMyProfile = {
  requestSchema,
  requestHandler,
};
