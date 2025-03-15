import { Router } from 'express';

import { requestHandlerWrapper } from '@/lib/app-request-handler.js';

import { acceptMatchController } from '@/controllers/match/accept-match-controller.js';
import { createMatchController } from '@/controllers/match/create-match-controller.js';
import { denyMatchController } from '@/controllers/match/deny-match-controller.js';
import { getMyMatchesController } from '@/controllers/match/get-my-matches.js';
import { getSingleMatchController } from '@/controllers/match/get-single-match.js';

const router = Router();

router.post('/', requestHandlerWrapper(createMatchController));
router.get('/my-matches', requestHandlerWrapper(getMyMatchesController));
router.get('/:matchId', requestHandlerWrapper(getSingleMatchController));
router.post('/:matchId/confirm', requestHandlerWrapper(acceptMatchController));
router.post('/:matchId/deny', requestHandlerWrapper(denyMatchController));

export default router;
