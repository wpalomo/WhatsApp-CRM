import React, { Component } from "react";
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { db } from "../../firebase";



const styles = theme => ({
	root: {
		width: '100%',
	},  
	container: {
		maxHeight: 440 
	}
})


class AgentList extends Component {

	constructor() {
		super()
		this.state = {
			team: []
		}
	}
  
	getUsers = async () => {
		let companyRef = db.collection('companies');
		let adminRef = db.collection('admins');
		const { authUser } = this.props //this is received from the auth user context
		let adminID;
		authUser ? adminID = authUser.uid : adminID = authUser //check that there's a signed in user before getting the id
		if (adminID) {
			let snapshot = await adminRef.where('adminId', '==', adminID).get()
			let companyName;
			if (!snapshot.empty) {
				snapshot.forEach(doc => { 
					companyName = doc.data().company
				})
			}
			let companyId;
			if (companyName) {
				let companySnapshot = await companyRef.where('name', '==', companyName).get()
				if (!companySnapshot.empty) {
					companySnapshot.forEach(doc => {
						companyId = doc.id
					})
				}
			}
			this.props.companyID(companyId) //send it out to be used when adding new agents to the company
			this.unsubscribe = companyRef.doc(companyId).collection('users').onSnapshot(snapshot => (
			this.setState({
					team: snapshot.docs.map(obj => {
						return obj.data()
					})
				})
			))
		}
	} 

	componentDidMount() {
		this.getUsers()
	}
	
	render() {
		const { classes } = this.props;
		const { team } = this.state;

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
