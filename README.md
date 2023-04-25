# Beehive Monitor Web Application

This full stack web application (MERN Stack), was built to service a Santa Clara University Senior Design engineering project.

The frontend is built with React and Redux, and the backend is built with Express and Node, with a MongoDB database. The frontend heavily utilizes Google's Material UI for styling and design. The backend utilizes Mongoose for database modeling and management.

# Basic Information

## Installation

In the main directory, run `npm install` to install backend dependencies. In the `frontend` directory, run `npm install` to install frontend dependencies. Be sure to install Express and Node on your development machines.

## Configuration

Use the template `.env` file to setup necessary configurations such as the MongoDB URI, JWT secret, Google Maps Locations API, and port.

## Usage

In the main director, run the frontend and backend with

```bash
npm run dev
```

Run the backend only with

```bash
npm run server
```

Run the frontend only with

```bash
npm run client
```

The frontend will run on port 3000, and the backend will run on port 5000., by default.

Using the Web Application is simple. The user will be greeted with a login page. If the user has an account, they can login with their credentials. If the user does not have an account, they can register for one. Once logged in, the user will be greeted with a dashboard. The dashboard will display the user's beehives, and the user can use the dropdown to select an apiary and subsequent beehive device to view more information about that specific hive. The user can also add, delete, and update apiaries, each of which is a small organization that contains its own set of devices (hives) that can be added, deleted, and updated. Users may also be added to apiaries to help manage them; members of apiaries can be granted different privileges, with the creator of the apiary having full control of the apiary and its hives. The user can also view the FAQ page, which will display frequently asked questions about the application, as well as the about page, which will display information about the application and its creators. The user can also logout of the application.

# Backend

## Overview

The backend is neatly organized into individual modules, each of which is responsible for a specific set of tasks.

## Config

The `config` module is responsible for setting up the MongoDB connection using Mongoose and the ATLAS URI provided by the MongoDB database.

## Middleware

The `middleware` module is responsible for setting up the middleware for the application.

### `auth.middleware.js`

This is a middleware function that adds authentication to a Node.js/Express application. The `protect` function checks for a valid JSON Web Token (JWT) in the `Authorization` header of incoming HTTP requests. If a valid token is found, the function decodes the token and sets the authenticated user in the request object. If a valid token is not found, the function returns a 401 Unauthorized response.

#### **Usage**

The `protect` function can be used as a middleware function in any Express route that requires authentication. Here's an example of how to use the `protect` middleware function in an Express route:

```javascript
const express = require("express");
const protect = require("../middleware/protect");

const router = express.Router();

router.get("/", protect, (req, res) => {
  res.json({ user: req.user });
});
```

In this example, the `protect` middleware function is used as the second argument in the `router.get()` method. This means that the `protect` function will be called before the route handler function. If the JWT is valid and the user is found, the `req.user` property will be set to the user object without the password field, and the route handler function will be called. If the JWT is not valid or not provided, a 401 Unauthorized response will be returned.

#### **Function Definition**

The `protect` function takes three arguments: `req`, `res`, and `next`.

##### **`req`**

The `req` argument is the incoming HTTP request object.

##### **`res`**

The `res` argument is the outgoing HTTP response object.

##### **`next`**

The `next` argument is a function that passes control to the next middleware function in the request-response cycle.

#### **Function Flow**

The `protect` function follows this flow:

1. Check if the `Authorization` header exists and starts with the word "Bearer".

2. If the header exists and starts with "Bearer", try to verify the JWT.
3. If the JWT is valid, get the user ID from the token payload and find the user in the database.
4. If the user is found, set the `req.user` property to the user object without the password field, and call the `next()` function to pass control to the next middleware.
5. If the JWT is not valid, return a 401 Unauthorized response with an error message.
6. If the `Authorization` header does not exist or does not start with "Bearer", return a 401 Unauthorized response with an error message.

#### **Error Handling**

If the `protect` function encounters an error, it will throw an error and call the `next()` function with the error object as an argument. This will trigger Express's default error handling middleware, which will return an error response to the client.

