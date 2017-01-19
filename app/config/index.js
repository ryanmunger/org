// TODO: @swlkr this would probably be more awesome with Object.assign();

if (process.env.NODE_ENV === 'production') {
  module.exports = {
    "dbConnectionString": process.env.DATABASE_URL,
    "sessionSecret": process.env.SESSION_SECRET
  }
} else if (process.env.NODE_ENV === 'staging') {
  module.exports = {
    "dbConnectionString": process.env.DATABASE_URL,
    "sessionSecret": process.env.SESSION_SECRET
  }
} else {
  module.exports = {
    // TODO: @swlkr probably a smarter way to handle this
    "dbConnectionString": "postgres://local:local@localhost:5432/org_local",
    "sessionSecret": 'imawesome'
  }
}
