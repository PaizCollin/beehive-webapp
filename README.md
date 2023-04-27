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

# `App`

## Description

The `App` component is the root component of the application. It is responsible for rendering the application's navigation bar and routing the user to the appropriate page based on the URL.

# `index.js`

## Description

The `index` file is the entry point of the application. It renders the `App` component and wraps it in a `BrowserRouter` component to enable routing.

# `index.css`

## Fonts

This stylesheet imports the "Poppins" font family from Google Fonts with three weights - 400 (regular), 600 (semi-bold), and 700 (bold) - and the display property set to "swap".

```
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap");
```

## Height, Width and Font

The stylesheet applies 100% height and width to the `html`, `body`, `#root`, `.app`, and `.content` selectors, and uses the "Poppins" font family as the default font for these elements.

```
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

```
.app {
  display: flex;
  position: relative;
}
```

## Scrollbar Styling

The stylesheet applies custom styling to the scrollbar using the WebKit CSS scrollbar pseudo-elements. The width of the scrollbar is set to 10px, the track color is set to #e0e0e0, and the handle color is set to #888. On hover, the track color changes to #555.

```
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

```
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

This code snippet configures a Redux store using @reduxjs/toolkit. It uses two slices, auth and apiary, to manage state related to user authentication and the application's apiary feature.

# Components

## `AboutCard` React Component

The `AboutCard` component is a reusable component that displays an information card with a title, avatar, and expandable content. It is used in the `About` page to display information regarding the project.

### Props

| Name | Type  | Required | Description                                                                                          |
| ---- | ----- | -------- | ---------------------------------------------------------------------------------------------------- |
| faq  | array | Yes      | An array of two strings: the title of the card and the content to display when the card is expanded. |

### State

| Name   | Type    | Description                                           |
| ------ | ------- | ----------------------------------------------------- |
| expand | boolean | Determines whether the card is expanded or collapsed. |

### Methods

The `AboutCard` component does not define any methods.

### Handlers

The `AboutCard` component does not define any handlers.

### Child Components

| Name                        | Package               | Description                                                     |
| --------------------------- | --------------------- | --------------------------------------------------------------- |
| `Grid`                      | `@mui/material`       | A layout component that helps to organize content in a grid     |
| `Avatar`                    | `@mui/material`       | A component that represents a user or entity                    |
| `Card`                      | `@mui/material`       | A container component that displays information                 |
| `CardActions`               | `@mui/material`       | A component that provides space for buttons or icons            |
| `CardHeader`                | `@mui/material`       | A component that displays a header for a card                   |
| `Collapse`                  | `@mui/material`       | A component that animates the expansion or collapse of content  |
| `IconButton`                | `@mui/material`       | A button component that displays an icon                        |
| `Typography`                | `@mui/material`       | A component that displays text content                          |
| `useTheme`                  | `@mui/material`       | A hook that provides access to the current theme                |
| `Box`                       | `@mui/material`       | A component that provides a flexible container for content      |
| `ArrowDropDownOutlinedIcon` | `@mui/icons-material` | An icon component that represents a downward-pointing arrow     |
| `InfoOutlinedIcon`          | `@mui/icons-material` | An icon component that represents an information icon           |
| `useState`                  | `react`               | A hook that adds state to a functional component                |
| `tokens`                    | Custom function       | A function that returns color tokens based on the current theme |

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

The `AddApiaryCard` component is a form card used to create a new apiary in a React application. It includes a name input field, a location input field powered by the `GoogleMaps` component, and a button to submit the form data.

### Props

The `AddApiaryCard` component does not accept any props.

### State

| Name     | Type    | Description                                                                        |
| -------- | ------- | ---------------------------------------------------------------------------------- |
| value    | Object  | The selected location value from the GoogleMaps component.                         |
| expand   | Boolean | Whether or not the card is expanded.                                               |
| formData | Object  | The form data to be submitted, including the apiary name and location information. |

### Methods

The `AddApiaryCard` component does not define any methods.

### Handlers

| Name     | Parameters | Description                                                          |
| -------- | ---------- | -------------------------------------------------------------------- |
| onChange | e: Event   | Updates the form data when input fields are changed.                 |
| onSubmit | e: Event   | Submits the form data to the Redux store via the `setApiary` action. |

### Child Components

| Name            | Package                     | Description                                                           |
| --------------- | --------------------------- | --------------------------------------------------------------------- |
| Grid            | @mui/material               | A layout component to create a grid of items.                         |
| Avatar          | @mui/material               | A component to display user profile pictures or icons.                |
| Card            | @mui/material               | A material design card component.                                     |
| CardActions     | @mui/material               | A component to create a row of actions for a `Card` component.        |
| Collapse        | @mui/material               | A component to collapse content based on a boolean state variable.    |
| IconButton      | @mui/material               | A component to create clickable icons.                                |
| useTheme        | @mui/material               | A hook to access the current theme.                                   |
| Button          | @mui/material               | A material design button component.                                   |
| TextField       | @mui/material               | A material design input component.                                    |
| Box             | @mui/material               | A layout component to create a box container.                         |
| Autocomplete    | @mui/material               | A component to create an input field with autocomplete functionality. |
| parse           | autosuggest-highlight/parse | A function to parse and highlight text in an autocomplete input.      |
| debounce        | lodash                      | A function to debounce input field changes.                           |
| AddOutlinedIcon | @mui/icons-material         | A material design add icon.                                           |
| useState        | react                       | A hook to manage state variables in a functional component.           |
| useDispatch     | react-redux                 | A hook to dispatch actions to the Redux store.                        |
| GoogleMaps      | ./AutocompleteMaps.tsx      | A custom component to display a Google Maps autocomplete input field. |

### Usage Example

```
import AddApiaryCard from './AddApiaryCard';

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

