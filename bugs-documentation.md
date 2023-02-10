# Backend.

## TypeError [ERR_INVALID_ARG_TYPE]: The "listener" argument must be of type function. Received undefined.
This error indicates that the callback passed to the `on` Method is returning undefined:
```
clientsCollection.watch([], { fullDocument: 'updateLookup' }).on('change', < listener callback >)
```
Strangely enough the fix is to include the function (the listener) right inside the `on` statement and not as an imported function.

## Weird response when an empty url param is sent with the request from the client.

I'm building a Vue + Node app, I already generated the build files using VueCli and served them from my Node server, but Node also is in charge of my api so I ended up with this code in Node:

This is my api endpoint:
```lang-js
// ... more get and post endpoints here
app.get('/test/:someid', (req: Request, res: Response) => {
  console.log('test endpoint reached!')
  return res.status(200).json(`successful request with id ${req.params.someid}!`)
})
```

And then at the end of the express middleware 'chain', just before the error handler, I have a wilcard endpoint to handle the request to my app routes:

```lang-js
app.get('/*', function (_, res: Response) { 
  res.sendFile(path.join(__dirname, "../public/index.html"));
});
```

So for the test endpoint to work I have to perform a request like this:

```lang-js
const res = await axios.get('<host>/test/15');
```

This should log `test endpoint reached!` in the console and return the response: `successful request with id 15` 

But what happens if I make a request to `<host>/test/` instead? Well the request is successfull and a code 200 response is sent from the server but the response carries this payload:

```lang-js
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width,initial-scale=1">
	<link rel="icon" href="/favicon.ico">
	<title>my-finances</title>
	<script defer="defer" src="/js/chunk-vendors.6d0b224b.js"></script>
	<script defer="defer" src="/js/app.b87ff979.js"></script>
	<link href="/css/chunk-vendors.de32ab32.css" rel="stylesheet">
	<link href="/css/app.00946236.css" rel="stylesheet">
</head>

<body>
	<noscript><strong>We're sorry but <name of your project> doesn't work properly without JavaScript enabled. Please enable it to continue.</strong></noscript>
	<div id="app"></div>
	<div id="portal"></div>
</body>

</html>
```
`name of your project` comes from the `name` field in the `package.json` file of my Vue app.

This not only happens when I make the request from the browser but also on postman. 

### But why this happens?
At the start I was so confused because the response was not an error but a successful one, however the log inside the `/test/:someid` endpoint was not being printed on the console, but (through a lot of troubleshooting) I decided to comment out the wildcard enpoint and to my surprise the html message above was still being sent, so thanks to this I realized what the true issue was.
This html template error was being sent because the `/test/` endpoint is of course not the same as `/test/:someid` or to be more precise `/test/15` express differentiate between them so the `/test/:someid` endpoint was not the one that was being called but the wildcard one which precisely returns that html template.

So I'm almost at the end of the mistery, the question that remains is why in this case the 'raw' so to speak html template is returned? Because in fact that html template is returned **everytime** I make a request to a path that doesn't belong to any endpoint of my api, that is when I visit a (a vue route) fo my app (because that actions is in fact a get request to the server).

And the answer that I dare to give is that that html template actually is always returned but I usually never store that response in a variable and log it, I usually make that request from the browser url bar.

That file is not an error is actually the container for the whole Vue app, is just that in this case (the axios get request) I wasn't rendering the response in the viewport, which is what happens when I request a route from the browser url bar itself, what I was doing in fact was storing the raw template and logging it (as plain text), and this is why this was a successful response with this 'weird' html template.

## Typing serializeUser and deserializeUser from passportjs.

I'm implementing a basic local authentication flow with passportjs and cookie-session middlewares in my node server.

TLDR:

Inside `verifyCallback` I query the database for the user data and in response I receive an object like this:

```lang-ts
{
  _id: '...',
  email: '...',
  password: '...',
  //some other props
}
```

