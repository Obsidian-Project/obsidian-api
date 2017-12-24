const env = process.env.NODE_ENV || 'development';
const DATABASE_CONNECTION = "mongodb://edson:edson123@ds161346.mlab.com:61346/obsidiandb";

let config = {
  development: {
      db: DATABASE_CONNECTION
  },
  production: {
      db: DATABASE_CONNECTION
  },
  test: {
      db: DATABASE_CONNECTION
  }
}

module.exports = config[env];