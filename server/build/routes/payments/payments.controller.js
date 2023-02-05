import { NotFoundError } from "../../errors/db-errors.js";
import { qsToBool } from "../../utils/utility-functions.js";
import { ValidationError } from "../../errors/server-errors.js";
import { paymentValidator } from "../../joi/payment.validators.js";
import { getValidationErrorMessages } from "../../utils/utility-functions.js";
import { postPayment, patchPayment, getOnePayment, deletePayment } from "../../models/payments/payments.model.js";
async function httpSubPostPayment(req, res, next) {
    try {
        const { params: { clientid, saleid }, body } = req;
        console.log('req body', body);
        const { error } = paymentValidator.validate(body, { abortEarly: false });
        if (error)
            throw new ValidationError('there was an error validating the input', getValidationErrorMessages(error.details));
        const paymentId = await postPayment(clientid, saleid, body);
        return res.status(200).json({ paymentId });
    }
    catch (err) {
        if (err instanceof NotFoundError)
            return next(err);
        if (err instanceof ValidationError)
            return next(err);
        throw new Error(`there was an error: ${err}`);
    }
}
;
async function httpSubPatchPayment(req, res, next) {
    if (req.query.delete && qsToBool(req.query.delete))
        return next();
    try {
        const { params: { saleid, paymentid, clientid }, body } = req;
        const paymentId = await patchPayment(clientid, saleid, paymentid, body);
        const { error } = paymentValidator.validate(body, { abortEarly: false });
        if (error)
            throw new ValidationError('there was an error validating the input', getValidationErrorMessages(error.details));
        return res.status(200).json({ paymentId });
    }
    catch (err) {
        if (err instanceof NotFoundError)
            return next(err);
        if (err instanceof ValidationError)
            return next(err);
        throw new Error(`there was an error: ${err}`);
    }
}
;
async function httpSubGetOnePayment(req, res, next) {
    try {
        const { clientid, saleid, paymentid } = req.params;
        console.log('AAAA');
        const paymentData = await getOnePayment(clientid, saleid, paymentid);
        return res.status(200).json({ paymentData });
    }
    catch (err) {
        if (err instanceof NotFoundError)
            return next(err);
        if (err instanceof ValidationError)
            return next(err);
        throw new Error(`there was an error: ${err}`);
    }
}
;
async function httpSubDeletePayment(req, res, next) {
    const { clientid, saleid, paymentid } = req.params;
    try {
        console.log('params', req.params);
        const affectedSaleFields = await deletePayment(clientid, saleid, paymentid);
        return res.status(200).json({ affectedSaleFields });
    }
    catch (err) {
        if (err instanceof NotFoundError)
            return next(err);
        if (err instanceof ValidationError)
            return next(err);
        throw new Error(`there was an error: ${err}`);
    }
}
;
export { httpSubPostPayment, httpSubPatchPayment, httpSubGetOnePayment, httpSubDeletePayment, };
