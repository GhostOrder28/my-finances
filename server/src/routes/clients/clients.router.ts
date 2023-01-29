import express from 'express';
import salesRouter from '../sales/sales.router';
import { 
  httpPostClient, 
  httpPatchClient, 
  httpGetClients,
  httpGetOneClient,
  httpDeleteOneClient,
} from './clients.controller';

const clientsRouter = express.Router();

clientsRouter.get('/:userid', httpGetClients);
clientsRouter.get('/:clientid', httpGetOneClient);
clientsRouter.get('/:clientid', httpGetOneClient);
clientsRouter.post('/:userid', httpPostClient);
clientsRouter.patch('/:clientid', httpPatchClient);
clientsRouter.delete('/:userid/:clientid', httpDeleteOneClient);

clientsRouter.use('/:clientid/sales', salesRouter);

export default clientsRouter;
