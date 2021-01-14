import React, { useState } from "react";
import "../styles/admin.css";

const Admin = () => {

	const [sidebarOpen, setSideBarOpen] = useState(false);
	const openSideBar = () => {
		setSideBarOpen(true)
	}
	const closeSideBar = () => {
		setSideBarOpen(false)
	}

	return(
		<div className="admin__container">
			<h1>Admin Dashboard</h1>
		</div>
	)
}

export default Admin;