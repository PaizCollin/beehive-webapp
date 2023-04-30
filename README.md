# Beehive Monitor Web Application

This full stack web application (_MERN_ Stack), was built to service the Santa Clara University Senior Design engineering project: **A Hardware Solution to Wireless Beehive Monitoring**

The frontend is built using _React_, _Redux_, and _Axios_; the backend is built using _Express_ and _Node_; and the database is managed in _MongoDB_. The frontend heavily utilizes the open-source _React_ component library, _Material UI_ for styling and design. The backend utilizes _Mongoose_ for database modeling and management.

This project aims to rely solely on _open-source_ technologies to ensure its reliability and longevity for beekeepers around the world.

# Basic Information

## Installation

To install the necessary dependencies for the frontend and backend, run the following command in the main directory:

```bash
npm run yayaya
```

To install the necessary dependencies for the backend only, run the following command in the main directory:

```bash
npm install
```

To install the necessary dependencies for the frontend only, run the following command in the `./frontend` directory:

```bash
npm install
```

### Note

If you run into funding errors, try adding `--force` to the end of your command, and/or running the installations separately.

## Configuration

Use the template `.env` file to setup necessary configurations such as the MongoDB URI, JWT secret, Google Maps Locations API, and port. For those continuing this project, please contact cpaiz@scu.edu or paizcollin@gmail.com for details or assistance.

## Usage

To start the frontend and backend, run the following command in the main directory:

```bash
npm run dev
```

To start the backend only, run the following command in the main directory:

```bash
npm run server
```

To start the frontend only, run the following command in the main directory:

```bash
npm run client
```

The frontend will run on port 3000, and the backend will run on port 5000., by default.

Using the Web Application is simple. The user will be greeted with a login page. If the user has an account, they can login with their credentials. If the user does not have an account, they can register for one. Once logged in, the user will be greeted with a dashboard. The dashboard will display the user's beehives, and the user can use the dropdown to select an apiary and subsequent beehive device to view more information about that specific hive. The user can also add, delete, and update apiaries, each of which is a small organization that contains its own set of devices (hives) that can be added, deleted, and updated. Users may also be added to apiaries to help manage them; members of apiaries can be granted different privileges, with the creator of the apiary having full control of the apiary and its hives. The user can also view the FAQ page, which will display frequently asked questions about the application, as well as the about page, which will display information about the application and its creators. The user can also logout of the application.

# Backend

## Overview

The backend is neatly organized into individual modules, each of which is responsible for a specific set of tasks. The modules are as follows: `config`, `server`, `middleware`, `models`, `routes`, and `server`. Each module is described in detail below.

# Config

## Overview

The `config` module is responsible for setting up the _MongoDB_ connection using Mongoose and the `ATLAS_URI` provided by the _MongoDB_ database.

## `db.js`

### Description

This file is responsible for connecting the application to the _MongoDB_ database using the `ATLAS_URI` provided by the _MongoDB_ database. The `ATLAS_URI` is stored in the `.env` file, which is not included in the repository for security reasons. The `ATLAS_URI` is a string that contains the username, password, and database name for the _MongoDB_ database. The `db.js` file uses the `ATLAS_URI` to connect to the database using the `mongoose.connect()` method.

### Usage Example

```javascript
const connectDB = require("./connectDB");

// Call the function
connectDB();
```

In this example, the `connectDB` function is imported from the `db.js` file and called. This will connect your application to the database using the `MongoDB URI` provided in the `.env` file.

# Server

## Overview

The `server` is responsible for setting up the server and connecting to the _MongoDB_ database. The server is also responsible for listening on the port specified in the `.env` file.

## `server.js`

### Description

This _Node.js_ sets up an _HTTP_ server using the _Express_ framework. It exports a single function that starts the server and listens for incoming requests.

### Usage Example

```javascript
const startServer = require("./server");

// Call the function
startServer();
```

In this example, the `startServer` function is imported from the `server.js` file and called. This will start the server and listen for incoming requests.

# Middleware

## Overview

The `middleware` module is responsible for setting up the middleware for the application.

## `auth.middleware.js`

### Description

This is a middleware function that adds authentication to a _Node.js/Express_ application. The `protect` function checks for a valid _JSON Web Token (JWT)_ in the `Authorization` header of incoming _HTTP_ requests. If a valid token is found, the function decodes the token and sets the authenticated user in the request object. If a valid token is not found, the function returns a **401 Unauthorized response**.

### Usage

The `protect` function can be used as a middleware function in any _Express_ route that requires authentication. Here's an example of how to use the `protect` middleware function in an _Express_ route:

```javascript
const express = require("express");
const protect = require("../middleware/protect");

const router = express.Router();

router.get("/", protect, (req, res) => {
  res.json({ user: req.user });
});
```

In this example, the `protect` middleware function is used as the second argument in the `router.get()` method. This means that the `protect` function will be called before the route handler function. If the _JWT_ is valid and the user is found, the `req.user` property will be set to the user object without the password field, and the route handler function will be called. If the _JWT_ is not valid or not provided, a **401 Unauthorized response** will be returned.

### Function Parameters

| Parameter | Description                                                                                   |
| --------- | --------------------------------------------------------------------------------------------- |
| `req`     | The incoming HTTP request object.                                                             |
| `res`     | The outgoing HTTP response object.                                                            |
| `next`    | A function that passes control to the next middleware function in the request-response cycle. |

### Function Flow

The `protect` function follows this flow:

1. Check if the `Authorization` header exists and starts with the word "Bearer".
2. If the header exists and starts with "Bearer", try to verify the _JWT_.
3. If the _JWT_ is valid, get the user ID from the token payload and find the user in the database.
4. If the user is found, set the `req.user` property to the user object without the password field, and call the `next()` function to pass control to the next middleware.
5. If the _JWT_ is not valid, return a **401 Unauthorized response** with an error message.
6. If the `Authorization` header does not exist or does not start with "Bearer", return a **401 Unauthorized response** with an error message.

## `errorHandler.middleware.js`

### Description

This is a middleware function that adds error handling to a _Node.js/Express_ application. The `errorHandler` function catches any errors that occur in the application and sends an appropriate error response to the client.

### Usage Example

The `errorHandler` function should be used as the last middleware function in the middleware stack of an _Express_ application. Here's an example of how to use the `errorHandler` middleware function in an _Express_ application:

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

| Parameter | Description                                                                                   |
| --------- | --------------------------------------------------------------------------------------------- |
| `err`     | The error object that was thrown by a previous middleware or route handler function.          |
| `req`     | The incoming HTTP request object.                                                             |
| `res`     | The outgoing HTTP response object.                                                            |
| `next`    | A function that passes control to the next middleware function in the request-response cycle. |

### Function Flow

The `errorHandler` function follows this flow:

1. Get the status code from the `res` object. If the status code is not set, default to 500 (Internal Server Error).
2. Set the HTTP status code of the response to the status code obtained in the previous step.
3. Send a JSON response to the client with the error message and stack trace (if in development mode).

### Error Handling

The `errorHandler` function is itself an error handling middleware function, and its purpose is to catch errors thrown by previous middleware or route handler functions. If an error is thrown by a previous function, the `errorHandler` function will catch the error and send an appropriate error response to the client. The error message is sent as the `message` property of the JSON response, and the stack trace (if in development mode) is sent as the `stack` property of the JSON response.

# Models

## Overview

The three models used in the application are the `User`, `Apiary`, and `Data` models. The `User` model is used to store user data in the database, the `Apiary` model is used to store apiary data in the database. and the `Data` model is used to store data from the devices in the database.

## `user.model.js`

### Description

This is a schema definition for the `user` model in a _Node.js/Express_ application using _Mongoose_. The `userSchema` defines the structure and validation rules for user documents that will be stored in a _MongoDB_ database.

### Schema Definition

| Field     | Type     | Required | Unique | Example Value          | Description                                      |
| --------- | -------- | -------- | ------ | ---------------------- | ------------------------------------------------ |
| name      | `String` | Yes      | No     | "John Doe"             | The user's name.                                 |
| email     | `String` | Yes      | Yes    | "johndoe@example.com"  | The user's email address. Must be unique.        |
| password  | `String` | Yes      | No     | "$2a$10$V7X9I...jMx7"  | The user's password.                             |
| createdAt | `Date`   | No       | No     | "2023-04-25T12:34:56Z" | The timestamp for when the user was created      |
| updatedAt | `Date`   | No       | No     | "2023-04-25T12:34:56Z" | The timestamp for when the user was last updated |

Note that the `createdAt` and `updatedAt` fields are of type `Date` and are automatically generated by Mongoose using the `timestamps` option set to `true` in the schema.

### Example Document

```json
{
  "_id": "6153db097a880f72a2d6c853",
  "name": "John Doe",
  "email": "johndoe@example.com",
  "password": "$2a$10$YSiN2VK/OdtZ5N5c5S5S5OAmQ2IyHz.gxCGKdDw.Ggchc20OaG1Ia",
  "createdAt": "2021-09-28T05:45:29.586Z",
  "updatedAt": "2021-09-28T05:45:29.586Z"
}
```

Note that the password field is encrypted using _bcrypt_, so the value shown is just an example of an encrypted password hash. The actual value would be a long string of random characters.

## `apiary.model.js`

### Description

This is a schema definition for the `apiary.model` in a _Node.js/Express_ application using _Mongoose_. The `apiarySchema` defines the structure and validation rules for apiary documents that will be stored in a MongoDB database. This model consists of a `geoSchema` which defines a location, a `memberSchema` which defines a list of users, a `deviceSchema` which defines a list of devices, and an `apiarySchema` which defines an apiary.

#### `geoSchema`

| Field            | Type              | Required | Unique | Example Value                 | Description                                                                                                           |
| ---------------- | ----------------- | -------- | ------ | ----------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| type             | `String`          | No       | No     | "Point"                       | The type of the location data. Default value is "Point".                                                              |
| coordinates      | Array of `Number` | No       | No     | `[-73.9857, 40.7484]`         | An array of longitude and latitude coordinates in that order. Indexed as a 2dsphere to enable location-based queries. |
| formattedAddress | `String`          | No       | No     | "123 Main St, New York, NY"   | The formatted address of the location.                                                                                |
| placeID          | `String`          | No       | No     | "ChIJd8BlQ2BZwokRAFUEcm_qrcA" | The place ID of the location.                                                                                         |

