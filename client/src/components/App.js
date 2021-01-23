import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { withFirebase } from "../firebase/index";
import { AuthUserContext } from "../session/index";
import Cryptic, { SessionDataContext } from "../encrypt/index";
import Routes from "./Routes";
import '../index.css';


class App extends Component {

	constructor() {
		super()
		this.state = {
			authUser: null
		} 
	}

	componentDidMount() {
		this.listener = this.props.firebase.auth.onAuthStateChanged(authUser => {
			authUser
				? this.setState({ authUser })
				: this.setState({ authUser: null })
		})
	}

	componentWillUnmount() { 
		this.listener()
	}

	render() {
		const { authUser } = this.state
		 return (
		 	<AuthUserContext.Provider value={authUser}>
		 		<SessionDataContext.Provider value={new Cryptic()}>
				  	<div className="app">
					   	<Router>
					       <Routes /> 
					    </Router>
				    </div>
				</SessionDataContext.Provider>
			</AuthUserContext.Provider>
		  );
	}
}

export default withFirebase(App);
 