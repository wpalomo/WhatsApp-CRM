import React from "react";

const ErrorModal = () => {
	return(
		<div>
			<div className="error__mtop">
				
			</div>
			<div className="error__mid">
				<p>An error occurred when processing the payment!</p>
			</div>
			<div className="error__bottom">
				<button>OK</button>
			</div>
		</div>
	)
}

export default ErrorModal;