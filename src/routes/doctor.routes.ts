import { Router } from 'express';

import { requestHandlerWrapper } from '@/lib/app-request-handler.js';

import { getAllDoctors } from '@/controllers/doctors/get-all-doctors.js';
import { getSingleDoctor } from '@/controllers/doctors/get-single-doctor.js';
import { updateController } from '@/controllers/user/update-controller.js';

const router = Router();

router.get('/', requestHandlerWrapper(getAllDoctors));
router.get('/:doctorId', requestHandlerWrapper(getSingleDoctor));
router.put('/:id', requestHandlerWrapper(updateController));

export default router;
