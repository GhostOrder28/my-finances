import express from 'express';
import { httpPostSale } from './sales.controller';

const salesRouter = express.Router();

salesRouter.post('/:userid/:clientid', httpPostSale);
salesRouter.put('/:userid/:clientid', httpPostSale);

export default salesRouter;
