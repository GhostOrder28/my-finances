import express from 'express';
import salesRouter from '../sales/sales.router';
import { httpPostClient, httpPatchClient, httpGetClients } from './clients.controller';

const clientsRouter = express.Router();

clientsRouter.get('/:userid', httpGetClients);
clientsRouter.post('/:userid', httpPostClient);
clientsRouter.patch('/:clientid', httpPatchClient);

clientsRouter.use('/:clientid/sales', salesRouter);

export default clientsRouter;
