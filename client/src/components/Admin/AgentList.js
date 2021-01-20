import React, { Component } from "react";
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { team } from "./team"; //replace with a db call



const styles = theme => ({
	root: {
		width: '100%',
	}, 
	container: {
		maxHeight: 440 
	}
})


// const AgentList = () => {
// 	const classes = useStyles()
// 	return(
// 		<Paper className={classes.root}>
// 			<TableContainer className={classes.container}>
// 				<Table stickyHeader aria-label="sticky table">
// 					<TableHead>
// 						<TableRow>
// 							<TableCell>Name</TableCell>
// 							<TableCell align="center">Role</TableCell>
// 				            <TableCell align="center">Email</TableCell>
// 				            <TableCell align="center">Loggedin</TableCell>
// 				            <TableCell align="center">Status</TableCell>
// 						</TableRow>
// 					</TableHead>
// 					<TableBody> 
// 						{ team.map(row => (
// 							<TableRow key={row.name}>
// 								<TableCell component="th" scope="row">{ row.name }</TableCell>
// 								<TableCell align="center">{row.role}</TableCell>
// 								<TableCell align="center">{row.email}</TableCell>
// 					            <TableCell align="center">{row.loggedin}</TableCell>
// 					            <TableCell align="center">{row.status}</TableCell>
// 							</TableRow>
// 						)) }
// 					</TableBody>
// 				</Table>
// 			</TableContainer> 
// 		</Paper>
// 	)
// }

class AgentList extends Component {

	constructor() {
		super()
		this.state = {
			team: []
		}
	}

	// getUsers = () => {

	// }

	// componentDidMount() {
	// 	this.getUsers()
	// }
	
	render() {
		const { classes } = this.props;
		return(
			<Paper className={classes.root}>
				<TableContainer className={classes.container}>
					<Table stickyHeader aria-label="sticky table">
						<TableHead>
							<TableRow>
								<TableCell>Name</TableCell>
								<TableCell align="center">Role</TableCell>
					            <TableCell align="center">Email</TableCell>
					            <TableCell align="center">Loggedin</TableCell>
					            <TableCell align="center">Status</TableCell>
							</TableRow>
						</TableHead>
						<TableBody> 
							{ team.map(row => (
								<TableRow key={row.name}>
									<TableCell component="th" scope="row">{ row.name }</TableCell>
									<TableCell align="center">{row.role}</TableCell>
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
}

export default withStyles(styles)(AgentList);
