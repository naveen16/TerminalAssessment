const graphql = require('graphql');
const pool = require('./db.js');
const Token = require('./Schemas/Token');
const TokenTransfer = require('./Schemas/TokenTransfer');

/*
    All the queries for tokens and token transfers. For queries that return a list, the results are paginated.
    The value for 'first' is the number of rows you want, and the offset skips the first 'x' rows. 
*/

const tokens = {
    type: new graphql.GraphQLList(Token),
    description: 'Get all Tokens',
    args: {
        first: {
          type: graphql.GraphQLInt,
          description: "Limits the number of results returned in the page. Defaults to 10."
        },
        offset: {
            type: graphql.GraphQLInt,
            description: "Integer offset of rows"
        }
    },
    resolve: async (parent, args) => {
        try {
            const response = await pool.query(`SELECT * FROM token limit ${args.first || 10} offset ${args.offset || 0}`);
            return response.rows;
        } catch (error) {
            console.log(error);
        }
    }
}

const token = {
    type: Token,
    description: 'Get a token by providing an address',
    args: { address: { type: graphql.GraphQLNonNull(graphql.GraphQLString) }},
    resolve: async (parent, args) => {
        try {
            const response = await pool.query(`SELECT * FROM token WHERE address='${args.address}'`);
            return response.rows[0];
        } catch (error) {
            console.log(error);
        }
    }
}

const token_transfers = {
    type: new graphql.GraphQLList(TokenTransfer),
    description: 'Get all token transfers',
    args: {
        first: {
          type: graphql.GraphQLInt,
          description: "Limits the number of results returned in the page. Defaults to 10."
        },
        offset: {
            type: graphql.GraphQLInt,
            description: "Integer offset of rows"
        }
    },
    resolve: async (parent, args) => {
        try {
            const response = await pool.query(`SELECT * FROM token_transfer limit ${args.first || 10} offset ${args.offset || 0}`);
            return response.rows;   
        } catch (error) {
            console.log(error);
        }
    }
}

const token_transfer = {
    type: new graphql.GraphQLList(TokenTransfer),
    description: 'Get all token transfers for a given token address',
    args: {
        first: {
          type: graphql.GraphQLInt,
          description: "Limits the number of results returned in the page. Defaults to 10."
        },
        offset: {
            type: graphql.GraphQLInt,
            description: "Integer offset of rows"
        },
        address: { 
            type: graphql.GraphQLNonNull(graphql.GraphQLString) 
        }
    },
    resolve: async (parent, args) => {
        try {
            const response = await pool.query(`SELECT * FROM token_transfer WHERE token_address='${args.address}' limit ${args.first || 10} offset ${args.offset || 0}`);
            return response.rows;   
        } catch (error) {
            console.log(error);
        }
    }
}

// This query takes too long to return a result because I was not able to create an index on the table for the token_address(not enough space), it works with a smaller dataset.
const transfer_volume = {
    type: graphql.GraphQLFloat,
    description: 'Get the total value of all token transfers for a specific token given a symbol, for a certain day',
    args: {
        symbol: {
            type: graphql.GraphQLString,
        },
        day: {
            type: graphql.GraphQLString,
        },
    },
    resolve: async (parent, args) => {
        try {
            const sql = 
            `\
            select sum(value)\
            from token t join token_transfer tt on t.address = tt.token_address\
            where t.symbol = '${args.symbol}' and\
                  substring(block_timestamp, 0,11) = '${args.day}'\
            `;
            const response = await pool.query(sql);
            return response.rows[0].sum; 
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = {
    tokens,
    token,
    token_transfers,
    token_transfer,
    transfer_volume,

}