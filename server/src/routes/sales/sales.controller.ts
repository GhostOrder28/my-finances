import { Request, Response, NextFunction } from "express";
import { postSale, patchSale, deleteSale } from "../../models/sales/sales.model";
import { Sale } from "../../types/sale.types";
import { qsToBool } from "../../utils/utility-functions";
import { DeleteQuery } from "../../types/global.types";

type HttpSubPostSaleParams = { clientid: string; }
type HttpSubPatchSaleParams = HttpSubPostSaleParams & { saleid: string };
type HttpSubDeleteSaleParams = HttpSubPatchSaleParams;


async function httpSubPostSale (req: Request<HttpSubPostSaleParams, any, Sale>, res: Response, next: NextFunction) {
  // if (req.params.clientid === 'payments') return next(); // if clientid is 'payments' then this is not the correct controller
  const { params: { clientid }, body } = req;

  const saleId = await postSale(clientid, body);   
  return res.status(201).json({ saleId })
};

async function httpSubPatchSale (req: Request<HttpSubPatchSaleParams, any, Sale, DeleteQuery>, res: Response, next: NextFunction) {
  const { params: { clientid, saleid }, body } = req;
  if (req.query.delete && qsToBool(req.query.delete)) return next();
  if (req.params.clientid === 'payments') return next(); // if clientid is 'payments' then this is not the correct controller

  const saleId = await patchSale(clientid, saleid, body);   
  return res.status(200).json({ saleId })
};

async function httpSubDeleteSale (req: Request<HttpSubDeleteSaleParams>, res: Response, next: NextFunction) {
  if (req.params.saleid === 'payments') return next() // if saleid is 'payments' then this is not the correct controller
  const { clientid, saleid } = req.params;   

  const saleData = await deleteSale(clientid, saleid);
  return res.status(200).json({ saleData })
};


// async function httpDeleteItem (req: Request<Params, any, {}>, res: Response) {
//   const { saleid, itemid } = req.params;
//   const updatedSale = await deleteItem(saleid, itemid);
// };

export {
  httpSubPostSale,
  httpSubPatchSale,
  httpSubDeleteSale,
  HttpSubPatchSaleParams,
}
