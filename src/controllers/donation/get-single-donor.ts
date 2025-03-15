import { z } from 'zod';

import { UserModel } from '@/models/user.model.js';

import { ApiSuccessResponse } from '@/lib/api-response.js';
import { AppRequestHandler } from '@/lib/app-request-handler.js';

const requestSchema = z.object({});

type TCreateDonationRequest = z.infer<typeof requestSchema>;

const requestHandler: AppRequestHandler<TCreateDonationRequest> = async ({
  request,
  requestBody,
}) => {
  const donorId = request.params.donorId;

  const user = await UserModel.findById(donorId).select('-passsword');

  return new ApiSuccessResponse({
    message: 'Donation created successfully',
    statusCode: 201,
    data: user,
  });
};

export const getDonorController = {
  requestSchema,
  requestHandler,
};
