import React from "react";
import { useFlutterwave, closePaymentModal } from 'flutterwave-react-v3';

import "../styles/cardModal.css";

const CreditCardModal = ({ totalBill, agents, getError, getPaymentStatus }) => {
	
	let ftwKey = process.env.REACT_APP_FLUTTERWAVE_PUBLIC_KEY

	const config = {
	    public_key: ftwKey,
	    tx_ref: Date.now(),
	    amount: totalBill,
	    currency: 'USD',
	    payment_options: 'card,mobilemoney,ussd',
	    customer: {
	      email: 'oduguwaoa@gmail.com',
	      phone_number: '+2347030117552',
	      name: 'Tunde Oduguwa',
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