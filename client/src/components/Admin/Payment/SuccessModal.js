import React from "react";
import "../styles/cardModal.css";

const SuccessModal = ({ show }) => {
	if (!show) {
		return null
	}
	return(
		<div>
			<div className="success__mtop">
				
			</div>
			<div className="success__mid">
				<p>You have successfully subscribed for 5 agents for 1 month!</p>
				<p>You can now add agents to your account</p>
			</div>
			<div className="success__bottom">
				<button>OK</button>
			</div>
		</div>
	)
}

export default SuccessModal;