const {
  Sequelize,
  BOOLEAN,
  STRING,
  INTEGER,
  DECIMAL,
  ENUM,
} = require("sequelize");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const SALT_ROUNDS = 5;

const db = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/stackathon');

if (process.env.LOGGING === "true") delete config.logging;

if (process.env.DATABASE_URL) {
  config.dialectOptions = {
    ssl: {
      rejectUnauthorized: false,
    },
  };
}

const User = db.define("user", {
  email: {
    type: STRING,
  },
  username: {
    type: STRING,
  },
  firstName: {
    type: STRING,
  },
  lastName: {
    type: STRING
  },
  password: {
    type: STRING,
  },
  imgUrl: {
    type: STRING
  },
  fullName: {
    type: STRING
  },
  token: {
    type: STRING
  },
  passportId: {
    type: STRING,
  }
});

const Product = db.define("product", {
  name: {
    type: STRING,
    allowNull: false,
  },

  alliance: {
    type: ENUM(["OW", "SA", "ST", "none"]),
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
User.hasMany(Product);

User.prototype.correctPassword = function(candidatePwd) {
  return bcrypt.compare(candidatePwd, this.password);
};

User.prototype.generateToken = function() {
  return jwt.sign({ id: this.id }, process.env.JWT);
};

User.authenticate = async function({ username, password }) {
  const user = await this.findOne({ where: { username } });
  if (!user || !(await user.correctPassword(password))) {
    const error = Error("Incorrect username/password");
    error.status = 401;
    throw error;
  }
  return user.generateToken();
};

User.findByToken = async function(token) {
  try {
    const { id } = await jwt.verify(token, process.env.JWT);
    const user = await User.findByPk(id);
    if (!user) {
      throw "nooo";
    }
    return user;
  } catch (ex) {
    const error = Error("bad token");
    error.status = 401;
    throw error;
  }
};


User.authenticateViaSocial = async function (passportId) {
  const user = await this.findOne({ where: { passportId } });
  if (!user) {
    const error = Error("No user exists");
    error.status = 401;
    throw error;
  }
  return user.generateToken();
};

const hashPassword = async (user) => {
  if (user.changed("password")) {
    user.password = await bcrypt.hash(user.password, SALT_ROUNDS);
  }
};

User.beforeCreate(hashPassword);
User.beforeUpdate(hashPassword);
User.beforeBulkCreate((users) => Promise.all(users.map(hashPassword)));

module.exports = {
  db,
  Product,
  WishList,
  User,
};
