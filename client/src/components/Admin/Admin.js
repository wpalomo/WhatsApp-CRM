import React, { Component } from "react";
import { Redirect, Switch, Route } from 'react-router-dom';
import Chats from "./Chats";
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Main from "./Main";
import Agents from "./Agents";
import Subscription from "./Subscription";
import "../styles/admin.css";

//https://www.fontawesomecheatsheet.com/

// const Admin = () => {

// 	const [sidebarOpen, setSideBarOpen] = useState(false);
// 	const openSideBar = () => {
// 		setSideBarOpen(true)
// 	}
// 	const closeSideBar = () => { 
// 		setSideBarOpen(false)
// 	}
 
// 	return(
// 		<div className="admin__container"> 
// 			<div className="admin__parent">
// 				<Switch>
// 					<Route path="/admin/home">
// 						<Navbar sidebarOpen={sidebarOpen} openSideBar={openSideBar}/>
// 						<Main />
// 						<Sidebar sidebarOpen={sidebarOpen} closeSideBar={closeSideBar}/>
// 					</Route>
// 					<Route path="/admin/chats">
// 						<Navbar sidebarOpen={sidebarOpen} openSideBar={openSideBar}/>
// 						<Chats />
// 						<Sidebar sidebarOpen={sidebarOpen} closeSideBar={closeSideBar}/>
// 					</Route>
// 					<Route path="/admin/agents">
// 						<Navbar sidebarOpen={sidebarOpen} openSideBar={openSideBar}/>
// 						<Agents />
// 						<Sidebar sidebarOpen={sidebarOpen} closeSideBar={closeSideBar}/>
// 					</Route>
// 					<Route path="/admin/subscription">
// 						<Navbar sidebarOpen={sidebarOpen} openSideBar={openSideBar}/>
// 						<Subscription />
// 						<Sidebar sidebarOpen={sidebarOpen} closeSideBar={closeSideBar}/>
// 					</Route>
// 						<Redirect from="/admin" to="/admin/agents" exact/>
// 				</Switch>
// 			</div>
// 		</div>
// 	)
// }

class Admin extends Component {

	constructor() {
		super()
		this.state = {
			sidebarOpen: false
		}
	}

	openSideBar = () => {
		this.setState({
			sidebarOpen: true
		})
	}

	closeSideBar = () => { 
		this.setState({
			sidebarOpen: false
		})
	}
 
 	render() {
 		return(
			<div className="admin__container"> 
				<div className="admin__parent">
					<Switch>
						<Route path="/admin/home">
							<Navbar sidebarOpen={this.sidebarOpen} openSideBar={this.openSideBar}/>
							<Main />
							<Sidebar sidebarOpen={this.sidebarOpen} closeSideBar={this.closeSideBar}/>
						</Route>
						<Route path="/admin/chats">
							<Navbar sidebarOpen={this.sidebarOpen} openSideBar={this.openSideBar}/>
							<Chats />
							<Sidebar sidebarOpen={this.sidebarOpen} closeSideBar={this.closeSideBar}/>
						</Route>
						<Route path="/admin/agents">
							<Navbar sidebarOpen={this.sidebarOpen} openSideBar={this.openSideBar}/>
							<Agents />
							<Sidebar sidebarOpen={this.sidebarOpen} closeSideBar={this.closeSideBar}/>
						</Route>
						<Route path="/admin/subscription">
							<Navbar sidebarOpen={this.sidebarOpen} openSideBar={this.openSideBar}/>
							<Subscription />
							<Sidebar sidebarOpen={this.sidebarOpen} closeSideBar={this.closeSideBar}/>
						</Route>
							<Redirect from="/admin" to="/admin/agents" exact/>
					</Switch>
				</div>
			</div>
		)
 	}
	
}


export default Admin;