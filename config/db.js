const {sequelize} = require("sequelize");

const createDB = new sequelize("test-db" , "user","pass",{ 
    dialect:"sqlite",
    host:"./config/db.sqlite",
});

module.exports= createDB;