I want to send only `_id` to the cookie session but for `req.user` I want to send the entire object. In javascript this is not an issue but adding typescript and complying with the type definitions make this task more complicated because:

```lang-ts
//serializeUser type:
serializeUser<TID>(fn: (user: Express.User, done: (err: any, id?: TID) => void) => void): void;

//deserializeUser type:
deserializeUser<TID>(fn: (id: TID, done: (err: any, user?: Express.User | false | null) => void) => void): void;

//req.user type:
Express.user
```

`serializeUser`, `deserializeUser` and `req.user` share the same type when it comes to the user data and it cannot be customized through generics.

----

My auth flow is as follows:

1. user sends the signin data to the server `/signin` endpoint, which has this shape:
```lang-ts
{
  email: string;
  password: string;
}
```
2. this is the express route that will handle that endpoint:
```lang-ts
authRouter.post('/signin', passport.authenticate('local'), httpSignin);
```
This means:

3. the `verifyCallback` will be triggered by `passport.authenticate('local')`.
4. inside `verifyCallback` I make a query to the database to check for the existence of the user and then compare the passwords, finally I call the done callback passing only the `_id` property I've got from the database response.
```lang-ts
async function verifyCallback (username: string, password: string, done: DoneCallback, next: NextFunction) {
  const res = await findOne({ username: req.body.username });
  // check if user exists
  // check password hashes
  const userData = { _id: res._id }
  return done(null, userData);
}
```
5. `req.user` will then be populated with `userData`.
6. `userData` will be also passed to the `serializeUser` function.
7. the `httpSignin` controller function will be called and it will respond to the client with also the `userData` from `req.user`.
```lang-ts
function httpSignin (req: Request<any, any, UserCredentials>, res: Response, next: NextFunction) {
  res.status(200).json({ userData: req.user })
}
```

Now because I'm using typescript I understand (according to this question) that I have to extend the `Express.User` interface with the data I want to serialize into the session so passport can recognize it in serializeUser and deserializeUser functions. So I put this in `global.d.ts`:

```lang-js
declare namespace Express {
  export interface User {
    _id: string;
  }
}
```

Until here all is fine, but then here comes the issue. As I mentioned before at the end of this auth flow I will call my `httpSignin` controller and respond to the client with the user data which right now is an object that only contains the `_id` property, but what I really need is to respond to the client not only with the `_id` property but with the entire user data I received from the database (except of course the password) because I wan't to populate my Vuex store with that data in the client.

So since I'm making a query to the database in the `verifyCallback` function and thus getting the user data which then will be passsed to `req.user` I would like to take advantage of this data and send it in the response to the client, this way I don't have to make a second query to the database in `httpSignin` to get the very same data that I already got in the `verifyCallback`.

However to do this I will have to pass the entire user data object which I received from the database to the `done(null, userData)` callback inside `verifyCallback`, this means that I will have to extend `Express.User` not just with the `_id` property (which is the only one I want to assign to the cookie) but with the entire user data object and this in turn will force me (at least if I want to respect the type definitions) to serialize the entire user object too which needless to say is a bad idea because the cookie doesn't need all that information.

----

Right now I'm just avoiding to extend `Express.User` and casting or assigning the types manually:

```lang-ts
passport.serializeUser((userData, done) => {
  done(null, (userData as User)._id.toString());
});
passport.deserializeUser<string>((userId, done) => {
  done(null, userId); 
});

function httpSignin (req: Request<any, any, UserCredentials>, res: Response, next: NextFunction) {
  const { password, ...userData } = req.user as User;
  res.status(200).json({ userData: req.user })
}
```

But I would like to avoid type casting if possible.

## XML Parsing Error: syntax error when sending a request with a body with empty properties to the server.

When I send a request like this:

```lang-js
{
  "username": "",
  "password": ""
}
```

I receive get this error in firefox:

```
XML Parsing Error: syntax error
Location: https://localhost:3001/auth/signin
Line Number 1, Column 1:
```

