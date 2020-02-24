# PVRCINEMA TEST

## Requirements

1. Mysql or MariaDB
2. Node JS - v12.13.1
3. yarn - v1.22.0

## How to install

1. Take a pull from here https://github.com/Boom0027/pvr_server.git
2. Inside the directory add a .env file
3. Add these environment variables
```
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
```    
4. 