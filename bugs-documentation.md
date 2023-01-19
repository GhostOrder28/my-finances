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
