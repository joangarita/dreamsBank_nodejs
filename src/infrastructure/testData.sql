/* Testing data*/

INSERT INTO users(document_type,document_number, status_code, name) 
VALUES('CC','12345','ACT','John Smith');


INSERT INTO users(document_type,document_number, status_code, name) 
VALUES('CC','3456','ACT','Robert Mueller');

/* hashed password for 1234*/
INSERT INTO credentials (user_id, password) VALUES(1, '$2b$10$Zhs2.MHPvSoTG1.Tk4N.j.rMItuH6MJCHJ3G0CWzRyLD41H8yNQJG');
INSERT INTO credentials (user_id, password) VALUES(2, '$2b$10$Zhs2.MHPvSoTG1.Tk4N.j.rMItuH6MJCHJ3G0CWzRyLD41H8yNQJG');

INSERT INTO accounts(type,a_number, status, balance ) VALUES('CRNT','123-456','ACT', '500000');
INSERT INTO accounts(type,a_number, status, balance ) VALUES('CRNT','123-457','ACT', '500000');
INSERT INTO accounts(type,a_number, status, balance ) VALUES('CRNT','123-458','ACT', '500000');
INSERT INTO accounts(type,a_number, status, balance ) VALUES('CRNT','123-459','ACT', '500000');

INSERT INTO account_holding(holder,account) VALUES(1,3);
INSERT INTO account_holding(holder,account) VALUES(1,4);
INSERT INTO account_holding(holder,account) VALUES(1,5);
INSERT INTO account_holding(holder,account) VALUES(1,6);
INSERT INTO account_holding(holder,account) VALUES(2,3);

INSERT INTO transactions(origin, destination, amount, status, t_reference)
VALUES (3,4,1000,'CMP','Rappi');
INSERT INTO transactions(origin, destination, amount, status, t_reference)
VALUES (4,3,1000,'CMP','Rappi');
INSERT INTO transactions(origin, destination, amount, status, t_reference)
VALUES (3,5,1000,'CMP','Rappi');

INSERT INTO product_requests (product, status, requestor) VALUES (1, 'PND',1);