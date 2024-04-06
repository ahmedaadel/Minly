# Minly 
complete project that provides a minimal media sharing platform .

## Table of Contents
- Architecture
- Setup Instructions
- Additional Notes

## Architecture
### Database layer 
  It is built using **MYSQL** database, it contains schema (**minly_db**) and table (**media**) which contain data related to both vedio and image
  
### Application Layer
  It is built using **Node.js** and **TypeScript**, providing a web service that handles CRUD operations and other business logic.
  it contains operations that needed to interact with database such as create post - update state of the post(liked - unliked) - and retrieve post content - handling CORS    

### presentation layer 
  In this project, the presentation layer is implemented as a mobile app using **Flutter** , and as a web app using **React**. 
  It interacts with the backend service to retrieve and display data to the user in an intuitive and responsive manner.

## setup Instructions
  - ### starting from mysql database :
      you are required to download mysql server and mysql workbench
      then in the database file the is a (**Database (1)**) file you can use to import the schema --
      or you can simple run sql commands that exists in (**sql query.sql**) file  both in **database folder**

   
   - ### for the nodejs and typescript:
       #### you need to install
         1) Node.js
     
         2) run these commands npm install -g typescript

         3) npm install express @types/express

         4) npm i --save-dev @types/cors

         5) npm install --save-dev typescript @types/node @types/express @types/mysql2 @types/body-parser
     
      #### in order to run code
         1) in terminal run > tsc

         2) in terminal run > node dist/app.js

 - ### for flutter:
     you can follow this url in order to install suitable version (https://docs.flutter.dev/get-started/install)


- ### for React
    #### in order to start application
  
      1) run npm start


## Additional Notes
  - you have to update **domainUrl** variable in **flutter** application with the approperiate ip and port.
    this var is in (lib/shared/constants)

   - if you were to test React application you have to change **cors** origin port with the correct one in the (**app.ts**) in node js application 
