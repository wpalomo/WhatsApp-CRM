import React from "react";
import Billhead from "./Payment/Billhead";
import Billfoot from "./Payment/Billfoot";
import Billtopright from "./Payment/Billtopright"; 
import "./styles/subscription.css";


const Subscription = () => {
	return(
			<div className="subscr__container">
				<Billhead />
				<Billfoot />
				<Billtopright />
				<div className="expanded__downright">
					<p>RightDown</p>
				</div>
			</div>
	)
}

export default Subscription;