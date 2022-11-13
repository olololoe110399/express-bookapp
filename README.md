# BookApp

BookApp is web application creates an online catalog for a small local library, where users can browse available books and manage their accounts.

- Example "Local Library" website written in in Node/Express.
- ✨Using Material Design✨

## Features

- User Authentication and Authorization
- Manage Author
- Manage Genre
- Manage Book
- Manage Book Instance

## Tech

BookApp uses a number of open source projects to work properly:

- [HanldeBars] - HTML enhanced for web apps!
- [MongoDB] - is the world's most popular NoSQL database.
- [node.js] - evented I/O for the backend
- [Express] - fast node.js network app framework [@duynn100198]

And of course Book App itself is open source with a [public repository][git-repo-url]
on GitHub.

## Installation

BookApp requires [Node.js](https://nodejs.org/) v10+ to run.

Config enviroment variable:

```sh
cd express-bookapp
cp .env.example .env
```

- copy .env.example to .env
- setup values for - DB_URL, SECRET_KEY

Install the dependencies and devDependencies and start the server:

```sh
yarn
yarn run:dev
```

- visit url <http://localhost:3000/admin>

## Development

### Structure

├───── bin
├─────config
│     ├───── base.config.js
│     ├───── db.config.js
│     ├───── ...
├───── controler
│     ├───── admin.controller.js
│     ├───── ...
├───── logs
│     ├───── all.log
│     ├───── error.log
├───── middleware
│     ├───── engine.middleware.js
│     ├───── error.middleware.js
│     ├───── globalVars.middleware.js
│     ├───── index.middleware.js
│     ├───── morgan.middleware.js
│     ├───── notFound.middleware.js
│     ├───── passport.middleware.js
│     ├───── ...
├───── models
│     ├───── user.model.js
│     ├───── ...
├───── public
│     ├───── css
│     ├───── images
│     ├───── js
│     ├───── scss
├───── routes
│     ├───── admin.router.js
│     ├───── index.router.js
│     ├───── ...
├───── service
│     ├───── admin.service.js
│     ├───── ...
├───── test
│     ├───── ...
├───── utils
│     ├───── hbs.helper.js
│     ├───── logger.js
│     ├───── valifation.helper.js
│     ├───── ...
├───── views
│     ├───── layouts
│     │     ├─────── main.hbs
│     │     ├─────── ...
│     ├───── partials
│     │     ├─────── footer.hbs
│     │     ├─────── messages.hbs
│     │     ├─────── ...
│     ├───── dashboard.hbs
│     ├───── ...
├───── .env
├───── app.js
├───── package.json
├───── populatedb.js
├───── yarn.lock

#### Script generate database

- This script populates some test books, authors, genres and bookinstances to your database. Specified database as argument - e.g.: populatedb mongodb://localhost/test-db

```sh
node populatedb mongodb://localhost/test-db
```

#### ES6 vs CommonJS

```js
CommonJS;

const express = require('express');
const app = express();
```

```js
ES6;

import express from 'express';
const app = express();
```

- file extension .mjs

```js
package.json

"type":"module"
```

#### Nodemon and Basic Express Server

```sh
yarn add nodemon --save-dev
```

```js
package.json

"dev": "nodemon ./bin/www",
"run:dev": "DEBUG=bookapp:* yarn dev"
```

#### Not Found Middleware

- in the root **middleware** folder
- notFound.middleware.js
- next createHttpError 404 when route does not exist

#### Error Middleware

- in the root **middleware** folder
- error.middleware.js
- accept 4 parameters, first one error
- log error
- render("admin/sign_in") if status is 401
- render("404") if status is 404
- render("500") if env is production or render("error") if env is development
- eventually handle Mongoose Errors, just like in the node-express
- showcase with async errors

#### ENV Variables

```sh
yarn add dotenv
```

- import dotenv from 'dotenv'
- dotenv.config()

- create .env
- PORT=4000
- .gitignore
- /node_modules
- .env

#### Connect to MongoDB

- switched back to PORT=5000
- remove Error from '/'

- existing MongoDB Atlas Account

```sh
yarn add mongoose
```

#### Ex Model

- **models** folder
- Example.js
- setup schema
- test
- test {type:String}

#### Validate Example

```js
validate:{
  validator:(field)=> {return 2 > 1},
  message:'Please provide valid email'
  }
```

- [Validator Package](https://www.npmjs.com/package/validator)

```sh
yarn add validator
```

#### Pass Error to Error Handler

- next(error)

#### Cors Error

[Cors Error](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)

- two fixes (cors package and proxy)

#### Cors Package

[cors package](https://www.npmjs.com/package/cors)

```sh
yarn add cors
```

```js
import cors from 'cors';

app.use(cors());
```

#### Morgan Package

- http logger middleware for node.js
- [morgan docs](https://www.npmjs.com/package/morgan)

```sh
yarn add morgan winston
```

```js
import middleware from './middleware';

app.use(middleware.morganSetup());

```

#### Compare Password

```sh
yarn add bcryptjs
```

```js
user.model.js in models;

UserSchema.methods.comparePassword = function (candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

UserSchema.pre("save", function (next) {
  let user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified("password")) return next();

  // generate a salt
  bcrypt.genSalt(config.numberOfroundsSalt, function (err, salt) {
    if (err) return next(err);

    // hash the password using our new salt
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);
      // override the cleartext password with the hashed one
      user.password = hash;
      next();
    });
  });
});
```

## License

MIT

**Free Software, Hell Yeah!**

   [git-repo-url]: <https://github.com/olololoe110399/express-bookapp.git>
   [MongoDB]: <https://www.mongodb.com/>
   [HanldeBars]: <https://handlebarsjs.com/>
   [node.js]: <http://nodejs.org>
   [@duynn100198]: <http://twitter.com/duynn100198>
   [express]: <http://expressjs.com>
