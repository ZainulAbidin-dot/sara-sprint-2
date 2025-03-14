import { z } from 'zod';

import { UserModel } from '@/models/user.model.js';

import { ApiSuccessResponse } from '@/lib/api-response.js';
import { AppRequestHandler } from '@/lib/app-request-handler.js';
import HttpError from '@/lib/http-error.js';

const requestSchema = z.object({});

type TGetSinglePatientRequest = z.infer<typeof requestSchema>;

const requestHandler: AppRequestHandler<TGetSinglePatientRequest> = async ({
  request,
}) => {
  const { doctorId } = request.params;

  const doctor = await UserModel.findById(doctorId).select('-password');

  if (!doctor)
    throw new HttpError({
      statusCode: 404,
      message: 'No doctor found',
      name: 'Not Found Error',
    });

  return new ApiSuccessResponse({
    statusCode: 200,
    data: doctor,
    message: 'Doctor fetched successfully',
  });
};

export const getSingleDoctor = {
  requestSchema,
  requestHandler,
};
