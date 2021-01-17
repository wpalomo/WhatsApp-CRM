import React from "react";
import { useFlutterwave, closePaymentModal } from 'flutterwave-react-v3';

import "../styles/cardModal.css";

const CreditCardModal = ({ totalBill, agents, getError }) => {
	
	let ftwKey = process.env.REACT_APP_FLUTTERWAVE_PUBLIC_KEY
	
	const config = {
    public_key: ftwKey,
    tx_ref: Date.now(),
    amount: totalBill,
    currency: 'USD',
    payment_options: 'card,mobilemoney,ussd',
    customer: {
      email: 'oduguwaoa@gmail.com',
      phonenumber: '07030117552',
      name: 'Tunde Oduguwa',
    },
    customizations: {
      title: 'Sauceflow WhatsApp CRM',
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
  				console.log('from flutterwave', response);
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