const dbConfig = {
  HOST: "satao.db.elephantsql.com",
  USER: "dunsoflb",
  PASSWORD: "VUDz-0EK60JuqrLaGrP91ahIyD5ZDKy_",
  DB: "dunsoflb",
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
}; 

const Sequelize  = require("sequelize");
// const db2 = {};

const db = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect  
});

db.authenticate().then(() => {
    console.log('PG Connection has been established successfully.');
 }).catch((error) => {
    console.error('Unable to connect to the database: ', error);
 });
 
// db2.db=db;
// db2.QueryTypes=QueryTypes;

// console.error(db);

module.exports = db;