#### `memberSchema`

| Field | Type       | Required | Unique | Example Value              | Description                                                          |
| ----- | ---------- | -------- | ------ | -------------------------- | -------------------------------------------------------------------- |
| user  | `ObjectId` | Yes      | No     | "61579f9a53e7e8f2916d47b1" | References a user object associated with the member                  |
| role  | `String`   | No       | No     | "USER"                     | The role of the member, must be one of "USER", "ADMIN", or "CREATOR" |

#### `deviceSchema`

| Field     | Type       | Required | Unique | Example Value              | Description                                          |
| --------- | ---------- | -------- | ------ | -------------------------- | ---------------------------------------------------- |
| serial    | `String`   | Yes      | Yes    | "ABC123"                   | The serial number of the device                      |
| name      | `String`   | Yes      | No     | "Device 1"                 | The name of the device                               |
| remote    | `String`   | Yes      | Yes    | "https://remote.it/ABC123" | The remote.it URL of the device                      |
| data      | `ObjectId` | No       | No     | "6154353e7eb3aa3b1886d051" | The ID of the data object associated with the device |
| createdAt | `Date`     | No       | No     | "2022-01-01T00:00:00.000Z" | The date and time when the device was created        |
| updatedAt | `Date`     | No       | No     | "2022-01-02T00:00:00.000Z" | The date and time when the device was last updated   |

#### `apiarySchema`

| Field     | Type                                    | Required | Unique | Example Value      | Description                                    |
| --------- | --------------------------------------- | -------- | ------ | ------------------ | ---------------------------------------------- |
| name      | String                                  | No       | No     | "My Apiary"        | The name of the Apiary                         |
| location  | Object of type `geoSchema`              | No       | No     | See `geoSchema`    | The coordinates of the Apiary                  |
| members   | Array of Objects of type `memberSchema` | Yes      | No     | See `memberSchema` | An array of members associated with the Apiary |
| devices   | Array of Objects of type `deviceSchema` | No       | No     | See `deviceSchema` | An array of devices associated with the Apiary |
| createdAt | Date                                    | No       | No     | -                  | The date when the Apiary was created           |
| updatedAt | Date                                    | No       | No     | -                  | The date when the Apiary was last updated      |

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

## `data.model.js`

### Description

This is a schema definition for a `data.model` in a _Node.js/Express_ application using _Mongoose_. The `dataSchema` defines the structure and validation rules for data documents that will be stored in a _MongoDB_ database. This model consists of a `dataPointSchema` which defines the structure of an individual data point, and a `dataSchema` which defines a list of datapoints.

### `dataPointSchema` Description

The `dataPointSchema` defines the schema for an individual data point. It consists of the following fields:

| Field                     | Type     | Required | Unique | Example Value | Description                                                                        |
| ------------------------- | -------- | -------- | ------ | ------------- | ---------------------------------------------------------------------------------- |
| time                      | `Date`   | No       | No     | Date.now      | The time the data point was recorded                                               |
| raw_activity.x            | `Number` | Yes      | No     | 5.2           | The x coordinate of the raw activity data                                          |
| raw_activity.y            | `Number` | Yes      | No     | 3.8           | The y coordinate of the raw activity data                                          |
| weather.temp              | `Number` | Yes      | No     | 25.4          | The temperature in Celsius at the time of recording                                |
| weather.humidity          | `Number` | Yes      | No     | 70.2          | The humidity in percent at the time of recording                                   |
| weather.windspeed         | `Number` | Yes      | No     | 10.3          | The wind speed in meters per second at the time of recording                       |
| prediction_activity.x     | `Number` | Yes      | No     | 2.1           | The x coordinate of the predicted activity data                                    |
| prediction_activity.y     | `Number` | Yes      | No     | 1.5           | The y coordinate of the predicted activity data                                    |
| last_prediction_deviation | `Number` | No       | No     | 0.7           | The deviation between the raw and predicted activity data at the time of recording |

### `dataSchema` Description

The `dataSchema` defines the schema for a collection of data points. It consists of the following fields:

| Field      | Type                       | Required | Unique | Example Value              | Description                                         |
| ---------- | -------------------------- | -------- | ------ | -------------------------- | --------------------------------------------------- |
| apiary     | `ObjectId`                 | No       | No     | "6154353e7eb3aa3b1886d051" | Reference to the Apiary model                       |
| serial     | `String`                   | Yes      | Yes    | "ABC123"                   | Unique identifier of the device sending the data    |
| datapoints | Array of `dataPointSchema` | No       | No     | See `dataPointSchema`      | Array containing the data points sent by the device |

### Example document

```json
{
  "_id": "60934c7a2a58581ed82b8d96",
  "apiary": "6051902568f4a4dbd4f1c0e5",
  "serial": "XYZ123",
  "datapoints": [
    {
      "time": "2022-04-26T12:00:00.000Z",
      "raw_activity": { "x": 10, "y": 20 },
      "weather": { "temp": 25, "humidity": 80, "windspeed": 10 },
      "prediction_activity": { "x": 12, "y": 22 },
      "last_prediction_deviation": 2.5
    },
    {
      "time": "2022-04-26T12:05:00.000Z",
      "raw_activity": { "x": 11, "y": 21 },
      "weather": { "temp": 26, "humidity": 81, "windspeed": 11 },
      "prediction_activity": { "x": 13, "y": 23 },
      "last_prediction_deviation": 2.0
    }
  ],
  "createdAt": "2021-05-06T00:00:00.000Z",
  "updatedAt": "2021-05-06T00:00:00.000Z"
}
```

# Routes

## Overview

The `routes` module contains the route definitions for the _Node.js/Express_ application. The routes are organized into separate files based on their purpose. The `user.routes` file contains the routes for user authentication and authorization, the `apiary.routes` file contains the routes for the apiary endpoints, and the `data.routes` file contains the routes for the data endpoints.

## `user.routes.js`

### Description

This file defines the routes for user authentication and authorization. The routes are protected by authentication middleware to ensure that only authenticated users can access them.

### Route Endpoints

| Endpoint              | Request Type | Authentication | Description                                        |
| --------------------- | ------------ | -------------- | -------------------------------------------------- |
| `/api/users/register` | `POST`       | -              | Registers a new user with the provided credentials |
| `/api/users/login`    | `POST`       | -              | Logs in a user with the provided credentials       |
| `/api/users/me`       | `GET`        | Protect        | Gets the current user                              |

## `apiary.routes`

### Description

This file defines the routes for the apiary related endpoints. The routes are protected by authentication middleware to ensure that only authenticated users can access them.

### Route Endpoints

| Endpoint                                                                        | Request Type | Authentication | Description                                                                                   |
| ------------------------------------------------------------------------------- | ------------ | -------------- | --------------------------------------------------------------------------------------------- |
| `/api/apiaries`                                                                 | `GET`        | `Protect`      | Returns all apiaries associated with the authenticated user.                                  |
| `/api/apiaries`                                                                 | `POST`       | `Protect`      | Creates a new apiary associated with the authenticated user.                                  |
| `/api/apiaries/apiary/:apiary_id`                                               | `PUT`        | `Protect`      | Updates the specified apiary associated with the authenticated user.                          |
| `/api/apiaries/apiary/:apiary_id`                                               | `DELETE`     | `Protect`      | Deletes the specified apiary associated with the authenticated user.                          |
| `/api/apiaries/apiary/:apiary_id/setdevice`                                     | `PUT`        | `Protect`      | Sets a new device for the specified apiary associated with the authenticated user.            |
| `/api/apiaries/apiary/:apiary_id/device/:device_id/updatedevice`                | `PUT`        | `Protect`      | Updates the specified device for the specified apiary associated with the authenticated user. |
| `/api/apiaries/apiary/:apiary_id/device/:device_id/serial/:serial/deletedevice` | `PUT`        | `Protect`      | Deletes the specified device for the specified apiary associated with the authenticated user. |
| `/api/apiaries/apiary/:apiary_id/setmember`                                     | `PUT`        | `Protect`      | Sets a new member for the specified apiary associated with the authenticated user.            |
| `/api/apiaries/apiary/:apiary_id/user/:user_id/updatemember`                    | `PUT`        | `Protect`      | Updates the specified member for the specified apiary associated with the authenticated user. |
| `/api/apiaries/apiary/:apiary_id/user/:user_id/deletemember`                    | `PUT`        | `Protect`      | Deletes the specified member for the specified apiary associated with the authenticated user. |

## `data.routes`

### Description

This file defines the routes for the data related endpoints.

### Controllers

The `controllers` directory contains the functions that handle the logic for each route.

### Route Endpoints

| Endpoint                   | Request Type | Authentication | Description                                                                       |
| -------------------------- | ------------ | -------------- | --------------------------------------------------------------------------------- |
| `/api/data/serial/:serial` | `PUT`        | None           | Puts the data from the device with the specified serial number into the database. |

# Controllers

## `user.controller`

This file handles user-related routes and requests.

### Functions

| Function      | Route                   | Access  | Description                                                                      |
| ------------- | ----------------------- | ------- | -------------------------------------------------------------------------------- |
| registerUser  | `POST /api/users`       | Public  | Registers a new user.                                                            |
| loginUser     | `POST /api/users/login` | Public  | Authenticates a user and generates a _JSON Web Token_ (_JWT_) for authorization. |
| getMe         | `GET /api/users/me`     | Private | Gets user data based on the ID of the authenticated user.                        |
| generateToken | -                       | -       | Generates a _JSON Web Token_ (_JWT_) for authorization.                          |

## `apiary.controller`

### Description

This file handles apiary-related routes and requests, including creating, updating, and deleting apiaries; setting, updating, and deleting devices; and setting, updating, and deleting members.

### Functions

