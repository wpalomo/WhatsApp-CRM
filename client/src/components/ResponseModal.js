import React from "react";
import "./styles/responsemodal.css";

const ResponseModal = props => {
	if (!props.showModal) {
		return null
	}
	return(
		<div className="response__modal">
			<div className="response__modal__content">
				<div className="response__modal__header">
					<h4 className="response__modal__title">Notice</h4>
				</div>
				<div className="response__modal__body">
					An agent already responded to this customer!
				</div>
				<div className="response__modal__footer">
					<button onClick={props.onClose} className="response__modal__button">OK</button>
				</div>
			</div>
		</div>
	)
}

export default ResponseModal;