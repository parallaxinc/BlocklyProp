DROP TABLE IF EXISTS logs;
DROP TABLE IF EXISTS projectDependencies;
DROP TABLE IF EXISTS projects_tags;
DROP TABLE IF EXISTS tags;
DROP TABLE IF EXISTS projects;
DROP TABLE IF EXISTS users;


create table users (
    id int unsigned auto_increment primary key,
    email varchar(255) not null,
    password varchar(255) not null,
    blocked tinyint(1) default 0,
    created DATETIME DEFAULT NULL,
    modified DATETIME DEFAULT NULL
);

create table friends (
    id int unsigned auto_increment primary key,
    requester varchar(255) not null,
    requestee varchar(255) not null,
    friend_request tinyint(1) default 0,
    friends_since DATETIME DEFAULT NULL,
    modified DATETIME DEFAULT NULL
);

create table projects (
    id int unsigned auto_increment primary key,
    id_user int unsigned,
    private tinyint(1),
    shared tinyint(1),
    created datetime default null,
    modified datetime default null,
    name varchar(255) not null,
    type varchar(50) not null,
    board varchar(100),
    description LONGTEXT,
    code LONGTEXT
);

create table tags (
    id int unsigned auto_increment primary key,
    name varchar(255)
);

create table projects_tags (
    id int unsigned auto_increment primary key,
    id_project int unsigned not null,
    id_tag int unsigned not null
);

create table projectDependencies (
    id int unsigned auto_increment primary key,
    id_project int unsigned not null,
    code varchar(255) not null
);

create table logs (
    id int unsigned auto_increment primary key,
    id_user int unsigned,
    code int unsigned,
    message varchar(255),
    id_object int unsigned,
    created DATETIME DEFAULT NULL
);