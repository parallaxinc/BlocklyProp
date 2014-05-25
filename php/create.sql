DROP TABLE IF EXISTS projects_tags;
DROP TABLE IF EXISTS tags;
DROP TABLE IF EXISTS projects;

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