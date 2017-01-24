// TODO: @swlkr this would probably be more awesome with Object.assign();

if (process.env.NODE_ENV === 'production') {
  module.exports = {
    "dbConnectionString": process.env.DATABASE_URL,
    "sessionSecret": process.env.SESSION_SECRET,
    "redis": {
      "url": process.env.REDIS_URL
    }
  }
} else if (process.env.NODE_ENV === 'staging') {
  console.log(redisURI, redisPassword);
  module.exports = {
    "dbConnectionString": process.env.DATABASE_URL,
    "sessionSecret": process.env.SESSION_SECRET,
    "redis": {
      "url": process.env.REDIS_URL
    }
  }
} else {
  module.exports = {
    // TODO: @swlkr probably a smarter way to handle this
    "dbConnectionString": "postgres://local:local@localhost:5432/org_local",
    "sessionSecret": "imawesome",
    "redis": {
      "url": "http://127.0.0.1:6379"
    }
  }
}
