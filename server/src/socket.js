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
		io.emit('customerToAgent' data)
	})
	socket.on('agentMessage', data => {
		io.emit('agentToCustomer', data)
	})

	socket.on('disconnect', () => {
		console.log('user left')
	})
})







exports.SocketServer = server
