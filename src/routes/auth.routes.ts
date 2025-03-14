import { Router } from 'express';

import { requestHandlerWrapper } from '@/lib/app-request-handler.js';

import { signupController } from '@/controllers/signup/signup-controller.js';

const router = Router();

router.post('/signup', requestHandlerWrapper(signupController));

export default router;
