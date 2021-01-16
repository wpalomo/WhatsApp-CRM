import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import "./styles/agentlist.css";


const useStyles = makeStyles({
	root: {
		width: '100%',
	}, 
	container: {
		maxHeight: 440
	}
})

const createData = (name, email, loggedin, status) => {
	return {name, email, loggedin, status}
}

const rows = [
	createData('Jomi Oni', 'joju@gmail.com', '3:14pm', 'active'),
    createData('Winifred Robb', 'winifred@gmail.com', '3:29pm', 'active'),
    createData('Funke Sausage', 'funke@gmail.com', 'no', 'active'),
    createData('Joke Nuttycah', 'joke@gmail.com', 'no', 'deleted'),
    createData('Jessica Cocha', 'jess@gmail.com', 'no', 'pending'),
]

const AgentList = () => {
	const classes = useStyles()
	return(
		<Paper className={classes.root}>
			<TableContainer className={classes.container}>
				<Table stickyHeader aria-label="sticky table">
					<TableHead>
						<TableRow>
							<TableCell>Name</TableCell>
				            <TableCell align="center">Email</TableCell>
				            <TableCell align="center">Loggedin</TableCell>
				            <TableCell align="center">Status</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{ rows.map(row => (
							<TableRow key={row.name}>
								<TableCell component="th" scope="row">{ row.name }</TableCell>
								<TableCell align="center">{row.email}</TableCell>
					            <TableCell align="center">{row.loggedin}</TableCell>
					            <TableCell align="center">{row.status}</TableCell>
							</TableRow>
						)) }
					</TableBody>
				</Table>
			</TableContainer>
		</Paper>
	)
}

export default AgentList;
