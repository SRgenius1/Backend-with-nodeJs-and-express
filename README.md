# Backend-with-nodeJs-and-express
App with Nodejs and express, using routers, restful API

## BY JUAN DAVID REYES

# First HTTP server and express installation

The way to install Express is as follows and we do it with NPM

```jsx
npm i express
```

In order to start a server with Express, the first thing we need is to make a constant requiring Express like this

```jsx
const express = require('express');
```

After that we add use to Express and declare the port we want it to run on

```jsx
const app = express();
const port = 300;
```

After that we are going to send a response using get and sending it the route, then we pass it a callback and that callback has 2 parameters the request and the response

```jsx
app.get('/', (req, res) => {
res.send('Hello world!');
});
```

After that we pass the port to listen in this case we use again express and the listen function and we pass the port, as a second parameter we pass a callback.

```jsx
app.listen(port, () => {
console.log('Hello');
});
```

To run or start the server we execute our development environment, then we open in our browser in the path that we passed before and that's it!

# Routing with Express.js

The concept of routing is about having several addresses in our site, so we will use the template that we had before, and we will make changes in the route, we do this by getting the app again, so we can create many endpoints or routes.

```jsx
app.get('/new-route', (req, res) => {
res.send('Hello I'm a new route');
});
```

We can also change the get method for another method for example json and this will open a json viewer tab to specifically see json files

```jsx
app.get('/new-route', (req, res) => {
res.json({
name: 'product',
price: 220,
});
});
```

# What is a RESTful API?

It is a convention that we have in the backend for web services that usually communicate through the HTTP protocol, it defines how we can change or modify certain information, we have methods such as

-GET

Get is to obtain information or request information, for example to return the elements of a database and also to filter

- PUT

Put works on modifications, the id that we want to modify is sent

-POST

Post is to make the creation, create our products or whatever we want

- DELETE

Delete is to delete information

# GET: receive parameters

Normally when we have an endpoint and the id

```jsx
api.example.com/taks/{id}/
```

A good practice would be for endpoints to be plural.

For this we continue using the Express get method

```jsx
app.get('/products:id', (req, res) => {
const {id} = req.params;
res.json({
go,
name: 'product1',
price: 220,
});
});
```

# GET: query parameter

They are query parameters that usually come inside the get

```jsx
api.example.com/products
api.exmapple.com/products?page=1
api.example.com/products?limit=10&soffset=0
```

In this way we change a little the way of using the callback that comes in get, we will no longer use params yes no query and we also have new properties that are limit and offset.

```jsx
app.get('/users', (req,res) => {
  const {limit, offset} = req.query;
if (limit && offset) {
res.json({
limit,
offset,
});
} else {
res.send('no parameters');
};
});
```

We can see this in the browser as follows

```jsx
http://localhost:3000/users?limit=10&offset=200
```

Resulting

```jsx
{
  "limit": "10",
  "offset": "200"
}
```

# Separation of responsibilities

Each piece of code should have a unique responsibility, so we started giving specific files for specific things.

To start the file splitting by its utilities we have to call the Express router like this

```jsx
const router = express.Router();
```

In this way we no longer use the Express app if we do not

```jsx
router.get();
```

In addition to that we must remove the names of the routes, after this we have to export and we do it like this

```jsx
module.exports = router;
```

After this we create an index.js and there we can start organizing the processes and as a first step we are going to export in the way that ECMAscript 6 provides us in the following way

 

```jsx
const productsRoter = require('./products.js');
```

Then we will create a function in which we are going to build all the endpoints we do it like this

```jsx
function routersApi(app) {
  app.use('/products', productsRoter);
};
```

Once we have these processes, we must do that with all the endpoints that we are going to have in our application.

```jsx
function routersApi(app) {
  app.use('/products', productsRoter);
app.use('/users', productsUser);
  //......
};
```

# POST: method to create

It is the method for reading and creating things.

