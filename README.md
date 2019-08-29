# Terminal Assessment

Comments:

I hosted the server on heroku it can be tested at the following link:
<a href="https://terminal-tokens.herokuapp.com/api" target="_blank">https://terminal-tokens.herokuapp.com/api</a> 

Here are a couple example queries:

Get all tokens, return the first 10 with offset 0:
```
{
  tokens(first: 10, offset:0){
    address,
    symbol,
    name,
    total_supply,
  }
}
```

Get all token transfers, return the first 10 with offset 10:
```
{
  token_transfers(first:10, offset: 10){
    token_address,
    from_address,
    to_address,
    token{
      symbol,
      name
    }
  }
}
```

Other queries are listed in the documentation on the right side of the link.

Also if you want to view the google cloud postgres instance you can run the following command to open up the psql shell on your machine:

`psql "sslmode=disable dbname=terminal user=naveen password=postgres hostaddr=104.196.69.54"`

## 1- Rationale behind the tools/languages you chose for the assignment

### Data Handling

To handle the data from the google cloud bucket I used a bash script that invoked the PSQL Command `COPY <table_name> FROM <file>`.
This takes a CSV file and stores its contents in the Postgres Database Instance. I copied the contents of the google cloud bucket
to my local computer using the `gsutil cp -r gs://my-bucket dir` command.
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

I hosted the server on Heroku: <a href="https://terminal-tokens.herokuapp.com/api" target="_blank">https://terminal-tokens.herokuapp.com/api</a> 

## 2- Any considerations you had for CPU, memory or storage

The size of the data was very large(~70GB total data) so I had to create a google cloud instance of postgres to store the data. 
As far as memory, in the python approach I used the `dask` library over pandas because of its ability to hold data larger than the 
RAM of the computer.

## 3- Performance metrics

The bash script that copied the token-transfer data into the postgres instance took a total of <b>7629 seconds</b> which is 
<b>2 Hours, 7 Mins, and 8 Seconds</b>. 

Rows of data in token_transfer table: <b>219,222,954</b>

The bash script that copied the token data into the postgres instance took <b>3 seconds</b>, I just used the `time` command for this
because it was only one file.

Rows of data in token table: <b>144,716</b>

The graphql queries were paginated so the response time was very quick, a query that had to go through the whole token_transfer db
took too long to execute. I was unable to create an index on the table because of a lack of space on the google cloud instance. Adding
an index on the token_address column would have increased the speed of queries dealing with that. 

## 4- If you had to offer the service as a production application, what stack/tools would you use.

I would create a front end using React which would have an interface where you could interact with the graphql server queries. 
I would host the web app on GCP or AWS. I would also host the backend graphql server on GCP or AWS (I hosted it on heroku for simplicity,
GCP or AWS is better for production because they are more powerful/customizable).

As far as the data storage I would use the same stack/tools but allow for dynamic downloading of all the contents of the bucket based
on input. Potentially could include the `gsutil cp` command in the bash script. 

## 5- How would you deploy this app? What would be the CI workflow?

For the data storage I would use the bash script to download the contents of the bucket and then perform the psql copy on each of them.
This would be done on the cloud server that we deploy the app to. 

I would deploy the server on GCP or AWS so the graphql server would be available for use. 
As far as the CI workflow I would create 3 different environements: Development, Staging, and Production. New features would be 
done in development and once completed I would run a set of test cases against it before allowing for merge into staging. Once the 
tests pass the development branch would merge into staging. In this branch we would make a final pass through with testing and make
sure it passes the test cases before being merged into production. Once in production it would go live on the server. 
We could use a service like CircleCI to streamline this process. 

