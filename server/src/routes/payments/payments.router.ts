import express from 'express';
import { httpSubPostPayment, httpSubPatchPayment, httpSubDeletePayment } from './payments.controller';

const paymentsRouter = express.Router({ mergeParams: true });

paymentsRouter.patch('/', httpSubPostPayment);
paymentsRouter.patch('/:paymentid', httpSubPatchPayment);
paymentsRouter.patch('/:paymentid', httpSubDeletePayment);

export default paymentsRouter;
