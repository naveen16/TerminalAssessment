const { Pool } = require('pg');

//Should Use Environment variables for production application
const config = {
    host: '104.196.69.54',
    user: 'naveen',
    password: 'postgres',
    database: 'terminal',
};
const pool = new Pool(config);

module.exports = pool;
