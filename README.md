# Working with a MySQL Database via Node.js - an employee managment concept app

This is a concept app built on Node.js, using Inquirer.js to provide a CLI that 
can manage a local MySQL database.

> Last Updated: 01/29/2022

## Active Under Development

---

## Index

- **[Requirements](#requirements)**
    - [MySQL](#mysql)
    - [Node.js](#node-js)
    - [NPM Packages](#npm-packages)
- **[Useage](#useage)**
- **[Repo Stats](#repo-stats)**
- **[Contributors](#contributors)**
- **[Contact Me](#contact-me)**

---

## Requirements

To use this app, you'll need to download the repo locally. 
> Below are the specifics  along with some setup guides.

### MySQL

- Requires a local instance of MySQL by installed. ( *[See here for a setup guide](https://coding-boot-camp.github.io/full-stack/mysql/mysql-installation-guide)* )

### Node.js

- Requires a locall instalaltion of Node.js. ( *[See here for a setup guide](https://coding-boot-camp.github.io/full-stack/nodejs/how-to-install-nodejs)* )

### NPM Packages

Once you've got Node.js installed locally, run `npm -i` in the app directory.
> Doing this will install proper required. I've also included a link to the
> modules and a short summary of how they are used in this app.

- [mysql2](https://www.npmjs.com/package/mysql2) is used to allow Node to work
with a local MySQL database.
- [sequelize](https://sequelize.org/) is being used building seed data.
- [dotenv]() is being used to allow access to local `.env` file, which contains database info.
- [inquirer](https://www.npmjs.com/package/inquirer) is used to manage user input
and provide a CLI.
- [console.table](https://www.npmjs.com/package/console.table) is used to provide
easy-to-read SQL query results from the MySQL database.
- [jest](https://www.npmjs.com/package/jest) is used for testing, and for [TDD](https://www.guru99.com/test-driven-development.html).

---

## Useage

To learn how to use this APP, follow the below steps.
> If you prefer, you can also follow along with [this video]().

1. [Download App](#download-app)
2. [Install Node Packages](#install-node-packages)
3. [Update .env file](#update-env-file)
4. [Import seed database](#import-seed-database)
5. [Start Express Server](#tart-Express-Server)
6. [Start Application](#start-application)


---

### 1. Download App

> To use this app, you'll need to download the repo locally.

[Link to download, here](https://github.com/ErikPlachta/mysql-node-employee-management-cms/archive/refs/heads/main.zip)

### 2. Install Node Packages

> Next, you'll need to install the Node package dependencies.

```bash
npm i;
```

### 3. Update .env file

> Change the filename of `RENAME.env`  to `.env`, open it, and then add your
> username and password for your MySQL server connection.

```env
DB_USER=YourUsername
DB_PASSWORD=YourPassword
DB_NAME=employee_db

MY_PORT=3001
SERVER_PATH=localhost
```

### 4. Import seed database

> For this step, you'll be importing the seed-database that I've created to use 
> the APP.

```bash
npm run seed;
```

### 5. Start Express Server

> Once your database is setup, you'll need to start the express.js server

```bash
npm start;
```

### 6. Start Application

> Run the app.js file to get started.

```bash
npm run app;
```

### 7 Follow Prompts

> Lastly, to use the application just follow the prompts on the screen.

---

## Repo Stats

[![GitHub license](https://img.shields.io/github/license/ErikPlachta/mysql-node-employee-management-cms)](https://github.com/ErikPlachta/mysql-node-employee-management-cms)

[![GitHub Number of Languages](https://img.shields.io/github/languages/count/ErikPlachta/mysql-node-employee-management-cms)](https://github.com/ErikPlachta/mysql-node-employee-management-cms)
[![GitHub top Language](https://img.shields.io/github/languages/top/ErikPlachta/mysql-node-employee-management-cms)](https://github.com/ErikPlachta/mysql-node-employee-management-cms)

[![GitHub issues](https://img.shields.io/github/issues/ErikPlachta/mysql-node-employee-management-cms)](https://github.com/ErikPlachta/mysql-node-employee-management-cms/issues)

![GitHub last commit](https://img.shields.io/github/last-commit/erikplachta/mysql-node-employee-management-cms)
![GitHub commit activity](https://img.shields.io/github/commit-activity/w/erikplachta/mysql-node-employee-management-cms)
![GitHub commit activity](https://img.shields.io/github/commit-activity/m/erikplachta/mysql-node-employee-management-cms)
![GitHub commit activity](https://img.shields.io/github/commit-activity/y/erikplachta/mysql-node-employee-management-cms)

## Contributors

### [Erik Plachta](www.github.com/erikplachta)

## Contact Me

Feel free to contact me on my Twitter [@ErikPlachta](https://www.twitter.com/erikplachta)