| Function          | Route                                                                               | Access                  | Description                                                                                |
| ----------------- | ----------------------------------------------------------------------------------- | ----------------------- | ------------------------------------------------------------------------------------------ |
| checkUserToApiary | -                                                                                   | Private; apiary admins  | Checks if the logged-in user is a member of the specified apiary and has admin privileges. |
| getApiaries       | `GET /api/apiaries`                                                                 | Private; all users      | Retrieves all apiaries associated with the currently logged-in user.                       |
| setApiary         | `POST /api/apiaries`                                                                | Private; all users      | Creates a new apiary.                                                                      |
| updateApiary      | `PUT /api/apiaries/apiary/:apiary_id`                                               | Private; apiary admins  | Updates the specified apiary's name and location.                                          |
| deleteApiary      | `DELETE /api/apiaries/apiary/:apiary_id`                                            | Private; apiary creator | Deletes the specified apiary and all associated data.                                      |
| setDevice         | `PUT /api/apiaries/apiary/:apiary_id/setdevice`                                     | Private; apiary admins  | Sets a new device to an apiary.                                                            |
| updateDevice      | `PUT /api/apiaries/apiary/:apiary_id/device/:device_id/updatedevice`                | Private; apiary admins  | Updates an existing device in an apiary.                                                   |
| deleteDevice      | `PUT /api/apiaries/apiary/:apiary_id/device/:device_id/serial/:serial/deletedevice` | Private; apiary admins  | Deletes an existing device from an apiary.                                                 |
| setMember         | `PUT /api/apiaries/apiary/:apiary_id/setmember`                                     | Private; apiary admins  | Updates the user's role in the apiary to Editor.                                           |
| updateMember      | `PUT /api/apiaries/apiary/:apiary_id/user/:user_id/updatemember`                    | Private; apiary admins  | Updates the user's role in the apiary to Owner.                                            |
| deleteMember      | `PUT /api/apiaries/apiary/:apiary_id/user/:user_id/deletemember`                    | Private; apiary admins  | Deletes the specified user from the apiary.                                                |

## `data.controller`

### Description

This file handles data-related routes and requests. It includes uploading data points to the database.

### Functions

| Function | Route                                  | Access                                     | Description                           |
| -------- | -------------------------------------- | ------------------------------------------ | ------------------------------------- |
| putData  | `POST /api/data/:apiary_id/:device_id` | Needs protection (ML team authorized only) | Uploads a data point to the database. |

# Frontend

## Overview

The frontend of the application is built using _React_. The `src` directory contains the source code for the frontend, including the components, pages, stylsheets, and features.

# `App.js`

## Description

The `App.js` component is the root component of the application. It is responsible for rendering the application's navigation bar and routing the user to the appropriate page based on the URL.

# `index.js`

## Description

The `index` file is the entry point of the application. It renders the `App` component and wraps it in a `BrowserRouter` component to enable routing.

# `index.css`

## Description

The `index.css` file contains the global styles for the application.

## Fonts

This stylesheet imports the "Poppins" font family from Google Fonts with three weights - 400 (regular), 600 (semi-bold), and 700 (bold) - and the display property set to "swap".

```css
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap");
```

## Height, Width and Font

The stylesheet applies 100% height and width to the `html`, `body`, `#root`, `.app`, and `.content` selectors, and uses the "Poppins" font family as the default font for these elements.

```css
html,
body,
#root,
.app,
.content {
  height: 100%;
  width: 100%;
  font-family: "Poppins", sans-serif;
}
```

## App Display and Position

The `.app` selector has its display set to "flex" and position set to "relative".

```css
.app {
  display: flex;
  position: relative;
}
```

## Scrollbar Styling

The stylesheet applies custom styling to the scrollbar using the WebKit CSS scrollbar pseudo-elements. The width of the scrollbar is set to 10px, the track color is set to #e0e0e0, and the handle color is set to #888. On hover, the track color changes to #555.

```css
::-webkit-scrollbar {
  width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #e0e0e0;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #888;
}

/* Handle on Hover */
::-webkit-scrollbar-track:hover {
  background: #555;
}
```

## Fieldset Styling

The `fieldset` selector has its border and outline set to "none" to remove any default styling applied to the element.

```css
fieldset {
  border: none !important;
  outline: none !important;
}
```

That's it! This is a basic documentation of the CSS stylesheet provided.

# `theme.js`

## Description

The `theme` file contains the color design tokens and MUI theme settings for the application. It exports two functions, `tokens` and `themeSettings`, which can be used to retrieve the color design tokens and MUI theme settings for the specified mode.

## `tokens`

The `tokens` function accepts a single argument, `mode`, which can either be `"light"` or `"dark"`, and returns an object containing the color design tokens for the specified mode.

### Example Usage

```jsx
import { tokens } from "./theme";

const darkModeTokens = tokens("dark");
const lightModeTokens = tokens("light");
```

## `themeSettings`

The `themeSettings` function accepts a single argument, `mode`, which can either be `"light"` or `"dark"`, and returns an object containing the MUI theme settings for the specified mode.

### Example Usage

```jsx
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";

const darkTheme = createTheme(themeSettings("dark"));
const lightTheme = createTheme(themeSettings("light"));
```

# `store.js`

## Description

The `store` file configures a Redux store using `@reduxjs/toolkit`. It uses two slices, `auth` and `apiary`, to manage state related to user authentication and the application's apiary feature.

# Components

## `AboutCard` React Component

### Description

The `AboutCard` component is a reusable component that displays an information card with a title, avatar, and expandable content. It is used in the `About` page to display information regarding the project.

### Props

| Name | Type                | Required | Description                                                                                          |
| ---- | ------------------- | -------- | ---------------------------------------------------------------------------------------------------- |
| faq  | `List` of `Strings` | Yes      | An array of two strings: the title of the card and the content to display when the card is expanded. |

### State

| Name   | Type      | Description                                           |
| ------ | --------- | ----------------------------------------------------- |
| expand | `Boolean` | Determines whether the card is expanded or collapsed. |

### Methods

The `AboutCard` component does not define any methods.

### Handlers

The `AboutCard` component does not define any handlers.

### Child Components

| Name                      | Package               | Description                                                     |
| ------------------------- | --------------------- | --------------------------------------------------------------- |
| ArrowDropDownOutlinedIcon | `@mui/icons-material` | An icon component that represents a downward-pointing arrow     |
| Avatar                    | `@mui/material`       | A component that represents a user or entity                    |
| Box                       | `@mui/material`       | A component that provides a flexible container for content      |
| Card                      | `@mui/material`       | A container component that displays information                 |
| CardActions               | `@mui/material`       | A component that provides space for buttons or icons            |
| CardHeader                | `@mui/material`       | A component that displays a header for a card                   |
| Collapse                  | `@mui/material`       | A component that animates the expansion or collapse of content  |
| Grid                      | `@mui/material`       | A layout component that helps to organize content in a grid     |
| IconButton                | `@mui/material`       | A button component that displays an icon                        |
| InfoOutlinedIcon          | `@mui/icons-material` | An icon component that represents an information icon           |
| Typography                | `@mui/material`       | A component that displays text content                          |
| tokens`                   | Custom function       | A function that returns color tokens based on the current theme |
| useTheme                  | `@mui/material`       | A hook that provides access to the current theme                |
| useState                  | `react`               | A hook that adds state to a functional component                |

### Usage Example

```jsx
import AboutCard from "./AboutCard";

const ExampleComponent = () => {
  const faq = ["Title", "Content"];

  return <AboutCard faq={faq} />;
};
```

In this example, we import the `AboutCard` component and render it with an array of two strings that will be displayed as the title and content of the card. When the user clicks on the arrow button in the card header, the content of the card will expand or collapse.

## `AddApiaryCard` React Component

### Description

The `AddApiaryCard` component is a form card used to create a new apiary in a _React_ application. It includes a name input field, a location input field powered by the `GoogleMaps` component, and a button to submit the form data.

### Props

The `AddApiaryCard` component does not accept any props.

### State

| Name     | Type      | Description                                                                        |
| -------- | --------- | ---------------------------------------------------------------------------------- |
| value    | `Object`  | The selected location value from the GoogleMaps component.                         |
| expand   | `Boolean` | Whether or not the card is expanded.                                               |
| formData | `Object`  | The form data to be submitted, including the apiary name and location information. |

### Methods

The `AddApiaryCard` component does not define any methods.

### Handlers

| Name     | Parameters   | Description                                                          |
| -------- | ------------ | -------------------------------------------------------------------- |
| onChange | `e`: `Event` | Updates the form data when input fields are changed.                 |
| onSubmit | `e`: `Event` | Submits the form data to the Redux store via the `setApiary` action. |

### Child Components

| Name            | Package                       | Description                                                           |
| --------------- | ----------------------------- | --------------------------------------------------------------------- |
| AddOutlinedIcon | `@mui/icons-material`         | A material design add icon.                                           |
| Autocomplete    | `@mui/material`               | A component to create an input field with autocomplete functionality. |
| Avatar          | `@mui/material`               | A component to display user profile pictures or icons.                |
| Box             | `@mui/material`               | A layout component to create a box container.                         |
| Button          | `@mui/material`               | A material design button component.                                   |
| Card            | `@mui/material`               | A material design card component.                                     |
| CardActions     | `@mui/material`               | A component to create a row of actions for a `Card` component.        |
| Collapse        | `@mui/material`               | A component to collapse content based on a boolean state variable.    |
| debounce        | `lodash`                      | A function to debounce input field changes.                           |
| GoogleMaps      | `./AutocompleteMaps.tsx`      | A custom component to display a Google Maps autocomplete input field. |
| Grid            | `@mui/material`               | A layout component to create a grid of items.                         |
| IconButton      | `@mui/material`               | A component to create clickable icons.                                |
| parse           | `autosuggest-highlight/parse` | A function to parse and highlight text in an autocomplete input.      |
| TextField       | `@mui/material`               | A material design input component.                                    |
| useTheme        | `@mui/material`               | A hook to access the current theme.                                   |
| useDispatch     | `react-redux`                 | A hook to dispatch actions to the Redux store.                        |
| useState        | `react`                       | A hook to manage state variables in a functional component.           |

### Usage Example

```jsx
import AddApiaryCard from "./AddApiaryCard";

const ParentComponent = () => {
  return (
    <div>
      <AddApiaryCard />
    </div>
  );
};

