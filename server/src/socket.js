"use strict";
const express = require("express");
const socket = require('socket.io');
const http = require('http');

//https://dev.to/bravemaster619/how-to-prevent-multiple-socket-connections-and-events-in-react-531d

const sockApp = express()
const server = http.createServer(sockApp)

const io = socket(server, {
	cors: {
		origin:"http://localhost:3000",
		methods: ['GET', 'POST']
	}
})

io.on('connection', socket => {
	console.log('user connected')
	// socket.on('customerMessage', data => {
	// 	console.log(data)
	// 	io.emit('agentToCustomer', 'the server is talking')
	// })
	socket.emit('agentMessage', 'from sock server to react on xmas')
	socket.on('agentToCustomer', data => {
		console.log(data)
	})	
	

	socket.on('disconnect', () => {
		console.log('user left')
	})
})







exports.SocketServer = server
