/* Queries used*/
/* GET user password*/
SELECT password FROM credentials WHERE user_id = (SELECT id FROM users WHERE document_type = @documentType AND document_number = @documentNumber);

/* GET all account that a user holds*/
SELECT * FROM accounts where id in (SELECT account FROM account_holding WHERE holder = @userId);

/* Get all transactions, both debits and credits from an account*/
SELECT * FROM transactions where origin = @accountId OR destination = @accountId;

/*GET detail of a transaction*/
SELECT * FROM transactions where id = @transactionId

/* GET average debits*/
SELECT AVG(amount)  FROM transactions WHERE origin = @accountId AND date_start BETWEEN @dateStart AND @dateEnd;

/* GET average credits*/
SELECT AVG(amount)  FROM transactions WHERE destination = @accountId AND date_start BETWEEN @dateStart AND @dateEnd;

/* GET Combined average, debits and credits -- avgCredits*numberCredits - avgDebits*numberDebits */
Select (SELECT IFNULL(AVG(amount),0) * COUNT(*)  FROM transactions WHERE destination = @accountId AND date_start BETWEEN @dateStart AND @dateEnd )
-(SELECT IFNULL(AVG(amount),0) * COUNT(*)  FROM transactions WHERE origin = @accountId AND date_start BETWEEN @dateStart AND @dateEnd ) AS average;

/* POST product_request*/
INSERT INTO product_requests (product, status, requestor) VALUES (@productId, 'PND',@userId);