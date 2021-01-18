import React from "react";
import "./styles/agents.css";

const Chats = () => {
	return(
		<div className="agents__container">
				<div className="agents__top__row">
					<div className="agents__top__heading">
						All Chats
					</div>
				</div>
				<div className="agents__bottom__area">
					<div className="agentlist__area chat__area">
					<div className="agents__area">
						<div className="agents__area__heading">
							<p>Agents</p>
						</div>
						<div className="agents__area__body">
							<p>Jomi Oni</p>
							<p>Winifred Robb</p>
							<p>Funke Sausage</p>
						</div>
					</div>
					<div className="agent__customers">
						<div className="agent__customers__heading">
							<p>Customer</p>
						</div>
						<div className="agent__customers__body">
							<p>+2347030117552</p>
							<p>+2348152258413</p>
							<p>+2348060338847</p>
							<p>+2348060338847</p>
						</div>
					</div>
					<div class="agent__chat">
						<div className="agent__chat__heading">
							<p>Chat History</p>
						</div>
						<div class="agent__chat__body">
							
						</div>
					</div>
					</div>
				</div>
			</div>
	)
}

export default Chats;