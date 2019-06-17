module.exports = {
    development: {
        client: 'pg',
        connection: {
<<<<<<< HEAD
            database: "db",
=======
            database: "skilltest",
>>>>>>> 73a270f9239bed75ed37829b03e91b4caaf3418b
            host: "localhost"
        },
        migrations: {
            directory: __dirname + '/db/migrations',
        },
        seeds: {
            directory: __dirname + '/db/seeds',
        },
    },
    production: {
        client: 'pg',
        connection: process.env.DATABASE_URL,
        migrations: {
            directory: __dirname + '/db/migrations',
        },
        seeds: {
            directory: __dirname + '/db/seeds',
        },
    },
};
