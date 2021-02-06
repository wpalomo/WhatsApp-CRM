import React from "react";
import "./styles/welcome.css";

const AgentWelcome = ({ name }) => {
	let firstName = name.split(" ")[0]
	return(
		<div className="agent__welcome">
			<div className="welcome__container">
				<p>Welcome { firstName }!</p>
			</div>
		</div>
	)
}

export default AgentWelcome;