I stop getting this error if I remove the `passport.authenticate('local')` middleware in the router.

### Solution.

Passportjs cannot receive empty fields (username and password) so the solution is to validate the user input before calling the `passport.authenticate('local')` middleware.

# Frontend.

## Vuex store is not update at the moment route.beforeEach checks it.
The login flow starts when the user clicks the login button and `handleSubmit` mehotd is called, it is as follows:
1. `signinUser` action is dispatched from the store.
  1. A request to the `/signin` endpoint is made.
  2. Commit the received response data to `username` and `email` fields in  the store accordingly.
2. Push the `/clients` route into the route history, that is redirect the user to `/clients` page.
3. Step 2 triggers the `beforeEach` router method.
  1. Check if the route the user is being redirected to is neither `/signin` nor `/signup`.
    1. case true: check if `email` prop have a length > 0, that is if it is not empty.
      1. case true: let the user continue to the desired route.
      2. case false: redirect the user to `/signin` page.
    2. case false: let the user continue to the desired route.

The issue was that at the moment `beforeEach` was triggered the vuex store was not updated yet, this is because actions are asynchronous.

### Solution.

Await for the dispatched actions in `handleSubmit`, and also because of that make it an async function too.

## Axios interceptors only work in the root route.
I have a basic login handled with passportjs and cookie-session for cookies, after the user is logged in I set a cookie with the user id which is then serialized and sent to the frontend along with the response.

After that for every request the user makes to my api I first check if that user (identified by that cookie) is logged in using the `req.isAuthenticated` method from passportjs. If there is no cookie or it has been tampered then I throw an error that is handled by express which in turn sends a 401 response to the client.

On the client side I have axios interceptors ready to handle that 401 response:

```lang-js
http.interceptors.response.use(
  function (response) {
    console.log('successful request!');
    return response; 
  },
  function (error) {
    console.log('there was an error trying to request that enpoint!');
    console.log(error);
    if (error.response.data.authorizationError) return store.dispatch('resetState');
    return Promise.reject(error);
  }
)
```

However for some reason this interceptor only works if the client made the request to the server from the root `https://localhost:3001/` route, if the client make a request from any other route e.g. `https://localhost:3001/clients` the interceptor is not called at all.

I think the reason is that once the `checkLoggedIn` middleware fails to check the login it throws an Error, consecuently express omit all the next middlewares and one of those middlewares is the wildcard one which is the one that handles all the routes from the app, and this is why the client only gets a message as a response, that is the json formatted message that the servr is sending, it is not sending `index.js`. This however doesn't explain why express is sending `index.js` correctly when the request in made from the root route.

## Passportjs isAuthenticated method returns false in chrome.
### Solution.
Set `sameSite` options to none in `cookieSessionOptions`:
```lang-js
const cookieSessionOptions = {
  sameSite: 'none'
}
```

## Deployment.
I've been working on a vue-cli + node project using typescript in both of them and now I want to deploy it, so I generated the build files with the help of vue-cli and served them with my node server, until here all was good, my node server serves the static files generated by vue-cli just fine and I can navigate my app without issues. But I was running my server always with nodemon, now that I want to deploy it I know I first need to check if my server runs fine with the `node` command instead of `nodemon`.

And so here comes the issues, when I run `node <path to my server.ts file>` command I get the following error:

```
TypeError [ERR_UNKNOWN_FILE_EXTENSION]: Unknown file extension ".ts" for <path to my server.ts file>
    at new NodeError (node:internal/errors:371:5)
    at Object.file: (node:internal/modules/esm/get_format:72:15)
    at defaultGetFormat (node:internal/modules/esm/get_format:85:38)
    at defaultLoad (node:internal/modules/esm/load:13:42)
    at ESMLoader.load (node:internal/modules/esm/loader:303:26)
    at ESMLoader.moduleProvider (node:internal/modules/esm/loader:230:58)
    at new ModuleJob (node:internal/modules/esm/module_job:63:26)
    at ESMLoader.getModuleJob (node:internal/modules/esm/loader:244:11)
    at async Promise.all (index 0)
    at async ESMLoader.import (node:internal/modules/esm/loader:281:24) {
  code: 'ERR_UNKNOWN_FILE_EXTENSION'
}
```