This component renders a card with a form to add a new device to an apiary. The form includes an input field for the device name, a select field for the device type, and a button to submit the form data.

### Props

| Name     | Type   | Required | Description                                                  |
| -------- | ------ | -------- | ------------------------------------------------------------ |
| apiary   | object | Yes      | An object with data for the apiary where the device is added |
| userRole | string | Yes      | A string with the user role, either "USER" or "ADMIN"        |

### State

| Name     | Type    | Description                                              |
| -------- | ------- | -------------------------------------------------------- |
| expand   | boolean | A boolean indicating whether the card is expanded or not |
| formData | object  | An object containing the values of the form inputs       |

### Methods

The `AddDeviceCard` component does not define any methods.

### Handlers

| Name     | Parameters | Description                                                |
| -------- | ---------- | ---------------------------------------------------------- |
| onChange | e          | A function to handle the onChange event of the form inputs |
| onSubmit | e          | A function to handle the onSubmit event of the form        |

### Child Components

| Name              | Package             | Description                                                                           |
| ----------------- | ------------------- | ------------------------------------------------------------------------------------- |
| `Grid`            | @mui/material       | A layout component for arranging its children in a grid.                              |
| `Avatar`          | @mui/material       | A component for displaying a circular image or icon.                                  |
| `Card`            | @mui/material       | A container component for displaying content and actions related to a single subject. |
| `CardActions`     | @mui/material       | A container component for grouping action buttons in a card.                          |
| `Collapse`        | @mui/material       | A component that allows for collapsing and expanding its children.                    |
| `IconButton`      | @mui/material       | A button component that displays an icon.                                             |
| `useTheme`        | @mui/material       | A hook that provides access to the MUI theme.                                         |
| `Button`          | @mui/material       | A component for displaying a clickable button.                                        |
| `TextField`       | @mui/material       | A component for displaying and inputting text.                                        |
| `Box`             | @mui/material       | A component for wrapping and styling its children.                                    |
| `AddOutlinedIcon` | @mui/icons-material | An icon component that displays a plus symbol.                                        |
| `useState`        | React               | A hook for managing state in functional components.                                   |
| `useNavigate`     | react-router-dom    | A hook for navigating to different routes in a React application.                     |
| `useDispatch`     | react-redux         | A hook for dispatching actions to the Redux store.                                    |
| `useSelector`     | react-redux         | A hook for accessing state from the Redux store.                                      |

### Usage Example

```
import React from "react";
import AddDeviceCard from "./AddDeviceCard";

const MyComponent = () => {
  return (
    <AddDeviceCard apiary={{_id: "apiaryId", name: "apiaryName"}} userRole="ADMIN" />
  );
};

export default MyComponent;
```

In this example, `MyComponent` renders the `AddDeviceCard` component passing the required props `apiary` and `userRole`. The `apiary` prop is an object with the data for the apiary where the device will be added, and the `userRole` prop is a string indicating the role of the user, either "USER" or "ADMIN".

## `AddUserCard` React Component

The `AddUserCard` component is a React component that displays a card with a button to expand a form to add a new user to an apiary. It takes in two props: `apiary` and `userRole`.

### Props

| Name     | Type   | Required | Description                                 |
| -------- | ------ | -------- | ------------------------------------------- |
| apiary   | object | Yes      | An object containing data for the APIary.   |
| userRole | string | Yes      | The role of the user creating the new user. |

### State

| Name     | Type    | Description                                                |
| -------- | ------- | ---------------------------------------------------------- |
| expand   | boolean | Determines whether the form to add a new user is expanded. |
| formData | object  | An object containing the email and role of the new user.   |

### Methods

| Name     | Parameters | Description                                                                                                      |
| -------- | ---------- | ---------------------------------------------------------------------------------------------------------------- |
| onChange | `e`: Event | Updates the `formData` state with the input value of the form.                                                   |
| onSubmit | `e`: Event | Dispatches an action to add a new member to the APIary with the email and role provided in the `formData` state. |

### Handlers

The `AddUserCard` component does not define any handlers.

### Child Components

| Name             | Package       | Description                                                                                |
| ---------------- | ------------- | ------------------------------------------------------------------------------------------ |
| Avatar           | @mui/material | Displays an avatar with an icon.                                                           |
| Box              | @mui/material | A layout component that allows for flexible box sizing.                                    |
| Button           | @mui/material | A button component with customizable styling.                                              |
| Card             | @mui/material | A component that displays a card with a shadow effect.                                     |
| CardActions      | @mui/material | A layout component that displays a set of buttons below the card content.                  |
| Checkbox         | @mui/material | A component that displays a checkbox.                                                      |
| Collapse         | @mui/material | A component that animates the expanding and collapsing of its children.                    |
| FormControlLabel | @mui/material | A component that combines a label with a form control, such as a checkbox or radio button. |
| Grid             | @mui/material | A layout component that displays its children in a grid.                                   |
| IconButton       | @mui/material | A button component that displays an icon.                                                  |
| TextField        | @mui/material | A component that displays an input field for text.                                         |

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

The `ApiaryCard` component is a reusable component in a React application that displays information about an apiary such as its name, location and other details. It allows users to edit, delete and update the apiary information. This component utilizes Material-UI library.

### Props

