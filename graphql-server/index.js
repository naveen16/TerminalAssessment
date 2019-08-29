const express = require('express');
const graphqlHTTP = require('express-graphql');
const graphql = require('graphql');

const app = express();

const {
    tokens,
    token,
    token_transfers,
    token_transfer,
    transfer_volume,
} = require('./queries');


const QueryRoot = new graphql.GraphQLObjectType({
    name: 'Query',
    fields: () => ({
        tokens,
        token,
        token_transfers,
        token_transfer,
        transfer_volume,
    })
});

const schema = new graphql.GraphQLSchema({ 
    query: QueryRoot,
});


app.use('/api', graphqlHTTP({
    schema: schema,
    graphiql: true,
}));

app.listen(4000, () => {
    console.log('listening on port 4000');
});