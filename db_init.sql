/* Select database*/
USE dreamsdb;


/* Manage user info and credentials*/
CREATE TABLE user_status (
  code VARCHAR(50) NOT NULL,
  name VARCHAR(255) NOT NULL,
  created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP  NOT NULL,
  modified_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,
  PRIMARY KEY (code));

INSERT INTO user_status (code, name) VALUES('ACT','Active');

CREATE TABLE users (
  id INT AUTO_INCREMENT NOT NULL,
  document_type VARCHAR(10) NOT NULL,
  document_number VARCHAR(15) NOT NULL,
  status_code VARCHAR(50) NOT NULL,
  name VARCHAR(150) NOT NULL,
  email VARCHAR(256), #per rfc5321 requirements
  created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
  modified_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,
  PRIMARY KEY (id),
  CONSTRAINT fk_user_status FOREIGN KEY (status_code) REFERENCES user_status(code)
  );

CREATE UNIQUE INDEX document_index on users (document_type, document_number);

CREATE TABLE  credentials(
    id INT AUTO_INCREMENT NOT NULL,
    user_id INT NOT NULL,
    password binary(60),
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    modified_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES users(id)
);

/* Manage account information */
CREATE TABLE account_type (
  code VARCHAR(10) NOT NULL,
  name VARCHAR(255) NOT NULL,
  created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP  NOT NULL,
  modified_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,
  PRIMARY KEY (code));

INSERT INTO account_type (code, name) VALUES('SVNG','Savings');
INSERT INTO account_type (code, name) VALUES('CRNT','Current');

CREATE TABLE account_status (
  code VARCHAR(10) NOT NULL,
  name VARCHAR(255) NOT NULL,
  created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP  NOT NULL,
  modified_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,
  PRIMARY KEY (code));

INSERT INTO account_status (code, name) VALUES('ACT','Active');

CREATE TABLE accounts(
    id INT AUTO_INCREMENT NOT NULL,
    type VARCHAR(10) NOT NULL,
    a_number VARCHAR(50) NOT NULL,
    status VARCHAR(10) NOT NULL,
    branch VARCHAR(100), #simplistic branch info
    balance NUMERIC(18,2) DEFAULT 0 NOT NULL,
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP  NOT NULL,
    modified_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT fk_account_type FOREIGN KEY (type) REFERENCES account_type(code),
    CONSTRAINT fk_account_status FOREIGN KEY (status) REFERENCES account_status(code)
);
CREATE UNIQUE INDEX account_number on accounts(a_number);

CREATE TABLE account_holding(
    id INT AUTO_INCREMENT NOT NULL,
    holder INT NOT NULL,
    account INT NOT NULL,
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP  NOT NULL,
    modified_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT fk_holder FOREIGN KEY (holder) REFERENCES users(id),
    CONSTRAINT fk_account FOREIGN KEY (account) REFERENCES accounts(id)
);

/* Manage transactions information */

CREATE TABLE transaction_status (
  code VARCHAR(10) NOT NULL,
  name VARCHAR(255) NOT NULL,
  created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP  NOT NULL,
  modified_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,
  PRIMARY KEY (code));

INSERT INTO transaction_status (code, name) VALUES('CMP','Completed');
INSERT INTO transaction_status (code, name) VALUES('PND','Pending');
INSERT INTO transaction_status (code, name) VALUES('RJT','Rejected');

CREATE TABLE transactions(
    id INT AUTO_INCREMENT NOT NULL,
    origin INT NOT NULL,
    destination INT NOT NULL,
    value NUMERIC(18,2) NOT NULL,
    status VARCHAR(10) NOT NULL,
    t_reference VARCHAR(100),
    additional_info VARCHAR(255),
    date_start TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    date_finished TIMESTAMP,
    fee NUMERIC(18,2) DEFAULT 0,
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP  NOT NULL,
    modified_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT fk_origin FOREIGN KEY (origin) REFERENCES accounts(id),
    CONSTRAINT fk_destination FOREIGN KEY (destination) REFERENCES accounts(id),
    CONSTRAINT fk_status FOREIGN KEY (status) REFERENCES transaction_status(code)
);

/* Manage Products information*/

CREATE TABLE products(
    id INT AUTO_INCREMENT NOT NULL,
    name varchar(40) NOT NULL,
    description varchar(255) NOT NULL,
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP  NOT NULL,
    modified_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,
    PRIMARY KEY (id)
);

INSERT INTO products (name, description) VALUES('Credito agil','credito agil');
INSERT INTO products (name, description) VALUES('Tarjeta de credito','tarjeta de credito');
INSERT INTO products (name, description) VALUES('Cuenta de ahorros','Cuenta de ahorros');
INSERT INTO products (name, description) VALUES('Leasing de vivienda','Leasing de vivienda');

CREATE TABLE product_request_status (
  code VARCHAR(10) NOT NULL,
  name VARCHAR(255) NOT NULL,
  created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP  NOT NULL,
  modified_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,
  PRIMARY KEY (code));

INSERT INTO product_request_status (code, name) VALUES('ACP','Acepted');
INSERT INTO product_request_status (code, name) VALUES('PND','Pending');
INSERT INTO product_request_status (code, name) VALUES('DND','Denied');

CREATE TABLE product_requests(
    id INT AUTO_INCREMENT NOT NULL,
    product INT NOT NULL,
    status VARCHAR(10) NOT NULL,
    requestor INT NOT NULL,
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP  NOT NULL,
    modified_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT fk_request_product FOREIGN KEY (product) REFERENCES products(id),
    CONSTRAINT fk_request_status FOREIGN KEY (status) REFERENCES product_request_status(code),
    CONSTRAINT fk_requestor FOREIGN KEY (requestor) REFERENCES users(id)
);


/* Testing data*/

INSERT INTO users(document_type,document_number, status_code, name) 
VALUES('CC','12345','ACT','John Smith');

INSERT INTO accounts(type,a_number, status, balance ) VALUES('CRNT','123-456','ACT', '500000');
INSERT INTO accounts(type,a_number, status, balance ) VALUES('CRNT','123-457','ACT', '500000');
INSERT INTO accounts(type,a_number, status, balance ) VALUES('CRNT','123-458','ACT', '500000');
INSERT INTO accounts(type,a_number, status, balance ) VALUES('CRNT','123-459','ACT', '500000');

INSERT INTO account_holding(holder,account) VALUES(1,3);
INSERT INTO account_holding(holder,account) VALUES(1,4);
INSERT INTO account_holding(holder,account) VALUES(1,5);
INSERT INTO account_holding(holder,account) VALUES(1,6);

INSERT INTO transactions(origin, destination, value, status, t_reference)
VALUES (3,4,1000,'CMP','Rappi');
INSERT INTO transactions(origin, destination, value, status, t_reference)
VALUES (4,3,1000,'CMP','Rappi');
INSERT INTO transactions(origin, destination, value, status, t_reference)
VALUES (3,5,1000,'CMP','Rappi');

INSERT INTO product_requests (product, status, requestor) VALUES (1, 'PND',1);