The following table lists the props that can be passed to `ApiaryCard` component:

| Name   | Type   | Required | Description                             |
| ------ | ------ | -------- | --------------------------------------- |
| apiary | Object | Yes      | An object containing apiary information |

### State

The `ApiaryCard` component has the following states:

| Name     | Type    | Description                                                  |
| -------- | ------- | ------------------------------------------------------------ |
| expand   | boolean | Tracks whether the form for editing the apiary should expand |
| formData | Object  | Tracks the form data entered by the user for updating        |

### Methods

The `ApiaryCard` component does not define any methods.

### Handlers

| Name     | Parameters  | Description                                     |
| -------- | ----------- | ----------------------------------------------- |
| onChange | `e` (Event) | Updates the formData state on form input change |
| onSubmit | `e` (Event) | Submits the form data to update the apiary      |
| onDelete | `e` (Event) | Deletes the apiary from the application         |

### Child Components

| Name                  | Package             | Description                                                               |
| --------------------- | ------------------- | ------------------------------------------------------------------------- |
| AddDeviceCard         | ./AddDeviceCard     | A form for adding a new device to the apiary.                             |
| AddUserCard           | ./AddUserCard       | A form for adding a new user to the apiary.                               |
| DeviceCard            | ./DeviceCard        | A card displaying details of a device in the apiary.                      |
| Grid                  | @mui/material       | A layout component that displays child components in a grid.              |
| Avatar                | @mui/material       | A component for displaying a user's avatar.                               |
| Box                   | @mui/material       | A layout component that displays child components in a box.               |
| Button                | @mui/material       | A component for displaying a button.                                      |
| Card                  | @mui/material       | A component that displays a card.                                         |
| CardActions           | @mui/material       | A component for displaying actions in a card.                             |
| CardHeader            | @mui/material       | A component for displaying a header in a card.                            |
| Collapse              | @mui/material       | A component for animating the expansion and collapse of a card's content. |
| DeviceHubOutlinedIcon | @mui/icons-material | An icon component representing a device hub.                              |
| EditOutlinedIcon      | @mui/icons-material | An icon component representing an edit button.                            |
| GroupOutlinedIcon     | @mui/icons-material | An icon component representing a group.                                   |
| IconButton            | @mui/material       | A component for displaying an icon that can be clicked.                   |
| TextField             | @mui/material       | A component for displaying a text field that can be used for user input.  |
| Typography            | @mui/material       | A component for displaying text.                                          |
| useDispatch           | react-redux         | A hook that returns the Redux store's `dispatch` function.                |
| useSelector           | react-redux         | A hook that returns a selected value from the Redux store's state.        |
| useState              | react               | A hook that allows functional components to use component-level state.    |

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

In this example, we will render an `ApiaryCard` component with the provided `apiary` object. Users can edit, delete and update the apiary details.

## `AutocompleteMaps` Typescript Component

This component is a wrapper around the Autocomplete component from MUI that provides an autocomplete feature for locations using Google Maps API. The component suggests location results as the user types and selects a location from the options.

### Props

| Name     | Type        | Required | Description                                    |
| -------- | ----------- | -------- | ---------------------------------------------- |
| value    | `PlaceType` | Yes      | The selected location value.                   |
| setValue | `function`  | Yes      | A function to set the selected location value. |

### State

| Name       | Type                   | Description                                                     |
| ---------- | ---------------------- | --------------------------------------------------------------- |
| inputValue | `string`               | The current input value of the Autocomplete component.          |
| options    | `readonly PlaceType[]` | An array of location options fetched from Google Maps API.      |
| loaded     | `boolean`              | Indicates whether the Google Maps API script has loaded or not. |

### Methods

The component does not have any methods.

### Handlers

The component does not have any handlers.

### Interfaces

| Name                      | Type        | Description                                                                      |
| ------------------------- | ----------- | -------------------------------------------------------------------------------- |
| MainTextMatchedSubstrings | `interface` | An interface representing the matched substrings in the main text of a location. |
| StructuredFormatting      | `interface` | An interface representing the structured formatting of a location.               |
| PlaceType                 | `interface` | An interface representing a location.                                            |

### Child Components

| Component      | Package                          | Description                                                                                                                   |
| -------------- | -------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| Box            | "@mui/material/Box"              | A component used for creating layout containers that can contain other components.                                            |
| TextField      | "@mui/material/TextField"        | An input field component used for accepting user input.                                                                       |
| Autocomplete   | "@mui/material/Autocomplete"     | A component that provides an input field with an autocomplete dropdown, which displays a list of options based on user input. |
| LocationOnIcon | "@mui/icons-material/LocationOn" | An icon component used for indicating a location.                                                                             |
| Grid           | "@mui/material/Grid"             | A component used for creating grid-based layouts.                                                                             |
| Typography     | "@mui/material/Typography"       | A component used for displaying text with different styles and variations.                                                    |

### Usage Example

```jsx
import GoogleMaps from "./AutocompleteMaps.tsx";

function MyComponent() {
  const [value, setValue] = React.useState(null);

  return <GoogleMaps value={value} setValue={setValue} />;
}
```

In this example, the `value` prop is the currently selected place, and the `setValue` prop is a function that gets called with the selected place object when a new place is selected. You can pass these props to the `GoogleMaps` component and it will handle the rest.

Note that you'll need to obtain a Google Maps API key and enable the Places API in order to use this component. You can do this by following the instructions in the [Google Maps JavaScript API documentation](https://developers.google.com/maps/gmp-get-started).

