import { Request, Response, NextFunction } from "express";
import { HttpSubPatchSaleParams } from "../sales/sales.controller";
import { postPayment, patchPayment, deletePayment } from "../../models/payments/payments.model";
import { qsToBool } from "../../utils/utility-functions";
import { Payment } from "../../types/payment.types";
import { DeleteQuery } from "../../types/global.types";
import { checkCommonErrors } from "../../errors/utils";

type HttpSubPostPaymentParams = HttpSubPatchSaleParams;
type HttpSubPatchPaymentParams = HttpSubPatchSaleParams & { paymentid: string };
type HttpSubDeletePaymentParams = HttpSubPatchPaymentParams;

async function httpSubPostPayment (req: Request<HttpSubPostPaymentParams, any, Payment>, res: Response, next: NextFunction) {
  const { params: { clientid, saleid }, body } = req;
  try {
    const paymentId = await postPayment(clientid, saleid, body);
    return res.status(200).json({ paymentId });
  } catch (err) {
    checkCommonErrors(err as Error, next);
    throw new Error(`there was an error: ${err}`)
  }
};

async function httpSubPatchPayment (req: Request<HttpSubPatchPaymentParams, any, Payment, DeleteQuery>, res: Response, next: NextFunction) {
  if (req.query.delete && qsToBool(req.query.delete)) return next();
  const { params: { saleid, paymentid, clientid }, body } = req;
  try {
    const paymentId = await patchPayment(clientid, saleid, paymentid, body);
    return res.status(200).json({ paymentId });
  } catch (err) {
    checkCommonErrors(err as Error, next);
    throw new Error(`there was an error: ${err}`)
  }
};

async function httpSubDeletePayment (req: Request<HttpSubDeletePaymentParams, any, any>, res: Response, next: NextFunction) {
  const { clientid, saleid, paymentid } = req.params;
  try {
    const paymentId = await deletePayment(clientid, saleid, paymentid);
    return res.status(200).json({ paymentId });
  } catch (err) {
    checkCommonErrors(err as Error, next);
    throw new Error(`there was an error: ${err}`)
  }
};

export {
  httpSubPostPayment,
  httpSubPatchPayment,
  httpSubDeletePayment,
}
