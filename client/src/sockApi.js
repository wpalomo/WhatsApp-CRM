const socketClient = require('socket.io-client');
const socket = socketClient("http://localhost:4001/");

socket.on('customerToAgent', data => {
	console.log(data)
})

socket.emit('agentMessage', data)