import { Request, Response, NextFunction } from "express";
import { HttpSubPatchSaleParams } from "../sales/sales.controller";
import { postPayment, patchPayment, deletePayment } from "../../models/payments/payments.model";
import { qsToBool } from "../../utils/utility-functions";
import { Payment } from "../../types/payment.types";
import { DeleteQuery } from "../../types/global.types";

type HttpSubPostPaymentParams = HttpSubPatchSaleParams;
type HttpSubPatchPaymentParams = HttpSubPatchSaleParams & { paymentid: string };
type HttpSubDeletePaymentParams = HttpSubPatchPaymentParams;

async function httpSubPostPayment (req: Request<HttpSubPostPaymentParams, any, Payment>, res: Response) {
  const { params: { clientid, saleid }, body } = req;

  const paymentId = await postPayment(clientid, saleid, body);
  return res.status(200).json({ paymentId });
};

async function httpSubPatchPayment (req: Request<HttpSubPatchPaymentParams, any, Payment, DeleteQuery>, res: Response, next: NextFunction) {
  if (req.query.delete && qsToBool(req.query.delete)) return next();
  const { params: { saleid, paymentid, clientid }, body } = req;

  const paymentId = await patchPayment(clientid, saleid, paymentid, body);
  return res.status(200).json({ paymentId });
};

async function httpSubDeletePayment (req: Request<HttpSubDeletePaymentParams, any, any>, res: Response) {
  const { clientid, saleid, paymentid } = req.params;

  const paymentId = await deletePayment(clientid, saleid, paymentid);
  return res.status(200).json({ paymentId });
};

export {
  httpSubPostPayment,
  httpSubPatchPayment,
  httpSubDeletePayment,
}
