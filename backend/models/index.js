const Sequelize = require('sequelize');
const fs = require('fs');
const path = require('path');
const config = require('../config/config');
const env = process.env.NODE_ENV || 'development';
const db = {};

if (!config[env]) {
  throw new Error(`환경 설정이 존재하지 않습니다: ${env}`);
}

const sequelize = new Sequelize(
  config[env].database, 
  config[env].username, 
  config[env].password, 
  config[env]
);


db.sequelize = sequelize;

const basename = path.basename(__filename); //index.js
fs.readdirSync(path.join(__dirname, './'))
  .filter(file => file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js')
  .forEach(file => {
    const model = require(path.join(__dirname, file));
    db[model.name] = model;
    model.initiate(sequelize);
  });
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});
db.sequelize = sequelize;

module.exports = db;