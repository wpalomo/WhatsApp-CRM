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
	socket.on('customerToServer', data => {
		io.emit('serverToAgent', data)
	})

	socket.on('agentToServer', data => {
		io.emit('serverToCustomer', data)
	})	
	

	socket.on('disconnect', () => {
		console.log('user left')
	})
})







exports.SocketServer = server
