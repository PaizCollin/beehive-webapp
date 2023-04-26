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

# Backend Overview

The backend is neatly organized into individual modules, each of which is responsible for a specific set of tasks.

# Config

The `config` module is responsible for setting up the MongoDB connection using Mongoose and the ATLAS URI provided by the MongoDB database.

# Server

The `server` is responsible for setting up the server and connecting to the database. The server is also responsible for listening on the port specified in the `.env` file (not provided).

# Middleware

The `middleware` module is responsible for setting up the middleware for the application.

## `auth.middleware.js`

This is a middleware function that adds authentication to a Node.js/Express application. The `protect` function checks for a valid JSON Web Token (JWT) in the `Authorization` header of incoming HTTP requests. If a valid token is found, the function decodes the token and sets the authenticated user in the request object. If a valid token is not found, the function returns a 401 Unauthorized response.

### Usage

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

### Function Definition

The `protect` function takes three arguments: `req`, `res`, and `next`.

#### `req`

The `req` argument is the incoming HTTP request object.

#### `res`

The `res` argument is the outgoing HTTP response object.

#### `next`

The `next` argument is a function that passes control to the next middleware function in the request-response cycle.

### Function Flow

The `protect` function follows this flow:

1. Check if the `Authorization` header exists and starts with the word "Bearer".
2. If the header exists and starts with "Bearer", try to verify the JWT.
3. If the JWT is valid, get the user ID from the token payload and find the user in the database.
4. If the user is found, set the `req.user` property to the user object without the password field, and call the `next()` function to pass control to the next middleware.
5. If the JWT is not valid, return a 401 Unauthorized response with an error message.
6. If the `Authorization` header does not exist or does not start with "Bearer", return a 401 Unauthorized response with an error message.

### Error Handling

If the `protect` function encounters an error, it will throw an error and call the `next()` function with the error object as an argument. This will trigger Express's default error handling middleware, which will return an error response to the client.

## `errorHandler.middleware.js`

This is a middleware function that adds error handling to a Node.js/Express application. The `errorHandler` function catches any errors that occur in the application and sends an appropriate error response to the client.

### Usage

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

### Function Definition

The `errorHandler` function takes four arguments: `err`, `req`, `res`, and `next`.

#### `err`

The `err` argument is the error object that was thrown by a previous middleware or route handler function.

#### `req`

The `req` argument is the incoming HTTP request object.

#### `res`

The `res` argument is the outgoing HTTP response object.

#### `next`

The `next` argument is a function that passes control to the next middleware function in the request-response cycle.

### Function Flow

The `errorHandler` function follows this flow:

1. Get the status code from the `res` object. If the status code is not set, default to 500 (Internal Server Error).
2. Set the HTTP status code of the response to the status code obtained in the previous step.
3. Send a JSON response to the client with the error message and stack trace (if in development mode).

### Error Handling

The `errorHandler` function is itself an error handling middleware function, and its purpose is to catch errors thrown by previous middleware or route handler functions. If an error is thrown by a previous function, the `errorHandler` function will catch the error and send an appropriate error response to the client. The error message is sent as the `message` property of the JSON response, and the stack trace (if in development mode) is sent as the `stack` property of the JSON response.

# Models

The three models used in the application are the `User`, `Apiary`, and `Data` models.

## `user.model`

This is a schema definition for the `user.model` in a Node.js/Express application using Mongoose. The `userSchema` defines the structure and validation rules for user documents that will be stored in a MongoDB database.

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

