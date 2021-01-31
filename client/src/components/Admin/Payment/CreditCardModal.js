import React, { useContext } from "react";
import { AuthUserContext } from "../../../session/index";
import { useFlutterwave, closePaymentModal } from 'flutterwave-react-v3';

import "../styles/cardModal.css";

const CreditCardModal = ({ totalBill, agents, getError, getPaymentStatus, companyData }) => {
	const { companyName, companyNum } = companyData;
	let ftwKey = process.env.REACT_APP_FLUTTERWAVE_PUBLIC_KEY
	let email;
	let authUser = useContext(AuthUserContext)
	if (authUser) {
		email = authUser.email
	}

	const config = {
	    public_key: ftwKey,
	    tx_ref: Date.now(),
	    amount: totalBill,
	    currency: 'USD',
	    payment_options: 'card,mobilemoney,ussd',
	    customer: {
	      email: email,
	      phone_number: companyNum, 
	      name: companyName,
	    },
	    customizations: {
	      title: 'WhatsApp CRM',
	      description: `${agents} Agents`,
	      logo: '',
	    },
  };

  const handleFlutterPayment = useFlutterwave(config);

  const handlePayment = () => {
  	if (totalBill < 1) {
  		getError(totalBill)
  	} else {
  		handleFlutterPayment({
  			callback: response => {
  				const { status, amount } = response;
  				getPaymentStatus({ status, amount }) //pass the response as a prop to the parent component
  				closePaymentModal()
  			},
  			onClose: () => {}
  		})
  	}
  }
	
	return(
		<div className="credit__card">
			<button onClick={handlePayment}>Subscribe Now</button>
		</div>
	)
};

export default CreditCardModal; 