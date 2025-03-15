import { Router } from 'express';

import { requestHandlerWrapper } from '@/lib/app-request-handler.js';

import { createDonationController } from '@/controllers/donation/create-donation-controller.js';
import { getAllDonationsController } from '@/controllers/donation/get-all-donation-controller.js';
import { getDonorController } from '@/controllers/donation/get-single-donor.js';

const router = Router();

router.get(
  '/get-all-donation',
  requestHandlerWrapper(getAllDonationsController)
);
router.post(
  '/create-donation',
  requestHandlerWrapper(createDonationController)
);

router.get('/:donorId', requestHandlerWrapper(getDonorController));

export default router;
