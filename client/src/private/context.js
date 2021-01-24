import React, { Component } from "react";
import { withRouter } from "react-router-dom";

const withAuthorization = () => Component => {
	class withAuthorization extends Component {
		render() {
			return <Component { ...this.props } />
		}
	}

	return withAuthorization;
}

export default withAuthorization;