## `DeviceCard` React Component

The `DeviceCard` component is a React component that displays information about a device in a card format. The card displays basic information about the device, including its name, serial number, and a remote link. Users with the appropriate access level can edit or delete the device using the provided buttons.

### Props

| Name     | Type   | Required | Description                                                                   |
| -------- | ------ | -------- | ----------------------------------------------------------------------------- |
| device   | Object | Yes      | An object containing information about the device.                            |
| apiary   | Object | Yes      | An object containing information about the apiary that the device belongs to. |
| userRole | String | Yes      | A string representing the user's role in the system.                          |

### State

| Name     | Type    | Description                                                                     |
| -------- | ------- | ------------------------------------------------------------------------------- |
| expand   | Boolean | A boolean value indicating whether the form for editing the device is expanded. |
| formData | Object  | An object containing the current form data for editing the device.              |

### Methods

The `DeviceCard` component does not define any methods.

### Handlers

| Name     | Parameters | Description                                                                |
| -------- | ---------- | -------------------------------------------------------------------------- |
| onChange | e:Event    | A handler function to update the `formData` state when form fields change. |
| onSubmit | e:Event    | A handler function to submit the form for updating the device information. |
| onDelete | e:Event    | A handler function to delete the device.                                   |

### Child Components

| Name             | Package             | Description                                                                                                   |
| ---------------- | ------------------- | ------------------------------------------------------------------------------------------------------------- |
| Grid             | @mui/material       | A responsive grid container used for laying out and aligning elements in a grid system.                       |
| Avatar           | @mui/material       | Displays a circular image or icon that represents a user or entity.                                           |
| Card             | @mui/material       | A container component that is used to group related content.                                                  |
| CardActions      | @mui/material       | A container component for buttons and other action elements that are placed after the main content of a card. |
| CardHeader       | @mui/material       | A container component for displaying a header in a Card.                                                      |
| Collapse         | @mui/material       | A component that enables a content to be shown or hidden based on its visibility.                             |
| IconButton       | @mui/material       | A clickable button that contains an icon.                                                                     |
| Typography       | @mui/material       | A component for displaying text.                                                                              |
| TextField        | @mui/material       | A component for getting user input from the keyboard.                                                         |
| useTheme         | @mui/material       | A hook that returns the current theme used by the application.                                                |
| Box              | @mui/material       | A container component that can be used to group and space out elements.                                       |
| Button           | @mui/material       | A component for user interaction, such as triggering an action or event.                                      |
| EditOutlinedIcon | @mui/icons-material | An icon that represents the edit action.                                                                      |
| useState         | react               | A hook that adds state to functional components.                                                              |
| useNavigate      | react-router-dom    | A hook that returns a navigation object that allows you to navigate to a different URL.                       |
| useDispatch      | react-redux         | A hook that returns a reference to the dispatch function that allows you to dispatch actions to the store.    |
| useSelector      | react-redux         | A hook that allows you to extract data from the Redux store state.                                            |

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

A reusable React component that renders a card with a FAQ (Frequently Asked Questions) question and an expandable answer section. The answer section can be toggled by clicking on an arrow icon.

### Props

| Name | Type  | Required | Description                                                                                                                                 |
| ---- | ----- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| faq  | array | Yes      | An array that contains the question and the answer of the FAQ item. The first element is the question and the second element is the answer. |

### State

| Name   | Type    | Description                                              |
| ------ | ------- | -------------------------------------------------------- |
| expand | boolean | Indicates whether the answer section is expanded or not. |

### Methods

The `FAQCard` component does not define any methods.

### Handlers

The `FAQCard` component does not define any event handlers.

### Child Components

| Name        | Package       | Description                                                    |
| ----------- | ------------- | -------------------------------------------------------------- |
| Grid        | @mui/material | A grid component used for layout.                              |
| Avatar      | @mui/material | An avatar component used for displaying an icon.               |
| Card        | @mui/material | A card component that displays the FAQ question and answer.    |
| CardActions | @mui/material | A component that holds the action buttons in the card header.  |
| CardHeader  | @mui/material | A component that holds the card title and avatar.              |
| Collapse    | @mui/material | A component that displays the answer section when expanded.    |
| IconButton  | @mui/material | An icon button component used for toggling the answer section. |
| Typography  | @mui/material | A component for displaying text.                               |
| useTheme    | @mui/material | A hook that provides access to the current theme object.       |
| Box         | @mui/material | A component for grouping and organizing content.               |

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

In this example, we pass an array of FAQs to the `FAQCard` component as a prop. The component renders a `Card` for each FAQ, displaying the question as the title and an expand/collapse button. When the button is clicked, the answer is displayed in the `Collapse` component.

## `Graph` React Component

A `Graph` component built with React and Recharts that displays data in an area chart.

### Props

| Name   | Type   | Required | Description                                |
| ------ | ------ | -------- | ------------------------------------------ |
| device | Object | No       | An object that contains device data points |

### State

The `Graph` component does not have any state.

### Methods

The `Graph` component does not define any methods.

### Handlers

The `Graph` component does not define any handlers.

### Child Components

