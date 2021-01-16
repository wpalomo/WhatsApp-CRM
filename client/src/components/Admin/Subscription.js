import React from "react";
import Billhead from "./Payment/Billhead";
import Billfoot from "./Payment/Billfoot";
import "./styles/subscription.css";


const Subscription = () => {
	return(
			<div className="subscr__container">
				<Billhead />
				<Billfoot />
				<div className="expanded__topright">
					<p>Your Subscription</p>
				</div>
				<div className="expanded__downright">
					<p>RightDown</p>
				</div>
			</div>
	)
}

export default Subscription;