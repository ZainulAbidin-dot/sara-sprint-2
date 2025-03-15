import { Router } from 'express';

import { requestHandlerWrapper } from '@/lib/app-request-handler.js';

import { getAllPatients } from '@/controllers/patients/get-all-patients.js';
import { getSinglePatient } from '@/controllers/patients/get-single-patient.js';
import { updateController } from '@/controllers/user/update-controller.js';

const router = Router();

router.get('/', requestHandlerWrapper(getAllPatients));
router.get('/:patientId', requestHandlerWrapper(getSinglePatient));
router.put('/:id', requestHandlerWrapper(updateController));

export default router;
