"use strict";
const express = require("express");
const bodyParser = require("body-parser");

const { IndexRouter } = require('./controllers/v0/index.router');
const { SocketServer } = require('./socket');


const PORT = process.env.PORT || 4000;
const socketPort = process.env.socketPort || 4001;

const app = express()

app.use(bodyParser.json());
app.use('/api/v0/', IndexRouter)


app.get('/', (req, res) => {
	res.send('/api/v0/') 
}) 
 
app.post('/', (req, res) => {
	res.send('/api/v0/') 
})


app.listen(PORT, () => {
	console.log(`The server is running on port ${ PORT }`)
});

SocketServer.listen(socketPort, () => {
	console.log(`the socket server is listening on port ${socketPort}`)
})
