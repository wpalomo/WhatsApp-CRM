"use strict";
const express = require("express");
const socket = require('socket.io');
const http = require('http');

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

const addAgentToMap = (username, socketId) => {
	if (!usernameSocketidMap.has(username)) {
		usernameSocketidMap.set(username, new Set([socketId]))
	} else {
		usernameSocketidMap.get(username).add(socketId)
	}
}

const removeAgentFromMap = (socketId) => {
	if (usernameSocketidMap.size === 0) { //needed for the twilio socket
		return 'unnamed agent'
	} else {
		let leavingAgent = ""
		for (let [k, v] of usernameSocketidMap) {
			if (v.has(socketId)) {
				leavingAgent = k
			} 
		}
		if (leavingAgent === "") { //needed for the twilio socket
			return 'unnamed agent'
		} else {
			let leavingAgentSet = usernameSocketidMap.get(leavingAgent)
			leavingAgentSet.delete(socketId)
			if (leavingAgentSet.size === 0) {
				usernameSocketidMap.delete(leavingAgent)
				return leavingAgent
			} else {
				return { leavingAgent }
			}
		}
	}
}

io.on('connection', socket => { 
	console.log('connected!')

	socket.on('loggedInAgent', agentUsername => {
		if (agentUsername !== "") {
			addAgentToMap(agentUsername, socket.id)
		}
		console.log(usernameSocketidMap)
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
		//get the id of the socket that left, check the map and remove the username
		let resp = removeAgentFromMap(socket.id)
		if (typeof(resp) === 'string') {
			console.log(resp, 'left')
		} else {
			console.log(resp.leavingAgent, 'closed a connection')
		} 
	})
})







exports.SocketServer = server
