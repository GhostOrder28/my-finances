function isSalePostReqBody(saleReqBody) {
    return saleReqBody.payments !== undefined;
}
;
function isSaleFormResBody(saleResBody) {
    return saleResBody.items !== undefined;
}
;
function isClientAndSaleResBody(saleResBody) {
    return saleResBody.contactPhone !== undefined;
}
;
export { isSalePostReqBody, isSaleFormResBody, isClientAndSaleResBody, };
