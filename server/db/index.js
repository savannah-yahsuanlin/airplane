const {
  Sequelize,
  STRING,
  BOOLEAN,
  INTEGER,
  DECIMAL,
  ENUM,
} = require("sequelize");
const pkg = require("../../package.json");
const pkgName = pkg.name;

const config = {
  logging: false,
};

const db = new Sequelize(
  process.env.DATABASE_URL || `postgres://localhost/${pkgName}`,
  config
);

if (process.env.LOGGING === "true") delete config.logging;

if (process.env.DATABASE_URL) {
  config.dialectOptions = {
    ssl: {
      rejectUnauthorized: false,
    },
  };
}

const Product = db.define("product", {
  name: {
    type: STRING,
    allowNull: false,
  },

  alliance: {
    type: ENUM(["OW", "SA", "ST"]),
    allowNull: true,
  },

  phone: {
    type: STRING,
    allowNull: true,
  },

  site: {
    type: STRING,
    allowNull: true,
  },

  logoURL: {
    type: STRING,
    allowNull: true,
  },

  price: {
    type: DECIMAL(20, 2),
    allowNull: true,
  },

  seat: {
    type: INTEGER,
    allowNull: false,
    defaultValue: 0,
  },

  isNew: {
    type: BOOLEAN,
    defaultValue: false,
  },

  isHotDeal: {
    type: BOOLEAN,
    defaultValue: false,
  },

  isEditorChoice: {
    type: BOOLEAN,
    defaultValue: false,
  },
});

const WishList = db.define("wishlist", {
  list: {
    type: INTEGER,
    defaultValue: 0,
  },
});

Product.hasMany(WishList);

module.exports = {
  db,
  Product,
  WishList,
};
