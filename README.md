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

# App

## `store`

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

```javascript
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

The `Graph` component is a reusable component that displays an area chart with temperature and bee activity data. It uses the Recharts library to create the chart and includes custom tooltip and x-axis components.

### Props

- `device` (object) - Optional. The device object that contains the data for the chart.

### Methods

The `Graph` component does not include any methods.

### State

The `Graph` component does not have any state.

### Child Components

The `Graph` component includes the following child components:

- `ResponsiveContainer` - A Recharts component that makes the chart responsive.
- `AreaChart` - A Recharts component that renders an area chart.
- `XAxis` - A Recharts component that displays the x-axis of the chart.
- `YAxis` - A Recharts component that displays the y-axis of the chart.
- `Area` - A Recharts component that displays the area of the chart.
- `Tooltip` - A Recharts component that displays a tooltip when hovering over the chart.
- `CartesianGrid` - A Recharts component that displays a grid in the chart.
- `Legend` - A Recharts component that displays a legend for the chart.

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

## `Loading` Component

The `Loading` component displays a circular progress indicator from the Material-UI library.

### Props

The `Loading` component does not accept any props.

### Methods

The `Loading` component does not define any methods.

### State

The `Loading` component does not use any internal state.

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

The `Sidebar` component is a customizable sidebar component for React applications that uses React Router and MUI. It is used to provide a user interface for navigating through different pages in the application.

### Props

The `Sidebar` component does not take any props.

### Methods

The `Sidebar` component does not have any methods.

### State

The `Sidebar` component has the following state:

- `isCollapsed` (boolean): Indicates whether the sidebar is collapsed or not.
- `selected` (string): The currently selected item in the sidebar.

### Child Components

The `Sidebar` component contains the following child components:

- `ProSidebar`: A component from `react-pro-sidebar` used to render the sidebar.
- `Menu`: A component from `react-pro-sidebar` used to render the menu.
- `MenuItem`: A component from `react-pro-sidebar` used to render a menu item.
- `SubMenu`: A component from `react-pro-sidebar` used to render a sub-menu item.
- `SidebarHeader`: A component from `react-pro-sidebar` used to render the sidebar header.
- `SidebarFooter`: A component from `react-pro-sidebar` used to render the sidebar footer.
- `SidebarContent`: A component from `react-pro-sidebar` used to render the sidebar content.
- `Box`: A component from `@mui/material` used to render a box.
- `IconButton`: A component from `@mui/material` used to render an icon button.
- `Typography`: A component from `@mui/material` used to render text.
- `Backdrop`: A component from `@mui/material` used to render a backdrop.
- `HomeOutlinedIcon`: A component from `@mui/icons-material` used to render a home icon.
- `InfoOutlinedIcon`: A component from `@mui/icons-material` used to render an info icon.
- `MenuOutlinedIcon`: A component from `@mui/icons-material` used to render a menu icon.
- `HiveOutlinedIcon`: A component from `@mui/icons-material` used to render a hive icon.
- `HelpOutlineOutlinedIcon`: A component from `@mui/icons-material` used to render a help icon.
- `SettingsOutlinedIcon`: A component from `@mui/icons-material` used to render a settings icon.
- `Avatar`: A component from `@mui/material` used to render an avatar.

### Usage Example

```jsx
import React from "react";
import { Sidebar } from "./components";

const App = () => {
  return (
    <div>
      <Sidebar />
      {/* Other content of the app */}
    </div>
  );
};
```

In this example, the `Sidebar` component is imported from the `components` folder and rendered in the JSX code.

## `Topbar` React Component

The `Topbar` component is a custom React component that renders a top navigation bar. This component is used in a web application and requires the `@mui` and `react-router-dom` libraries to function properly.

### Props

- `title`: a string that represents the title of the navigation bar.

### Methods

The `Topbar` component does not have any methods.

### State

The `Topbar` component does not have any state.

### Child Components

The `Topbar` component does not have any child components.

### Usage

```jsx
import Topbar from "./Topbar";

function App() {
  return (
    <div>
      <Topbar title="My App" />
      {/* rest of the app */}
    </div>
  );
}

export default App;
```

In this example, the `Topbar` component is rendered with the `title` prop set to `"My App"`. You can customize the component by passing in different values for the `title` prop.

## `UserCard` Component

The `UserCard` component is a React component that displays information about a user and allows administrators to edit the user's role or delete the user.

### Props

The `UserCard` component has two props:

- `user`: A required object containing information about the user to display. The object must have the following properties:
  - `user._id`: A string representing the user's ID.
  - `user.name`: A string representing the user's name.
  - `user.email`: A string representing the user's email address.
  - `role`: A string representing the user's role.
- `apiary`: A required object containing information about the apiary that the user belongs to. The object must have the following properties:
  - `_id`: A string representing the apiary's ID.
  - `members`: An array of objects representing the members of the apiary. Each member object must have the following properties:
    - `user._id`: A string representing the member's user ID.
    - `role`: A string representing the member's role.

### State

The `UserCard` component has two state variables:

- `expand`: A boolean indicating whether the form to edit the user's role is expanded.
- `formData`: An object containing the form data for editing the user's role. The object has the following properties:
  - `isChecked`: A boolean indicating whether the user is an administrator.

### Methods

The `UserCard` component does not have any methods of its own.

### Child Components

The `UserCard` component uses the following child components from the Material-UI library:

- `Grid`: A grid container used to position the edit icon.
- `Avatar`: An avatar component used to display the user's initials.
- `Card`: A card component used to display the user's information and form to edit the user's role.
- `CardHeader`: A card header component used to display the user's name and email address.
- `CardActions`: A card actions component used to display the edit icon.
- `Collapse`: A collapse component used to show or hide the form to edit the user's role.
- `IconButton`: An icon button component used to trigger the expansion of the form to edit the user's role.
- `Typography`: A typography component used to display the user's name, email address, and messages to the user.
- `Button`: A button component used to submit the form to edit the user's role or delete the user.
- `Box`: A box component used to wrap the form to edit the user's role and the button to delete the user.
- `FormControlLabel`: A form control label component used to display the checkbox to set the user as an administrator.
- `Checkbox`: A checkbox component used to set the user as an administrator.

### Usage Example

```jsx
import UserCard from "./UserCard";

