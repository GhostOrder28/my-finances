import express from 'express';
import { httpSubPostPayment, httpSubPatchPayment, httpSubDeletePayment, httpSubGetOnePayment } from './payments.controller';

const paymentsRouter = express.Router({ mergeParams: true });

paymentsRouter.patch('/', httpSubPostPayment);
paymentsRouter.patch('/:paymentid', httpSubPatchPayment);
paymentsRouter.patch('/:paymentid', httpSubDeletePayment);
paymentsRouter.get('/:paymentid', httpSubGetOnePayment);

export default paymentsRouter;
