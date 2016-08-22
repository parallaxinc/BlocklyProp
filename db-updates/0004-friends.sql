CREATE TABLE friend_request
(
    id BIGINT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    idRequestUser BIGINT NOT NULL,
    idRequestedUser BIGINT NOT NULL,
    requested DATETIME DEFAULT now() NOT NULL,
    request_sent_count INT DEFAULT 0 NOT NULL,
    request_last_sent DATETIME DEFAULT now(),
    refused BIT DEFAULT 0 NOT NULL,
    CONSTRAINT friend_request_request_user_id_fk FOREIGN KEY (idRequestUser) REFERENCES user (id),
    CONSTRAINT friend_request_requested_user_id_fk FOREIGN KEY (idRequestedUser) REFERENCES user (id)
);
CREATE UNIQUE INDEX friend_request_idRequestUser_idRequestedUser_uindex ON friend_request (idRequestUser, idRequestedUser);

CREATE TABLE friend_request_email
(
    id BIGINT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    idRequestUser BIGINT NOT NULL,
    email BIGINT NOT NULL,
    accept_Key VARCHAR(255) NOT NULL UNIQUE,
    requested DATETIME DEFAULT now() NOT NULL,
    request_sent_count INT DEFAULT 0 NOT NULL,
    request_last_sent DATETIME DEFAULT now(),
    refused BIT DEFAULT 0 NOT NULL,
    CONSTRAINT friend_request_email_request_user_id_fk FOREIGN KEY (idRequestUser) REFERENCES user (id)
);
CREATE UNIQUE INDEX friend_request_email_idRequestUser_idRequestedUser_uindex ON friend_request_email (idRequestUser, email);

CREATE TABLE friend
(
    id BIGINT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    idRequestUser BIGINT NOT NULL,
    idRequestedUser BIGINT NOT NULL,
    requested DATETIME DEFAULT now() NOT NULL,
    accepted DATETIME NOT NULL,
    request_sent_count INT DEFAULT 0 NOT NULL,
    request_last_sent DATETIME DEFAULT now(),
    CONSTRAINT friend_request_user_id_fk FOREIGN KEY (idRequestUser) REFERENCES user (id),
    CONSTRAINT friend_requested_user_id_fk FOREIGN KEY (idRequestedUser) REFERENCES user (id)
);
CREATE UNIQUE INDEX friend_idRequestUser_idRequestedUser_uindex ON friend (idRequestUser, idRequestedUser);