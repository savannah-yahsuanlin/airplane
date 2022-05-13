const Sequelize = require("sequelize");
const pkg = require("../../package.json");
const pkgName = pkg.name;
const config = {
  logging: false,
};

if (process.env.LOGGING === "true") delete config.logging;

if (process.env.DATABASE_URL) {
  config.dialectOptions = {
    ssl: {},
  };
}

const db = new Sequelize(
  process.env.DATABASE_URL || `postgres://localhost/${pkgName}`
);
