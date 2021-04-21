# SightBitAuth

Authentication system built with mern stack.

Implementation details:

1. Frontend - React.
The frontend has 3 pages - signin,register and home-page.
On successful signin/register the client restore 2 jwt in local storage(refreshToken,accessToken), this tokens can be used to the requests too the server and make them more secured.
The signin page includes Google authentication and regular sign in.
Libraries:
1.React-redux and redux toolkit for managing application state.
2.Formik to validate correct forms of data (email,password,username).
3.Google login for authentication with google api.
4.React-router-dom to mangage routes between the application.

2. Backend - Nodejs/express.
The backend has 3 routes - signin, signin with google and register.
On successful signin/register the server return the username,refresh token and access token.
Libraries:
1.google-auth- Verify that the user that connected with google-api is valid.
2.JWT- generate json web tokens.
3.mongoose- Object Data Modeling library for MongoDB and Node.js. It manages relationships between data, provides schema validation, and is used to translate between objects in code and the representation of those objects in MongoDB.
4.bycrpt- For hashing the user passwords and store it on the db, also verify that the password is correct on signin.
5.express-validator- Validate the form of data that sent over the server (username,password,email).
6.dotenv- Allows you to separate secrets from your source code.

3. Database - MongoDb (NoSql)

Installation details:
1.clone the git repository
2.The main file authsightbit has 2 files inside of him (authback- backend,authfront- frontend)
3.You need directory to each of those 2 files and run npm install to download the packages.
4.Write npm start in each directory to start the server and the client.