Looking for solutions I came across to this other command: `ts-node --esm <path to my server.ts file>`, but then I get this error:

```
<project root path>/server/node_modules/ts-node/src/index.ts:859
    return new TSError(diagnosticText, diagnosticCodes, diagnostics);
           ^
TSError: ⨯ Unable to compile TypeScript:
src/services/mongo.ts:1:22 - error TS2792: Cannot find module 'mongoose'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?

1 import mongoose from "mongoose";
                       ~~~~~~~~~~
src/services/mongo.ts:9:34 - error TS7006: Parameter 'err' implicitly has an 'any' type.

9 mongoose.connection.on('error', (err) => {
                                   ~~~

    at createTSError (<project root path>/server/node_modules/ts-node/src/index.ts:859:12)
    at reportTSError (<project root path>/server/node_modules/ts-node/src/index.ts:863:19)
    at getOutput (<project root path>/server/node_modules/ts-node/src/index.ts:1077:36)
    at Object.compile (<project root path>/server/node_modules/ts-node/src/index.ts:1433:41)
    at transformSource (<project root path>/server/node_modules/ts-node/src/esm.ts:400:37)
    at <project root path>/server/node_modules/ts-node/src/esm.ts:278:53
    at async addShortCircuitFlag (<project root path>/server/node_modules/ts-node/src/esm.ts:409:15)
    at async ESMLoader.load (node:internal/modules/esm/loader:303:20)
    at async ESMLoader.moduleProvider (node:internal/modules/esm/loader:230:47) {
  diagnosticCodes: [ 2792, 7006 ]
}
```

I don't think this error is directly realted to mongoose itself because as I mentioned when I run my server through nodemon all works fine.

So again, looking for a fix I found that I had to add `"moduleResolution": "node"` options under `compilerOptions` in my tsconfig.json file, unfortunately after this change I get this error instead of the last one (running `ts-node --esm <path to my server.ts file>`):

```
<absolute path to my project root>/server/node_modules/ts-node/dist-raw/node-internal-modules-esm-resolve.js:366
    throw new ERR_MODULE_NOT_FOUND(
          ^
CustomError: Cannot find module '<project root path>/server/src/passport/local.passport' imported from <project root path>/server/src/app.ts
    at finalizeResolution (<project root path>/server/node_modules/ts-node/dist-raw/node-internal-modules-esm-resolve.js:366:11)
    at moduleResolve (<project root path>/server/node_modules/ts-node/dist-raw/node-internal-modules-esm-resolve.js:801:10)
    at Object.defaultResolve (<project root path>/server/node_modules/ts-node/dist-raw/node-internal-modules-esm-resolve.js:912:11)
    at <project root path>/server/node_modules/ts-node/src/esm.ts:218:35
    at entrypointFallback (<project root path>/server/node_modules/ts-node/src/esm.ts:168:34)
    at <project root path>/server/node_modules/ts-node/src/esm.ts:217:14
    at addShortCircuitFlag (<project root path>/server/node_modules/ts-node/src/esm.ts:409:21)
    at resolve (<project root path>/server/node_modules/ts-node/src/esm.ts:197:12)
    at resolve (<project root path>/server/node_modules/ts-node/src/child/child-loader.ts:15:39)
    at ESMLoader.resolve (node:internal/modules/esm/loader:422:30)
```

I know that nodemon was calling ts-node under the hood because I was getting the type errors while developing my app just fine, but now that I have to run the `node` command itself I'm stuck on this errors.

This is my **ts-config.json**:

