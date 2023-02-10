# Frontend.
* add edition and deletion buttons.
* add sass to the project so I can use variables and implement the color change for the tabs in the sale page.
* When the user post/patch a payment he should be sent to the sale detail page with the payments tab selected and the posted/patched payment highlighted for less than a second, for this the server will send the payment id as a response.
* When user deletes an item in `new-sale-page.vue` the next item index will be subtracted by 1 and therefore if there was an error in the deleted element that error now will be in place of the next element [].
* Right now when the client or the sale doesn't exist node only throws an error but I need to integrate this error to a popup message in the frontend to prevent server crash.
* Signup flow is not working correctly. After signup the user should be signed in but what happens is the user is lead to the signin page, the signin fields are filled with the signup data the user just entered before, and also those fields have validation errors, so this is the reason why Vue is taking the user to the /signin page, because the signin failed, but why? These errors doesn't go away even if I rewrite the signin data, the only way to signin is to clean the cache + cookie for that page.
* implement searching, for this I think I will need to load the client-list into the vuex store, so the search is accessible in every page.
* When I resize the viewport horizontally and then refresh the page (F5) sometimes a verticall scroll appears along with the vertical scroll from the `tbody`, in these cases the `table offset top` is 78 pixels lesser than what it usually is (222 vs 144) and 78 happen to be the navigation bar height, so it seems that sometimes the `navigation.vue` component takes a little bit more to load than the `client-page.vue` component and I assume the same is going to happen fo the other pages.
* it would be cool to implement a real-time calculation of the total sale value as the user adds products to the form.

* date picker should be bigger and not trigger the screen keyboard in mobile.
* 'enter' button on mobile should send the forms.
* add custom font.
* if there is more than 3 products in a sale then in the client page every sale should display only 3 of them.

# Backend.
* Right now the watcher for `clients` re-calculates the sum of `clientSalesValue` and `currentDebt` fields for every update operation performed, but ideally this re-calculation should occur only if the updated data is related to money in some sense, e.g. an update on the sale date shoudn't trigger this re-calculation.
* `postPayment` model function: When the `saleId` doesn't match in query this model function returns `undefined`, and although the controller receives this `undefined` value the json response is an empty object and not an object with `paymentId` property set to undefined which is the expected result in this case.
* Implement order for responses.
* `clientName` and `clientNameDetails` in the patch sale endpoint are not needed anymore.
* handle duplicate emails.
* There is a problem with Math.floor in the payment generation for the guest user, need to investigate further.

## Server side validation []
* `amount` shoudn't be greater than the saleValue []
* `unpaidAmount` in `sales` sub-document shouldn't be lesser than 0 []
* `currentDebt` field in `clients` document shoudn't be lesser than 0 []
* `receivables` field in `users` document shouldn't be lesser than 0 []
* `paymentDate` field in `payments` sub document should be the same date as the `saleDate` in `sales` or a date before that []
* ObjectId to be a valid string [].

# Ideas. 
* When adding a new payment there should be two options: payment for a product and partial payment.
