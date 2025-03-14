import { Router } from 'express';

import { requestHandlerWrapper } from '@/lib/app-request-handler.js';

import { loginController } from '@/controllers/login/login-controller.js';
import { verifyOtpController } from '@/controllers/login/verify-otp.js';
import { signupController } from '@/controllers/signup/signup-controller.js';

const router = Router();

router.post('/signup', requestHandlerWrapper(signupController));
router.post('/login', requestHandlerWrapper(loginController));
router.post('/verify-otp', requestHandlerWrapper(verifyOtpController));

export default router;
