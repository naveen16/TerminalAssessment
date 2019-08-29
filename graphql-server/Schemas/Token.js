const graphql = require('graphql');
const pool = require('../db.js');

const Token = new graphql.GraphQLObjectType({
    name: 'Token',
    description: 'Defines a Token',
    fields: () => ({
        address: {
            type: graphql.GraphQLString,
        },
        symbol: {
            type: graphql.GraphQLString,
        },
        name: {
            type: graphql.GraphQLString,
        },
        decimals: {
            type: graphql.GraphQLFloat,
        },
        total_supply: {
            type: graphql.GraphQLFloat,
        },
    })
});

module.exports = Token;