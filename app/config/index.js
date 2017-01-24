// TODO: @swlkr this would probably be more awesome with Object.assign();

const redisURI = require('url').parse(process.env.REDIS_URL);
const redisPassword = redisURI.auth.split(':')[1];

if (process.env.NODE_ENV === 'production') {
  module.exports = {
    "dbConnectionString": process.env.DATABASE_URL,
    "sessionSecret": process.env.SESSION_SECRET
  }
} else if (process.env.NODE_ENV === 'staging') {
  module.exports = {
    "dbConnectionString": process.env.DATABASE_URL,
    "sessionSecret": process.env.SESSION_SECRET,
    "redis": {
      "host": redisURI.hostname,
      "port": redisURI.port,
      "password": redisPassword
    }
  }
} else {
  module.exports = {
    // TODO: @swlkr probably a smarter way to handle this
    "dbConnectionString": "postgres://local:local@localhost:5432/org_local",
    "sessionSecret": "imawesome",
    "redis": {
      "host": "locahost",
      "port": "6379",
      "password": ""
    }
  }
}
