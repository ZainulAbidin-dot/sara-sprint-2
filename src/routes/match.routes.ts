import { Router } from 'express';

import { requestHandlerWrapper } from '@/lib/app-request-handler.js';

import { createMatchController } from '@/controllers/match/create-match-controller.js';

const router = Router();

router.post('/', requestHandlerWrapper(createMatchController));

export default router;
