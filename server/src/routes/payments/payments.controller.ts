import { Request, Response, NextFunction } from "express";
import { HttpSubPatchSaleParams } from "../sales/sales.controller";
import { postPayment, patchPayment, getOnePayment, deletePayment } from "../../models/payments/payments.model";
import { qsToBool } from "../../utils/utility-functions";
import { PaymentPatchReqBody, PaymentPostReqBody } from "../../types/payment.types";
import { DeleteQuery } from "../../types/global.types";
import { NotFoundError } from "../../errors/db-errors";
import { ValidationError } from "../../errors/server-errors";
import { paymentValidator } from '../../joi/payment.validators';
import { getValidationErrorMessages } from '../../utils/utility-functions';

type HttpSubPostPaymentParams = HttpSubPatchSaleParams;
type HttpSubPatchPaymentParams = HttpSubPatchSaleParams & { paymentid: string };
type HttpSubDeletePaymentParams = HttpSubPatchPaymentParams;
type HttpHttpSubGetOnePayment = HttpSubPatchPaymentParams;

async function httpSubPostPayment (req: Request<HttpSubPostPaymentParams, any, PaymentPostReqBody>, res: Response, next: NextFunction) {
  try {
    const { params: { clientid, saleid }, body } = req;

    const { error } = paymentValidator.validate(body, { abortEarly: false });
    if (error) throw new ValidationError('there was an error validating the input', getValidationErrorMessages(error.details));

    const paymentId = await postPayment(clientid, saleid, body);
    return res.status(200).json({ paymentId });
  } catch (err) {
    if (err instanceof NotFoundError) return next(err);
    if (err instanceof ValidationError) return next(err);
    throw new Error(`there was an error: ${err}`)
  }
};

async function httpSubPatchPayment (req: Request<HttpSubPatchPaymentParams, any, PaymentPatchReqBody, DeleteQuery>, res: Response, next: NextFunction) {
  if (req.query.delete && qsToBool(req.query.delete)) return next();

  try {
    const { params: { saleid, paymentid, clientid }, body } = req;

    const paymentId = await patchPayment(clientid, saleid, paymentid, body);
    const { error } = paymentValidator.validate(body, { abortEarly: false });

    if (error) throw new ValidationError('there was an error validating the input', getValidationErrorMessages(error.details));
    return res.status(200).json({ paymentId });
  } catch (err) {
    if (err instanceof NotFoundError) return next(err);
    if (err instanceof ValidationError) return next(err);
    throw new Error(`there was an error: ${err}`)
  }
};

async function httpSubGetOnePayment (req: Request<HttpHttpSubGetOnePayment, any, any>, res: Response, next: NextFunction) {
  try {
    const { clientid, saleid, paymentid } = req.params;
    console.log('AAAA');
    const paymentData = await getOnePayment(clientid, saleid, paymentid);

    return res.status(200).json({ paymentData });
  } catch (err) {
    if (err instanceof NotFoundError) return next(err);
    if (err instanceof ValidationError) return next(err);
    throw new Error(`there was an error: ${err}`)
  }
};

async function httpSubDeletePayment (req: Request<HttpSubDeletePaymentParams, any, any>, res: Response, next: NextFunction) {
  const { clientid, saleid, paymentid } = req.params;
  try {
    const paymentId = await deletePayment(clientid, saleid, paymentid);
    return res.status(200).json({ paymentId });
  } catch (err) {
    if (err instanceof NotFoundError) return next(err);
    if (err instanceof ValidationError) return next(err);
    throw new Error(`there was an error: ${err}`)
  }
};

export {
  httpSubPostPayment,
  httpSubPatchPayment,
  httpSubGetOnePayment,
  httpSubDeletePayment,
}
