big update, validation added on the backend, api integration added on the client:

Backend
* the AuthorizationError handler now responds with index.js file to the client along with 401 code error.
* validation implemented for auth and sales routes.
* checkCommonErrors utility function was removed as it prevented to block the function so if checkCommonErrors runs then the generic thrower doesn't run.
* a couple of conditional utility types were added.
* a lot of new derived types to take into account subtle differences between request bodies and response ones.
* client/ types now are strictly concerning to vue components needs other types were moved to server/
* new get /clients/:clientid/sales/:saleid endpoint added, router, controller and model implemented accordingly.
* new get /clients/:clientid/sales/:saleid/payments endpoint added, router, controller and model implemented accordingly.
* saleFormDataAggregation helper function was renamed to getClientDataProjection as now it is more generic to be reusable.
* `date` field in `sale` sub-document was renamed to `saleDate`.
* some types were rename and fixed.

Frontend
* axios interceptor for 401 errors was improved, now it not only resets the store but also commit an error message and push a new route to the client, all this only for AuthorizationError.
* new-sale-page.vue was renamed to sale-form-page.vue.
* new-client-page.vue was renamed to client-form-page.vue.
* sale-form-page.vue component is completelly typed.
* sale-page.vue component was completelly typed.
* api was integrated almost completelly, only user info request in client-list-page.vue remains.
* pages were linked.
