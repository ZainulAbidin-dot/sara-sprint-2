import bcrypt from 'bcrypt';
import { z } from 'zod';

import { UserModel } from '@/models/user.model.js';

import { ApiSuccessResponse } from '@/lib/api-response.js';
import { AppRequestHandler } from '@/lib/app-request-handler.js';
import HttpError from '@/lib/http-error.js';

const requestSchema = z.object({
  email: z.string().email(),
  newPassword: z.string(),
});

type TForgotPasswordRequest = z.infer<typeof requestSchema>;

const requestHandler: AppRequestHandler<TForgotPasswordRequest> = async ({
  request,
  requestBody,
}) => {
  const existingUser = await UserModel.findOne({
    email: requestBody.email,
  });

  if (!existingUser) {
    throw new HttpError({
      message: 'Invalid email',
      statusCode: 401,
      name: 'UnauthorizedError',
    });
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(requestBody.newPassword, 10);
  await UserModel.updateOne(
    { _id: existingUser._id },
    { password: hashedPassword }
  );

  return new ApiSuccessResponse({
    message: 'Password reset successfully',
    data: {},
    statusCode: 201,
  });
};

export const forgotPasswordController = {
  requestSchema,
  requestHandler,
};
