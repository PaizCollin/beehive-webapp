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

## `data.controller`

This file handles data-related routes and requests.

### Functions

#### putData

- Route: `POST /api/data/:apiary_id/:device_id/`
- Access: Needs protection (ML team authorized only)
- Description: Uploads a data point to the database.

# Server

The `server` is responsible for setting up the server and connecting to the database. The server is also responsible for listening on the port specified in the `.env` file (not provided).

# Frontend

# App

## `store`

This code snippet configures a Redux store using @reduxjs/toolkit. It uses two slices, auth and apiary, to manage state related to user authentication and the application's apiary feature.

# Components

## `AboutCard` React Component

The `AboutCard` React component is a MUI-based card that displays a question-answer pair. It is typically used to display frequently asked questions on a website.

### Props

- `faq`: An array containing two strings. The first string represents the question, and the second string represents the answer to the question.

### Usage

```jsx
import AboutCard from "./AboutCard";

const faq = ["What is this website about?", "This website is about..."];

function MyComponent() {
  return <AboutCard faq={faq} />;
}
```

## `AddApiaryCard` React Component

This is a React functional component that renders a card with a button to add a new apiary. When the button is clicked, a form expands to allow the user to input the details of the new apiary, including the name and location. The user can select the location from the Google Maps Autocomplete component.

### Props

This component does not receive any props.

### Methods

The component defines two methods:

- `onChange`: A function that updates the `formData` state object as the user types into the `name` field and selects a location from the `maps` dropdown.
- `onSubmit`: An async function that dispatches an action to add the new apiary to the API using the `setApiary` function from the Redux store.

### Usage

```jsx
import AddApiaryCard from "./AddApiaryCard";

function MyComponent() {
  return (
    <div>
      <AddApiaryCard />
    </div>
  );
}
```

## `AddDeviceCard` React Component

The `AddDeviceCard` component is a React component that allows users to add a new device to an apiary. This component displays a card with an "Add Device" button that, when clicked, expands to show a form with fields for the device's name, serial number, and remote link. Users can enter the required information and create a new device by clicking the "Create Device" button.

### Props

- `apiary`: (required) An object that contains the apiary ID to which the device will be added.
- `userRole`: (required) A string that contains the role of the user. The value can be either "USER", "ADMIN", or "CREATOR".

### Methods

The component defines two methods:

- `onChange`: A function that updates the `formData` state object as the user types into the `name` field, `serial` field, and `remote` field.
- `onSubmit`: An async function that dispatches an action to add the new device to the API using the `setDevice` function from the Redux store.

### Usage

```jsx
import AddDeviceCard from "./AddDeviceCard";

const MyComponent = () => {
  const apiary = {
    _id: "apiaryId",
  };
  const userRole = "ADMIN";

  return <AddDeviceCard apiary={apiary} userRole={userRole} />;
};
```

## `AboutUserCard` React Component

The `AddUserCard` is a React functional component that renders a card with a form to add new users to an API. It uses the Material UI library for styling and components.

### Props

The component receives two props:

- `apiary`: (required) An object representing the API to which the new user will be added. It contains an `_id` property with the API's unique identifier.
- `userRole`: (required) A string that contains the role of the user. The value can be either "USER", "ADMIN", or "CREATOR".

### State

The component uses the `useState` hook to manage the following state:

- `expand`: A boolean that controls whether the form is expanded or collapsed.
- `formData`: An object that contains the email and role of the user being added, as well as a boolean to determine if they should be an administrator.

### Methods

The component defines two methods:

- `onChange`: A function that updates the `formData` state object as the user types into the email field and selects the "Set as administrator" checkbox.
- `onSubmit`: An async function that dispatches an action to add the new user to the API using the `setMember` function from the Redux store.

### Usage

```javascript
import AddUserCard from "./AddUserCard";

const MyComponent = () => {
  const apiary = { _id: "123abc" };
  const userRole = "ADMIN";

  return <AddUserCard apiary={apiary} userRole={userRole} />;
};
```

## `ApiaryCard` React Component

