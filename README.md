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
