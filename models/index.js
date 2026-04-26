"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];

let db = {};
let sequelize;

// ------------------------------
// FIXED SEQUELIZE INITIALIZATION
// ------------------------------
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], {
    dialect: "mysql",

    // 🔐 REQUIRED FOR AZURE MYSQL SSL
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    },

    // optional but good for production stability
    logging: false
  });
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    {
      ...config,

      // 🔐 ALSO APPLY SSL HERE FOR SAFETY
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false
        }
      },

      logging: false
    }
  );
}

// ------------------------------
// LOAD MODELS
// ------------------------------
fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 &&
      file !== basename &&
      file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

// ------------------------------
// SET ASSOCIATIONS
// ------------------------------
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// ------------------------------
// EXPORT DB OBJECT
// ------------------------------
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
