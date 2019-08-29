# get filenames
IMPFILES=(tokens/*.csv)

# import the files
for i in ${IMPFILES[@]}
    do
        echo "$i"
        psql "sslmode=disable dbname=terminal user=naveen password=postgres hostaddr=104.196.69.54" -c "\COPY token FROM '$i' CSV HEADER"
    done
