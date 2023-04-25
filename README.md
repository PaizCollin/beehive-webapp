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

### auth.middleware.js

This is a middleware function that adds authentication to a Node.js/Express application. The `protect` function checks for a valid JSON Web Token (JWT) in the `Authorization` header of incoming HTTP requests. If a valid token is found, the function decodes the token and sets the authenticated user in the request object. If a valid token is not found, the function returns a 401 Unauthorized response.

#### Usage

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

#### Function Definition

The `protect` function takes three arguments: `req`, `res`, and `next`.

##### req

The `req` argument is the incoming HTTP request object.

##### res

The `res` argument is the outgoing HTTP response object.

##### next

The `next` argument is a function that passes control to the next middleware function in the request-response cycle.

#### Function Flow

The `protect` function follows this flow:

1. Check if the `Authorization` header exists and starts with the word "Bearer".

2. If the header exists and starts with "Bearer", try to verify the JWT.
3. If the JWT is valid, get the user ID from the token payload and find the user in the database.
4. If the user is found, set the `req.user` property to the user object without the password field, and call the `next()` function to pass control to the next middleware.
5. If the JWT is not valid, return a 401 Unauthorized response with an error message.
6. If the `Authorization` header does not exist or does not start with "Bearer", return a 401 Unauthorized response with an error message.

#### Error Handling

If the `protect` function encounters an error, it will throw an error and call the `next()` function with the error object as an argument. This will trigger Express's default error handling middleware, which will return an error response to the client.

## Models

The three models used in the application are the `User`, `Apiary`, and `Data` models.

### User Schema

This is a schema definition for a user model in a Node.js/Express application using Mongoose, an Object Data Modeling (ODM) library for MongoDB. The user schema defines the structure and validation rules for user documents that will be stored in a MongoDB database.

### Schema Definition

The user schema has three properties: `name`, `email`, and `password`.

### name

The `name` property is a required string field that represents the user's name.

### email

The `email` property is a required string field that represents the user's email address. This field must be unique, meaning that no two users can have the same email address.

### password

The `password` property is a required string field that represents the user's password.

### Options

The user schema also includes options for the timestamps, which will automatically add `createdAt` and `updatedAt` fields to each user document.

### Example

Here's an example of what a user document might look like based on this schema:

| Field     | Value                    |
| --------- | ------------------------ |
| name      | John Doe                 |
| email     | johndoe@example.com      |
| password  | $2a$10$V7X9I...jMx7      |
| createdAt | 2021-10-01T12:34:56.789Z |
| updatedAt | 2021-10-01T12:34:56.789Z |

Note that the password field is encrypted using bcrypt, so the value shown is just an example of an encrypted password hash. The actual value would be a long string of random characters.

The `createdAt` and `updatedAt` fields are automatically added by Mongoose and represent the date and time that the document was created and last updated, respectively.

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
