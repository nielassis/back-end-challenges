require("dotenv").config();

module.exports = {
  development: {
    dialect: "postgres",
    url: process.env.DATABASE_URL,
    ssl: true,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
};
