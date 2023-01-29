import express from 'express';
import { 
  httpSubPostSale, 
  httpSubPatchSale, 
  httpSubDeleteSale, 
  httpSubGetOneSale,
} from './sales.controller';
import paymentsRouter from '../payments/payments.router';

const salesRouter = express.Router({ mergeParams: true });

salesRouter.get('/:saleid', httpSubGetOneSale);

salesRouter.patch('/', httpSubPostSale);
salesRouter.patch('/:saleid', httpSubPatchSale);
salesRouter.patch('/:saleid', httpSubDeleteSale);

salesRouter.use('/:saleid/payments', paymentsRouter)

export default salesRouter;
