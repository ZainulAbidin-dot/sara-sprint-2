import { Router } from 'express';

import { requestHandlerWrapper } from '@/lib/app-request-handler.js';

import { getAllPatients } from '@/controllers/patients/get-all-patients.js';

const router = Router();

router.get('/', requestHandlerWrapper(getAllPatients));

export default router;
