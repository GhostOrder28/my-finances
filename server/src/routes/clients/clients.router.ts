import express from 'express';
import { httpPostClient } from './clients.controller';

const clientsRouter = express.Router();

clientsRouter.post('/:userid', httpPostClient);
clientsRouter.put('/:userid', httpPostClient);

export default clientsRouter;
