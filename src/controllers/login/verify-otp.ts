import { z } from 'zod';

import { UserModel } from '@/models/user.model.js';

import { ApiSuccessResponse } from '@/lib/api-response.js';
import { AppRequestHandler } from '@/lib/app-request-handler.js';
import HttpError from '@/lib/http-error.js';

const requestSchema = z.object({
  otp: z.string(),
  email: z.string().email(),
  userType: z.enum(['patient', 'doctor', 'donorAcquirer']),
});

type TLoginRequest = z.infer<typeof requestSchema>;

const requestHandler: AppRequestHandler<TLoginRequest> = async ({
  request,
  requestBody,
}) => {
  const existingUser = await UserModel.findOne({
    email: requestBody.email,
    userType: requestBody.userType,
  });

  if (!existingUser) {
    throw new HttpError({
      message: 'Invalid email or otp',
      statusCode: 401,
      name: 'UnauthorizedError',
    });
  }

  if (existingUser.otp !== requestBody.otp) {
    throw new HttpError({
      message: 'Invalid email or otp',
      statusCode: 401,
      name: 'UnauthorizedError',
    });
  }

  request.session.userId = existingUser._id as string;

  const { password, ...userWithoutPassword } = existingUser.toObject();

  return new ApiSuccessResponse({
    message: 'User logged in successfully',
    statusCode: 200,
    data: {
      user: userWithoutPassword,
    },
  });
};

export const verifyOtpController = {
  requestSchema,
  requestHandler,
};
