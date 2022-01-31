### Starting the server

1. cd to server directory
2. Run `node index.js`

## Starting the client

1. yarn install
2. yarn start

## MySQL

For Local dev, ensure MySQL is installed locally.
https://dev.mysql.com/downloads/mysql/
Setup password and note

## Download MySQL workbench

https://dev.mysql.com/downloads/workbench/

## Configure DB:

1. Create a new schema and name it
2. Create a new table and name it
3. Create db table entries you want to store

This can be used to create exact db I'm using:

```
CREATE SCHEMA `react_node_crud
```

CREATE TABLE `react_node_crud`.`employees` (
`id` INT NOT NULL AUTO_INCREMENT,
`name` TEXT(255) NOT NULL,
`age` INT NOT NULL,
`country` TEXT(255) NOT NULL,
`position` TEXT(255) NOT NULL,
`wage` INT NOT NULL,
PRIMARY KEY (`id`))

```



```