<br>
<br>
<br>

### `errorHandler.middleware.js`

This is a middleware function that adds error handling to a Node.js/Express application. The `errorHandler` function catches any errors that occur in the application and sends an appropriate error response to the client.

#### Usage

The `errorHandler` function should be used as the last middleware function in the middleware stack of an Express application. Here's an example of how to use the `errorHandler` middleware function in an Express application:

```javascript
const express = require("express");
const errorHandler = require("../middleware/errorHandler");

const app = express();

// Set up middleware functions
app.use(express.json());
app.use(cors());

// Set up routes
app.get("/", (req, res) => {
  res.send("Hello, world!");
});

// Set up error handler middleware
app.use(errorHandler);

// Start server
app.listen(3000, () => {
  console.log("Server started on port 3000");
});
```

In this example, the `errorHandler` middleware function is added to the middleware stack using the `app.use()` method. This means that the `errorHandler` function will be called if any middleware or route handler functions before it throw an error. The `errorHandler` function sends an error response with the error message and stack trace (if in development mode) to the client.

#### **Function Definition**

The `errorHandler` function takes four arguments: `err`, `req`, `res`, and `next`.

##### **`err`**

The `err` argument is the error object that was thrown by a previous middleware or route handler function.

##### **`req`**

The `req` argument is the incoming HTTP request object.

##### **`res`**

The `res` argument is the outgoing HTTP response object.

##### **`next`**

The `next` argument is a function that passes control to the next middleware function in the request-response cycle.

#### **Function Flow**

The `errorHandler` function follows this flow:

1. Get the status code from the `res` object. If the status code is not set, default to 500 (Internal Server Error).
2. Set the HTTP status code of the response to the status code obtained in the previous step.
3. Send a JSON response to the client with the error message and stack trace (if in development mode).

#### **Error Handling**

The `errorHandler` function is itself an error handling middleware function, and its purpose is to catch errors thrown by previous middleware or route handler functions. If an error is thrown by a previous function, the `errorHandler` function will catch the error and send an appropriate error response to the client. The error message is sent as the `message` property of the JSON response, and the stack trace (if in development mode) is sent as the `stack` property of the JSON response.

# Models

The three models used in the application are the `User`, `Apiary`, and `Data` models.

## User Model

This is a schema definition for a user model in a Node.js/Express application using Mongoose. The user schema defines the structure and validation rules for user documents that will be stored in a MongoDB database.

### Schema Description

The user schema has three properties: `name`, `email`, and `password`.

| Field     | Type   | Example Value          | Description                                      |
| --------- | ------ | ---------------------- | ------------------------------------------------ |
| name      | String | "John Doe"             | The name of the user                             |
| email     | String | "johndoe@example.com"  | The email address of the user                    |
| password  | String | "$2a$10$V7X9I...jMx7"  | The password of the user                         |
| createdAt | Date   | "2023-04-25T12:34:56Z" | The timestamp for when the user was created      |
| updatedAt | Date   | "2023-04-25T12:34:56Z" | The timestamp for when the user was last updated |

The `name` field is of type String and is required, with a custom error message if it's not provided. This field stores the user's name.

The `email` field is of type String and is required and unique, with a custom error message if it's not provided or is already in use. This field stores the user's email address.

The `password` field is of type String and is required, with a custom error message if it's not provided. This field stores the user's password.

Note that the `createdAt` and `updatedAt` fields are of type `Date` and are automatically generated by Mongoose using the `timestamps` option set to `true` in the schema.

### Example Document

```js
{
  "_id": ObjectId("6153db097a880f72a2d6c853"),
  "name": "John Doe",
  "email": "johndoe@example.com",
  "password": "$2a$10$YSiN2VK/OdtZ5N5c5S5S5OAmQ2IyHz.gxCGKdDw.Ggchc20OaG1Ia",
  "createdAt": ISODate("2021-09-28T05:45:29.586Z"),
  "updatedAt": ISODate("2021-09-28T05:45:29.586Z")
}
```