```json
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

Sure, here's the documentation for the `Apiary` model:

## `apiary.model`

This is a schema definition for the `apiary.model` in a Node.js/Express application using Mongoose. The `apiarySchema` defines the structure and validation rules for apiary documents that will be stored in a MongoDB database. This model consists of a `geoSchema` which defines a location, a `memberSchema` which defines a list of users, a `deviceSchema` which defines a list of devices, and an `apiarySchema` which defines an apiary.

#### `geoSchema`

| Field              | Type              | Example                       | Description                          |
| ------------------ | ----------------- | ----------------------------- | ------------------------------------ |
| `type`             | `String`          | "Point"                       | The type of location data.           |
| `coordinates`      | Array of `Number` | [-73.856077, 40.848447]       | The coordinates of the apiary.       |
| `formattedAddress` | `String`          | "123 Main St, New York, NY"   | The formatted address of the apiary. |
| `placeID`          | `String`          | "ChIJ2QDvuoFawokRjZkGdG8a6_8" | The place ID of the apiary.          |

#### `memberSchema`

| Field | Type     | Example                    | Description                                                                                    |
| ----- | -------- | -------------------------- | ---------------------------------------------------------------------------------------------- |
| user  | ObjectId | `611d0e284ed7270017ebac6e` | The user associated with this member                                                           |
| role  | String   | `"ADMIN"`                  | The role of the member, which can be one of `USER`, `ADMIN`, or `CREATOR`. Defaults to `USER`. |

#### `deviceSchema`

| Field     | Type     | Example                      | Description                                                    |
| --------- | -------- | ---------------------------- | -------------------------------------------------------------- |
| serial    | String   | `"ABC123"`                   | The serial number of the device. Required and must be unique.  |
| name      | String   | `"My Device"`                | The name of the device. Required.                              |
| remote    | String   | `"https://remote.it/ABC123"` | The remote.it URL for the device. Required and must be unique. |
| data      | ObjectId | `611d0e284ed7270017ebac6e`   | The ID of the data associated with this device                 |
| createdAt | Date     | `2022-01-01T00:00:00.000Z`   | The timestamp of when this device was created                  |
| updatedAt | Date     | `2022-01-01T01:00:00.000Z`   | The timestamp of when this device was last updated             |

#### `apiarySchema`

| Field     | Type   | Example                    | Description                                                                         |
| --------- | ------ | -------------------------- | ----------------------------------------------------------------------------------- |
| name      | String | `"My Apiary"`              | The name of the apiary                                                              |
| location  | Object | See example below          | The location of the apiary, represented as a GeoJSON object with a `Point` geometry |
| members   | Array  | See example below          | An array of members associated with this apiary                                     |
| devices   | Array  | See example below          | An array of devices associated with this apiary                                     |
| createdAt | Date   | `2022-01-01T00:00:00.000Z` | The timestamp of when this apiary was created                                       |
| updatedAt | Date   | `2022-01-01T01:00:00.000Z` | The timestamp of when this apiary was last updated                                  |

### `ObjectId`

A MongoDB ObjectId is a 12-byte unique identifier for documents in a collection. It can be converted to a string representation for ease of use.

### Example Document

```json
{
  "_id": "61701a1d45c5556f37e18f22",
  "name": "My Apiary",
  "location": {
    "type": "Point",
    "coordinates": [50.1234, -120.5678],
    "formattedAddress": "123 Main Street, Vancouver, BC, Canada",
    "placeID": "ChIJ2-3w3EXyhlQRugc5uVrXQ8o"
  },
  "members": [
    {
      "_id": "61701a1d45c5556f37e18f23",
      "user": "616f5c5dc5be5e8b5fabc123",
      "role": "ADMIN"
    },
    {
      "_id": "61701a1d45c5556f37e18f24",
      "user": "616f5c5dc5be5e8b5fabc456",
      "role": "USER"
    }
  ],
  "devices": [
    {
      "_id": "61701a1d45c5556f37e18f25",
      "serial": "ABC123",
      "name": "Sensor 1",
      "remote": "https://example.com/ABC123",
      "data": "61701a1d45c5556f37e18f26",
      "createdAt": "2022-10-19T12:34:56.789Z",
      "updatedAt": "2022-10-19T12:34:56.789Z"
    },
    {
      "_id": "61701a1d45c5556f37e18f27",
      "serial": "DEF456",
      "name": "Sensor 2",
      "remote": "https://example.com/DEF456",
      "data": null,
      "createdAt": "2022-10-19T12:34:56.789Z",
      "updatedAt": "2022-10-19T12:34:56.789Z"
    }
  ],
  "createdAt": "2022-10-19T12:34:56.789Z",
  "updatedAt": "2022-10-19T12:34:56.789Z"
}
```

## `data.model`

This is a schema definition for a `data.model` in a Node.js/Express application using Mongoose. The `dataSchema` defines the structure and validation rules for data documents that will be stored in a MongoDB database. This model consists of a `dataPointSchema` which defines the structure of an individual data point, and a `dataSchema` which defines a list of datapoints.

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

```json
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

