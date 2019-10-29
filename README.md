# ABET Submission System

This repository is being developed by Ethan Toney for use by the Computer Science department at the University of Kentucky. Only students of Ethan Toney's Fall 2019 CS498 course have permission to download and edit this repository for the purpose of accomplishing the final project.

## Technologies/Terms

PostgreSQL - This is the database implementation.

Express - This is an api that handles hosting a website on a specific port and handling requests made to that website.

Objection - This is an orm (object relational mapper) api. It allows you to make database queries without having to write any mysql. I'm primary using it to resolve relations between tables since the equivalent mysql would be very difficult to manage.

Knex - This is a database migration tool. It will create database schemas and populate the tables with seed data.

Mustache - This is a logic-less templating engine for html. Basically just allows you to inject the value of a variable into html.

Mocha - This is the testing library used for this project.

Chai -  This is the assertion library used for this project. This is the library you will be using to make assertions in your test cases.

## System Outline

`src/main/views` - folder containing html templates

`src/main/routes` - folder containing express api handlers

`src/main/common` - folder containing common functions used throughout the app

`src/main/lib` - folder containing libraries of functions used by api handler

`src/main/models` - folder containing Objection JS object models

`src/main/migrations` - folder containing database migrations

## Setup Guide

### Install NPM

If you have a package manager on your machine I recommend using it to install npm.

Otherwise download and run the npm installer from [https://nodejs.org/en/download/](https://nodejs.org/en/download/) (This repo has only been manually tested with version 10.16.3 LTS on Mac and Windows)

Make sure to add NPM to your PATH variable if you are on windows! The installer will do this by default as long as you don't disable the option.

Once installed run `npm install` from the command line in the root directory of the project. This will install all required npm packages.

### Install PostgreSQL

If you have a package manager on your machine I recommend using it to install psql.

Otherwise, download and run the PostgreSQL installer from [https://www.postgresql.org/download/](https://www.postgresql.org/download/)

Once installed create the following database schemas `abet_system_dev` and `abet_system_test`, `CREATE DATABASE abet_system_dev; CREATE DATABASE abet_system_test;`.

Then open up the `knexfile.js` file located in the root of this project and add in your database connection information. Here is an example of what that modification could look like.

```
connection: {
	database: 'abet_system_dev',
	user: 'postgres',
	password: 'password'
}
```

Then run `npm run setup_db`. This will run all database migrations and seed both the test and dev servers.

## Operation Guide

### to run all test cases

`npm run test`

### to run the express app

`npm run start`

### to debug (this will automaticallty restart the express app on file modification)

`npm run debug`

### to run database migrations

`npm run migrate` - run migrations on dev

`npm run migrate:test` - run migrations on test

### to seed the database with dev data

`npm run seed` - seeds dev database

`npm run seed:test` - seeds test database

### to run both database migrations and seed the database

`npm run setup_db`

### to run scratch file

`npm run scratch`

Changes are now stable to my knowledge.

## Detailed step by step set-up (by David Stilz):

### DOWNLOADING
- Download Visual Studio Code: https://code.visualstudio.com/download
- Download PostgreSQL: https://www.enterprisedb.com/downloads/postgres-postgresql-downloads
- When downloading PostgreSQL, make sure to set up a password you will easily remember (it will be used later)
- Download Github Desktop: https://desktop.github.com/

### DATABASE SETUP
- Open pgAdmin 4 which should be downloaded alongside the PostgreSQL download suite
- Log in to pgAdmin 4
- Navigate to Servers > PostgreSQL > Databases
- Right click databases and click Create > Database
- Create a database named 'abet_system_dev'
- Repeat Steps 7-8 and create a database named 'abet_system_test'

### GIT SETUP
- Star the main repository on Github.com (click the star button): https://github.com/jonathanamorford/cs498-project
- Open and log in to the desktop Github Desktop application
- Click File > Clone Repository > Click jonathanamorford/cs498-project > Click Clone > Choose a directory you will remember

### DEVELOPMENT ENVIRONMENT SETUP
- Open Visual Studio Code
- Click File > Open Folder > Documents/cs498-project (directory of repo, depends on where it is)
- Click Terminal > New Terminal > Execute 'npm install' command into terminal
- On far left, make sure 'Explorer' tab button is clicked (first and highest button)

### DATABASE INTEGRATION SETUP
- Select knexfile.js in the root directory from the explorer tab, manipulate code lines to look like this (USER will be 'postgres' and PASSWORD will be the password that you personally set when setting PostgreSQL up):

```
const common = {
	client: 'postgresql',
	migrations: {
		directory: './src/main/migrations'
	},
	pool: {
		min: 2,
		max: 10
	}
}

module.exports = {
  development: Object.assign({
    connection: {
      database: 'abet_system_dev',
      user: 'postgres',
      password: 'password'
    },
    seeds: {
      directory: './src/dev/seeds'
    }
	}, common),

  test: Object.assign({
    connection: {
      database: 'abet_system_test',
      user: 'postgres',
      password: 'password'
    },
    seeds: {
      directory: './src/test/seeds'
    }
  }, common),

  production: Object.assign({
    connection: {
      database: 'abet_system'
    }
  }, common)
};
```
- In Visual Studio Code, navigate to explorer tab > NPM Scripts
- Run setup_db (sets up database)

### RUN SERVER
- Run start (starts server)

### OPENING WEB PAGE
- In a web browser, go to localhost:3000 to hit the login page
- Authentication for log in page is 'user': user, 'password': password
