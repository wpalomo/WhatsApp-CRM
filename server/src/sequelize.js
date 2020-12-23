"use strict";

const Sequelize = require("sequelize");
const config = require('./config/config');


const c = config.dev

const sequelize = new Sequelize(
	c.database,
	c.username,
	c.password,
	{
		host: c.host,
		dialect: "postgres",
	}
);

//always check connection to the AWS RDS DB Instance
function checkDBConn(){
		return (sequelize
				  .authenticate()
				  .then(() => {
				    console.log('Connection has been established successfully.');
				  })
				  .catch(err => {
				    console.error('Unable to connect to the database:', err);
		}))
}

exports.checkDBConn = checkDBConn;
exports.sequelize = sequelize;