const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  development: {
    username: "admin",
    password: process.env.DATABASE_PASSWORD,
    database: "momukzzi",
    host: "database-3.cpvcd8yfubpy.us-east-1.rds.amazonaws.com",
    dialect: "mysql",
  },
  test: {
    username: "admin",
    password: process.env.DATABASE_PASSWORD,
    database: "momukzzi",
    host: "database-3.cpvcd8yfubpy.us-east-1.rds.amazonaws.com",
    dialect: "mysql",
  },
  production: {
    username: "admin",
    password: process.env.DATABASE_PASSWORD,
    database: "momukzzi",
    host: "database-3.cpvcd8yfubpy.us-east-1.rds.amazonaws.com",
    dialect: "mysql",
  },
};