export default ParentComponent;
```

In this example, when the form is submitted, the data is sent to the Redux store via the `setApiary` action. This data includes the apiary name and location information provided by the `GoogleMaps` component.

## `AddDeviceCard` React Component

### Description

This component renders a card with a form to add a new device to an apiary. The form includes an input field for the device name, a select field for the device type, and a button to submit the form data.

### Props

| Name     | Type     | Required | Description                                                  |
| -------- | -------- | -------- | ------------------------------------------------------------ |
| apiary   | `Object` | Yes      | An object with data for the apiary where the device is added |
| userRole | `String` | Yes      | A string with the user role, either "USER" or "ADMIN"        |

### State

| Name     | Type      | Description                                              |
| -------- | --------- | -------------------------------------------------------- |
| expand   | `Boolean` | A boolean indicating whether the card is expanded or not |
| formData | `Object`  | An object containing the values of the form inputs       |

### Methods

The `AddDeviceCard` component does not define any methods.

### Handlers

| Name     | Parameters   | Description                                                |
| -------- | ------------ | ---------------------------------------------------------- |
| onChange | `e`: `Event` | A function to handle the onChange event of the form inputs |
| onSubmit | `e`: `Event` | A function to handle the onSubmit event of the form        |

### Child Components

| Name            | Package               | Description                                                                           |
| --------------- | --------------------- | ------------------------------------------------------------------------------------- |
| AddOutlinedIcon | `@mui/icons-material` | An icon component that displays a plus symbol.                                        |
| Avatar          | `@mui/material`       | A component for displaying a circular image or icon.                                  |
| Box             | `@mui/material`       | A component for wrapping and styling its children.                                    |
| Button          | `@mui/material`       | A component for displaying a clickable button.                                        |
| Card            | `@mui/material`       | A container component for displaying content and actions related to a single subject. |
| CardActions     | `@mui/material`       | A container component for grouping action buttons in a card.                          |
| Collapse        | `@mui/material`       | A component that allows for collapsing and expanding its children.                    |
| Grid            | `@mui/material`       | A layout component for arranging its children in a grid.                              |
| IconButton      | `@mui/material`       | A button component that displays an icon.                                             |
| TextField       | `@mui/material`       | A component for displaying and inputting text.                                        |
| useDispatch     | `react-redux`         | A hook for dispatching actions to the Redux store.                                    |
| useSelector     | `react-redux`         | A hook for accessing state from the Redux store.                                      |
| useNavigate     | `react-router-dom`    | A hook for navigating to different routes in a React application.                     |
| useTheme        | `@mui/material`       | A hook that provides access to the MUI theme.                                         |
| useState        | `React`               | A hook for managing state in functional components.                                   |

### Usage Example

```jsx
import React from "react";
import AddDeviceCard from "./AddDeviceCard";

const MyComponent = () => {
  return (
    <AddDeviceCard
      apiary={{ _id: "apiaryId", name: "apiaryName" }}
      userRole="ADMIN"
    />
  );
};

export default MyComponent;
```

In this example, `MyComponent` renders the `AddDeviceCard` component passing the required props `apiary` and `userRole`. The `apiary` prop is an object with the data for the apiary where the device will be added, and the `userRole` prop is a string indicating the role of the user, either "USER" or "ADMIN".

## `AddUserCard` React Component

### Description

The `AddUserCard` component is a React component that displays a card with a button to expand a form to add a new user to an apiary. It takes in two props: `apiary` and `userRole`.

### Props

| Name     | Type     | Required | Description                                 |
| -------- | -------- | -------- | ------------------------------------------- |
| apiary   | `Object` | Yes      | An object containing data for the APIary.   |
| userRole | `String` | Yes      | The role of the user creating the new user. |

### State

| Name     | Type      | Description                                                |
| -------- | --------- | ---------------------------------------------------------- |
| expand   | `Boolean` | Determines whether the form to add a new user is expanded. |
| formData | `Object`  | An object containing the email and role of the new user.   |

### Methods

The `AddUserCard` component does not define any methods.

### Handlers

| Name     | Parameters   | Description                                                                                                      |
| -------- | ------------ | ---------------------------------------------------------------------------------------------------------------- |
| onChange | `e`: `Event` | Updates the `formData` state with the input value of the form.                                                   |
| onSubmit | `e`: `Event` | Dispatches an action to add a new member to the APIary with the email and role provided in the `formData` state. |

### Child Components

| Name             | Package         | Description                                                                                |
| ---------------- | --------------- | ------------------------------------------------------------------------------------------ |
| Avatar           | `@mui/material` | Displays an avatar with an icon.                                                           |
| Box              | `@mui/material` | A layout component that allows for flexible box sizing.                                    |
| Button           | `@mui/material` | A button component with customizable styling.                                              |
| Card             | `@mui/material` | A component that displays a card with a shadow effect.                                     |
| CardActions      | `@mui/material` | A layout component that displays a set of buttons below the card content.                  |
| Checkbox         | `@mui/material` | A component that displays a checkbox.                                                      |
| Collapse         | `@mui/material` | A component that animates the expanding and collapsing of its children.                    |
| FormControlLabel | `@mui/material` | A component that combines a label with a form control, such as a checkbox or radio button. |
| Grid             | `@mui/material` | A layout component that displays its children in a grid.                                   |
| IconButton       | `@mui/material` | A button component that displays an icon.                                                  |
| TextField        | `@mui/material` | A component that displays an input field for text.                                         |

### Usage Example

```jsx
import AddUserCard from "./AddUserCard";

const MyComponent = () => {
  const apiary = { _id: "12345", name: "My APIary" };
  const userRole = "ADMIN";

  return <AddUserCard apiary={apiary} userRole={userRole} />;
};
```

In this example, the `MyComponent` component renders the `AddUserCard` component with an `apiary` object and a `userRole` string. The `AddUserCard` component displays a card with a button to expand a form to add a new user to the APIary.

## `ApiaryCard` React Component

### Description

The `ApiaryCard` component is a reusable component in a _React_ application that displays information about an apiary such as its `name`, `location` and other details. It allows users to edit, delete and update the apiary information. This component utilizes _Material-UI_ library.

### Props

The following table lists the props that can be passed to `ApiaryCard` component:

| Name   | Type     | Required | Description                             |
| ------ | -------- | -------- | --------------------------------------- |
| apiary | `Object` | Yes      | An object containing apiary information |

### State

The `ApiaryCard` component has the following states:

| Name     | Type      | Description                                                  |
| -------- | --------- | ------------------------------------------------------------ |
| expand   | `Boolean` | Tracks whether the form for editing the apiary should expand |
| formData | `Object`  | Tracks the form data entered by the user for updating        |

### Methods

The `ApiaryCard` component does not define any methods.

### Handlers

| Name     | Parameters   | Description                                     |
| -------- | ------------ | ----------------------------------------------- |
| onChange | `e`: `Event` | Updates the formData state on form input change |
| onSubmit | `e`: `Event` | Submits the form data to update the apiary      |
| onDelete | `e`: `Event` | Deletes the apiary from the application         |

### Child Components

| Name                  | Package               | Description                                                               |
| --------------------- | --------------------- | ------------------------------------------------------------------------- |
| AddDeviceCard         | `./AddDeviceCard`     | A form for adding a new device to the apiary.                             |
| AddUserCard           | `./AddUserCard`       | A form for adding a new user to the apiary.                               |
| Avatar                | `@mui/material`       | A component for displaying a user's avatar.                               |
| Box                   | `@mui/material`       | A layout component that displays child components in a box.               |
| Button                | `@mui/material`       | A component for displaying a button.                                      |
| Card                  | `@mui/material`       | A component that displays a card.                                         |
| CardActions           | `@mui/material`       | A component for displaying actions in a card.                             |
| CardHeader            | `@mui/material`       | A component for displaying a header in a card.                            |
| Collapse              | `@mui/material`       | A component for animating the expansion and collapse of a card's content. |
| DeviceCard            | `./DeviceCard`        | A card displaying details of a device in the apiary.                      |
| DeviceHubOutlinedIcon | `@mui/icons-material` | An icon component representing a device hub.                              |
| EditOutlinedIcon      | `@mui/icons-material` | An icon component representing an edit button.                            |
| Grid                  | `@mui/material`       | A layout component that displays child components in a grid.              |
| GroupOutlinedIcon     | `@mui/icons-material` | An icon component representing a group.                                   |
| IconButton            | `@mui/material`       | A component for displaying an icon that can be clicked.                   |
| TextField             | `@mui/material`       | A component for displaying a text field that can be used for user input.  |
| Typography            | `@mui/material`       | A component for displaying text.                                          |
| useDispatch           | `react-redux`         | A hook that returns the Redux store's `dispatch` function.                |
| useSelector           | `react-redux`         | A hook that returns a selected value from the Redux store's state.        |
| useState              | `react`               | A hook that allows functional components to use component-level state.    |

### Usage

```jsx
import { ApiaryCard } from "./components";

const apiary = {
  _id: 1,
  name: "My Apiary",
  location: {
    latitude: 43.6532,
    longitude: -79.3832,
    formattedAddress: "Toronto, ON, Canada",
  },
  devices: [
    {
      _id: 1,
      name: "Device 1",
      macAddress: "00:00:00:00:00:01",
    },
    {
      _id: 2,
      name: "Device 2",
      macAddress: "00:00:00:00:00:02",
    },
  ],
  members: [
    {
      user: {
        _id: 1,
        name: "User 1",
        email: "user1@example.com",
      },
      role: "CREATOR",
    },
    {
      user: {
        _id: 2,
        name: "User 2",
        email: "user2@example.com",
      },
      role: "USER",
    },
  ],
};