# Routes

## `user.routes`

This file defines the routes for user authentication and authorization. The routes are protected by authentication middleware to ensure that only authenticated users can access them.

### Controllers

The `controllers` directory contains the functions that handle the logic for each route.

### Middleware

The `middleware` directory contains the `auth.middleware` file, which contains middleware functions for protecting the routes.

### Route Endpoints

```
POST /register
```

- Request Type: `POST`
- Authentication: None
- Description: Registers a new user with the provided credentials.

```
POST /login
```

- Request Type: `POST`
- Authentication: None
- Description: Logs in a user with the provided credentials.

```
GET /me
```

- Request Type: `GET`
- Authentication: `Protect`
- Description: Gets the current user.

## `apiary.routes`

This file defines the routes for the apiary related endpoints. The routes are protected by authentication middleware to ensure that only authenticated users can access them.

### Controllers

The `controllers` directory contains the functions that handle the logic for each route.

### Middleware

The `middleware` directory contains the `auth.middleware` file, which contains middleware functions for protecting the routes.

### Route Endpoints

```
GET /apiaries/
```

- Request Type: `GET`
- Authentication: `Protect`
- Description: Returns all apiaries associated with the authenticated user.

```
POST /apiaries/
```

- Request Type: `POST`
- Authentication: `Protect`
- Description: Creates a new apiary associated with the authenticated user.

```
PUT /apiaries/:apiary_id
```

- Request Type: `PUT`
- Authentication: `Protect`
- Description: Updates the specified apiary associated with the authenticated user.

```
DELETE /apiaries/:apiary_id
```

- Request Type: `DELETE`
- Authentication: `Protect`
- Description: Deletes the specified apiary associated with the authenticated user.

```
PUT /apiaries/:apiary_id/setdevice
```

- Request Type: `PUT`
- Authentication: `Protect`
- Description: Sets a new device for the specified apiary associated with the authenticated user.

```
PUT /apiaries/:apiary_id/device/:device_id/updatedevice
```

- Request Type: `PUT`
- Authentication: `Protect`
- Description: Updates the specified device for the specified apiary associated with the authenticated user.

```
PUT /apiaries/:apiary_id/device/:device_id/serial/:serial/deletedevice
```

- Request Type: `PUT`
- Authentication: `Protect`
- Description: Deletes the specified device for the specified apiary associated with the authenticated user.

```
PUT /apiaries/:apiary_id/setmember
```

- Request Type: `PUT`
- Authentication: `Protect`
- Description: Sets a new member for the specified apiary associated with the authenticated user.

```
PUT /apiaries/:apiary_id/user/:user_id/updatemember
```

- Request Type: `PUT`
- Authentication: `Protect`
- Description: Updates the specified member for the specified apiary associated with the authenticated user.

```
PUT /apiaries/:apiary_id/user/:user_id/deletemember
```

- Request Type: `PUT`
- Authentication: `Protect`
- Description: Deletes the specified member for the specified apiary associated with the authenticated user.

## `data.routes`

This file defines the routes for the data related endpoints.

### Controllers

The `controllers` directory contains the functions that handle the logic for each route.

### Route Endpoints

```
PUT /serial/:seral
```

- Request Type: `PUT`
- Authentication: None
- Description: Puts the data from the device with the specified serial number into the database.

# Controllers

## `user.controller`

This file handles user-related routes and requests.

### Functions

#### registerUser

- Route: `POST /api/users`
- Access: Public
- Description: Registers a new user.

