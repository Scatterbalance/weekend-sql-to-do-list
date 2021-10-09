// require pg first
const pg = require( 'pg' );

const pool = new pg.Pool({
    database: 'weekend_to_do_app', //change NAME to db name
    host: 'localhost',
    port: 5432,
    max: 30,
    idleTimeoutMillis: 30000
})
// export
module.exports = pool;