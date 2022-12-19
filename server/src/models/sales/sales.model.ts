import { Model } from "mongoose";
import salesSchema from "./sales.schema";
import { SaleRequestBody } from "../../types/sale.types";

async function postSale (userId: string, clientId: string, body: SaleRequestBody) {
  const { initialPayment, ...remainingProps } = body;
  body = remainingProps;
  const saleData = new salesSchema({
    userId,
    clientId,
    ...body,
    paidAmount: initialPayment || 0,
  });   
  const saleDataSaved = await saleData.save();
  console.log(saleDataSaved);
};

export {
  postSale,
}
