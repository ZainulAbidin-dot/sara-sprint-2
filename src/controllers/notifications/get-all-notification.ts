import { z } from 'zod';

import { NotificationModel } from '@/models/notification.model.js';

import { ApiSuccessResponse } from '@/lib/api-response.js';
import { AppRequestHandler } from '@/lib/app-request-handler.js';
import { checkAuth } from '@/lib/check-auth.js';

const requestSchema = z.object({});

type TRequest = z.infer<typeof requestSchema>;

const requestHandler: AppRequestHandler<TRequest> = async ({ request }) => {
  const authUser = await checkAuth(request, [
    'doctor',
    'patient',
    'donorAcquirer',
  ]);

  const notifications = await NotificationModel.find({
    user: authUser._id,
  }).sort({ createdAt: -1 });

  return new ApiSuccessResponse({
    data: notifications,
  });
};

export const getAllNotification = {
  requestSchema,
  requestHandler,
};
