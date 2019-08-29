DROP TABLE IF EXISTS token_transfer CASCADE;
CREATE TABLE token_transfer (
    token_address VARCHAR (1024) REFERENCES token (address),
    from_address VARCHAR (1024),
    to_address VARCHAR (1024),
    value Numeric,
    transaction_hash VARCHAR (1024),
    log_index INT,
    block_timestamp VARCHAR (1024),
    block_number Numeric,
    block_hash VARCHAR (1024)
);


DROP TABLE IF EXISTS token CASCADE;
CREATE TABLE token (
    address VARCHAR (1024) PRIMARY KEY,
    symbol VARCHAR (1024),
    name VARCHAR (1024),
    decimal Float,
    total_supply Float
);





