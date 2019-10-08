# ABET Submission System

This repository is being developed by Ethan Toney for use by the Computer Science department at the University of Kentucky. Only students of Ethan Toney's Fall 2019 CS498 course have permission to download and edit this repository for the purpose of accomplishing the final project.

## Technologies/Terms

Express - This is an api that handles hosting a website on a specific port and handling requests made to that website.

Objection - This is an orm (object relational mapper) api. It allows you to make database queries without having to write any mysql. I'm primary using it to resolve relations between tables since the equivalent mysql would be very difficult to manage.

Knex - This is a database migration tool. It will create database schemas and populate the tables with seed data.

Mustache - This is a logic-less templating engine for html. Basically just allows you to inject the value of a variable into html.

Mocha - This is the testing library used for this project.

Chai -  This is the assertion library used for this project. This is the library you will be using to make assertions in your test cases.

## System Outline

TODO

## Setup Guide

### Install NPM

If you have a package manager on your machine I recommend using it to install npm.

Otherwise download and run the npm installer from (https://nodejs.org/en/download/)[https://nodejs.org/en/download/]

Make sure to add NPM to your PATH variable if you are on windows!

Once installed run `npm install` from the command line so that all npm packages are downloaded and configured.

### Install PostgreSQL

If you have a package manager on your machine I recommend using it to install psql.

Otherwise, download and run the PostgreSQL installer from (https://www.postgresql.org/download/)[https://www.postgresql.org/download/]

Once installed create the following database schema `abet_system_dev`, `CREATE DATABASE abet_system_dev;`.

Then run `npm run setup_db:unix` (if on unix based system).

## Operation Guide

### to test

`npm run test:unix`

### to run

`npm run start:unix`

### to debug

`npm run debug:unix`
