import React from "react";
import "./styles/subscription.css";


const Subscription = () => {
	return(
		<div className="subscr__container">
			<div className="billing__heading">
				<p>Billing</p>
			</div>
			<div className="billing__footer">
				<h3>Bottom</h3>
			</div>
			<div className="expanded__topright">
				<h3>RightTop</h3>
			</div>
			<div className="expanded__downright">
				<h3>RightDown</h3>
			</div>
		</div>
	)
}

export default Subscription;