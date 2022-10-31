const { Sequelize, DataTypes } = require("sequelize");
// const address = require("./address.js");
// const user = require("./user.js");
//const user = require("../Models/user");

const sequelize = new Sequelize("Task3", "root", "Tectoro@123", {
  dialect: "mysql",

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

async function run() {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

run();

//sequelize synchronization

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.user = require("./user.js")(sequelize, DataTypes);
db.address = require("./address.js")(sequelize, DataTypes);
db.sequelize.sync({ alter: true });
db.user.hasOne(db.address);
db.address.belongsTo(db.user)
module.exports = db;
