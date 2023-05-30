# World Cup back-end


# How to install
* Download [Nodejs](https://nodejs.org/en/download/) LTI
* Download [PostgerSQL](https://www.postgresql.org/download/)
* Clone the project
* Create a file named **.env** at the project directory and copy the enviornment variables down below in it
* Create a user with a password within the database SQLshell or pgAdmin
```postgres
CREATE USER user_name WITH PASSWORD password_;
```
* Create the storefront database
> note that the store front is the default name you can change it
```postgres
CREATE DATABASE store_front;
```
* Update **.env** file with database info including database name, username, password and the port which the db works with (5432 by default)
* Run `npm install` from the project dir
* Run `npm run db-migrate:up`
> This command will instantiate the tables within the database
* Run `npm run build`
* Run `npm run start:prod`
> This will start the server on pre-configured port **5000** and you can change it within .env file under the name **PORT**
* Look at the [Requirements file](REQUIREMENTS.md) to get API document

# How to test
* Create a new database for testing let's call it store_front_test
* Edit **.env** to work on test db
```
# This for .env file
ENV = test
```

* Run `npm run test`
> Don't forget to abort me if there is a fail 😂

## Environment variables
you can copy those variables into a new .env file in order to make your project works correctly
```
PORT = 3000
# This part for database configuration
POSTGRES_HOST = "127.0.0.1"
POSTGRES_USER = "postgres"
POSTGRES_DB = "store_front"
POSTGRES_DB_TEST = "store_front_test"
POSTGRES_DB_PORT = 5000
POSTGRES_PASSWORD = "password123"
ENV = test

# bcrypt info
SECRET_KEY = hakonamatata
SALT_ROUNDS = 10

# json token
JSON_SECRET_KEY = hakonamatata
```
