import mongoose from "mongoose";
import clientsCollection from "../clients/clients.schema";
import { 
  SaleFormData, 
  SalePostReqBody, 
  SalePatchReqBody, 
  Item, 
  Payment,
  ClientAndSaleResBody,
  SaleDataForPaymentForm,
  isClientAndSaleResBody,
  isSaleFormResBody,
} from "../../types/sale.types";
import { NotFoundError } from "../../errors/db-errors";
import { strParseIn, strParseOut } from "../../utils/utility-functions";
import { format } from "date-fns";

const { Types: { ObjectId } } = mongoose;

function getTotalSaleValue (items: Item[]) {
  const totalValue = items.reduce((acc, curr) => {
    return acc + (curr.pricePerUnit * curr.quantity);
  }, 0);   
  return totalValue;
};

function getPaidAmount (payments: Payment[]) {
  const paidAmount = payments.reduce((acc, curr) => {
    return acc + curr.amount;
  }, 0);
  return paidAmount;
};

function saleDataAggregation (clientId: string, saleId: string) {
  return [
    {
      $unwind: { path: '$sales' }
    },
    { 
      $match: {
        _id: new ObjectId(clientId),
        'sales._id': new ObjectId(saleId)
      },
    },
  ]
};

function getClientDataProjection (clientId: string, saleId: string, projection: {}) {
  return [
    ...saleDataAggregation(clientId, saleId),
    {
      $addFields: {
        'sales.clientName': '$clientName',
        'sales.clientNameDetails': '$clientNameDetails'
      }
    },
    { $replaceRoot: { newRoot: '$sales' } },
    { $project: projection }
  ]
};

async function postSale (clientId: string,  body: SalePostReqBody) {
  let initialPayment;

  const parsedBody = {
    ...body,
    // saleDate: format(new Date(body.saleDate), 'yyyy/MM/dd'),
    saleDate: format(new Date(body.saleDate), 'yyyy/MM/dd'),
    items: body.items.map((item) => ({ ...item, name: strParseIn(item.name) }))
  }
  const saleValue = getTotalSaleValue(body.items);

  if (parsedBody.payments.length) {
    parsedBody.payments[0]._id = new ObjectId();
    initialPayment = parsedBody.payments[0].amount;
  } else {
    initialPayment = 0;
  }

  const unpaidAmount = saleValue - initialPayment;

  const query = { _id: new ObjectId(clientId) };

  const update = [ 
    { 
      $set: { 
        sales: {
          $concatArrays: [ '$sales', [ {
            ...parsedBody,
            saleValue, 
            unpaidAmount,
            paidAmount: initialPayment,
            _id: new ObjectId(),
          } ] ]
        },
        clientSalesValue: { $sum: [ '$clientSalesValue', saleValue ] },
        currentDebt: { $sum: [ '$currentDebt', unpaidAmount ] },
      }
    },
  ];

  console.log('body to insert', parsedBody);

  const options = { new: true };

  const payload = await clientsCollection.findOneAndUpdate(query, update, options);   

  if (payload) {
    return payload.sales.slice(-1)[0]._id;
  } else {
    if (payload === null) throw new NotFoundError(`No se pudo registrar la venta, el cliente no existe.`)
  };

};

