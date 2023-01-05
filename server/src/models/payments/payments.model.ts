import mongoose from "mongoose";
import clientsSchema from "../clients/clients.schema";
import { Payment } from "../../types/sale.types";
import { ClientDocumentResponse } from "../../types/client.types";
import { NotFoundError } from '../../errors/db-errors';

const { Types: { ObjectId } } = mongoose;

function calculatePaidAmount (saleId: string) {
  return {
    $set: {
      sales: {
        $map: {
          input: '$sales',
          in: {
            $cond: [
              { $eq: [ '$$this._id', new ObjectId(saleId) ] },
              {
                $mergeObjects: [ 
                  '$$this', 
                  { paidAmount: { $sum: '$$this.payments.amount' } } 
                ]
              },
              '$$this'
            ]
          }
        }
      }
    }
  }
};

function calculateUnpaidAmount (saleId: string ) {
  return {
    $set: {
      sales: {
        $map: {
          input: '$sales',
          in: {
            $cond: [
              { $eq: [ '$$this._id', new ObjectId(saleId) ] },
              {
                $mergeObjects: [
                  '$$this',
                  { unpaidAmount: { $subtract: [ '$$this.saleValue', '$$this.paidAmount' ] } }
                ]
              },
              '$$this'
            ]
          }
        }
      }
    }
  }
};

function calculateCurrentDebt () {
  return {
    $set: {
      currentDebt: { $sum: '$sales.unpaidAmount' }
    }
  }   
};

function getPaymentId (saleId: string, dbResponse: ClientDocumentResponse) {
  const sale = dbResponse?.sales.find(s => s._id.toString() === saleId);
  const newPaymentId = sale?.payments?.slice(-1)[0]._id;
  return newPaymentId;
};

async function postPayment (clientId: string, saleId: string, body: Omit<Payment, '_id'>) {
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
                {
                  $mergeObjects: [ 
                    '$$this', 
                    { 
                      payments: {
                        $concatArrays: [ '$$this.payments', [ { _id: new ObjectId(), ...body } ] ]
                      }
                    } 
                  ]
                },
                '$$this'
              ]
            }
          }
        },
      }
    },
    calculatePaidAmount(saleId),
    calculateUnpaidAmount(saleId),
    calculateCurrentDebt()
  ];
  const options = { new: true };

  try {
    const dbResponse = await clientsSchema.findOneAndUpdate(query, update, options);   
    if (dbResponse) {
      return getPaymentId(saleId, dbResponse);
    } else {
      throw new NotFoundError(`document not found >> dbResponse value: ${dbResponse}`);
    };
  } catch (err) {
    throw new Error(`there was an error: ${err}`)
  }
};

async function patchPayment (clientId: string, saleId: string, paymentId: string, body: Payment) {
  body._id = new ObjectId(body._id);
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
                {
                  $mergeObjects: [
                    '$$this',
                    {
                      payments: {
                        $map: {
                          input: '$$this.payments',
                          in : {
                            $cond: [
                              { $eq: [ '$$this._id', new ObjectId(paymentId) ] },
                              body,
                              '$$this'
                            ]
                          }
                        }
                      }
                    }
                  ]
                },
                '$$this'
              ]
            }
          }
        }
      }
    },
    calculatePaidAmount(saleId),
    calculateUnpaidAmount(saleId),
    calculateCurrentDebt()
  ];
  const options = { new: true };


  try {
    const dbResponse = await clientsSchema.findOneAndUpdate(query, update, options);   
    if (dbResponse) {
      return paymentId;
    } else {
      throw new NotFoundError(`document not found >> dbResponse value: ${dbResponse}`);
    };
  } catch (err) {
    throw new Error(`there was an error: ${err}`)
  }
};

async function deletePayment (clientId: string, saleId: string, paymentId: string) {

  const query = { _id: new Object(clientId) };
  const update = [
    { 
      $set: {
        sales: {
          $map: {
            input: '$sales',
            in: {
              $cond: [
                { $eq: [ '$$this._id', new ObjectId(saleId) ] },
                { 
                  $mergeObjects: [
                    '$$this',
                    {
                      payments: {
                        $filter: {
                          input: '$$this.payments',
                          cond: { $ne: [ '$$this._id', new ObjectId(paymentId) ] }
                        }
                      }
                    }
                  ]
                },
                '$$this'
              ]
            }
          }
        }
      },
    },
    calculatePaidAmount(saleId),
    calculateUnpaidAmount(saleId),
    calculateCurrentDebt()
  ];
  const options = { new: true };

  
  try {
    const dbResponse = await clientsSchema.findOneAndUpdate(query, update, options);
    if (dbResponse) {
      return paymentId;
    } else {
      throw new NotFoundError(`document not found >> dbResponse value: ${dbResponse}`);
    };
  } catch (err) {
    throw new Error(`there was an error: ${err}`)
  }
};

export {
  postPayment,
  patchPayment,
  deletePayment,
}