| Name                | Package       | Description                                                                                   |
| ------------------- | ------------- | --------------------------------------------------------------------------------------------- |
| ResponsiveContainer | recharts      | A container element from Recharts that sets the chart size to be responsive to its container. |
| AreaChart           | recharts      | An area chart from Recharts that displays data points in an area format.                      |
| XAxis               | recharts      | An x-axis component from Recharts that renders the horizontal axis of the chart.              |
| YAxis               | recharts      | A y-axis component from Recharts that renders the vertical axis of the chart.                 |
| Area                | recharts      | An area component from Recharts that renders the area fill of the chart.                      |
| Tooltip             | recharts      | A tooltip component from Recharts that displays a tooltip when hovering over a data point.    |
| CartesianGrid       | recharts      | A cartesian grid component from Recharts that displays grid lines on the chart.               |
| Legend              | recharts      | A legend component from Recharts that displays a legend for the chart.                        |
| Box                 | @mui/material | A box component from Material-UI that wraps the tooltip content.                              |
| Typography          | @mui/material | A typography component from Material-UI that renders the date and data values in the tooltip. |

### Usage

```
import Graph from './Graph';

function MyComponent() {
  const device = { /* data for chart */ };

  return (
    <Graph device={device} />
  );
}
```

In this example, the `Graph` component is passed a `device` object as a prop. The `device` object contains the data for the chart.

## `Loading` React Component

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

A React component that implements a sidebar for navigation. It uses the `react-pro-sidebar` and `@mui/material` packages. The sidebar consists of a menu with several items and submenus, and it displays information related to the user's APIaries and devices.

### Props

The `Sidebar` component does not accept any props.

### State

| Name        | Type    | Description                                            |
| ----------- | ------- | ------------------------------------------------------ |
| isCollapsed | boolean | Controls whether the sidebar is collapsed or expanded. |
| selected    | string  | The name of the currently selected item.               |

### Methods

The `Sidebar` component does not define any methods.

### Handlers

| Name           | Parameters | Description                      |
| -------------- | ---------- | -------------------------------- |
| setIsCollapsed | boolean    | Updates the `isCollapsed` state. |
| setSelected    | string     | Updates the `selected` state.    |

### Child Components

| Name                      | Package                | Description                                                                                                            |
| ------------------------- | ---------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `ProSidebar`              | `react-pro-sidebar`    | A sidebar component that provides a layout for the sidebar. It can be collapsed or expanded by the user.               |
| `Menu`                    | `react-pro-sidebar`    | A component that renders a menu in the sidebar.                                                                        |
| `MenuItem`                | `react-pro-sidebar`    | A clickable menu item in the sidebar.                                                                                  |
| `SubMenu`                 | `react-pro-sidebar`    | A submenu that displays nested menus in the sidebar.                                                                   |
| `SidebarHeader`           | `react-pro-sidebar`    | A component that displays a header at the top of the sidebar.                                                          |
| `SidebarFooter`           | `react-pro-sidebar`    | A component that displays a footer at the bottom of the sidebar.                                                       |
| `SidebarContent`          | `react-pro-sidebar`    | A component that displays the content of the sidebar.                                                                  |
| `Box`                     | `@mui/material`        | A layout component that can be used to create a container with a specified width, height, padding, and margin.         |
| `IconButton`              | `@mui/material`        | A button component that displays an icon.                                                                              |
| `Typography`              | `@mui/material`        | A component that displays text.                                                                                        |
| `useTheme`                | `@mui/material/styles` | A hook that returns the current theme of the application.                                                              |
| `createTheme`             | `@mui/material/styles` | A function that creates a custom theme for the application.                                                            |
| `Backdrop`                | `@mui/material`        | A component that provides a dark overlay behind the content to indicate that the content is disabled or not available. |
| `HomeOutlinedIcon`        | `@mui/icons-material`  | An icon component that displays a home icon.                                                                           |
| `InfoOutlinedIcon`        | `@mui/icons-material`  | An icon component that displays an info icon.                                                                          |
| `MenuOutlinedIcon`        | `@mui/icons-material`  | An icon component that displays a menu icon.                                                                           |
| `HiveOutlinedIcon`        | `@mui/icons-material`  | An icon component that displays a hive icon.                                                                           |
| `HelpOutlineOutlinedIcon` | `@mui/icons-material`  | An icon component that displays a help icon.                                                                           |
| `SettingsOutlinedIcon`    | `@mui/icons-material`  | An icon component that displays a settings icon.                                                                       |
| `Avatar`                  | `@mui/material`        | A component that displays an avatar image.                                                                             |
| `useDispatch`             | `react-redux`          | A hook that returns a reference to the `dispatch` function of the Redux store.                                         |
| `useSelector`             | `react-redux`          | A hook that returns a selected value from the Redux store.                                                             |

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

The `Sidebar` component should be imported and used within a parent component, as shown in the example above. When rendered, it will display a sidebar with several menu items and submenus. The user's APIaries and devices will be shown in the corresponding submenus, which can be clicked to navigate to the corresponding pages. The sidebar can be collapsed and expanded by clicking on the button in the top left corner.

## `Topbar` React Component

### Description

The `Topbar` component is a customizable top navigation bar that can be used in a React application. It includes icons for toggling between light and dark mode, viewing notifications, accessing settings, and logging out. The component can display the title of the page or section it represents.

### Props

