# PVR CINEMA TEST

## Requirements

1. Mysql or MariaDB
2. Node JS - v12.13.1
3. yarn - v1.22.0

## How to install

1. Take a pull from here https://github.com/Boom0027/pvr_server.git
2. Inside the directory add a .env file and add the following environment variable. Replace the variables with your own environment variable.
```.env
    EMAIL_SERVICE=<servie> eg: gmail
    EMAIL_USERNAME=<email_user_name> eg: abc@gmail.com
    EMAIL_PASSWORD=<your_email_password>
    EMAIL_MAX_CONNECTIONS=<max_number_of_connections_to_email_client> eg: 10

    DATABASE_HOST=<data_base_host> eg: localhost
    DATABASE_USER=<data_base_username> eg: root, abc
    DATABASE_PASSWORD=<data_base_password>
    DATABASE_DATABASE=<database_name>
    DATABASE_MAX_CONNECTION=<database_max_pool_connections> eg: 100
    DATABASE_MIN_CONNECTION=<database_min_connections> eg: 0
    DATABASE_CONNECTION_IDLE_TIME=<database_max_idle_time> eg: 30

    BCRYPT_SALT_ROUNDS=<bcrypt_salt_rounds> eg: 10 - default

    JWT_SECRET=<jwt_secret>
    HTTP_PORT=<any_available_port>
```
##### Note: If you use gmail as email service, you need to enable insecure apps from here https://myaccount.google.com/lesssecureapps.
3. Run 'yarn install' in your command line interface to install all dependencies.
4. Run 'yarn generateDB' to generate the tables and populate.
5. Run 'yarn start' or 'yarn cluster' to start in standalone or cluster mode respectively. You can access the website at http://localhost:<your_port> or http://localhost:5000 by default

## Description

This is a PVR Cinema admin test application which simulates the running of a PVR Cinema web application.

As an admin user, you can:
1. Add movies and theatres in any available city
2. Add users to the data base
3. Send email to the email address of any user
4. Notify all the users using email about a movie when it is playing in one of the theatres in their city.

The server side is made using nodejs and express. Factory design pattern has also been followed to stucture the express application. 
Using this, I have created and exposed REST API endpoints which are consumed in the client side. 

I used nodeJS for this project because this application is mainly supposed to be used for sending emails and not processor heavy tasks. And since I/O is the strongest point of nodeJS, it seemed like the best choice.

I used mysql (mariaDB) for this project but a no-sql database like mongo can also be used as well as there aren't too many complicated relations or transactions.

##### Client side is made in Vue js https://github.com/Boom0027/pvr_client.git