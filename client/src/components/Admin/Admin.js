import React, { useState } from "react";
import Navbar from './Navbar';
import Sidebar from './Sidebar';
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
				<Navbar sidebarOpen={sidebarOpen} openSideBar={openSideBar}/>
				<h1>Admin Dashboard</h1>
				<Sidebar sidebarOpen={sidebarOpen} closeSideBar={closeSideBar}/>
			</div>
		</div>
	)
}

export default Admin;