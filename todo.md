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
* Handle 401 Unauthorized error with axios for AuthorizationError [x].
* Handle 401 Unauthorized error with axios for AuthenticationError [].
* When user deletes an item in `new-sale-page.vue` the next item index will be subtracted by 1 and therefore if there was an error in the deleted element that error now will be in place of the next element [].
* Right now when the client or the sale doesn't exist node only throws an error but I need to integrate this error to a popup message in the frontend to prevent server crash.
* Signup flow is not working correctly. After signup the user should be signed in but what happens is the user is lead to the signin page, the signin fields are filled with the signup data the user just entered before, and also those fields have validation errors, so this is the reason why Vue is taking the user to the /signin page, because the signin failed, but why? These errors doesn't go away even if I rewrite the signin data, the only way to signin is to clean the cache + cookie for that page.
* implement searching.
* When I resize the viewport horizontally and then refresh the page (F5) sometimes a verticall scroll appears along with the vertical scroll from the `tbody`, in these cases the `table offset top` is 78 pixels lesser than what it usually is (222 vs 144) and 78 happen to be the navigation bar height, so it seems that sometimes the `navigation.vue` component takes a little bit more to load than the `client-page.vue` component and I assume the same is going to happen fo the other pages.
* it would be cool to implement a real-time calculation of the total sale value as the user adds products to the form.

* implement validate message for payments
* date picker should be bigger and not trigger the screen keyboard in mobile.
* 'enter' button on mobile should send the forms.
* create the guest data.


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
* I need to implement a get `/clients/:clientid?filter=form` endpoint to be used in `client-form-page.vue`.
* when querying for a single sale data, the response is the client data plus the sale data inside a `sales` field, that field should be renamed to just `sale` the same when querying to a single payment data.
* implement order for responses.
* `clientName` and `clientNameDetails` in the patch sale endpoint are not needed anymore.

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
| GET   | /client/:clientid/sales/:saleid                           | x     | x          | x      |
| GET   | /client/:clientid/sales/:saleid?filter=form               |       |            |        |

### Payments (sub-document)

| Verb  | Endpoint                                                                      | Model | Controller | Router |
|-------|-------------------------------------------------------------------------------|-------|------------|--------|
| PATCH | /clients/:clientid/sales/:saleid/payments (sub post)                          | x     | x          | x      |
| PATCH | /clients/:clientid/sales/:saleid/payments/:paymentid (sub put)                | x     | x          | x      |
| PATCH | /clients/:clientid/sales/:saleid/payments/:paymentid?delete=true (sub delete) | x     | x          | x      |

## Server side validation []
* `amount` shoudn't be greater than the saleValue []
* `unpaidAmount` in `sales` sub-document shouldn't be lesser than 0 []
* `currentDebt` field in `clients` document shoudn't be lesser than 0 []
* `receivables` field in `users` document shouldn't be lesser than 0 []
* `paymentDate` field in `payments` sub document should be the same date as the `saleDate` in `sales` or a date before that []

| Model    | Validation | Sanitization |
|----------|------------|--------------|
| users    | x          | -            |
| clients  | x          | x            |
| sales    | x          | x            |
| payments |            |              |

* ObjectId to be a valid string [].

## Error handling []

| Model    | NotFoundError | ValidationError |
|----------|---------------|-----------------|
| payments | x             |                 |
| sales    | x             | x               |
| clients  | x             | x               |
| users    | -             | x               |
| global   |               |                 |

* DuplicateEntityError in `signup` model function for users collection [x].
* AuthorizationError [x].
* AuthenticationError [x].

## Server proper responses and not just the entire document [x]

# Ideas. 
* Instead of allowing the user to change the client name in the sale edition page, it would be better to implement a button to explictly `assign this sale to a different client`, from the backend perspective performing the neccesary queries to accomplish this is much easier than performing a client name search and getting the id for assign it to the clientId field in the sale document.
* When adding a new payment there should be two options: payment for a product and partial payment.
