const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialectModule: require("pg"),
  dialect: "postgres",
  protocol: "postgres",
  logging: false,
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("PostgreSQL connected");
    await sequelize.sync();
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

module.exports = { sequelize, connectDB };