const ExampleComponent = () => {
  const user = {
    user: {
      _id: "user_id_1",
      name: "John Doe",
      email: "john.doe@example.com",
    },
    role: "USER",
  };

  const apiary = {
    _id: "apiary_id_1",
    members: [
      {
        user: {
          _id: "user_id_1",
          name: "John Doe",
          email: "john.doe@example.com",
        },
        role: "ADMIN",
      },
      {
        user: {
          _id: "user_id_2",
          name: "Jane Doe",
          email: "jane.doe@example.com",
        },
        role: "USER",
      },
    ],
  };

  return <UserCard user={user} apiary={apiary} />;
};
```

In this example, the `UserCard` component is rendered with the `user` prop set to an object containing information about the user to display and the `apiary` prop set to an object containing information about the apiary that the user belongs to.

# Features

## Apiary

### `apiary.slice`

This file contains Redux Toolkit code that defines the `apiary` slice of the store. The `apiary` slice stores the user's apiaries and other related data. It also defines a set of `async` actions that are used to interact with an API to retrieve, set, update or delete apiaries, devices, and members.

#### Initial State

The initial state of the `apiary` slice contains the following properties:

- `apiaries`: An empty array that will hold the user's apiaries
- `isError`: A boolean flag that indicates whether an error occurred during the API call
- `isSuccess`: A boolean flag that indicates whether the API call was successful
- `isLoading`: A boolean flag that indicates whether the API call is currently in progress
- `message`: A string that contains any error or success messages from the API call

#### Actions

The `apiary` slice defines several `async` actions using the `createAsyncThunk` function from Redux Toolkit. These actions are responsible for communicating with the API to retrieve, set, update, or delete apiaries, devices, and members.

The async actions include:

- `getApiaries`: An async action that retrieves the user's apiaries
- `setApiary`: An async action that creates a new apiary for the user
- `updateApiary`: An async action that updates an existing apiary for the user
- `deleteApiary`: An async action that deletes an apiary for the user
- `setDevice`: An async action that creates a new device for an apiary
- `updateDevice`: An async action that updates an existing device for an apiary
- `deleteDevice`: An async action that deletes a device for an apiary
- `setMember`: An async action that adds a new member to an apiary
- `updateMember`: An async action that updates an existing member of an apiary

Each of these actions checks whether the user is authenticated, retrieves the user's token, and then calls the appropriate method from the `apiaryService` module to perform the requested operation. If an error occurs, the action updates the `isError` and `message` properties in the `apiary` state slice.

#### Slice

The `apiary` slice is created using the `createSlice` function from Redux Toolkit. It defines reducers for handling the different states of the `apiary` slice. These reducers are responsible for updating the `apiary` state slice when the corresponding async action is complete.

#### Export

The `apiary` slice is exported from this file and can be imported and combined with other slices to create a complete Redux store.

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

This file exports a Redux slice for managing user authentication. It defines an initial state, action creators, and reducers for handling the state changes.

#### State

The initial state has the following properties:

- `user`: An object representing the current authenticated user. It is initialized from the `localStorage`.
- `isError`: A boolean flag indicating whether there was an error in the authentication process.
- `isSuccess`: A boolean flag indicating whether the authentication process was successful.
- `isLoading`: A boolean flag indicating whether the authentication process is currently in progress.
- `message`: A string message that provides more details about any errors encountered during authentication.

#### Actions

This Redux slice exports the following actions:

- `register`: An async thunk action creator that registers a new user. It dispatches the following actions:

  - `register/pending`: Sets the `isLoading` flag to `true`.
  - `register/fulfilled`: Sets the `isLoading` flag to `false` and updates the `user` property with the returned user object.
  - `register/rejected`: Sets the `isLoading` flag to `false`, sets the `isError` flag to `true`, and sets the `message` property to the error message.

- `login`: An async thunk action creator that logs in a user. It dispatches the following actions:

  - `login/pending`: Sets the `isLoading` flag to `true`.
  - `login/fulfilled`: Sets the `isLoading` flag to `false` and updates the `user` property with the returned user object.
  - `login/rejected`: Sets the `isLoading` flag to `false`, sets the `isError` flag to `true`, and sets the `message` property to the error message.

- `logout`: An async thunk action creator that logs out the current user. It dispatches the following action:

  - `logout/fulfilled`: Sets the `user` property to `null`.

- `reset`: A reducer that resets the authentication state. It sets the `isLoading`, `isSuccess`, and `isError` flags to `false` and the `message` property to an empty string.

#### Reducers

The Redux slice has a single reducer that handles state updates for the above actions. It uses the `extraReducers` property to map each action to its corresponding state update.

- The `register` and `login` actions set the `isLoading` flag to `true` when pending, and set it to `false` and update the `user` property with the returned user object when fulfilled. They set the `isError` flag to `true` and the `message` property to the error message when rejected.

- The `logout` action sets the `user` property to `null` when fulfilled.

- The `reset` action sets the `isLoading`, `isSuccess`, and `isError` flags to `false` and the `message` property to an empty string.

That's all about this Redux slice.

# Pages

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