The `ApiaryCard` component displays information about an apiary and provides the ability to edit and delete apiary details. It also displays the devices and users associated with the apiary.

### Props

The component takes in the following props:

- `apiary`: An object containing the details of a single apiary. The object should have the following properties:
  - `_id`: A string representing the unique identifier of the apiary.
  - `name`: A string representing the name of the apiary.
  - `location`: An object representing the location of the apiary. The object should have the following properties:
    - `formattedAddress`: A string representing the formatted address of the apiary location.

### Children Components

The `ApiaryCard` component uses the following child components:

- `UserCard`: A component that displays the details of a single user.
- `DeviceCard`: A component that displays the details of a single device.
- `AddUserCard`: A component that allows the user to add a new member to the apiary.
- `AddDeviceCard`: A component that allows the user to add a new device to the apiary.

### State

The `ApiaryCard` component maintains the following state:

- `expand`: A boolean value that determines whether the form to edit the apiary details is expanded or not.
- `formData`: An object that stores the data entered in the form to edit the apiary details.

### Methods

The `ApiaryCard` component defines the following methods:

- `checkUser(apiary, user)`: A helper function that takes in an `apiary` object and a `user` object and returns the role of the user in the apiary.
- `onChange(e)`: A method that handles the onChange event of the form input fields and updates the `formData` state accordingly.
- `onSubmit(e)`: A method that handles the onSubmit event of the form and dispatches an action to update the apiary details.
- `onDelete(e)`: A method that handles the onSubmit event of the delete button and dispatches an action to delete the apiary.

### Usage

```jsx
import ApiaryCard from "./ApiaryCard";

<ApiaryCard apiary={apiaryData} />;
```

## `AutocompleteMaps` Typescript Component

A React component that provides autocomplete functionality for Google Maps Places API. It uses the AutocompleteService to fetch place predictions and the Autocomplete component from the @material-ui/lab library to render the autocomplete dropdown. It also uses the loadScript method from the @react-google-maps/api library to load the Google Maps JavaScript API script asynchronously.

---

### Props

- `value`: The currently selected place. If provided, it must be an object with `description`, `main_text`, `secondary_text`, `main_text_matched_substrings`, `offset`, and `length` properties. Defaults to `null`.
- `setValue`: A function that is called with the selected place object when a new place is selected.

### Methods

- `loadScript(src: string, position: HTMLElement | null, id: string)`: This method loads the Google Maps JavaScript API script asynchronously. It takes three arguments:
  - `src`: The URL of the script to load.
  - `position`: The position in the DOM where the script should be inserted. This should be a `<head>` element.
  - `id`: The ID to assign to the script element.
- `fetch(request: { input: string }, callback: (results?: readonly PlaceType[]) => void)`: This method fetches place predictions from the Google Places API using the AutocompleteService. It takes two arguments:
  - `request`: An object containing an `input` property with the text to search for.
  - `callback`: A function that will be called with an array of place objects if the search is successful.

### Interfaces

- `MainTextMatchedSubstrings`: An interface describing the `main_text_matched_substrings` property of a place object. It has two properties:
  - `offset`: The starting index of the matched substring.
  - `length`: The length of the matched substring.
- `StructuredFormatting`: An interface describing the `structured_formatting` property of a place object. It has three properties:
  - `main_text`: The main text of the place description.
  - `secondary_text`: Additional text about the place, such as the city and state.
  - `main_text_matched_substrings` (optional): An array of `MainTextMatchedSubstrings` objects describing any matched substrings in the `main_text` property.
- `PlaceType`: An interface describing a place object returned by the Google Places API. It has two properties:
  - `description`: A string describing the place.
  - `structured_formatting`: A `StructuredFormatting` object containing additional information about the place.

### Usage

This component is a wrapper around the `Autocomplete` component from the Material-UI library that provides autocomplete suggestions based on the user's input using the Google Maps Places API. The component takes two props: `value` and `setValue`.

Here's an example usage:

