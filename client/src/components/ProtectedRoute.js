import React from "react";
import { Redirect } from 'react-router-dom';

const ProtectedRoute = ({ component }) => {
	const Component = component
	const isAuthenticated = sessionStorage.getItem("aun");
	if (isAuthenticated) {
		return <Component />
	}
	return <Redirect to={{ pathname: '/login' }}/>
}

export default ProtectedRoute;