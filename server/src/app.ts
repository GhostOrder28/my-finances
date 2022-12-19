import express from 'express';
import path from 'path';
import morgan from 'morgan';
import cors from 'cors';

import authRouter from './routes/users/users.router'; 
import clientsRouter from './routes/clients/clients.router';
import salesRouter from './routes/sales/sales.router';

const app = express();

app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(morgan('combined'));

app.use('/auth', authRouter);
app.use('/clients', clientsRouter);
app.use('/sales', salesRouter);

export default app;
