require("dotenv").config();

module.exports = {
  development: {
    connectionString: process.env.DATABASE_URL,
    dialect: "postgres",
    ssl: true,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
};
