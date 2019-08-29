# get filenames
IMPFILES=(token-transfers/*.csv)

start=`date +%s`
echo "Start Time: $start"

# import the files
for i in ${IMPFILES[@]}
    do
        startFile=`date +%s`
        echo "Start file: $startFile"
        echo "$i"
        psql "sslmode=disable dbname=terminal user=naveen password=postgres hostaddr=104.196.69.54" -c "\COPY token_transfer FROM '$i' CSV HEADER"
        endFile=`date +%s`
        echo "End File: $endFile"
        runtime=$((end-start))
        echo "Time for file: $runtime"
    done

end=`date +%s`
echo "End time: $runtime"
runtime=$((end-start))
echo "Total time: $runtime"
