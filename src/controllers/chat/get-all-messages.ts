import { z } from 'zod';

import { MessageModel } from '@/models/message.model.js';

import { ApiSuccessResponse } from '@/lib/api-response.js';
import { AppRequestHandler } from '@/lib/app-request-handler.js';
import { checkAuth } from '@/lib/check-auth.js';

const requestSchema = z.object({});

type TRequest = z.input<typeof requestSchema>;

const requestHandler: AppRequestHandler<TRequest> = async ({ request }) => {
  const authUser = await checkAuth(request, ['doctor', 'patient']);
  const currentUserId = authUser.id;

  const matchId = request.params.matchId;

  const messages = await MessageModel.find({
    matchId,
  })
    .select('content sender')
    .sort({ createdAt: 1 }); // sort by createdAt in ascending order

  return new ApiSuccessResponse({ data: messages });
};

export const getAllMessages = {
  requestSchema,
  requestHandler,
};
