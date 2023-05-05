# Beehive Monitor Web Application

This full stack web application (MERN Stack), was built to service a Santa Clara University Senior Design engineering project

## Installation

In the main directory, run `npm install` to install backend dependencies. In the `frontend` directory, run `npm install` to install frontend dependencies. Be sure to install Express and Node on your development machines.

## Configuration

Use the template `.env` file to setup necessary configurations such as the MongoDB URI, JWT secret, Google Maps Locations API, and port.

## Usage

In the main director, run `npm run dev` to run both the frontend and backend. run `npm run server` to run only the backend, or run `run npm client` to run only the frontend. The frontend will run on port 3000, and the backend will run on port 5000., by default.

The frontend is built with React and Redux, and the backend is built with Express and Node. The database is MongoDB.

Using the Web Application is simple. The user will be greeted with a login page. If the user has an account, they can login with their credentials. If the user does not have an account, they can register for one. Once logged in, the user will be greeted with a dashboard. The dashboard will display the user's beehives, and the user can use the dropdown to select an apiary and subsequent beehive device to view more information about that specific hive. The user can also add, delete, and update apiaries, each of which is a small organization that contains its own set of devices (hives) that can be added, deleted, and updated. Users may also be added to apiaries to help manage them; members of apiaries can be granted different privileges, with the creator of the apiary having full control of the apiary and its hives. The user can also view the FAQ page, which will display frequently asked questions about the application, as well as the about page, which will display information about the application and its creators. The user can also logout of the application.

## Backend

### Overview

The backend is neatly organized into individual modules, each of which is responsible for a specific set of tasks.

### Config

The `config` module is responsible for setting up the MongoDB connection using Mongoose and the ATLAS URI provided by the MongoDB database.

### Middleware

The `middleware` module is responsible for setting up the middleware for the application. The `auth.middlware` is responsible for authenticating the user using the JWT token provided by the frontend; this token is received based on the current user. The token is decoded using the `JWT Secrect` stored in the `.env` file (not provided), and returns the current user. If no user is found or the user is not authorized for the content they are attempting access, the appropriate error response is returned. The `error.middlware` is responsible for handling errors that occur during the application's runtime. Errors are handled by sending a response to the frontend with the error message and status code.

### Models

The three models used in the application are the `User`, `Apiary`, and `Data` models.

The `user.model` is responsible for storing the user's information, including their `name` (string), _email_ (string), and _password_ (string).

The `apiary.model` is responsible for storing the apiary's information, including its _name_ (string), _location_ (geoSchema), a list of its _devices_ (deviceSchema), and a list of its _members_ (memberSchema). Each _location_ is defined by a _type_ (string), _coordinates_ (array of numbers), a _formattedAddress_ (string), and a _placeID_ (string). Each _device_ is defined by a _name_ (string), _location_ (geoSchema), and _data_ (dataSchema). Each _member_ is defined by a _name_ (string), _email_ (string), and _role_ (string).

The Hive model is responsible for storing the hive's information, including its name, location, and data.

### Routes

### Controllers

### Server

The `models` module is responsible for setting up the Mongoose models for the application, including the User, Apiary, and Hive models. The `routes` module is responsible for setting up the routes for the application, including the routes for authentication, apiaries, and hives. The `utils` module is responsible for setting up the utility functions for the application, including the JWT authentication function. The `server.js` file is responsible for setting up the Express server and the necessary API routes, as well as connecting to the MongoDB database.

## Deployment (Jonathan)

The web application has been deployed on Heroku and can be accessed at https://beehive-webapp.herokuapp.com/. This link will lead to the main login page where the user can enter their username and password to access their account and view their dashboard.

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

- Upload final video from YouTube

## Contact

Any questions regarding the web application, please contact cpaiz@scu.edu or paizcollin@gmail.com
Any questions regarding deployment, please contact jstock@scu.edu or jonathanhstock@gmail.com
Any questions regarding hardware, please contact ewrysinski@scu.edu and dblanc@scu.edu
