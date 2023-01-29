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