const App = () => {
  return <ApiaryCard apiary={apiary} />;
};
```

In this example, we will render an `ApiaryCard` component with the provided `apiary` object. Users can edit, delete and update the apiary details by expanding the form using the dropdown arrow button.

## `AutocompleteMaps` Typescript Component

### Description

This component is a wrapper around the `Autocomplete` component from `MUI` that provides an autocomplete feature for locations using _Google Maps API_. The component suggests location results as the user types and selects a location from the options.

### Props

| Name     | Type        | Required | Description                                    |
| -------- | ----------- | -------- | ---------------------------------------------- |
| value    | `PlaceType` | Yes      | The selected location value.                   |
| setValue | `function`  | Yes      | A function to set the selected location value. |

### State

| Name       | Type                   | Description                                                     |
| ---------- | ---------------------- | --------------------------------------------------------------- |
| inputValue | `String`               | The current input value of the Autocomplete component.          |
| options    | `readonly PlaceType[]` | An array of location options fetched from Google Maps API.      |
| loaded     | `Boolean`              | Indicates whether the Google Maps API script has loaded or not. |

### Methods

The `AutocompleteMaps` component does not define any methods.

### Handlers

The `AutocompleteMaps` component does not define any handlers.

### Interfaces

| Name                      | Type        | Description                                                                      |
| ------------------------- | ----------- | -------------------------------------------------------------------------------- |
| MainTextMatchedSubstrings | `interface` | An interface representing the matched substrings in the main text of a location. |
| StructuredFormatting      | `interface` | An interface representing the structured formatting of a location.               |
| PlaceType                 | `interface` | An interface representing a location.                                            |

### Child Components

| Component      | Package               | Description                                                                                                                   |
| -------------- | --------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| Autocomplete   | `@mui/material`       | A component that provides an input field with an autocomplete dropdown, which displays a list of options based on user input. |
| Box            | `@mui/material`       | A component used for creating layout containers that can contain other components.                                            |
| Grid           | `@mui/material`       | A component used for creating grid-based layouts.                                                                             |
| LocationOnIcon | `@mui/icons-material` | An icon component used for indicating a location.                                                                             |
| TextField      | `@mui/material`       | An input field component used for accepting user input.                                                                       |
| Typography     | `@mui/material`       | A component used for displaying text with different styles and variations.                                                    |

### Usage Example

```jsx
import GoogleMaps from "./AutocompleteMaps.tsx";

function MyComponent() {
  const [value, setValue] = React.useState(null);

  return <GoogleMaps value={value} setValue={setValue} />;
}
```

In this example, the `value` prop is the currently selected place, and the `setValue` prop is a function that gets called with the selected place object when a new place is selected. You can pass these props to the `GoogleMaps` component and it will handle the rest.

Note that you'll need to obtain a _Google Maps API_ key and enable the _Places API_ in order to use this component. You can do this by following the instructions in the [Google Maps JavaScript API documentation](https://developers.google.com/maps/gmp-get-started).

## `DeviceCard` React Component

### Description

The `DeviceCard` component is a _React_ component that displays information about a device in a card format. The card displays basic information about the device, including its name, serial number, and a remote link. Users with the appropriate access level can edit or delete the device using the provided buttons.

### Props

| Name     | Type     | Required | Description                                                                   |
| -------- | -------- | -------- | ----------------------------------------------------------------------------- |
| device   | `Object` | Yes      | An object containing information about the device.                            |
| apiary   | `Object` | Yes      | An object containing information about the apiary that the device belongs to. |
| userRole | `String` | Yes      | A string representing the user's role in the system.                          |

### State

| Name     | Type      | Description                                                                     |
| -------- | --------- | ------------------------------------------------------------------------------- |
| expand   | `Boolean` | A boolean value indicating whether the form for editing the device is expanded. |
| formData | `Object`  | An object containing the current form data for editing the device.              |

### Methods

The `DeviceCard` component does not define any methods.

### Handlers

| Name     | Parameters   | Description                                                                |
| -------- | ------------ | -------------------------------------------------------------------------- |
| onChange | `e`: `Event` | A handler function to update the `formData` state when form fields change. |
| onSubmit | `e`: `Event` | A handler function to submit the form for updating the device information. |
| onDelete | `e`: `Event` | A handler function to delete the device.                                   |

### Child Components

| Name             | Package               | Description                                                                                                   |
| ---------------- | --------------------- | ------------------------------------------------------------------------------------------------------------- |
| Avatar           | `@mui/material`       | Displays a circular image or icon that represents a user or entity.                                           |
| Box              | `@mui/material`       | A container component that can be used to group and space out elements.                                       |
| Button           | `@mui/material`       | A component for user interaction, such as triggering an action or event.                                      |
| Card             | `@mui/material`       | A container component that is used to group related content.                                                  |
| CardActions      | `@mui/material`       | A container component for buttons and other action elements that are placed after the main content of a card. |
| CardHeader       | `@mui/material`       | A container component for displaying a header in a Card.                                                      |
| Collapse         | `@mui/material`       | A component that enables a content to be shown or hidden based on its visibility.                             |
| EditOutlinedIcon | `@mui/icons-material` | An icon that represents the edit action.                                                                      |
| Grid             | `@mui/material`       | A responsive grid container used for laying out and aligning elements in a grid system.                       |
| IconButton       | `@mui/material`       | A clickable button that contains an icon.                                                                     |
| TextField        | `@mui/material`       | A component for getting user input from the keyboard.                                                         |
| Typography       | `@mui/material`       | A component for displaying text.                                                                              |
| useDispatch      | `react-redux`         | A hook that returns a reference to the dispatch function that allows you to dispatch actions to the store.    |
| useSelector      | `react-redux`         | A hook that allows you to extract data from the Redux store state.                                            |
| useNavigate      | `react-router-dom`    | A hook that returns a navigation object that allows you to navigate to a different URL.                       |
| useState         | `react`               | A hook that adds state to functional components.                                                              |
| useTheme         | `@mui/material`       | A hook that returns the current theme used by the application.                                                |

### Usage Example

```jsx
import React from "react";
import { DeviceCard } from "./components";

const MyComponent = () => {
  const device = {
    name: "Device 1",
    serial: "123456789",
    remote: "https://example.com/device1",
    _id: "abc123",
  };

  const apiary = {
    name: "My Apiary",
    _id: "def456",
  };

  const userRole = "ADMIN";

  return (
    <div>
      <DeviceCard device={device} apiary={apiary} userRole={userRole} />
    </div>
  );
};
```

In this example, we import the `DeviceCard` component and pass in an object with `device` information, an object with `apiary` information, and the current `userRole`. The component will render the device information in a card format, and the user can click the "Edit" button to expand the form for editing the device information or the "Delete" button to delete the device.

## `FAQCard` React Component

### Description

The `FAQCard` component renders a card with an FAQ (Frequently Asked Questions) question and an expandable answer section. The answer section can be toggled by clicking on an arrow icon.

### Props

| Name | Type                          | Required | Description                                                                                                                                 |
| ---- | ----------------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| faq  | `List` of `List` of `Strings` | Yes      | An array that contains the question and the answer of the FAQ item. The first element is the question and the second element is the answer. |

### State

| Name   | Type      | Description                                              |
| ------ | --------- | -------------------------------------------------------- |
| expand | `Boolean` | Indicates whether the answer section is expanded or not. |

### Methods

The `FAQCard` component does not define any methods.

### Handlers

The `FAQCard` component does not define any event handlers.

### Child Components

| Name        | Package         | Description                                                    |
| ----------- | --------------- | -------------------------------------------------------------- |
| Avatar      | `@mui/material` | An avatar component used for displaying an icon.               |
| Box         | `@mui/material` | A component for grouping and organizing content.               |
| Card        | `@mui/material` | A card component that displays the FAQ question and answer.    |
| CardActions | `@mui/material` | A component that holds the action buttons in the card header.  |
| CardHeader  | `@mui/material` | A component that holds the card title and avatar.              |
| Collapse    | `@mui/material` | A component that displays the answer section when expanded.    |
| Grid        | `@mui/material` | A grid component used for layout.                              |
| IconButton  | `@mui/material` | An icon button component used for toggling the answer section. |
| Typography  | `@mui/material` | A component for displaying text.                               |
| useTheme    | `@mui/material` | A hook that provides access to the current theme object.       |

### Usage Example

```jsx
import FAQCard from "./components/FAQCard";

const App = () => {
  const faqList = [
    [
      "What is React?",
      "React is a JavaScript library for building user interfaces.",
    ],
    [
      "What is JSX?",
      "JSX is a syntax extension for JavaScript that allows you to write HTML-like code in your JavaScript files.",
    ],
  ];

  return (
    <div>
      {faqList.map((faq, index) => (
        <FAQCard key={index} faq={faq} />
      ))}
    </div>
  );
};
```

In this example, we pass a list of FAQs to the `FAQCard` component as a prop. The component renders a `Card` for each FAQ, displaying the question as the title and an expand/collapse button. When the button is clicked, the answer is displayed in the `Collapse` component.

## `Graph` React Component

### Description

The `Graph` component built with _React_ and _Recharts_ displays data from a device in an area chart.

### Props

| Name   | Type     | Required | Description                                |
| ------ | -------- | -------- | ------------------------------------------ |
| device | `Object` | No       | An object that contains device data points |

### State

The `Graph` component does not have any state.

### Methods

The `Graph` component does not define any methods.

### Handlers

The `Graph` component does not define any handlers.

### Child Components

| Name                | Package         | Description                                                                                   |
| ------------------- | --------------- | --------------------------------------------------------------------------------------------- |
| Area                | `recharts`      | An area component from Recharts that renders the area fill of the chart.                      |
| AreaChart           | `recharts`      | An area chart from Recharts that displays data points in an area format.                      |
| Box                 | `@mui/material` | A box component from Material-UI that wraps the tooltip content.                              |
| CartesianGrid       | `recharts`      | A cartesian grid component from Recharts that displays grid lines on the chart.               |
| Legend              | `recharts`      | A legend component from Recharts that displays a legend for the chart.                        |
| ResponsiveContainer | `recharts`      | A container element from Recharts that sets the chart size to be responsive to its container. |
| Tooltip             | `recharts`      | A tooltip component from Recharts that displays a tooltip when hovering over a data point.    |
| Typography          | `@mui/material` | A typography component from Material-UI that renders the date and data values in the tooltip. |
| XAxis               | `recharts`      | An x-axis component from Recharts that renders the horizontal axis of the chart.              |
| YAxis               | `recharts`      | A y-axis component from Recharts that renders the vertical axis of the chart.                 |

### Usage

```jsx
import Graph from "./Graph";

function MyComponent() {
  const device = {
    /* data for chart */
  };

  return <Graph device={device} />;
}
```

In this example, the `Graph` component is passed a `device` object as a prop. The `device` object contains the data for the chart.

## `Loading` React Component

### Description

The `Loading` component displays a circular progress indicator from the Material-UI library.

### Props

The `Loading` component does not accept any props.

### State

The `Loading` component does not use any internal state.

### Methods

The `Loading` component does not define any methods.

### Child Components

The `Loading` component does not have any child components.

### Usage Example

```jsx
import React from "react";
import Loading from "./Loading";

function MyComponent() {
  return (
    <div>
      <h1>Loading Example</h1>
      <Loading />
    </div>
  );
}

