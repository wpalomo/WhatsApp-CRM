import React from "react";
import HomeAnimation from "./HomePage/HomeAnimation";
import "./styles/welcome.css";
import animationData from "../anime/team.json";

const AgentWelcome = ({ name }) => {
	let firstName = name.split(" ")[0]
	return(
		<div className="agent__welcome">
			<div className="welcome__container">
				<HomeAnimation animationData={animationData} style={{ width: 300, height: 300 }}/>
				<p>Welcome { firstName }!</p>
			</div>
		</div>
	)
}

export default AgentWelcome;