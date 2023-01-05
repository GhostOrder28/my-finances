import express from 'express';
import { 
  httpSubPostSale, 
  httpSubPatchSale, 
  httpSubDeleteSale, 
} from './sales.controller';
import paymentsRouter from '../payments/payments.router';

const salesRouter = express.Router({ mergeParams: true });

salesRouter.patch('/', httpSubPostSale);
salesRouter.patch('/:saleid', httpSubPatchSale);
salesRouter.patch('/:saleid', httpSubDeleteSale);

salesRouter.use('/:saleid/payments', paymentsRouter)

export default salesRouter;
