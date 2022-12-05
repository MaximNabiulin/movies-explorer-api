const { MONGOOSE_DB_URL = 'mongodb://localhost:27017/moviesdb' } = process.env;

module.exports.mongoUrl = MONGOOSE_DB_URL;
