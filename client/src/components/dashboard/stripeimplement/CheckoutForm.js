import React, {useState} from 'react';
import {CardElement, useStripe, useElements} from '@stripe/react-stripe-js';
import axios from 'axios';
import './checkoutform.css';

const CheckoutForm = ({price, updateAccountProp, name, email, canpay}) => {
  const [isProcessing, setProcessingTo] = useState(false);
  const [checkoutError, setCheckoutError] = useState();
  const [successCheckout, setSuccessCheckoutTo] = useState(false);
	
  const stripe = useStripe();
  const elements = useElements();
	
  const onSuccessfulCheckout = () =>{
	  return 'success!';
  }
  const handleCardDetailsChange = ev => {
    ev.error ? setCheckoutError(ev.error.message) : setCheckoutError();
  };

  const handleSubmit = async (event) => {
    // Block native form submission.
    event.preventDefault();

  if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
   }
	  
   setProcessingTo(true);
	  
	  
	  try {
		  const { data: clientSecret } = await axios.post("https://mernstack-shrnu.run-us-west2.goorm.io/api/users/payment_intents", {
			amount: `${price}`,
			receiptEmail: `${email}` 
		  });
		   const result = await stripe.confirmCardPayment(clientSecret, {
			  payment_method: {
				card: elements.getElement(CardElement),
				billing_details: {
				  name: `${name}`,
				},
			  }
			});
		   // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    // const cardElement = elements.getElement(CardElement);

    // Use your card Element with other Stripe.js APIs
     if (result.error) {
      // Show error to your customer (e.g., insufficient funds)
      	 console.log(result.error.message);
		 setCheckoutError(result.error.message);
         setProcessingTo(false);
		 return;
    } else {
      // The payment has been processed!
		  if (result.paymentIntent.status === 'succeeded') {
			// Show a success message to your customer
			// There's a risk of the customer closing the window before callback
			// execution. Set up a webhook or plugin to listen for the
			// payment_intent.succeeded event that handles any business critical
			// post-payment actions.
			  console.log("payment success", result)
			  setProcessingTo(false);
			  setSuccessCheckoutTo(true);
			  updateAccountProp();
			 
		  }
		}
	  } catch(err){
		  setCheckoutError(err.message);
	  }
  }
   const cardStyles = {
	   style: {
		base: {
		  color: "#191919",
		  fontSize: "24px",
		  iconColor: "#fff",
		  "::placeholder": {
			color: "#191919"
		  }
		},
		invalid: {
		  iconColor: "#b20000",
		  color: "#b20000"
		},
		complete: {
		  iconColor: "#cbf4c9"
		}
	  }
  };

  // const cardElementOpts = {
  //   iconStyle: "solid",
  //   style: iframeStyles,
  // };

  return (
    <form onSubmit={handleSubmit}>
	  {checkoutError && <h5>{checkoutError}</h5>}
	  <div className="card-field">
		   <CardElement 
		   onChange={handleCardDetailsChange}
		   options={cardStyles}		  
		  />
	  </div>
		  {successCheckout ? <h5>'Payment Processed!' </h5> : ''}
     
      <button className="btn btn-primary" type="submit" disabled={isProcessing || !stripe || !canpay}>
        {isProcessing ? "Processing..." : `Pay ${price}`}
      </button>
    </form>
  );
}
export default CheckoutForm;