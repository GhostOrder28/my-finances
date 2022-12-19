import { Request, Response } from "express";
import { postSale } from "../../models/sales/sales.model";
import { SaleRequestBody } from "../../types/sale.types";

type Params = {
  userid: string;
  clientid: string;
}

async function httpPostSale (req: Request<Params, any, SaleRequestBody>, res: Response) {
  const { userid, clientid } = req.params;
  const sale = await postSale(userid, clientid, req.body);   
};

export {
  httpPostSale,
}