export default MyComponent;
```

In this example, the `Loading` component is used to display a loading spinner.

## `Sidebar` React Component

### Description

The `Sidebar` component implements a sidebar for navigation. It uses the `react-pro-sidebar` and `@mui/material` packages. The sidebar consists of a menu with several items and submenus, and it displays information related to the user's apiaries and devices.

### Props

The `Sidebar` component does not accept any props.

### State

| Name        | Type      | Description                                            |
| ----------- | --------- | ------------------------------------------------------ |
| isCollapsed | `Boolean` | Controls whether the sidebar is collapsed or expanded. |
| selected    | `String`  | The name of the currently selected item.               |

### Methods

The `Sidebar` component does not define any methods.

### Handlers

| Name           | Parameters | Description                      |
| -------------- | ---------- | -------------------------------- |
| setIsCollapsed | `Boolean`  | Updates the `isCollapsed` state. |
| setSelected    | `String`   | Updates the `selected` state.    |

### Child Components

| Name                      | Package                | Description                                                                                                            |
| ------------------------- | ---------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `Avatar`                  | `@mui/material`        | A component that displays an avatar image.                                                                             |
| `Backdrop`                | `@mui/material`        | A component that provides a dark overlay behind the content to indicate that the content is disabled or not available. |
| `Box`                     | `@mui/material`        | A layout component that can be used to create a container with a specified width, height, padding, and margin.         |
| `createTheme`             | `@mui/material/styles` | A function that creates a custom theme for the application.                                                            |
| `HelpOutlineOutlinedIcon` | `@mui/icons-material`  | An icon component that displays a help icon.                                                                           |
| `HomeOutlinedIcon`        | `@mui/icons-material`  | An icon component that displays a home icon.                                                                           |
| `HiveOutlinedIcon`        | `@mui/icons-material`  | An icon component that displays a hive icon.                                                                           |
| `IconButton`              | `@mui/material`        | A button component that displays an icon.                                                                              |
| `InfoOutlinedIcon`        | `@mui/icons-material`  | An icon component that displays an info icon.                                                                          |
| `Menu`                    | `react-pro-sidebar`    | A component that renders a menu in the sidebar.                                                                        |
| `MenuItem`                | `react-pro-sidebar`    | A clickable menu item in the sidebar.                                                                                  |
| `MenuOutlinedIcon`        | `@mui/icons-material`  | An icon component that displays a menu icon.                                                                           |
| `ProSidebar`              | `react-pro-sidebar`    | A sidebar component that provides a layout for the sidebar. It can be collapsed or expanded by the user.               |
| `SettingsOutlinedIcon`    | `@mui/icons-material`  | An icon component that displays a settings icon.                                                                       |
| `SidebarContent`          | `react-pro-sidebar`    | A component that displays the content of the sidebar.                                                                  |
| `SidebarFooter`           | `react-pro-sidebar`    | A component that displays a footer at the bottom of the sidebar.                                                       |
| `SidebarHeader`           | `react-pro-sidebar`    | A component that displays a header at the top of the sidebar.                                                          |
| `SubMenu`                 | `react-pro-sidebar`    | A submenu that displays nested menus in the sidebar.                                                                   |
| `Typography`              | `@mui/material`        | A component that displays text.                                                                                        |
| `useDispatch`             | `react-redux`          | A hook that returns a reference to the `dispatch` function of the Redux store.                                         |
| `useSelector`             | `react-redux`          | A hook that returns a selected value from the Redux store.                                                             |
| `useTheme`                | `@mui/material/styles` | A hook that returns the current theme of the application.                                                              |

### Usage Example

```jsx
import { Sidebar } from "./components";

const App = () => {
  return (
    <div>
      <Sidebar />
    </div>
  );
};
```

In this example, the `Sidebar` component is imported and used within a parent component. When rendered, it will display a sidebar with several menu items and submenus. The user's apiaries and devices will be shown in the corresponding submenus, which can be clicked to navigate to the corresponding pages. The sidebar can be collapsed and expanded by clicking on the button in the top left corner.

## `Topbar` React Component

### Description

The `Topbar` component is a customizable top navigation bar that can be used in a _React_ application. It includes icons for toggling between light and dark mode, viewing notifications (no implementation), accessing settings, and logging out. The component can display the title of the page or section it represents.

### Props

| Name  | Type     | Required | Description                                 |
| ----- | -------- | -------- | ------------------------------------------- |
| title | `String` | no       | The title of the page or section to display |

### State

The `Topbar` component does not define any state.

### Methods

The `Topbar` component does not define any methods.

### Handlers

| Name      | Parameters | Description                                           |
| --------- | ---------- | ----------------------------------------------------- |
| onLogout  | None       | Logs out the current user and redirects to login page |
| colorMode | None       | Toggles the color mode between light and dark mode    |

### Child Components

| Name                      | Package                          | Description                                                                                              |
| ------------------------- | -------------------------------- | -------------------------------------------------------------------------------------------------------- |
| Box                       | `@mui/material`                  | A basic layout component that provides a flexible container for grouping and arranging other components. |
| IconButton                | `@mui/material`                  | A button component that displays an icon.                                                                |
| useTheme                  | `@mui/material`                  | A hook that returns the current theme object.                                                            |
| Typography                | `@mui/material`                  | A component that renders text in various styles and sizes.                                               |
| Avatar                    | `@mui/material`                  | A component that displays a user's profile picture or initials.                                          |
| Grid                      | `@mui/material`                  | A component that provides a responsive grid layout for arranging components.                             |
| LightModeOutlinedIcon     | `@mui/material`                  | An icon component that displays an outline of a light bulb for switching to light mode.                  |
| DarkModeOutlinedIcon      | `@mui/material`                  | An icon component that displays an outline of a light bulb for switching to dark mode.                   |
| NotificationsOutlinedIcon | `@mui/material`                  | An icon component that displays a bell icon for showing notifications.                                   |
| SettingsOutlinedIcon      | `@mui/material`                  | An icon component that displays a gear icon for opening the settings.                                    |
| LogoutOutlinedIcon        | `@mui/material`                  | An icon component that displays a door with an arrow icon for logging out.                               |
| useContext                | `react`                          | A hook that provides access to a context object.                                                         |
| ColorModeContext          | `../theme`                       | A context object that provides the current color mode and a method to toggle the color mode.             |
| logout                    | `../features/auth/auth.slice.js` | An action creator that dispatches an action to log out the user.                                         |
| reset                     | `../features/auth/auth.slice.js` | An action creator that dispatches an action to reset the auth state.                                     |
| Link                      | `react-router-dom`               | A component that provides a declarative way to navigate to a different page.                             |
| useNavigate               | `react-router-dom`               | A hook that returns a navigate function for programmatic navigation.                                     |
| useSelector               | `react-redux`                    | A hook that returns selected parts of the state from the Redux store.                                    |
| useDispatch               | `react-redux`                    | A hook that returns a reference to the dispatch function from the Redux store.                           |

### Usage

```jsx
import Topbar from "./Topbar";

function MyPage() {
  return (
    <div>
      <Topbar title="My Page Title" />
      <p>This is the content of the page.</p>
    </div>
  );
}
```

In this example, the `Topbar` component is displayed at the top of the `MyPage` component with the title "My Page Title". The `p` tag below it represents the rest of the page content. The `Topbar` component can be customized with _CSS_ styling or _MUI_ theming.

## `UserCard` React Component

### Description

The `UserCard` component is a card component that displays user information and allows for editing user roles and deleting users.

### Props

| Name   | Type     | Required | Description                            |
| ------ | -------- | -------- | -------------------------------------- |
| user   | `Object` | Yes      | The user object to be displayed.       |
| apiary | `Object` | Yes      | The apiary object the user belongs to. |

### State

| Name     | Type      | Description                                                             |
| -------- | --------- | ----------------------------------------------------------------------- |
| expand   | `Boolean` | A state variable that determines if the card should be expanded or not. |
| formData | `Object`  | A state variable that holds the user's data to be edited.               |

### Methods

| Name     | Parameters   | Description                                                         |
| -------- | ------------ | ------------------------------------------------------------------- |
| onChange | `e`: `Event` | A function that handles form data changes.                          |
| onSubmit | `e`: `Event` | A function that handles the form submission for updating user data. |
| onDelete | `e`: `Event` | A function that handles the form submission for deleting a user.    |

### Child Components

| Name             | Package         | Description                                               |
| ---------------- | --------------- | --------------------------------------------------------- |
| Avatar           | `@mui/material` | Displays the user's avatar.                               |
| Box              | `@mui/material` | Wraps the forms and aligns the editing menu.              |
| Button           | `@mui/material` | Submits the form for saving changes or deleting the user. |
| Card             | `@mui/material` | Wraps the user's information.                             |
| CardActions      | `@mui/material` | Displays the edit icon to open the editing menu.          |
| CardHeader       | `@mui/material` | Displays the user's name, email, and avatar.              |
| Checkbox         | `@mui/material` | Allows for toggling between user roles.                   |
| Collapse         | `@mui/material` | Collapses the editing menu.                               |
| FormControlLabel | `@mui/material` | Displays a label for the Checkbox.                        |
| Grid             | `@mui/material` | Wraps the edit icon for proper alignment.                 |
| IconButton       | `@mui/material` | The button component for the edit icon.                   |
| Typography       | `@mui/material` | Displays the user's name and email.                       |

### Usage Example

```jsx
import UserCard from "./components/UserCard";

