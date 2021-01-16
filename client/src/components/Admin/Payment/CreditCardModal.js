import React from "react";
import "../styles/cardModal.css";

const CreditCardModal = ({ creditCardModal, totalBill, agents }) => {
	if (!creditCardModal) {
		return null
	}
	console.log(totalBill, agents)
	return(
		<h1>Show me the money</h1>
	)
};

export default CreditCardModal; 