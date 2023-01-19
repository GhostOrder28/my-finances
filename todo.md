<style type="text/css">
body {
  max-width: 1800px;
  margin-left: auto;
  margin-right: auto;
}
</style>

# Frontend.
* add edition and deletion buttons.
* add sass to the project so I can use variables and implement the color change for the tabs in the sale page.
* When the user post/patch a payment he should be sent to the sale detail page with the payments tab selected and the posted/patched payment highlighted for less than a second, for this the server will send the payment id as a response.
* Protected routes [x].
* Reset vuex store on logout [x].
* Don't allow the client to navigate to `/signin` or `/signup` if the user data is set in the vuex store [x].
* Handle 401 Unauthorized error with axios [].

## Api integration.

| Page        | Create | Read | Update | Delete |
|-------------|--------|------|--------|--------|
| /clients    | x      | x    | -      |        |
| /client/:id | -      |      | x      |        |
| /sale/:id   |        |      |        |        |
| /newclient  |        |      |        |        |
| /newsale    |        |      |        |        |
| /newpayment |        |      |        |        |

# Backend.
* Right now the watcher for `clients` re-calculates the sum of `clientSalesValue` and `currentDebt` fields for every update operation performed, but ideally this re-calculation should occur only if the updated data is realted to money in some sense, e.g. an update on the sale date shoudn't trigger this re-calculation.
* postPayment model function: When the `saleId` doesn't match in query this model function returns `undefined`, and although the controller receives this `undefined` value the json response is an empty object and not an object with `paymentId` property set to undefined which is the expected result in this case.
* Right now all the user data is being serialized but only the user id should be serialized.

## Endpoints.

### Auth

| Verb | Endpoint      | Model | Controller | Router |
|------|---------------|-------|------------|--------|
| POST | /auth/signin  | x     | x          | x      |
| POST | /auth/signup  | x     | x          | x      |
| GET  | /auth/signout | -     | x          | x      |

### Clients

| Verb   | Endpoint                       | Model | Controller | Router |
|--------|--------------------------------|-------|------------|--------|
| GET    | /clients/:userid               | x     | x          | x      |
| GET    | /clients/:clientid?single=true | x     | x          | x      |
| POST   | /clients/:userid               | x     | x          | x      |
| PATCH  | /clients/:clientid             | x     | x          | x      |
| DELETE | /clients/:clientid             | x     | x          | x      |

#### Watchers

| Operation | Affected fields in user                | Implemented |
|-----------|----------------------------------------|-------------|
| UPDATE    | currentDebt, clientSalesValue, debtors | x           |
| DELETE    | currentDebt, clientSalesValue, debtors | x           |

### Sales (sub-document)

| Verb  | Endpoint                                                  | Model | Controller | Router |
|-------|-----------------------------------------------------------|-------|------------|--------|
| PATCH | /clients/:clientid/sales (sub post)                       | x     | x          | x      |
| PATCH | /clients/:clientid/sales/:saleid (sub patch)              | x     | x          | x      |
| PATCH | /clients/:clientid/sales/:saleid?delete=true (sub delete) | x     | x          | x      |

### Payments (sub-document)

| Verb  | Endpoint                                                                      | Model | Controller | Router |
|-------|-------------------------------------------------------------------------------|-------|------------|--------|
| PATCH | /clients/:clientid/sales/:saleid/payments (sub post)                          | x     | x          | x      |
| PATCH | /clients/:clientid/sales/:saleid/payments/:paymentid (sub put)                | x     | x          | x      |
| PATCH | /clients/:clientid/sales/:saleid/payments/:paymentid?delete=true (sub delete) | x     | x          | x      |

## Server side validation []
* Number shoudn't be lesser than 0.
  * `unpaidAmount` in `sales` sub-document shouldn't be lesser than 0 []
  * `currentDebt` field in `clients` document shoudn't be lesser than 0 []
  * `receivables` field in `users` document shouldn't be lesser than 0 []

| Model    | Validation | Sanitization |
|----------|------------|--------------|
| users    |            |              |
| clients  | x          | x            |
| sales    |            |              |
| payments |            |              |

## Error handling []

| Model    | NotFoundError | ValidationError |
|----------|---------------|-----------------|
| payments | x             |                 |
| sales    | x             |                 |
| clients  | x             | x               |
| users    | x             |                 |
| global   |               |                 |

* DuplicateEntityError in `signup` model function for users collection [x].
* AuthorizationError [x].
* AuthenticationError [x].

## Server proper responses and not just the entire document [x]

# Ideas. 
* Instead of allowing the user to change the client name in the sale edition page, it would be better to implement a button to explictly `assign this sale to a different client`, from the backend perspective performing the neccesary queries to accomplish this is much easier than performing a client name search and getting the id for assign it to the clientId field in the sale document.
* When adding a new payment there should be two options: payment for a product and partial payment.
