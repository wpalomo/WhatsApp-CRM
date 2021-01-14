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
			<div className="admin__parent">
				<h1>Admin Dashboard</h1>
			</div>
		</div>
	)
}

export default Admin;