const MyComponent = () => {
  const apiary = {
    _id: "1",
    name: "My Apiary",
    members: [
      {
        user: {
          _id: "2",
          name: "John Doe",
          email: "johndoe@example.com",
        },
        role: "ADMIN",
      },
      {
        user: {
          _id: "3",
          name: "Jane Smith",
          email: "janesmith@example.com",
        },
        role: "USER",
      },
    ],
  };

  return (
    <div>
      <UserCard user={apiary.members[0]} apiary={apiary} />
      <UserCard user={apiary.members[1]} apiary={apiary} />
    </div>
  );
};
```

In this example, the `UserCard` component is used to display user information for two different members of the same apiary. The component is passed the user object and apiary object as props. When the edit icon is clicked, the editing menu is displayed, allowing the user's role to be changed or the user to be deleted.

# Features

## Apiary

### `apiary.slice`

#### Description

This _Redux_ slice file manages the state related to Apiaries. The file contains a set of initial states, action creators and their respective reducer cases to handle the apiaries _CRUD_ operations. The file also integrates with the `apiaryService` module to perform the actual API calls.

#### Initial States

| Name      | Type      | Description                                                                   |
| --------- | --------- | ----------------------------------------------------------------------------- |
| apiaries  | `Array`   | A list of objects representing the user's apiaries.                           |
| isError   | `Boolean` | Indicates if an error occurred while processing a request.                    |
| isSuccess | `Boolean` | Indicates if a request was processed successfully.                            |
| isLoading | `Boolean` | Indicates if a request is in progress.                                        |
| message   | `String`  | A message that provides additional information about the status of a request. |

#### Actions

| Name         | Description                                                                           |
| ------------ | ------------------------------------------------------------------------------------- |
| getApiaries  | This action creator dispatches an API call to retrieve a list of user apiaries.       |
| setApiary    | This action creator dispatches an API call to create a new apiary for the user.       |
| updateApiary | This action creator dispatches an API call to update an existing apiary.              |
| deleteApiary | This action creator dispatches an API call to delete an existing apiary.              |
| setDevice    | This action creator dispatches an API call to create a new device for an apiary.      |
| updateDevice | This action creator dispatches an API call to update an existing device of an apiary. |
| deleteDevice | This action creator dispatches an API call to delete an existing device of an apiary. |
| setMember    | This action creator dispatches an API call to create a new member for an apiary.      |
| updateMember | This action creator dispatches an API call to update an existing member of an apiary. |

#### Reducer Cases

| Case                   | apiaries                  | isError | isSuccess | isLoading | message                       |
| ---------------------- | ------------------------- | ------- | --------- | --------- | ----------------------------- |
| getApiaries.pending    | -                         | `false` | `false`   | `true`    | "Loading"                     |
| getApiaries.fulfilled  | Action payload (apiaries) | `false` | `true`    | `false`   | "Loaded successfully"         |
| getApiaries.rejected   | -                         | `true`  | `false`   | `false`   | "Error while loading"         |
| setApiary.pending      | -                         | `false` | `false`   | `true`    | "Creating new apiary"         |
| setApiary.fulfilled    | -                         | `false` | `true`    | `false`   | "Apiary created successfully" |
| setApiary.rejected     | -                         | `true`  | `false`   | `false`   | "Error while creating apiary" |
| updateApiary.pending   | -                         | `false` | `false`   | `true`    | "Updating apiary"             |
| updateApiary.fulfilled | -                         | `false` | `true`    | `false`   | "Apiary updated successfully" |
| updateApiary.rejected  | -                         | `true`  | `false`   | `false`   | "Error while updating apiary" |
| deleteApiary.pending   | -                         | `false` | `false`   | `true`    | "Deleting apiary"             |
| deleteApiary.fulfilled | -                         | `false` | `true`    | `false`   | "Apiary deleted successfully" |
| deleteApiary.rejected  | -                         | `true`  | `false`   | `false`   | "Error while deleting apiary" |
| setDevice.pending      | -                         | `false` | `false`   | `true`    | "Creating new device"         |
| setDevice.fulfilled    | -                         | `false` | `true`    | `false`   | "Device created successfully" |
| setDevice.rejected     | -                         | `true`  | `false`   | `false`   | "Error while creating device" |
| updateDevice.pending   | -                         | `false` | `false`   | `true`    | "Updating device"             |
| updateDevice.fulfilled | -                         | `false` | `true`    | `false`   | "Device updated successfully" |
| updateDevice.rejected  | -                         | `true`  | `false`   | `false`   | "Error while updating device" |
| deleteDevice.pending   | -                         | `false` | `false`   | `true`    | "Deleting device"             |
| deleteDevice.fulfilled | -                         | `false` | `true`    | `false`   | "Device deleted successfully" |
| deleteDevice.rejected  | -                         | `true`  | `false`   | `false`   | "Error while deleting device" |

### `apiary.service`

This _Redux_ service file contains a set of functions that perform the actual API calls to the backend. The file also contains a set of functions that handle the response of the API calls and dispatch the appropriate actions to update the state of the `apiary.slice` file.

#### Functions

| Function     | Parameters            | Description                                                                      |
| ------------ | --------------------- | -------------------------------------------------------------------------------- |
| getApiaries  | `token`               | Retrieves the list of Apiaries associated with the authenticated user's token.   |
| setApiary    | `apiaryData`, `token` | Creates a new Apiary with the given data and token.                              |
| updateApiary | `apiaryData`, `token` | Updates an existing Apiary with the given data and token.                        |
| deleteApiary | `apiaryData`, `token` | Deletes an Apiary with the given data and token.                                 |
| setDevice    | `apiaryData`, `token` | Sets a new device for an existing Apiary with the given data and token.          |
| updateDevice | `apiaryData`, `token` | Updates an existing device for an existing Apiary with the given data and token. |
| deleteDevice | `apiaryData`, `token` | Deletes an existing device for an existing Apiary with the given data and token. |
| setMember    | `userData`, `token`   | Sets a new member for an existing Apiary with the given data and token.          |
| updateMember | `userData`, `token`   | Updates an existing member for an existing Apiary with the given data and token. |
| deleteMember | `userData`, `token`   | Deletes an existing member for an existing Apiary with the given data and token. |

## Auth

### `auth.slice`

#### Description

This _Redux_ slice file defines the `auth` slice for managing authentication-related state. It uses the `createSlice` and `createAsyncThunk` functions from the `@reduxjs/toolkit` package to define the initial state, actions, and reducer cases.

#### Initial State

| Name      | Type               | Description                                                             |
| --------- | ------------------ | ----------------------------------------------------------------------- |
| user      | `Object` or `Null` | The currently logged in user, retrieved from local storage.             |
| isError   | `Boolean`          | Indicates whether an error occurred during an async operation.          |
| isSuccess | `Boolean`          | Indicates whether an async operation was successful.                    |
| isLoading | `Boolean`          | Indicates whether an async operation is currently in progress.          |
| message   | `String`           | An error message or success message associated with an async operation. |

#### Actions

| Name     | Description                                  |
| -------- | -------------------------------------------- |
| register | Async action that registers a user.          |
| login    | Async action that logs in a user.            |
| logout   | Async action that logs out the current user. |
| reset    | Action that resets the authentication state. |

#### Reducer Cases

| Case               | User                  | Error                          | Success | Loading | Message                        |
| ------------------ | --------------------- | ------------------------------ | ------- | ------- | ------------------------------ |
| register.pending   | -                     | -                              | -       | `true`  | -                              |
| register.fulfilled | Action payload (user) | -                              | `true`  | `false` | -                              |
| register.rejected  | -                     | Action payload (error message) | -       | `false` | Action payload (error message) |
| login.pending      | -                     | -                              | -       | `true`  | -                              |
| login.fulfilled    | Action payload (user) | -                              | `true`  | `false` | -                              |
| login.rejected     | -                     | Action payload (error message) | -       | `false` | Action payload (error message) |
| logout.fulfilled   | -                     | -                              | -       | -       | -                              |

Note: In the reducer cases table, the `Action payload` column refers to the value returned by the corresponding async action.

### `auth.service`

#### Description

This _Redux_ service file contains a set of functions that perform the actual API calls to the backend. The file also contains a set of functions that handle the response of the API calls and dispatch the appropriate actions to update the state of the `auth.slice` file.

#### Functions

| Function | Parameters | Description                                                                                                                                                                                                                                                                                   |
| -------- | ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| register | `userData` | Registers a new user with the provided user data. The `userData` parameter should be an object that includes the user's email, username, and password. If the registration is successful, the user's information will be saved to local storage. Returns the response data from the server.   |
| login    | `userData` | Authenticates a user with the provided user data. The `userData` parameter should be an object that includes the user's email and password. If the user has selected the "Remember Me" checkbox, their information will be saved to local storage. Returns the response data from the server. |
| logout   | -          | Removes the user's information from local storage, effectively logging them out.                                                                                                                                                                                                              |

# Pages

## `About` React Page

### Description

The `About` Page displays information about the project and the team behind it.

### Props

The `About` component does not receive any props.

### State

The `About` component does not have any state.

### Methods

The `About` component does not define any methods.

### Handlers

The `About` component does not define any handlers.

### Child Components

| Component Name   | Package                   | Description                                                                                                                                                        |
| ---------------- | ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| AboutCard        | `../components/AboutCard` | A custom component that displays a statement and its description in a card format.                                                                                 |
| Avatar           | `@mui/material`           | A circular component that represents a user or object. It can display an image, icon, or text.                                                                     |
| Backdrop         | `@mui/material`           | A component that provides a dark overlay behind other components. It is often used to indicate that a process is running in the background.                        |
| Box              | `@mui/material`           | A container component that can contain other MUI components or HTML elements. It provides various layout options such as flexbox and grid.                         |
| Fade             | `@mui/material`           | A transition component that animates the appearance of an element by gradually fading it in or out.                                                                |
| Grid             | `@mui/material`           | A responsive grid container that can hold other MUI components or HTML elements. It allows for customization of column and row spacing for different screen sizes. |
| Grow             | `@mui/material`           | A transition component that animates the appearance of an element by gradually increasing its size.                                                                |
| InfoOutlinedIcon | `@mui/material`           | An MUI icon component that displays an "info" icon.                                                                                                                |
| Typography       | `@mui/material`           | A component for displaying text. It supports various typography styles such as headings, body text, and captions.                                                  |
| useDispatch      | `react-redux`             | A hook that provides access to the dispatch function of the Redux store. It can be used to dispatch actions to update the state.                                   |
| useEffect        | `react`                   | A hook that runs a side effect after rendering. It is used to perform actions such as updating the state or making API requests.                                   |
| useNavigate      | `react-router-dom`        | A hook that provides access to the navigation object. It can be used to navigate to different pages in the application.                                            |
| useSelector      | `react-redux`             | A hook that provides access to the state of the Redux store. It can be used to retrieve data from the store.                                                       |
| useTheme         | `@mui/material`           | A hook that provides access to the current theme object. It can be used to customize the styling of MUI components.                                                |
| tokens           | `../theme`                | An object that provides color values based on the current theme. It is used to customize the styling of non-MUI components.                                        |

### Usage Example

```jsx
import About from "../pages/About";

