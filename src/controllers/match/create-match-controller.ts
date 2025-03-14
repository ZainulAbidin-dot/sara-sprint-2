import { z } from 'zod';

import { MatchModel } from '@/models/match.model.js';

import { ApiSuccessResponse } from '@/lib/api-response.js';
import { AppRequestHandler } from '@/lib/app-request-handler.js';
import HttpError from '@/lib/http-error.js';

const requestSchema = z.object({
  userId: z.string(),
});

type TCreateMatchRequest = z.infer<typeof requestSchema>;

const requestHandler: AppRequestHandler<TCreateMatchRequest> = async ({
  request,
  requestBody,
}) => {
  const currentUserId = request.session.userId;

  if (!currentUserId) {
    throw new HttpError({
      message: 'Unauthorized',
      statusCode: 401,
      name: 'UnauthorizedError',
    });
  }

  // check if the match already exists between the users
  const existingMatch = await MatchModel.findOne({
    $or: [
      { user1: currentUserId, user2: requestBody.userId },
      { user1: requestBody.userId, user2: currentUserId },
    ],
  });

  if (existingMatch) {
    throw new HttpError({
      message: 'Match already exists',
      statusCode: 400,
      name: 'BadRequestError',
    });
  }

  const newMatch = new MatchModel({
    user1: currentUserId,
    user2: requestBody.userId,
    status: 'pending',
  });

  await newMatch.save();

  return new ApiSuccessResponse({
    message: 'Match created successfully',
    statusCode: 201,
    data: newMatch,
  });
};

export const createMatchController = {
  requestSchema,
  requestHandler,
};
