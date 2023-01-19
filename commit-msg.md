# backend
* new error type ValidationError was added to the error handler.
* The model function 'signin' from auth.model.ts now returns only the data that is concern with identification.
* strParseIn and strParseOut functions were added in 'utility-functions.ts' to sanitize user input and database response.
* the 'lib' options in tsconfig.json was set to 'es2021' instead of 'es6' so I can use the new 'replaceAll' method in the sanitizers.
* input and output data was sanitized in postClient, patchClient and getClients in clients.model.ts.
* the 'nameDetails' field in clients.schema.ts was renamed to 'clientNameDetails'.
* the 'verifyCallback' in local.passport.ts now only query the user by the _id and not by password.
* in auth.controller.ts a try catch block was added in 'httpSignup' and 'httpSignin', also 'httpSignin' now filters out the password from the 'signin' function returned value before sending it to the client.
* Joi package was added to handle validation.
* validation added for 'httpPostClient' and 'httpPatchClient' in clients.controller.ts.
* new type 'ClientListItem' was added in client.types.ts to type the client list response from 'httpGetClients' in 'client-list-page.vue' component in client.
* the global Error type was extended to include the property 'errorDetails'.
* 

# frontend
* new 'auth-page.vue' was added to handle user signup and signin.
* vuex was added to handle user signin data.
* vuex-persist was added to persist the store in local storage.
* mutations 'setUserId', 'setUsername', 'setEmail' and 'resetState' were added to the store.
* actions 'signinUser', 'signupUser' and 'signoutUser' were added to the store.
* axios was added to handle http requests through an instance.
* 'getReferenceHeight' utility function is now typed.
* a functional signout button was added in 'navigation.vue'.
* started to migration from css to scss.
* a new 'types' directory was added to handle types specific to the client.
* in 'popup-button.vue' now an anchor tag or a button tag is conditionally renderes depending on the prop passed.
* 'popup-button.vue' was typed, types were added as needed.
* 'client-list-page.vue' was typed, types were added as needed.
* a new form field 'initialPayment' was added to the 'new-sale-page.vue' component.
* A watcher was added in 'new-sale-page.vue' to track the 'initialPayment' value and update 'payments' accordingly.
* 'hasHistory' was replaced by 'webHistory' in 'router/index.ts', also all routes now are named.
* new routes '/clients', '/signup' and '/signin' were added.
* route guard added to protect user authorized routes.
* a new path alias '#backend/*' was added in 'tsconfig.json' and 'vue.config.js' to make it easier to access the types from the server.
* the output directory for the generated build files from VueCli was customized to 'server/public' in 'vue.config.js'.
* 

* 
* /clients route added.
* route protection [].

