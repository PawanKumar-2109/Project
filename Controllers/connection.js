const {Client} = require('pg');

const client = new Client(
    {
        user : 'postgres',
        host : 'localhost',
        database : 'project',
        password : 'chemistry',
        port : '5432'
    }
)

client.connect();

module.exports = client;