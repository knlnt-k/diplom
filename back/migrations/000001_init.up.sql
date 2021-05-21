CREATE TABLE companies
(
    id serial not null unique,
    name varchar(255) not null,
    login varchar(255) not null,
    password varchar(255) not null
);

CREATE TABLE users
(
    id serial not null unique,
    name varchar(255) not null,
    last_name varchar(255),
    login varchar(255) not null,
    password varchar(255) not null,
    company_id int(20) not null,
    price int(5),
    profession int(1),
    access int(1),
    date_change_price int(12)
);

CREATE TABLE tasks
(
    id serial not null unique,
    name varchar(255) not null,
    description text(65535),
    user_id int(20),
    priority int(1),
    project_id int(20) not null,
    company_id int(20) not null,
    status int(1),
    created int(12)
);

CREATE TABLE projects
(
    id serial not null unique,
    name varchar(255) not null,
    description text(65535),
    company_id int(20) not null,
    created int(12)
);

CREATE TABLE times
(
    id serial not null unique,
    task_id int(20) not null,
    user_id int(20) not null,
    time int(20) not null,
    created int(12)
);

CREATE TABLE comments_tasks
(
    id serial not null unique,
    task_id int(20) not null,
    user_id int(20) not null,
    comment text(65535),
    created int(12)
);