async function patchSale (clientId: string, saleId: string, body: Omit<SalePatchReqBody, 'payments'>) {
  const saleValue = getTotalSaleValue(body.items);
  const parsedBody = {
    ...body,
    saleDate: format(new Date(body.saleDate), 'yyyy/MM/dd'),
  };
  const query = { _id: new ObjectId(clientId) };

  const update = [
    {
      $set: {
        sales: {
          $map: {
            input: '$sales',
            in: {
              $cond: [
                { $eq: [ '$$this._id', new ObjectId(saleId) ] },
                { $mergeObjects: [ '$$this', { 
                  ...parsedBody,
                  saleValue,
                  unpaidAmount: { $subtract: [ saleValue, '$$this.paidAmount' ] }
                } ] },
                '$$this'
              ]
            }
          }
        }
      }
    },
    {
      $set: {
        clientSalesValue: { $sum: '$sales.saleValue' },
        currentDebt: { $sum: '$sales.unpaidAmount' },
      }
    }
  ];

  const options = { new: true };

  try {
    const dbResponse = await clientsCollection.findOneAndUpdate(query, update, options);
    if (dbResponse) {
      return saleId;
    } else {
      throw new NotFoundError(`No se pudo actualzar la venta, el cliente no existe.`)
    };
  } catch (err) {
    throw new Error(`there was an error: ${err}`)
  }
};

async function getOneSale (clientId: string, saleId: string) {
  try {
    const [ dbResponse ] = await clientsCollection.aggregate<ClientAndSaleResBody>(saleDataAggregation(clientId, saleId));

    if (!dbResponse) throw new NotFoundError(`El cliente o la venta no existe.`);

    const parsedItems = dbResponse.sales.items.map(item => ({ ...item, name: strParseOut(item.name) }));

    dbResponse.sales = { ...dbResponse.sales, items: parsedItems };
    dbResponse.clientName = strParseOut(dbResponse.clientName);
    dbResponse.clientNameDetails = strParseOut(dbResponse.clientNameDetails);

    return dbResponse;
  } catch (err) {
    throw new Error(`there was an error: ${err}`)
  }
};

async function getSaleFormData (clientId: string, saleId: string) {
  const [ dbResponse ] = await clientsCollection.aggregate<SaleFormData>(getClientDataProjection(clientId, saleId, {
    _id: 0,
    saleDate: 1,
    items: 1,
    clientName: 1,
    clientNameDetails: 1,
  }));

  if (!dbResponse) throw new NotFoundError(`El cliente o la venta no existe.`);

  const parsedItems = dbResponse.items.map(item => ({ ...item, name: strParseOut(item.name) }));

  dbResponse.items = parsedItems, 
  dbResponse.clientName = strParseOut(dbResponse.clientName) 
  dbResponse.clientNameDetails = strParseOut(dbResponse.clientNameDetails) 

  return dbResponse;
};

async function getSaleDataForPayment (clientId: string, saleId: string) {
  const [ dbResponse ] = await clientsCollection.aggregate<SaleDataForPaymentForm>(getClientDataProjection(clientId, saleId, {
    _id: 0,
    saleDate: 1,
    clientName: 1,
    unpaidAmount: 1,
    clientNameDetails: 1,
  }));

  if (dbResponse) {
    dbResponse.clientName = strParseOut(dbResponse.clientName);
    dbResponse.clientNameDetails = strParseOut(dbResponse.clientNameDetails) 
    return dbResponse;
  } else {
    throw new NotFoundError('El cliente o la venta no existe.')
  };
};

async function deleteSale (clientId: string, saleId: string) {
  const query = { _id: new ObjectId(clientId) };

  const update = [
    {
      $set: {
        sales: {
          $filter: {
            input: '$sales',
            cond: {
              $ne: [ '$$this._id', new ObjectId(saleId) ]
            }
          }
        }
      }
    }, 
    {
      $set: {
        clientSalesValue: { $sum: '$sales.saleValue' },
        currentDebt: { $sum: '$sales.unpaidAmount' },
      }
    }
  ];

  const options = { new: true };

  try {
    const dbResponse = await clientsCollection.findOneAndUpdate(query, update, options);
    if (dbResponse) {
      return saleId
    } else {
      throw new NotFoundError(`No se pudo eliminar la venta, el cliente no existe.`)
    };
  } catch (err) {
    throw new Error(`there was an error: ${err}`)
  }
}; 

export {
  postSale,
  patchSale,
  deleteSale,
  getOneSale,
  getSaleFormData,
  getSaleDataForPayment,
}