| Name  | Type   | Required | Description                                 |
| ----- | ------ | -------- | ------------------------------------------- |
| title | string | no       | The title of the page or section to display |

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
| Box                       | "@mui/material"                  | A basic layout component that provides a flexible container for grouping and arranging other components. |
| IconButton                | "@mui/material"                  | A button component that displays an icon.                                                                |
| useTheme                  | "@mui/material"                  | A hook that returns the current theme object.                                                            |
| Typography                | "@mui/material"                  | A component that renders text in various styles and sizes.                                               |
| Avatar                    | "@mui/material"                  | A component that displays a user's profile picture or initials.                                          |
| Grid                      | "@mui/material"                  | A component that provides a responsive grid layout for arranging components.                             |
| LightModeOutlinedIcon     | "@mui/icons-material"            | An icon component that displays an outline of a light bulb for switching to light mode.                  |
| DarkModeOutlinedIcon      | "@mui/icons-material"            | An icon component that displays an outline of a light bulb for switching to dark mode.                   |
| NotificationsOutlinedIcon | "@mui/icons-material"            | An icon component that displays a bell icon for showing notifications.                                   |
| SettingsOutlinedIcon      | "@mui/icons-material"            | An icon component that displays a gear icon for opening the settings.                                    |
| LogoutOutlinedIcon        | "@mui/icons-material"            | An icon component that displays a door with an arrow icon for logging out.                               |
| useContext                | "react"                          | A hook that provides access to a context object.                                                         |
| ColorModeContext          | "../theme"                       | A context object that provides the current color mode and a method to toggle the color mode.             |
| logout                    | "../features/auth/auth.slice.js" | An action creator that dispatches an action to log out the user.                                         |
| reset                     | "../features/auth/auth.slice.js" | An action creator that dispatches an action to reset the auth state.                                     |
| Link                      | "react-router-dom"               | A component that provides a declarative way to navigate to a different page.                             |
| useNavigate               | "react-router-dom"               | A hook that returns a navigate function for programmatic navigation.                                     |
| useSelector               | "react-redux"                    | A hook that returns selected parts of the state from the Redux store.                                    |
| useDispatch               | "react-redux"                    | A hook that returns a reference to the dispatch function from the Redux store.                           |

### Usage

To use the `Topbar` component, import it into the file where you want to display it and add it to the JSX code for that file. Pass any desired props, such as a `title`, to customize the component.

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

In the above example, the `Topbar` component is displayed at the top of the `MyPage` component with the title "My Page Title". The `p` tag below it represents the rest of the page content. The `Topbar` component can be customized with CSS styling or MUI theming.

## `UserCard` React Component

### Description

The `UserCard` component is a card component that displays user information and allows for editing user roles and deleting users.

### Props

| Name   | Type   | Required | Description                            |
| ------ | ------ | -------- | -------------------------------------- |
| user   | Object | Yes      | The user object to be displayed.       |
| apiary | Object | Yes      | The apiary object the user belongs to. |

### State

| Name     | Type    | Description                                                             |
| -------- | ------- | ----------------------------------------------------------------------- |
| expand   | Boolean | A state variable that determines if the card should be expanded or not. |
| formData | Object  | A state variable that holds the user's data to be edited.               |

### Methods

| Name     | Parameters | Description                                                         |
| -------- | ---------- | ------------------------------------------------------------------- |
| onChange | (event)    | A function that handles form data changes.                          |
| onSubmit | (event)    | A function that handles the form submission for updating user data. |
| onDelete | (event)    | A function that handles the form submission for deleting a user.    |

### Child Components

| Name             | Package       | Description                                               |
| ---------------- | ------------- | --------------------------------------------------------- |
| Avatar           | @mui/material | Displays the user's avatar.                               |
| Card             | @mui/material | Wraps the user's information.                             |
| CardActions      | @mui/material | Displays the edit icon to open the editing menu.          |
| CardHeader       | @mui/material | Displays the user's name, email, and avatar.              |
| Checkbox         | @mui/material | Allows for toggling between user roles.                   |
| Collapse         | @mui/material | Collapses the editing menu.                               |
| FormControlLabel | @mui/material | Displays a label for the Checkbox.                        |
| Grid             | @mui/material | Wraps the edit icon for proper alignment.                 |
| IconButton       | @mui/material | The button component for the edit icon.                   |
| Typography       | @mui/material | Displays the user's name and email.                       |
| Box              | @mui/material | Wraps the forms and aligns the editing menu.              |
| Button           | @mui/material | Submits the form for saving changes or deleting the user. |

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

In the example above, the `UserCard` component is used to display user information for two different members of the same apiary. The component is passed the user object and apiary object as props. When the edit icon is clicked, the editing menu is displayed, allowing the user's role to be changed or the user to be deleted.

# Features

## Apiary

# `apiary.slice`

#### Description

This file contains a Redux slice for managing the state related to Apiaries. The file contains a set of initial states, action creators and their respective reducer cases to handle the apiaries CRUD operations. The file also integrates with the `apiaryService` module to perform the actual API calls.

#### Initial States

| Name      | Type    | Description                                                                   |
| --------- | ------- | ----------------------------------------------------------------------------- |
| apiaries  | Array   | A list of objects representing the user's apiaries.                           |
| isError   | Boolean | Indicates if an error occurred while processing a request.                    |
| isSuccess | Boolean | Indicates if a request was processed successfully.                            |
| isLoading | Boolean | Indicates if a request is in progress.                                        |
| message   | String  | A message that provides additional information about the status of a request. |

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