```lang-json
{
  "compilerOptions": {
    "target": "es2015",
    "module": "es2015",
    "moduleResolution": "node",
    "lib": ["es2021"],                     
    "allowJs": true,
    "rootDir": "src",
    "strict": true,         
    "noImplicitAny": true,
    "esModuleInterop": true,
    "resolveJsonModule": true
  },
  "typeRoots": [ "./src/types/global.d.ts" ]
}
```

And this is my **package.json** relevant part:

```lang-json
{
  "name": "server",
  "main": "index.js",
  "type": "module",
}
```

### Possible solution.

So, consulting [this node + typescript setup article again](https://khalilstemmler.com/blogs/typescript/node-starter-project/), I now know that you are not supposed to deploy the `.ts` files nor any thing typescript related. The reason was obvious (or well maybe not) typescript is relevant only in the developer environment.

#### Converting a typescript project to vanilla JS.
So the files for deployment should be the vanilla `.js` ones, but how can I convert all my project which is full of `.ts` files to vanila js?

Well, when you install the `typescript` module so you can leverage typescript in node it comes with a utility command called `tsc` (the typescript compiler) which will do that work for you, but before that you need to add `"outDir": "build"` options in `tsconfig.json` this will tell typescript where to put the build files (the vanilla javacript version of your project).

Until here I've been always generated build files for the frontend part of my projects(whether it was React or Vue) I knew that you are not supposed to use the frontend part as it is for deployment but you need to generate static files which then will be served through a server(in my case my node server). I've never generated any build files for the backend part, but that was because I never use typescript in Node before, now that I'm using it it is necessary to generate them because of course node itself doesn't understand the `.ts` files, typecript is after all a kind of post processor for javascript.

Finally, after you generate the build files your start script needs a little change, in my case it was `node src/server.ts` now it is `node build/server.js`, for more information consult the article I just linked before.

Now when I tried to start my server from the build directory I started getting `Cannot find module` errors, looking in the web I found that when you are developing a node + typescript project your imports should always specify the extension which should be `.js` and not `.ts`, typescript will resolve the imports properly, I found this info [here](https://gist.github.com/slavafomin/cd7a54035eff5dc1c7c2eff096b23b6b).

# Frontend.

## Vertical scroll appearing randomly in pages. 

### The issue.
When I resize the viewport horizontally and then refresh the page (F5) sometimes a verticall scroll appears along with the vertical scroll from the `tbody`.

### Debugging.

* In the cases when this scroll appears the `table offset top` is 78 pixels lesser than what it usually is (222 vs 144) and 78 happen to be the navigation bar height, so it seems that sometimes the `navigation.vue` component takes a little bit more to load than the `client-page.vue` component and I assume the same is going to happen fo the other pages.

## Cannot request to local server from android.

I'm developing a Vue-cli + Node (express) application, Vue-cli is running on port 8080 and my node server in port 3001, both on localhost.

When I test my app in my desktop it works just as expected, I can navigate the entire app without issues, the problem appears when I test it on android, for all request the frontend does to the backend I get this error whether using fetch or axios:

```
<whatever rest verb> https://localhost:3001/<whatever endpoint> net::ERR_CONNECTION_REFUSED 
```

My axios instance:

```lang-js
const http = axios.create({
  baseURL: 'https://localhost:3001',
  withCredentials: true
});
```

And this is the relevant node server configuration:

```lang-js
const corsOptions = {
  origin: 'https://<my local ip>:8080',
  credentials: true,
};
app.use(cors(corsOptions)); // <-- this is located before any other express middleware
```

I'm setting credentials in both part because I'm using passportjs and cookie-session to handle login, but this issue is present even in a simple GET request, also I already tried without setting credentials but the issue persists.

* Axios version 1.2.1
* cors middleware version 2.8.5

### Solution.

Change the `baseUrl` in `axios-instance.ts` from `localhost` to the local ip.

```lang-js
const http = axios.create({
  baseURL: 'https://<your local ip>:<your port>',
  withCredentials: true
});
```

## Browser is not saving the cookies sent by Node.
This was a headache but the main cause was that I wasn't handling the `AuthenticationError` throwed from the backend in the frontend flow properly. I registered my account as `test@test.com` but I was trying to logging as `Test@test.com`, this is why this issue only happened in mobile.

### The backend part of the flow.
1. User sends the authentication data to the `/auth/signin` endpoint.
2. The `passport.authenticate` middleware is called.
3. The verifyCallback is triggered and it checks first for the existence of the username in the database.
  1. If the username exists then it proceeds to compare the passwords with the hashed one.
  2. If the username doesn't exists an `AuthenticationError` is throwed, which is handled by express sending a 401 json response with a message.

### The frontend part o the flow.
4. On the frontend, the user start sending the authentication data through an async function called `handleSubmit`, inside this function:
  1. The `signinUser` action is dispatched inside a try/catch block which in turn perform a post request to the server.
    1. If the request succeed then the response data (_id, username and email) is commited to the store state.
    2. If the request fails then I get the authenticationError or validationError from the 401 response and commit the corresponding message to the vuex store.
  2. A new route is pushed to the history.

So as we can see the backend is doing its part just fine and the frontend too, or is it? Well not exactly, the `signinUser` action is catching its own errors just fine, but it is not telling that there is an error to `handleSubmit` and therefore after `signinUser` execution is completed `handleSubmit` continues to the next line which is the `router.$push` one, and this is the root of the issue.

When I was trying to log in with `Test@test.com` the `verifyCallback` throws an `AuthenticationError` that is handled correctly by `signinUser` but not by `handleSubmit`, this is confusing enough but troubleshooting was a headache because I wans't considering the differente between `Test` and `test`, as I mentioned this is why this issue appeared always in my android phone, oh and I have to add one more piece to this case, and it is the weird behaviour from the browsers even on desktop, because sometimes the user data was correct and still the cookie wasn't set, this last issue disappeared when I started to clean the cache before trying to login again.

So tu sum up, the causes were:
* Forgetting about the default capitalization in mobile devices.
* Incomplete error handling on the frontend part, `signinUser` was doing its job but `handleSubmit` not.
* Not cleaning the browser cache (only for the url of my project) before testing the login again and again.

## Guest user requests doesn't pass the checkLoggedIn check.
To troubleshoot this I decided to test the auth flow from the user input until the signin call only, this was a bad idea because this way the user never signs out.

#### Testing signin, without pushing new route (this was a bad idea).
1. User sends the auth data for the first time.
2. Passport checks if there is a cookie, if there is then it deserialize it and set the resulting value to `req.user`.
3. The `httpSignin` controller is called and because `req.user` is not set it just call the validators.
4. The `passport.authenticate` middleware is fired.
  1. Checks for the existence of the user, if the user doesn't exist it throws an `AuthenticationError`
  2. Compare passwords with bcrypt (this step is omitted if the user is a guest).
  3. Call the `done` callback passing the user data it got from step 1.1.
  4. `req.user` now is set and contains the user data just passed in the last step.
  5. The `httpSignin` controller is called a second time and because `req.user` is set it responds to the client with that data (removing the password first).
5. The `serializeUser` method is called and it serializes the user `_id` which is inside `req.user`.
* If a user signs in but doesn't signs out then the cookie for this first user is never cleared, therefore if a second user tries to sign in this is going to create a confusion because the cookie for the first user is going to be send along with the sign in request for the second user and because of this passport will detect the cookie and deserialize it, consecuently `req.user` is never undefined so the first time `httpSignin` is called (step 3) it will inmediatly take the `req.user` value (which is the deserialized cookie, that is the user `_id`) and perform step 4.5. This will result in a really weird response.

#### Request for clients is being called before the siginin one (the real issue).
* This happens only for the guest user.
* The solution was to simply await for the dispatch call, but then why is that the dispatch call from the `signupUser` action never cause this 'race condition'?
