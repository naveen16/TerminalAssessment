# Terminal Assessment

## 1- Rationale behind the tools/languages you chose for the assignment

### Data Handling

To handle the data from the google cloud bucket I used a bash script that invoked the PSQL Command `COPY <table_name> FROM <file>`.
This takes a CSV file and stores its contents in the Postgres Database Instance. 
Since the data was so large I decided to create a Google Cloud Postgres Instance to use as the storage. For the Copy command to work
I needed to create the Database and Tables in the format of the csv files before invoking the command. 

An alternative approach to injest the data that I tried was using Python pandas and dask. This approach read the csv files from google
cloud and created a dataframe of the data. Then I called the to_sql function on the dataframe providing postgres connection details to
store the data. This approach worked for the small data set but was taking too long for the large folder. 

I decided to go with the PSQL Copy because it performed better, which makes sense because it did not need to create a intermediary 
storage (dataframe) before storing the data in the DB. The code maintainability for the python code is probably slightly better but 
the performance of the PSQL outweighs it. 

### GraphQL server

I used Node.js and Express to create the graphql server. For communicating with the database I used the NPM module `pg`.

I hosted the server on Heroku: https://terminal-tokens.herokuapp.com/api

## 2- Any considerations you had for CPU, memory or storage

The size of the data was very large(~70GB total data) so I had to create a google cloud instance of postgres to store the data. 
As far as memory, in the python approach I used the `dask` libray over pandas because of its ability to hold data larger than the 
RAM of the computer.

## 3- Performance metrics

The bash script that copied the data token-transfer data into the postgres instance took a total of 7629 seconds which is 
2 Hours, 7 Mins, and 8 Seconds. 

Rows of data in token_transfer table: 219,222,954

Rows of data in token table: 144716

The graphql queries were paginated so the response time was very quick, a query that had to go through the whole token_transfer db
took too long to execute. I was unable to create an index on the table because of a lack of space on the google cloud instance. Adding
an index on the token_address column would have increased the speed of queries dealing with that. 

## 4- If you had to offer the service as a production application, what stack/tools would you use.

## 5- How would you deploy this app? What would be the CI workflow?
