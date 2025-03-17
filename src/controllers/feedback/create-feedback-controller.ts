import { z } from 'zod';

import { FeedbackModel } from '@/models/feedback.model.js';

import { ApiSuccessResponse } from '@/lib/api-response.js';
import { AppRequestHandler } from '@/lib/app-request-handler.js';
import { checkAuth } from '@/lib/check-auth.js';
import { createNotification } from '@/lib/create-notification.js';
import HttpError from '@/lib/http-error.js';

const requestSchema = z.object({
  email: z.string().email(),
  name: z.string(),
  comments: z.string(),
});

type TRequest = z.infer<typeof requestSchema>;

const requestHandler: AppRequestHandler<TRequest> = async ({
  request,
  requestBody,
}) => {
  const feedback = new FeedbackModel({
    user: '1',
    email: requestBody.email,
    name: requestBody.name,
    comments: requestBody.comments,
  });

  await feedback.save();

  return new ApiSuccessResponse({
    data: feedback,
    statusCode: 200,
    message: 'Feeback submitted successfully',
  });
};

export const createFeedback = {
  requestSchema,
  requestHandler,
};
