import React from "react";
import "../styles/cardModal.css";

const SuccessModal = ({ show }) => {
	if (!show) {
		return null
	}
	return(
		<div className="all__modal">
			<div className="all__modal__content">
				<div className="all__modal__content__header">
					<h4 className="all__modal__title modal__success">Success</h4>
				</div>
				<div className="all__modal__body">
					<p>You have successfully subscribed for 5 agents for 1 month!</p>
					<p>You can now add agents to your account</p>
				</div>
				<div className="all__modal__footer">
					<button className="all__modal__button">OK</button>
				</div>
			</div>
		</div>
	)
}

export default SuccessModal;