```jsx
import GoogleMaps from "./GoogleMaps";

function MyComponent() {
  const [value, setValue] = React.useState(null);

  return <GoogleMaps value={value} setValue={setValue} />;
}
```

In this example, the `value` prop is the currently selected place, and the `setValue` prop is a function that gets called with the selected place object when a new place is selected. You can pass these props to the `GoogleMaps` component and it will handle the rest.

Note that you'll need to obtain a Google Maps API key and enable the Places API in order to use this component. You can do this by following the instructions in the [Google Maps JavaScript API documentation](https://developers.google.com/maps/gmp-get-started).

# DeviceCard Component

A React component that renders a card representing a device with options to edit, delete, and display detailed information.

## Props

| Name     | Type   | Description                                                           |
| -------- | ------ | --------------------------------------------------------------------- |
| device   | object | The device object to be rendered                                      |
| apiary   | object | The apiary object to which the device belongs                         |
| userRole | string | The role of the user viewing the component (either "ADMIN" or "USER") |

## Methods

| Name     | Description                                                                   |
| -------- | ----------------------------------------------------------------------------- |
| onChange | A function that updates the component's form data when the user inputs values |
| onSubmit | A function that dispatches an updateDevice action to update the device        |
| onDelete | A function that dispatches a deleteDevice action to delete the device         |

## State

| Name   | Description                                                    |
| ------ | -------------------------------------------------------------- |
| expand | A boolean that toggles the display of the detailed information |

## Child Components

| Name        | Description                                           |
| ----------- | ----------------------------------------------------- |
| Grid        | A MUI component used for grid layout                  |
| Avatar      | A MUI component used to display an avatar             |
| Card        | A MUI component used to render a card                 |
| CardActions | A MUI component used to render actions for the card   |
| CardHeader  | A MUI component used to render the header of the card |
| Collapse    | A MUI component used to display detailed information  |
| IconButton  | A MUI component used to render an icon button         |
| Typography  | A MUI component used to render text                   |
| TextField   | A MUI component used to render a form field           |
| Box         | A MUI component used for layout                       |
| Button      | A MUI component used to render a button               |

## Usage Example

```jsx
import DeviceCard from "./DeviceCard";

const MyComponent = () => {
  const device = {
    name: "My Device",
    serial: "123456",
    remote: "https://example.com",
  };
  const apiary = { _id: "123", name: "My Apiary" };
  const userRole = "ADMIN";

  return <DeviceCard device={device} apiary={apiary} userRole={userRole} />;
};
```

### Features

The `DeviceCard` component displays the following features:

- Displays the device name and serial number in the header of the card.
- Displays an avatar with the first letter of the device name in the header of the card.
- Displays a collapseable form for editing the device information, including the name and remote link.
- Displays a button for deleting the device.
- Allows users with an admin role to edit and delete the device.
- Disables the edit and delete buttons for users with a user role.

## `FAQCard` Component

A React component that displays a frequently asked question with a collapsible answer.

### Props

- `faq` (array) : An array containing the question and answer text. The first item in the array is the question and the second item is the answer.

### Methods

- The `FAQCard` component does not include any methods.

### State

- `expand` (boolean): A state variable that controls whether the answer is collapsed or expanded.

### Child Components

- `Card` : A Material UI Card component that provides a container for the question and answer.
- `CardHeader` : A Material UI CardHeader component that displays the question.
- `Avatar` : A Material UI Avatar component that displays an icon next to the question.
- `HelpOutlineOutlinedIcon` : A Material UI icon component that is used as the icon for the Avatar component.
- `CardActions` : A Material UI CardActions component that displays the expand/collapse button.
- `Grid` : A Material UI Grid component that provides a container for the expand/collapse button.
- `IconButton` : A Material UI IconButton component that is used as the expand/collapse button.
- `ArrowDropDownOutlinedIcon` : A Material UI icon component that is used as the icon for the expand/collapse button.
- `Collapse` : A Material UI Collapse component that displays the answer when expanded.
- `Box` : A Material UI Box component that provides a container for the answer text.
- `Typography` : A Material UI Typography component that displays the answer text.

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
