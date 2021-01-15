import React from "react";
import "./styles/agents.css";

const Agents = () => {
	return(
		<div className="agents__container">
			<div className="agents__top__row">
				<div className="agents__top__heading">
					Team
				</div>
				<div className="add__agent">
					<button>
						<div>+ Add</div>
					</button>
				</div>
			</div>
			<div className="agents__bottom__area">
				Coming Soon!
			</div>
		</div>
	)
}

export default Agents;