#### loginUser

- Route: `POST /api/users/login`
- Access: Public
- Description: Authenticates a user and generates a JSON web token (JWT) for authorization.

#### getMe

- Route: `GET /api/users/me`
- Access: Private
- Description: Gets user data based on the ID of the authenticated user.

## `apiary.controller`

This file handles apiary-related routes and requests

### Functions

#### checkUserToApiary

- Description: This function checks if the logged-in user is a member of the specified apiary and has admin privileges.

#### getApiaries

- Route: `GET /api/apiaries`
- Access: Private; all users
- Description: This function retrieves all apiaries associated with the currently logged-in user.

#### setApiary

- Route: `POST /api/apiaries`
- Access: Private; all users
- Description: This function creates a new apiary.

#### updateApiary

- Route: `PUT /api/apiaries/apiary/:apiary_id`
- Access: Private; apiary admins only
- Description: This function updates the specified apiary's name and location.

#### deleteApiary

- Route: `DELETE /api/apiaries/apiary/:apiary_id`
- Access: Private; apiary creator only
- Description: This function deletes the specified apiary and all associated data.

#### setDevice

- Route: `PUT /api/apiaries/apiary/:apiary_id/setdevice`
- Access: Private; apiary admins only
- Description: This function sets a new device to an apiary. It checks if the user has admin privileges and if the device already exists. If the device doesn't exist, it creates a new document in the Data collection and pushes the device object into the `devices` array in the Apiary collection.

#### updateDevice

- Route: `PUT /api/apiaries/apiary/:apiary_id/device/:device_id/updatedevice`
- Access: Private; apiary admins only
- Description: This function updates an existing device in an apiary. It checks if the user has admin privileges and if the device exists in the apiary. If the device exists, it updates the name and remote properties of the device object in the `devices` array in the Apiary collection.

#### deleteDevice

- Route: `PUT /api/apiaries/apiary/:apiary_id/device/:device_id/serial/:serial/deletedevice`
- Access: Private; apiary admins only
- Description: This function deletes an existing device from an apiary. It checks if the user has admin privileges and if the device exists in the apiary. If the device exists, it removes the device object from the `devices` array in the Apiary collection and deletes the associated document in the Data collection.

#### setMember

- Route: `PUT /api/apiaries/apiary/:apiary_id/setmember`
- Access: Private; admins of apiary only
- Description: This function updates the user's role in the apiary to Editor.

#### updateMember

- Route: `PUT /api/apiaries/apiary/:apiary_id/user/:user_id/updatemember`
- Access: Private; admins of apiary only
- Description: This function updates the user's role in the apiary to Owner.

#### deleteMember

- Route: `PUT /api/apiaries/apiary/:apiary_id/user/:user_id/deletemember`
- Access: Private; admins of apiary only
- Description: This function deletes the specified user from the apiary.

## `data.controller`

This file handles data-related routes and requests.

### Functions

#### putData

- Route: `POST /api/data/:apiary_id/:device_id`
- Access: Needs protection (ML team authorized only)
- Description: Uploads a data point to the database.

# Frontend

# Deployment (Jonathan)

Explain how to deploy the application, including any server requirements and deployment steps.

# Testing (TBD)

Testing has been manual. Outline how to test the application, including any testing frameworks or methodologies used.

# License

Property of Santa Clara University under SCU's Senior Design Program

# Acknowledgments

Special thanks to Kian Nizkad, Wendy Mather, and Gerhard and Lisa Eschelbeck for their continued support on this project's details and design direction.

# Appendix

Include any additional information or resources, such as troubleshooting tips or frequently asked questions.

# Screenshots

- Manage
- Dashboard
- Manage opened
- FAQ

# Video Demo

- Upload final video from

# Contact

Any questions regarding the web application, please contact cpaiz@scu.edu or paizcollin@gmail.com
Any questions regarding deployment, please contact jstock@scu.edu
Any questions regarding hardware, please contact ewrysinski@scu.edu and dblanc@scu.edu

```

```
