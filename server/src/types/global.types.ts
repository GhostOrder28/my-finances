declare global {
    interface Error { errorDetails: any; }
}

import { Types as MongooseTypes } from 'mongoose';

type DeleteQuery = { delete: string };
type SingleQuery = { single: string };
type SaleFilters = { filter?: 'saleform' | 'paymentform' };

type HttpUseridParam = { userid: string };
type HttpClientidParam = { clientid: string };

export {
  DeleteQuery,
  SingleQuery,
  SaleFilters,
  HttpUseridParam,
  HttpClientidParam,
  MongooseTypes,
}
