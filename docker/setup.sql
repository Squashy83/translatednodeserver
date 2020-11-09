-- create the databases
CREATE DATABASE IF NOT EXISTS myprojects;

-- create the users for each database
CREATE USER 'prjuser'@'%' IDENTIFIED BY 'pass12345';
GRANT CREATE, ALTER, INDEX, LOCK TABLES, REFERENCES, UPDATE, DELETE, DROP, SELECT, INSERT ON `myprojects`.* TO 'prjuser'@'%';

FLUSH PRIVILEGES;

use myprojects;

CREATE TABLE projects
(
id INTEGER AUTO_INCREMENT,
title TEXT,
PRIMARY KEY (id)
) COMMENT='projects table';

CREATE TABLE jobs
(
id INTEGER AUTO_INCREMENT,
prjid INTEGER,
price DECIMAL,
jobstatus TEXT,
creationDate DATE,
PRIMARY KEY (id)
) COMMENT='jobs table';