| Case                     | apiaries                      | isError | isSuccess | isLoading | message                       |
| ------------------------ | ----------------------------- | ------- | --------- | --------- | ----------------------------- |
| `getApiaries.pending`    | -                             | false   | false     | true      | "Loading"                     |
| `getApiaries.fulfilled`  | List of apiaries from payload | false   | true      | false     | "Loaded successfully"         |
| `getApiaries.rejected`   | -                             | true    | false     | false     | "Error while loading"         |
| `setApiary.pending`      | -                             | false   | false     | true      | "Creating new apiary"         |
| `setApiary.fulfilled`    | -                             | false   | true      | false     | "Apiary created successfully" |
| `setApiary.rejected`     | -                             | true    | false     | false     | "Error while creating apiary" |
| `updateApiary.pending`   | -                             | false   | false     | true      | "Updating apiary"             |
| `updateApiary.fulfilled` | -                             | false   | true      | false     | "Apiary updated successfully" |
| `updateApiary.rejected`  | -                             | true    | false     | false     | "Error while updating apiary" |
| `deleteApiary.pending`   | -                             | false   | false     | true      | "Deleting apiary"             |
| `deleteApiary.fulfilled` | -                             | false   | true      | false     | "Apiary deleted successfully" |
| `deleteApiary.rejected`  | -                             | true    | false     | false     | "Error while deleting apiary" |
| `setDevice.pending`      | -                             | false   | false     | true      | "Creating new device"         |
| `setDevice.fulfilled`    | -                             | false   | true      | false     | "Device created successfully" |
| `setDevice.rejected`     | -                             | true    | false     | false     | "Error while creating device" |
| `updateDevice.pending`   | -                             | false   | false     | true      | "Updating device"             |
| `updateDevice.fulfilled` | -                             | false   | true      | false     | "Device updated successfully" |
| `updateDevice.rejected`  | -                             | true    | false     | false     | "Error while updating device" |
| `deleteDevice.pending`   | -                             | false   | false     | true      | "Deleting device"             |
| `deleteDevice.fulfilled` | -                             | false   | true      | false     | "Device deleted successfully" |
| `deleteDevice.rejected`  | -                             | true    | false     | false     | "Error while deleting device" |

### `apiary.service`

This module contains a set of functions that interact with the server-side API to manage Apiaries, Devices, and Members of Apiaries. These functions use the axios library to perform HTTP requests to the server.

#### Functions

##### getApiaries(token)

This function retrieves the list of Apiaries associated with the authenticated user's token.

##### setApiary(apiaryData, token)

This function creates a new Apiary with the given data and token.

##### updateApiary(apiaryData, token)

This function updates an existing Apiary with the given data and token.

##### deleteApiary(apiaryData, token)

This function deletes an Apiary with the given data and token.

##### setDevice(apiaryData, token)

This function sets a new device for an existing Apiary with the given data and token.

##### updateDevice(apiaryData, token)

This function updates an existing device for an existing Apiary with the given data and token.

##### deleteDevice(apiaryData, token)

This function deletes an existing device for an existing Apiary with the given data and token.

##### setMember(userData, token)

This function sets a new member for an existing Apiary with the given data and token.

##### updateMember(userData, token)

This function updates an existing member for an existing Apiary with the given data and token.

##### deleteMember(userData, token)

This function deletes an existing member for an existing Apiary with the given data and token.

## Auth

### `auth.slice`

#### Description

This is a Redux slice file that defines the `auth` slice for managing authentication-related state. It uses the `createSlice` and `createAsyncThunk` functions from the `@reduxjs/toolkit` package to define the initial state, actions, and reducer cases.

#### Initial State

| Name      | Type           | Description                                                             |
| --------- | -------------- | ----------------------------------------------------------------------- |
| user      | Object or null | The currently logged in user, retrieved from local storage.             |
| isError   | Boolean        | Indicates whether an error occurred during an async operation.          |
| isSuccess | Boolean        | Indicates whether an async operation was successful.                    |
| isLoading | Boolean        | Indicates whether an async operation is currently in progress.          |
| message   | String         | An error message or success message associated with an async operation. |

#### Actions

| Name     | Description                                  |
| -------- | -------------------------------------------- |
| register | Async action that registers a user.          |
| login    | Async action that logs in a user.            |
| logout   | Async action that logs out the current user. |
| reset    | Action that resets the authentication state. |

#### Reducer Cases

| Case                 | User                  | Error                          | Success | Loading | Message                        |
| -------------------- | --------------------- | ------------------------------ | ------- | ------- | ------------------------------ |
| `register.pending`   | -                     | -                              | -       | `true`  | -                              |
| `register.fulfilled` | Action payload (user) | -                              | `true`  | `false` | -                              |
| `register.rejected`  | -                     | Action payload (error message) | -       | `false` | Action payload (error message) |
| `login.pending`      | -                     | -                              | -       | `true`  | -                              |
| `login.fulfilled`    | Action payload (user) | -                              | `true`  | `false` | -                              |
| `login.rejected`     | -                     | Action payload (error message) | -       | `false` | Action payload (error message) |
| `logout.fulfilled`   | -                     | -                              | -       | -       | -                              |

Note: In the reducer cases table, the `Action payload` column refers to the value returned by the corresponding async action.

# Pages

## `Manage` React Page

The `Manage` component is a React component that renders an About page with information about the project and its mission. The component imports several dependencies from MUI library and Redux, and it also imports a child component called `AboutCard`.

### Props

The `Manage` component does not receive any props.

### State

The `Manage` component does not have any state.

### Methods

The `Manage` component does not define any methods.

### Handlers

The `Manage` component does not define any handlers.

### Child Components

