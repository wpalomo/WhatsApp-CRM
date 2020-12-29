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
const usernameSocketidMap = new Map();

io.on('connection', socket => { 
	console.log('user connected') 

	socket.on('loggedInAgent', agentUsername => {
		addAgentToMap(agentUsername, socket.id)
	})

	socket.on('customerToServer', data => {
		io.emit('serverToAgent', data)
	})
	
	socket.on('customerToOneAgent', data => {
		const { Body, From } = data
		let customerID = From.split(':')[1]
		for (let obj of agentList) {
			if (obj.customerID === customerID) {
				io.to(obj.agentID).emit('serverToSpecificAgent', data)
			}
		}
	})

	socket.on('agentToServer', data => {
		let agentID = socket.id
		const { agentMessage, customerID  } = data
		if (agentList.length === 0) {
			agentList.push({agentID, customerID})
		} else {
			for (let obj of agentList) {
				if (obj.customerID !== customerID) {
					agentList.push({agentID, customerID})
				}
			}
		}
		io.emit('serverToCustomer', {agentMessage, agentID, customerID})
	})	
	

	socket.on('disconnect', () => {
		console.log('user left')
	})
})







exports.SocketServer = server
