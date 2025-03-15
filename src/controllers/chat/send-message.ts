import { z } from 'zod';

import { MessageModel } from '@/models/message.model.js';

import { ApiSuccessResponse } from '@/lib/api-response.js';
import { AppRequestHandler } from '@/lib/app-request-handler.js';
import { checkAuth } from '@/lib/check-auth.js';
import { createNotification } from '@/lib/create-notification.js';

const requestSchema = z.object({
  content: z.string().min(1).max(1000),
  recipient: z.string(),
  matchId: z.string(),
});

type TRequest = z.input<typeof requestSchema>;

const requestHandler: AppRequestHandler<TRequest> = async ({ request }) => {
  const authUser = await checkAuth(request, ['doctor', 'patient']);
  const currentUserId = authUser.id;
  const { content, recipient, matchId } = request.body;

  const message = new MessageModel({
    content,
    sender: currentUserId,
    recipient,
    matchId,
  });

  await message.save();

  createNotification({
    eventType: 'chat',
    senderId: currentUserId,
    userId: recipient,
  });

  return new ApiSuccessResponse({
    data: {
      content: message.content,
      sender: message.sender,
    },
  });
};

export const sendMessage = {
  requestSchema,
  requestHandler,
};
