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

let agentList = []
io.on('connection', socket => { 
	console.log('user connected') 

	socket.on('customerToServer', data => {
		io.emit('serverToAgent', data)
	})
	
	socket.on('customerToOneAgent', data => {
		console.log(data, 'to select agent')
		io.to(agentList[0]).emit('serverToSpecificAgent', data)
	})

	socket.on('agentToServer', data => {
		let agentID = socket.id
		let agentMsg = data
		if (!(agentList.includes(agentID))) {
			agentList.push(agentID)
		}
		io.emit('serverToCustomer', {agentMsg, agentID})
	})	
	

	socket.on('disconnect', () => {
		console.log('user left')
	})
})







exports.SocketServer = server
