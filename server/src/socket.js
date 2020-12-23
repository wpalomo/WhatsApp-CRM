"use strict";
const express = require("express");
const socket = require('socket.io');
const http = require('http');


const sockApp = express()
const server = http.createServer(sockApp)
const io = socket(server)

io.on('connection', socket => {
	console.log('user connected')
	socket.on('customerMessage', data => {
		console.log(data)
		io.emit('agentToCustomer', 'na Tunde dey talk so')
	})

	socket.on('disconnect', () => {
		console.log('user left')
	})
})

 





exports.SocketServer = server
