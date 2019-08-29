const graphql = require('graphql');
const pool = require('../db.js');
const Token = require('./Token');

const TokenTransfer = new graphql.GraphQLObjectType({
    name: 'TokenTransfer',
    description: 'Defines a transfer transaction for a token',
    fields: () => ({
        token_address: {
            type: graphql.GraphQLString,
        },
        token: {
            type: Token,
            description: 'References the Token Object',
            resolve: async (tokenTransfer) => {
                const sql = `SELECT * FROM token WHERE address='${tokenTransfer.token_address}'`;
                try {
                    const response = await pool.query(sql);
                    return response.rows[0];   
                } catch (error) {
                    console.log(error);
                }
            }
        },
        from_address: {
            type: graphql.GraphQLString,
        },
        to_address: {
            type: graphql.GraphQLString,
        },
        value: {
            type: graphql.GraphQLFloat,
        },
        transaction_hash: {
            type: graphql.GraphQLString,
        },
        log_index: {
            type: graphql.GraphQLInt,
        },
        block_timestamp: {
            type: graphql.GraphQLString,
        },
        block_number: {
            type: graphql.GraphQLInt,
        },
        block_hash: {
            type: graphql.GraphQLString,
        },
    })
});

module.exports = TokenTransfer;