Note that the password field is encrypted using bcrypt, so the value shown is just an example of an encrypted password hash. The actual value would be a long string of random characters.

## Data Model

This module defines the data schema for storing data in the MongoDB database. It consists of two sub-schemas: dataPointSchema and dataSchema.

### `dataPointSchema` Description

The `dataPointSchema` defines the schema for an individual data point. It consists of the following fields:

| Field                     | Type   | Example                                   | Description                                                              |
| ------------------------- | ------ | ----------------------------------------- | ------------------------------------------------------------------------ |
| time                      | Date   | 2022-04-26T12:00:00.000Z                  | The timestamp for the data point                                         |
| raw_activity              | Object | { x: 10, y: 20 }                          | The raw activity data point in (x, y) coordinates                        |
| weather                   | Object | { temp: 25, humidity: 80, windspeed: 10 } | The weather data at the time of data point                               |
| prediction_activity       | Object | { x: 12, y: 22 }                          | The predicted activity data point in (x, y) coordinates                  |
| last_prediction_deviation | Number | 2.5                                       | The deviation of the last prediction from the actual activity (optional) |

### `dataSchema` Description

The `dataSchema` defines the schema for a collection of data points. It consists of the following fields:

| Field      | Type                             | Example                   | Description                                           |
| ---------- | -------------------------------- | ------------------------- | ----------------------------------------------------- |
| apiary     | ObjectId (refers to Apiary)      | 6051902568f4a4dbd4f1c0e5  | The ID of the apiary associated with the data         |
| serial     | String (unique)                  | "XYZ123"                  | The unique serial number of the data logger           |
| datapoints | Array of dataPointSchema objects | [ { ... }, { ... }, ... ] | The array of data points collected by the data logger |

### Example document

```js
{
  "_id": ObjectId("60934c7a2a58581ed82b8d96"),
  "apiary": ObjectId("6051902568f4a4dbd4f1c0e5"),
  "serial": "XYZ123",
  "datapoints": [
    {
      "time": ISODate("2022-04-26T12:00:00.000Z"),
      "raw_activity": { "x": 10, "y": 20 },
      "weather": { "temp": 25, "humidity": 80, "windspeed": 10 },
      "prediction_activity": { "x": 12, "y": 22 },
      "last_prediction_deviation": 2.5
    },
    {
      "time": ISODate("2022-04-26T12:05:00.000Z"),
      "raw_activity": { "x": 11, "y": 21 },
      "weather": { "temp": 26, "humidity": 81, "windspeed": 11 },
      "prediction_activity": { "x": 13, "y": 23 },
      "last_prediction_deviation": 2.0
    }
  ],
  "createdAt": ISODate("2021-05-06T00:00:00.000Z"),
  "updatedAt": ISODate("2021-05-06T00:00:00.000Z")
}
```

## Routes

## Controllers

## Server

The `server` is responsible for setting up the server and connecting to the database. The server is also responsible for listening on the port specified in the `.env` file (not provided).

## Frontend

## Deployment (Jonathan)

Explain how to deploy the application, including any server requirements and deployment steps.

## Testing (TBD)

Testing has been manual. Outline how to test the application, including any testing frameworks or methodologies used.

## License

Property of Santa Clara University under SCU's Senior Design Program

## Acknowledgments

Special thanks to Kian Nizkad, Wendy Mather, and Gerhard and Lisa Eschelbeck for their continued support on this project's details and design direction.

## Appendix

Include any additional information or resources, such as troubleshooting tips or frequently asked questions.

## Screenshots

- Manage
- Dashboard
- Manage opened
- FAQ

## Video Demo

- Upload final video from

## Contact

Any questions regarding the web application, please contact cpaiz@scu.edu or paizcollin@gmail.com
Any questions regarding deployment, please contact jstock@scu.edu
Any questions regarding hardware, please contact ewrysinski@scu.edu and dblanc@scu.edu
