import React, { useContext, useState, useEffect } from "react";
import { withFirebase } from "../../firebase/index";
import { AuthUserContext } from "../../session/index";
import history from "../History";
import "./styles/sidebar.css";
import { db } from "../../firebase";


const NOOP = () => {};

const Sidebar = ({ sidebarOpen, closeSideBar, firebase, companyDataProp=NOOP }) => {

	const [companyName, setCompanyName] = useState("")
	const [companyNumber, setCompanyNumber] = useState(null)


	let adminUser = useContext(AuthUserContext)

	//get the company name
	useEffect(() => {
		const getCompany = async () => {
			if (adminUser) {
				let adminRef = db.collection('admins');
				let snapshot = await adminRef.where('adminId', '==', adminUser.uid).get()
				let name;
				if (!snapshot.empty) {
					snapshot.forEach(doc => {
						name = doc.data().company.toUpperCase();
						setCompanyName(name)
					})
					//then get company number
					let numberSnapshot = await db.collection('companies').where('name', '==', (name).toLowerCase()).get()
					if (!numberSnapshot.empty) {
						numberSnapshot.forEach(doc => {
							let number = doc.data().number
							setCompanyNumber(number) 
						})
					} 
				}
			}
		}
		getCompany();
	}, [adminUser])

	//pass the company name and number out as props to the admin and then subscription component
	useEffect(() => {
		companyDataProp({companyNumber, companyName})
	}, [companyNumber, companyName, companyDataProp])


	const getAgentsPage = () => {
		history.push('/admin/agents') 
	}

	const chatsPage = () => { 
		history.push('/admin/chats') 
	}
 
	const adminHome = () => { 
		history.push('/admin/agents')  
	} 

	const subscriptionPage = () => {
		history.push('/admin/subscription') 
	}

	//loguout with auth
	const logOut = () => {
		firebase.doSignOut()
		history.push('/')
	}
	let cleanedName = companyName.replace("__", " ");
	return(
		<div id="sidebar" className={sidebarOpen ? "sidebar_responsive" : ""}>
			<div className="sidebar__title">
				<div className="sidebar__img">
					<img src="" alt=""/>
					<div className="company__info">
						<h1>{ cleanedName }</h1>
						<h1>{ companyNumber }</h1>
					</div>
				</div>
				<i className="fa fa-times" id="sidebarIcon" onClick={closeSideBar}></i>
			</div>
			<div className="sidebar__menu">
				<div onClick={adminHome} className="sidebar__link sidebar__test active_menu_link">
					<i className="fa fa-home"></i>
					<p>Dashboard</p>
				</div>
				{
					//<h2>MNG</h2>
				}
				<div onClick={chatsPage} className="sidebar__link sidebar__test">
					<i className="fa fa-comments"></i>
					<p>Chats</p>
				</div>
				<div onClick={getAgentsPage} className="sidebar__link sidebar__test">
					<i className="fa fa-users"></i>
					<p>Agents</p>
				</div>
				{
					// <div className="sidebar__link">
					// 				<i className="fa fa-line-chart"></i>
					// 				<a href="foo">Reports</a>
					// 			</div>
							}
				<div onClick={subscriptionPage} className="sidebar__link sidebar__test">
					<i className="fa fa-credit-card"></i>
					<p>Subscription</p>
				</div>
				{
					// <div className="sidebar__link">
					// 				<i className="fa fa-handshake-o"></i>
					// 				<a href="foo">Contracts</a>
					// 			</div>
							}
				{
					// <h2>LEAVE</h2>
					// 			<div className="sidebar__link">
					// 				<i className="fa fa-question"></i>
					// 				<a href="foo">Requests</a>
					// 			</div>
					// 			<div className="sidebar__link">
					// 				<i className="fa fa-sign-out"></i>
					// 				<a href="foo">Leave Policy</a>
					// 			</div>
					// 			<div className="sidebar__link">
					// 				<i className="fa fa-calendar-check-o"></i>
					// 				<a href="foo">Special Days</a>
					// 			</div>
					// 			<div className="sidebar__link">
					// 				<i className="fa fa-files-o"></i>
					// 				<a href="foo">Apply for leave</a>
					// 			</div>
					// 			<h2>PAYROLL</h2>
					// 			<div className="sidebar__link">
					// 				<i className="fa fa-money"></i>
					// 				<a href="foo">Payroll</a>
					// 			</div>
					// 			<div className="sidebar__link">
					// 				<i className="fa fa-briefcase"></i>
					// 				<a href="foo">Paygrade</a>
					// 			</div>
							}
				<div onClick={logOut} className="sidebar__logout">
					<i className="fa fa-power-off"></i>
					<p>Log out</p>
				</div>
			</div>
		</div>
	)
}
export default withFirebase(Sidebar);

