import { Request, Response, NextFunction } from "express";
import { postSale, patchSale, deleteSale } from "../../models/sales/sales.model";
import { Sale } from "../../types/sale.types";
import { qsToBool } from "../../utils/utility-functions";
import { DeleteQuery } from "../../types/global.types";
import { checkCommonErrors } from "../../errors/utils";

type HttpSubPostSaleParams = { clientid: string; }
type HttpSubPatchSaleParams = HttpSubPostSaleParams & { saleid: string };
type HttpSubDeleteSaleParams = HttpSubPatchSaleParams;


async function httpSubPostSale (req: Request<HttpSubPostSaleParams, any, Sale>, res: Response, next: NextFunction) {
  const { params: { clientid }, body } = req;
  try {
    const saleId = await postSale(clientid, body);   
    return res.status(201).json({ saleId })
  } catch (err) {
    checkCommonErrors(err as Error, next);
    throw new Error(`there was an error: ${err}`)
  }
};

async function httpSubPatchSale (req: Request<HttpSubPatchSaleParams, any, Sale, DeleteQuery>, res: Response, next: NextFunction) {
  const { params: { clientid, saleid }, body } = req;
  if (req.query.delete && qsToBool(req.query.delete)) return next();
  try {
    const saleId = await patchSale(clientid, saleid, body);   
    return res.status(200).json({ saleId })
  } catch (err) {
    checkCommonErrors(err as Error, next);
    throw new Error(`there was an error: ${err}`)
  }
};

async function httpSubDeleteSale (req: Request<HttpSubDeleteSaleParams>, res: Response, next: NextFunction) {
  const { clientid, saleid } = req.params;   
  try {
    const saleData = await deleteSale(clientid, saleid);
    return res.status(200).json({ saleData })
  } catch (err) {
    checkCommonErrors(err as Error, next);
    throw new Error(`there was an error: ${err}`)
  }
};

export {
  httpSubPostSale,
  httpSubPatchSale,
  httpSubDeleteSale,
  HttpSubPatchSaleParams,
}
