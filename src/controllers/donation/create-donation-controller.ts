import { z } from 'zod';

import { DonationModel } from '@/models/donation.model.js';

import { ApiSuccessResponse } from '@/lib/api-response.js';
import { AppRequestHandler } from '@/lib/app-request-handler.js';
import { checkAuth } from '@/lib/check-auth.js';
import HttpError from '@/lib/http-error.js';

const requestSchema = z.object({
  equipmentName: z.string(),
  equipmentDescription: z.string(),
  yearsOfUse: z.number().positive(),
  warrantyDetails: z.string().optional(),
  defects: z.string().optional(),
  pointOfContact: z.string(),
  details: z.string(),
});

type TCreateDonationRequest = z.infer<typeof requestSchema>;

const requestHandler: AppRequestHandler<TCreateDonationRequest> = async ({
  request,
  requestBody,
}) => {
  const authUser = await checkAuth(request, ['donorAcquirer']);

  const currentUserId = authUser._id;

  const newDonation = new DonationModel({
    equipmentName: requestBody.equipmentName,
    equipmentDescription: requestBody.equipmentDescription,
    yearsOfUse: requestBody.yearsOfUse,
    warrantyDetails: requestBody.warrantyDetails,
    defects: requestBody.defects,
    pointOfContact: requestBody.pointOfContact,
    details: requestBody.details,
    userId: currentUserId,
  });

  await newDonation.save();

  return new ApiSuccessResponse({
    message: 'Donation created successfully',
    statusCode: 201,
    data: newDonation,
  });
};

export const createDonationController = {
  requestSchema,
  requestHandler,
};
