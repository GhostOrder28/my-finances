import { NotFoundError } from "../../errors/db-errors.js";
import { ValidationError } from "../../errors/server-errors.js";
import { postSaleValidator, patchSaleValidator } from "../../joi/sales.validators.js";
import { getValidationErrorMessages, groupValidationErrors, qsToBool } from "../../utils/utility-functions.js";
import { postSale, patchSale, deleteSale, getOneSale, getSaleFormData, getSaleDataForPayment } from "../../models/sales/sales.model.js";
async function httpSubPostSale(req, res, next) {
    try {
        const { params: { clientid }, body } = req;
        const { error } = postSaleValidator.validate(body, { abortEarly: false });
        console.log('errors', error);
        if (error) {
            const groupedErrors = groupValidationErrors(error);
            const itemErrors = getValidationErrorMessages(groupedErrors.itemErrors, true);
            const nonItemErrors = getValidationErrorMessages(groupedErrors.nonItemErrors);
            throw new ValidationError('there is a validation error', { ...itemErrors, ...nonItemErrors });
        }
        const saleId = await postSale(clientid, body);
        console.log('saleId', saleId);
        return res.status(201).json({ saleId });
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
async function httpSubPatchSale(req, res, next) {
    try {
        const { params: { clientid, saleid }, body } = req;
        if (req.query.delete && qsToBool(req.query.delete))
            return next();
        const { error } = patchSaleValidator.validate(body, { abortEarly: false });
        console.log('errors', error);
        if (error) {
            const groupedErrors = groupValidationErrors(error);
            const itemErrors = getValidationErrorMessages(groupedErrors.itemErrors, true);
            const nonItemErrors = getValidationErrorMessages(groupedErrors.nonItemErrors);
            throw new ValidationError('there is a validation error', { ...itemErrors, ...nonItemErrors });
        }
        const saleId = await patchSale(clientid, saleid, body);
        return res.status(200).json({ saleId });
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
async function httpSubGetOneSale(req, res, next) {
    try {
        console.log('params', req.params);
        const { params: { clientid, saleid }, query } = req;
        let saleData;
        if (query.filter === 'saleform') {
            console.log('AAA');
            saleData = await getSaleFormData(clientid, saleid);
        }
        else if (query.filter === 'paymentform') {
            saleData = await getSaleDataForPayment(clientid, saleid);
        }
        else {
            saleData = await getOneSale(clientid, saleid);
        }
        ;
        console.log('saleData: ', saleData);
        return res.status(200).json({ saleData });
    }
    catch (err) {
        if (err instanceof NotFoundError)
            return next(err);
        throw new Error(`there was an error: ${err}`);
    }
}
;
async function httpSubDeleteSale(req, res, next) {
    const { clientid, saleid } = req.params;
    try {
        const saleData = await deleteSale(clientid, saleid);
        return res.status(200).json({ saleData });
    }
    catch (err) {
        if (err instanceof NotFoundError)
            return next(err);
        throw new Error(`there was an error: ${err}`);
    }
}
;
export { httpSubPostSale, httpSubPatchSale, httpSubDeleteSale, httpSubGetOneSale, };
