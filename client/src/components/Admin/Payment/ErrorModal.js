import React from "react";
import "../styles/cardModal.css";


const ErrorModal = ({ show }) => {
	if (!show) {
		return null
	}
	return(
		<div className="all__modal">
			<div className="all__modal__content">
				<div className="all__modal__content__header">
					<h4 className="all__modal__title modal__error">Error</h4>
				</div>
				<div className="all__modal__body">
					<p>An error occurred when processing the payment!</p>
				</div>
				<div className="all__modal__footer">
					<button className="all__modal__button">OK</button>
				</div>
			</div>
		</div>
	)
}

export default ErrorModal;

