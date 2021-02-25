/* Queries used*/
/* GET user password*/
SELECT password FROM credentials WHERE user_id = (SELECT id FROM users WHERE document_type = 'CC' AND document_number = '123456');
/* GET all account that a user holds*/
SELECT * FROM accounts where id in (SELECT account FROM account_holding WHERE holder = @userId);
/* Get all transactions, both debits and credits from an account*/
SELECT * FROM transactions where origin = @accountId OR destination = @accountId;
/*GET detail of a transaction*/
SELECT * FROM transactions where id = @transactionId
/* GET average debits*/
SELECT AVG(amount)  FROM transactions WHERE origin = @accountId;
/* GET average credits*/
SELECT AVG(amount)  FROM transactions WHERE destination = @accountId;
/* GET Combined average, debits and credits*/
Select ((SELECT AVG(amount) * COUNT(*)  FROM transactions WHERE destination = @accountId )
-(SELECT AVG(amount) * COUNT(*)  FROM transactions WHERE origin = @accountId ))/2;
/* POST product_request*/
INSERT INTO product_requests (product, status, requestor) VALUES (@productId, 'PND',@userId);