import mongoose from "mongoose";
import clientsCollection from "../clients/clients.schema";
import { SaleRequestBody, Item, Payment } from "../../types/sale.types";
import { NotFoundError } from "../../errors/db-errors";

const { Types: { ObjectId } } = mongoose;

function getTotalSaleValue (items: Item[]) {
  const totalValue = items.reduce((acc, curr) => {
    return acc + (curr.price * curr.quantity);
  }, 0);   
  return totalValue;
};

function getPaidAmount (payments: Payment[]) {
  const paidAmount = payments.reduce((acc, curr) => {
    return acc + curr.amount;
  }, 0);
  return paidAmount;
};

async function postSale (clientId: string,  body: SaleRequestBody) {
  const saleValue = getTotalSaleValue(body.items);
  body.payments[0]._id = new ObjectId();

  const initialPayment = body.payments?.length ? body.payments[0].amount : 0;
  const unpaidAmount = saleValue - initialPayment;

  const query = { _id: new ObjectId(clientId) };

  const update = [ 
    { 
      $set: { 
        sales: {
          $concatArrays: [ '$sales', [ {
            ...body,
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

  const options = { new: true };

  const payload = await clientsCollection.findOneAndUpdate(query, update, options);   

  if (payload) {
    return payload.sales.slice(-1)[0]._id;
  } else {
    if (payload === null) throw new NotFoundError(`No se pudo registrar la venta, el cliente no existe.`)
  };

};

async function patchSale (clientId: string, saleId: string, body: Omit<SaleRequestBody, 'payments'>) {
  const saleValue = getTotalSaleValue(body.items);
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
                  ...body,
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
}