const App = () => {
  return (
    <div>
      <About />
    </div>
  );
};
```

In this example, the renders the `About` component which displays information about the project and the team behind it.

## Component Documentation: Dashboard

The `Dashboard` component is a React functional component that renders a dashboard with multiple sections. It displays data related to an `apiary` and a `device` selected from the user's account. The component uses various hooks such as `useSelector`, `useDispatch`, `useTheme`, and `useState` to retrieve data and manage the component's state.

### Props

The `Dashboard` component does not have any props.

### State

The `Dashboard` component has the following state variables:

| Name   | Type     | Description                                  |
| ------ | -------- | -------------------------------------------- |
| apiary | `String` | Stores the currently selected `apiary` name. |
| device | `String` | Stores the currently selected `device` name. |

### Methods

The `Dashboard` component does not define any methods.

### Handlers

The `Dashboard` component does not define any handlers.

### Child Components

The `Dashboard` component renders the following child components:

| Name         | Package               | Description                                                                                            |
| ------------ | --------------------- | ------------------------------------------------------------------------------------------------------ |
| SelectApiary | `./Dashboard`         | A custom select component that allows the user to choose an `apiary` and `device` to display data for. |
| Graph        | `../components/Graph` | A custom component that displays a graph of data for the selected `device`.                            |

### Usage Example

```jsx
import Dashboard from "./Dashboard";

function App() {
  return (
    <div>
      <Dashboard />
    </div>
  );
}
```

The `Dashboard` component can be used within any other React component, and will display the dashboard with the default styling and data. The user can select an `apiary` and `device` from the `SelectApiary` component to display relevant data for the selected items. The `Graph` component displays data related to the selected `device`.

## `FAQ` React Page

### Description

The `FAQ` page renders a frequently asked questions page. It displays a list of FAQ cards, each with a questions and their corresponding answer.

### Props

The `FAQ` page does not receive any props.

### State

The `FAQ` page does not have any state.

### Methods

The `FAQ` page does not define any methods.

### Handlers

The `FAQ` page does not define any handlers.

### Child Components

| Name                    | Package                 | Description                                                                |
| ----------------------- | ----------------------- | -------------------------------------------------------------------------- |
| Box                     | `@mui/material`         | A container component used for grouping and spacing elements               |
| Grid                    | `@mui/material`         | A responsive layout component used for aligning and distributing elements  |
| Typography              | `@mui/material`         | A component for displaying text with customizable typography               |
| Avatar                  | `@mui/material`         | A component for displaying user avatars or icons                           |
| useTheme                | `@mui/material`         | A hook that provides access to the MUI theme object                        |
| HiveOutlinedIcon        | `@mui/icons-material`   | An icon component for displaying a hive outline                            |
| tokens                  | `../theme`              | A module that exports a function returning theme tokens                    |
| Loading                 | `../components/Loading` | A component for displaying a loading animation                             |
| useDispatch             | `react-redux`           | A hook that returns the Redux store's dispatch method                      |
| useSelector             | `react-redux`           | A hook that returns selected state from the Redux store                    |
| useEffect               | `react`                 | A hook that allows performing side effects in function components          |
| useNavigate             | `react-router-dom`      | A hook that returns a navigate function to use for programmatic navigation |
| HelpOutlineOutlinedIcon | `@mui/icons-material`   | An icon component for displaying a help outline                            |
| FAQCard                 | `../components/FAQCard` | A component that displays a question and answer card                       |
| toast                   | `react-toastify`        | A module for displaying toast notifications                                |
| Grow                    | `@mui/material`         | A component for animating element growth                                   |
| Fade                    | `@mui/material`         | A component for animating element opacity                                  |
| Backdrop                | `@mui/material`         | A component for displaying a translucent background overlay                |

## `Login` React Page

### Description

The `Login` page allows users to log into an application. The component receives user inputs of `email`, `password`, and `isChecked`. It dispatches a login action with the input data to authenticate users via the `auth.slice.js` module. It also displays a loading spinner while the authentication is in progress.

### Props

The `Login` component does not accept any props.

### State

| Name       | Type      | Description                                                                                         |
| ---------- | --------- | --------------------------------------------------------------------------------------------------- |
| `trans`    | `Boolean` | A state variable that determines whether to transition to another view.                             |
| `formData` | `Object`  | A state variable that stores the user's input data, including `email`, `password`, and `isChecked`. |

### Methods

The `Login` page does not define any methods.

### Handlers

| Name        | Parameters   | Description                                                                                          |
| ----------- | ------------ | ---------------------------------------------------------------------------------------------------- |
| handleTrans | -            | A function that toggles the `trans` state to transition to another view.                             |
| onChange    | `e`: `Event` | A function that updates the `formData` state with the new user input data.                           |
| onSubmit    | `e`: `Event` | A function that dispatches the login action with the `formData` state data to authenticate the user. |

### Child Components

| Name    | Package         | Description                                                      |
| ------- | --------------- | ---------------------------------------------------------------- |
| Loading | `../components` | A spinner that displays while the authentication is in progress. |

### Usage Example

```jsx
import React from "react";
import Login from "./Login";

const App = () => {
  return <Login />;
};

export default App;
```

In this example, we import the `Login` component and render it in the `App` component. This will display the login form to the user.

## `Manage` Component

### Description

The `Manage` page allows users to manage their apiaries. It displays a list of existing apiaries that the user has access to, and allows the user to create new apiaries, edit existing apiaries, and delete apiaries. Within each apiary card, the user can view the apiary's devices/members, add new devices/members, edit existing devices/members, and delete devices/members.

### Props

The `Manage` component does not receive any props.

### State

The `Manage` component does not have any state.

### Methods

The `Manage` component does not define any methods.

### Handlers

The `Manage` component does not define any handlers.

### Child Components

| Name          | Package                       | Description                                                             |
| ------------- | ----------------------------- | ----------------------------------------------------------------------- |
| Loading       | `../components/Loading`       | Displays a loading spinner while data is being fetched from the server. |
| UserCard      | `../components/UserCard`      | Displays information about the user.                                    |
| DeviceCard    | `../components/DeviceCard`    | Displays information about a device.                                    |
| ApiaryCard    | `../components/ApiaryCard`    | Displays information about an apiary.                                   |
| AddApiaryCard | `../components/AddApiaryCard` | Displays a form for adding a new apiary.                                |

### Usage

```jsx
import Manage from "./Manage";

function MyComponent() {
  return (
    <div>
      <Manage />
    </div>
  );
}
```

In this example, the `Manage` component will display a list of existing apiaries, along with a form for adding a new apiary. If the user is not logged in, they will be redirected to the login page. If there is an error fetching data from the server, an error message will be displayed. If data is being fetched from the server, a loading spinner will be displayed.

## `Register` Page

### Description

The `Register` component is a form that allows users to register for a new account. This component is built using React and various components from the Material UI library. It relies on the Redux store to handle user authentication and makes use of React Router DOM to handle navigation.

### Props

The `Register` component does not accept any props.

### State

| Name     | Type      | Description                                                                     |
| -------- | --------- | ------------------------------------------------------------------------------- |
| formData | `Object`  | An object containing the form data for registration                             |
| trans    | `Boolean` | A boolean value indicating whether the component should be displayed or hidden. |

### Methods

| Name     | Parameters   | Description                                                           |
| -------- | ------------ | --------------------------------------------------------------------- |
| onChange | `e`: `Event` | A callback function that updates the state with the new form data.    |
| onSubmit | `e`: `Event` | A callback function that submits the registration form to the server. |

### Handlers

The `Register` component does not define any handlers.

### Child Components

| Name             | Package               | Description                                                                          |
| ---------------- | --------------------- | ------------------------------------------------------------------------------------ |
| Avatar           | `@mui/material`       | A Material UI component used to display an avatar icon.                              |
| Backdrop         | `@mui/material`       | A Material UI component used to create a backdrop.                                   |
| Box              | `@mui/material`       | A Material UI component used to create a layout container.                           |
| Button           | `@mui/material`       | A Material UI component used to render the "Sign Up" button.                         |
| Container        | `@mui/material`       | A Material UI component used to create a responsive container.                       |
| CssBaseline      | `@mui/material`       | A Material UI component used to reset the CSS styles to a consistent baseline.       |
| Fade             | `@mui/material`       | A Material UI component used to create a fade transition.                            |
| FilledInput      | `@mui/material`       | A Material UI component used to create an input with filled background.              |
| Grid             | `@mui/material`       | A Material UI component used to create a responsive grid.                            |
| Grow             | `@mui/material`       | A Material UI component used to create a grow transition.                            |
| Link             | `@mui/material`       | A Material UI component used to render a link to the login page.                     |
| LockOutlinedIcon | `@mui/icons-material` | A Material UI component used to display a lock icon.                                 |
| Loading          | `../components`       | A component that displays a loading spinner when the registration form is submitted. |
| TextField        | `@mui/material`       | A Material UI component used to display and handle text input.                       |
| ThemeProvider    | `@mui/material`       | A Material UI component used to provide a theme to the application.                  |
| toast            | `react-toastify`      | A third-party library used to display toast notifications.                           |
| Typography       | `@mui/material`       | A Material UI component used to display text.                                        |

### Usage

```jsx
import React from "react";
import Register from "./components/Register";

const App = () => {
  return <Register />;
};

export default App;
```

In this example, the `Register` component is imported and rendered in the main `App` component. When the user navigates to the "/register" route, the `Register` component will be displayed, allowing them to create a new account.

# Deployment (Jonathan)

Explain how to deploy the application, including any server requirements and deployment steps.

# Testing (TBD)

Testing has been manual. Outline how to test the application, including any testing frameworks or methodologies used.

# License

Property of Santa Clara University under SCU's Senior Design Program

# Acknowledgments

Special thanks to Kian Nizkad, Wendy Mather, and Gerhard and Lisa Eschelbeck for their continued support on this project's creative direction and design decisions.

# Appendix

Include any additional information or resources, such as troubleshooting tips or frequently asked questions.

# Screenshots

- Manage
- Dashboard
- Manage opened
- FAQ

# Video Demo

- Upload final video demo

# Contact

- Any questions regarding the web application, please contact **cpaiz@scu.edu** or **paizcollin@gmail.com**
- Any questions regarding deployment, please contact **jstock@scu.edu**
- Any questions regarding hardware, please contact **ewrysinski@scu.edu** and **dblanc@scu.edu**
