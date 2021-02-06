import React from "react";
import HomeAnimation from "./HomePage/HomeAnimation";
import "./styles/welcome.css";
import animationData from "../anime/welcome.json";

const AgentWelcome = ({ name }) => {
	let firstName = name.split(" ")[0]
	return(
		<div className="agent__welcome">
			<div className="welcome__container">
				<div className="welcome__anime">
					<HomeAnimation animationData={animationData} style={{ width: 400, height: 400 }}/>
				</div>
				<div className="welcome__text">
					<p>Welcome { firstName }!</p>
				</div>
			</div>
		</div>
	)
}

export default AgentWelcome;