We return to our application and we start with a problem and that is that the routes are repeated and for that we can create a mother route as follows

```jsx
const router = express.Router();
  app.use('/api/v1', router);
```

the way you use
mos POST on the following

```jsx
router.post('/', (req, res) => {
  
});
```

The requests usually come in an attribute called body and there we receive all the parameters we do it like this.

```jsx
router.post('/', (req, res) => {
  const body = req.body;
  res.json({
    message: 'Create',
    date:body,
  });
});
```

# PUT, PATCH AND DELETE

 The characteristics that we are going to handle will be to delete and edit, for which we will no longer use POST but PATCH and we do it like this

```jsx
router.patch('/', (req, res) => {
  const {id} = req.params;
  const body = req.body;
  res.json({
    message: 'Create',
    date:body,
    go,
  });
});
```

To use delete we do it like this, we have to send it an identifier so that it knows what to delete.

```jsx
router.delete('/', (req, res) => {
  const {id} = req.params;
  const body = req.body;
  res.json({
    message: 'Deleted',
    date:body,
    go,
  });
});
```

# HTTP response status codes

For this it is very simple we just need to do the following

```jsx
res.status(201)
```

# Introduction to services

As a differentiator we use the .service.js extension and for this we have to use the class syntax in our code.

```jsx
class ProductService {
  create() {

  };

  find() {

  };

  findOne() {

  };

  update() {

  };

  delete() {

  };
};
```

we do something similar to this since we need to have all the features of the product.

# What are Middleware?

Middleware is software that enables one or more types of communication or connectivity between two or more applications or application components in a distributed network. By making it easy to connect applications that weren't designed to connect to each other, and by providing functionality to intelligently connect them, middleware streamlines application development and speeds time to market.

## Structure

```jsx
function (req, res, next) {
if (something){
res.send('end');
} else {
next();
}
}
```

We can continue sending next's to continue granting Middlewares.

## Use cases

- They work like pipes
- Validate data
- Catch bugs
- Validate permissions
- Control access

# Middleware for HttpErrors

It is necessary that the 4 parameters have the error, req, res, next, the Middlewares have to be done after doing the routing, we also have to take into account the order in which we make the declarations.

# Error handling with Boom

Boom allows us to handle errors respecting the status code

```jsx
throw boom.conflict('Product is block');
```

# Data validation with joi

It is a library to make validation schemes, we have many properties to make a validation, such as access tokens or passwords and others.

 There are several ways to name them, one of them is

```jsx
shema.js | dto.js
```

to use joi we do it like the libraries we used before.

We always start by seeing what type of field it is, we do it like this

```jsx
const id = joi.string();
```

These are some example validations that we can generate with joi

```jsx
const id = joi.string().uuid();
const name = joi.string().alphanum().min(3).max(15);
const price = joi.number().integer().min(10);
```

After this we will create a schema for the creation

```jsx
const createProductSchema = joi.object({
  name: name.required(),
});
```

Then we start passing the attributes and enclosing them in an object, after that we start determining which ones are required and which ones are optional.

We can also create update objects like this

```jsx
const updateProductSchema = joi.object({
  name: name,
  price: price,
});
```

## But.. How can we validate them?

First we have to send the joi and we can have the same format as a middleware has.

For this we need to configure a middleware that is dynamic

```jsx
const boom = require('@hapi/boom');

function validatorHandler (schema, property) {
  return (req, res, next) => {
    const data = req[property];
    const {error} = schema.validate(data);
    if (error) {
      next(boom.badRequest(error));
    };
    next();
  };
};
```

We have something like this and we need to have the right functions and this is where we handle validations with joi.

## Thank you for viewing this Repo, a hug!

Follow me on [Instagram](https://www.instagram.com/dev_juan22/)
Follow me on [Facebook](https://www.facebook.com/juandavid.reyesbedoya.7)
Follow me on [Youtube](https://www.youtube.com/channel/UCacHqx898rhli-vmmjSmkWw)

