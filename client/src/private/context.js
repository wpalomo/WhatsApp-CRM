import React, { Component } from "react";
import { withRouter, Redirect } from "react-router-dom";
import { withFirebase } from "../firebase/index";
import { compose } from 'recompose';

const withAuthorization = () => Component => {
	class withAuthorization extends Component {
		componentDidMount() {
			this.listener = this.props.firebase.auth.onAuthStateChanged(
				authUser => {
					if (!condition(authUser)) {
						<Redirect to={{ pathname: '/login' }}/>
					}
				}
			)
		}

		componentWillUnmount() {
			this.listener()
		}

		render() {
			return <Component { ...this.props } />
		}
	}

	return compose(withRouter, withFirebase)(withAuthorization);
}

export default withAuthorization;