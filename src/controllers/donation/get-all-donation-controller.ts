import { z } from 'zod';

import { DonationModel } from '@/models/donation.model.js';

import { ApiSuccessResponse } from '@/lib/api-response.js';
import { AppRequestHandler } from '@/lib/app-request-handler.js';
import { checkAuth } from '@/lib/check-auth.js';

const requestSchema = z.object({});

const getAllDonationsHandler: AppRequestHandler<any> = async ({ request }) => {
  const authUser = await checkAuth(request, ['donorAcquirer']);

  const donations = await DonationModel.find({
    // userId: { $ne: authUser._id },
  });

  return new ApiSuccessResponse({
    message: 'Donations fetched successfully',
    statusCode: 200,
    data: donations,
  });
};

export const getAllDonationsController = {
  requestHandler: getAllDonationsHandler,
  requestSchema,
};
