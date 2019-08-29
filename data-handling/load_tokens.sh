# Loads all files from tokens directory into postgres using the 'Copy' statement.
# Connects to the google cloud postgres instance and stores the data there. 
# The files from the google cloud bucket were copied to my local file system before being stored in DB.

# get filenames
IMPFILES=(tokens/*.csv)

# import the files
for i in ${IMPFILES[@]}
    do
        echo "$i"
        psql "sslmode=disable dbname=terminal user=naveen password=postgres hostaddr=104.196.69.54" -c "\COPY token FROM '$i' CSV HEADER"
    done
