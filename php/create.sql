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