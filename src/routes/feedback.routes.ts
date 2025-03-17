import { Router } from 'express';

import { requestHandlerWrapper } from '@/lib/app-request-handler.js';

import { createFeedback } from '@/controllers/feedback/create-feedback-controller.js';

const router = Router();

router.post('/', requestHandlerWrapper(createFeedback));

export default router;