| Component Name   | Package                   | Description                                                                                                                                                        |
| ---------------- | ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Box              | "@mui/material"           | A container component that can contain other MUI components or HTML elements. It provides various layout options such as flexbox and grid.                         |
| Grid             | "@mui/material"           | A responsive grid container that can hold other MUI components or HTML elements. It allows for customization of column and row spacing for different screen sizes. |
| Typography       | "@mui/material"           | A component for displaying text. It supports various typography styles such as headings, body text, and captions.                                                  |
| Avatar           | "@mui/material"           | A circular component that represents a user or object. It can display an image, icon, or text.                                                                     |
| useTheme         | "@mui/material"           | A hook that provides access to the current theme object. It can be used to customize the styling of MUI components.                                                |
| tokens           | "../theme"                | An object that provides color values based on the current theme. It is used to customize the styling of non-MUI components.                                        |
| useDispatch      | "react-redux"             | A hook that provides access to the dispatch function of the Redux store. It can be used to dispatch actions to update the state.                                   |
| useSelector      | "react-redux"             | A hook that provides access to the state of the Redux store. It can be used to retrieve data from the store.                                                       |
| useEffect        | "react"                   | A hook that runs a side effect after rendering. It is used to perform actions such as updating the state or making API requests.                                   |
| useNavigate      | "react-router-dom"        | A hook that provides access to the navigation object. It can be used to navigate to different pages in the application.                                            |
| InfoOutlinedIcon | "@mui/icons-material"     | An MUI icon component that displays an "info" icon.                                                                                                                |
| AboutCard        | "../components/AboutCard" | A custom component that displays a statement and its description in a card format.                                                                                 |
| Grow             | "@mui/material"           | A transition component that animates the appearance of an element by gradually increasing its size.                                                                |
| Fade             | "@mui/material"           | A transition component that animates the appearance of an element by gradually fading it in or out.                                                                |
| Backdrop         | "@mui/material"           | A component that provides a dark overlay behind other components. It is often used to indicate that a process is running in the background.                        |

### Usage

The `Manage` component can be used as follows:

```jsx
import Manage from "./Manage";

const App = () => {
  return (
    <div>
      <Manage />
    </div>
  );
};

export default App;
```

In this example, the `Manage` component is imported and rendered inside a parent component called `App`. The `Manage` component does not receive any props and displays an About page with information about the project and its mission.

## `FAQ` React Page

This is a React component that renders a frequently asked questions page. It displays a list of FAQs with their corresponding answers.

### Props

This component does not accept any props.

### State

This component does not have any state.

### Methods

This component does not have any methods.

### Handlers

This component does not have any handlers.

### Child Components

| Name                    | Package               | Description                                                                |
| ----------------------- | --------------------- | -------------------------------------------------------------------------- |
| Box                     | @mui/material         | A container component used for grouping and spacing elements               |
| Grid                    | @mui/material         | A responsive layout component used for aligning and distributing elements  |
| Typography              | @mui/material         | A component for displaying text with customizable typography               |
| Avatar                  | @mui/material         | A component for displaying user avatars or icons                           |
| useTheme                | @mui/material         | A hook that provides access to the MUI theme object                        |
| HiveOutlinedIcon        | @mui/icons-material   | An icon component for displaying a hive outline                            |
| tokens                  | ../theme              | A module that exports a function returning theme tokens                    |
| Loading                 | ../components/Loading | A component for displaying a loading animation                             |
| useDispatch             | react-redux           | A hook that returns the Redux store's dispatch method                      |
| useSelector             | react-redux           | A hook that returns selected state from the Redux store                    |
| useEffect               | react                 | A hook that allows performing side effects in function components          |
| useNavigate             | react-router-dom      | A hook that returns a navigate function to use for programmatic navigation |
| HelpOutlineOutlinedIcon | @mui/icons-material   | An icon component for displaying a help outline                            |
| FAQCard                 | ../components/FAQCard | A component that displays a question and answer card                       |
| toast                   | react-toastify        | A module for displaying toast notifications                                |
| Grow                    | @mui/material         | A component for animating element growth                                   |
| Fade                    | @mui/material         | A component for animating element opacity                                  |
| Backdrop                | @mui/material         | A component for displaying a translucent background overlay                |

## `Login` React Page

### Description

`Login` is a component that allows users to log into an application. The component receives user inputs of `email`, `password`, and `isChecked`. It dispatches a login action with the input data to authenticate users via the `auth.slice.js` module. It also displays a loading spinner while the authentication is in progress.

### Props

The `Login` component does not accept any props.

### State

| Name       | Type      | Description                                                                                         |
| ---------- | --------- | --------------------------------------------------------------------------------------------------- |
| `trans`    | `Boolean` | A state variable that determines whether to transition to another view.                             |
| `formData` | `Object`  | A state variable that stores the user's input data, including `email`, `password`, and `isChecked`. |

### Methods

| Name          | Parameters  | Description                                                                                          |
| ------------- | ----------- | ---------------------------------------------------------------------------------------------------- |
| `handleTrans` | `none`      | A function that toggles the `trans` state to transition to another view.                             |
| `onChange`    | `e: object` | A function that updates the `formData` state with the new user input data.                           |
| `onSubmit`    | `e: object` | A function that dispatches the login action with the `formData` state data to authenticate the user. |

### Handlers

| Name   | Parameters | Description                     |
| ------ | ---------- | ------------------------------- |
| `none` | `none`     | This component has no handlers. |

### Child Components

| Name      | Package         | Description                                                      |
| --------- | --------------- | ---------------------------------------------------------------- |
| `Loading` | `../components` | A spinner that displays while the authentication is in progress. |

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

- Any questions regarding the web application, please contact cpaiz@scu.edu or paizcollin@gmail.com
- Any questions regarding deployment, please contact jstock@scu.edu
- Any questions regarding hardware, please contact ewrysinski@scu.edu and dblanc@scu.edu
