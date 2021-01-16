import React from "react";
import Billhead from "./Payment/Billhead";
import Billfoot from "./Payment/Billfoot";
import Billtopright from "./Payment/Billtopright"; 
import Billdownright from "./Payment/Billdownright"; 
import "./styles/subscription.css";


const Subscription = () => {
	return(
			<div className="subscr__container">
				<Billhead />
				<Billfoot />
				<Billtopright />
				<Billdownright />
			</div>
	)
}

export default Subscription;