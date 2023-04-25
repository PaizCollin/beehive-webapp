# Beehive Monitor Web Application

This full stack web application (MERN Stack), was built to service a Santa Clara University Senior Design engineering project

Installation
In the main directory, run `npm install` to install backend dependencies. In the `frontend` directory, run `npm install` to install frontend dependencies. Be sure to install Express and Node on your development machines.

Configuration
Use the template `.env` file to setup necessary configurations such as the MongoDB URI, JWT secret, Google Maps Locations API, and port.

Usage
In the main director, run `npm run dev` to run both the frontend and backend. run `npm run server` to run only the backend, or run `run npm client` to run only the frontend. The frontend will run on port 3000, and the backend will run on port 5000., by default.

The frontend is built with React and Redux, and the backend is built with Express and Node. The database is MongoDB.

Using the Web Application is simple. The user will be greeted with a login page. If the user has an account, they can login with their credentials. If the user does not have an account, they can register for one. Once logged in, the user will be greeted with a dashboard. The dashboard will display the user's beehives, and the user can use the dropdown to select an apiary and subsequent beehive device to view more information about that specific hive. The user can also add, delete, and update apiaries, each of which is a small organization that contains its own set of devices (hives) that can be added, deleted, and updated. Users may also be added to apiaries to help manage them; members of apiaries can be granted different privileges, with the creator of the apiary having full control of the apiary and its hives. The user can also view the FAQ page, which will display frequently asked questions about the application, as well as the about page, which will display information about the application and its creators. The user can also logout of the application.

Deployment (Jonathan)
Explain how to deploy the application, including any server requirements and deployment steps.

Testing (TBD)
Testing has been manual. Outline how to test the application, including any testing frameworks or methodologies used.

License
Property of Santa Clara University under SCU's Senior Design Program

Acknowledgments
Special thanks to Kian Nizkad, Wendy Mather, and Gerhard and Lisa Eschelbeck for their continued support on this project's details and design direction.

Appendix
Include any additional information or resources, such as troubleshooting tips or frequently asked questions.

Screenshots

- Manage
- Dashboard
- Manage opened
- FAQ

Video Demo

- Upload final video from

Contact
Any questions regarding the web application, please contact cpaiz@scu.edu or paizcollin@gmail.com
Any questions regarding deployment, please contact jstock@scu.edu
Any questions regarding hardware, please contact ewrysinski@scu.edu and dblanc@scu.edu
