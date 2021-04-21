# SightBitAuth

Authentication system built with mern stack.

Implementation details:

1. Frontend - React.<br />
The frontend has 3 pages - signin,register and home-page.<br />
On successful signin/register the client restore 2 jwt in local storage(refreshToken,accessToken), this tokens can be used to the requests to the server and make them more secured.<br />
The signin page includes Google authentication and regular sign in.<br />
Libraries:<br />
1.React-redux and redux toolkit for managing application state.<br />
2.Formik to validate correct forms of data (email,password,username).<br />
3.Google login for authentication with google api.<br />
4.React-router-dom to mangage routes between the application.<br />

2. Backend - Nodejs/express.<br />
The backend has 3 routes - signin, signin with google and register.<br />
On successful signin/register the server return the username,refresh token and access token.<br />
Libraries:<br />
1.google-auth- Verify that the user that connected with google-api is valid.<br />
2.JWT- generate json web tokens.<br />
3.mongoose- Object Data Modeling library for MongoDB and Node.js. It manages relationships between data, provides schema validation, and is used to translate between objects in code and the representation of those objects in MongoDB.<br />
4.bycrpt- For hashing the user passwords and store it on the db, also verify that the password is correct on signin.<br />
5.express-validator- Validate the form of data that sent over the server (username,password,email).<br />
6.dotenv- Allows you to separate secrets from your source code.<br />

3. Database - MongoDb (NoSql)<br />

Installation details:<br />
1.clone the git repository<br />
2.The main file authsightbit has 2 files inside of him (authback- backend,authfront- frontend)<br />
3.You need directory to each of those 2 files and run npm install to download the packages.<br />
4.Write npm start in each directory to start the server and the client.<br />


