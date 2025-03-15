import { Request } from 'express';

import { UserModel } from '@/models/user.model.js';

import HttpError from './http-error.js';

export async function checkAuth(
  request: Request,
  userType: 'patient' | 'doctor' | 'donorAcquirer'
) {
  const userId = request.session?.userId;
  if (!userId) {
    throw new HttpError({
      message: 'You must be logged in to access this resource',
      statusCode: 401,
      name: 'Unauthorized',
    });
  }

  const user = await UserModel.findById(userId);

  if (!user) {
    throw new HttpError({
      message: 'You must be logged in to access this resource',
      statusCode: 401,
      name: 'Unauthorized',
    });
  }

  if (user.userType !== userType) {
    throw new HttpError({
      message: 'You do not have permission to access this resource',
      statusCode: 403,
      name: 'Unauthorized',
    });
  }

  return user;
}
