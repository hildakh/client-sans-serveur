import React, { useState } from 'react';
import { API } from 'aws-amplify';
import { Elements, StripeProvider } from 'react-stripe-elements';
import BillingForm from '../components/BillingForm';
import config from '../config';
import './Settings.css';


export default function Settings(props) {
  const [isLoading, setisLoading] = useState(false);

  function billUser(details) {
    return API.post("notes", "/billing", {
      body: details
    });
  }

async function handleFormSubmit(storage, { token, error }) {
  if(error) {
    alert(error);
    return
  }

  setisLoading(true);

  try {
    await billUser({
      storage,
      source: token.id
    });

    alert('Your card has been charged successfully!');
    props.history.push("/");
  } catch(e) {
    alert(e);
    setisLoading(false);
  }
}

return (
  <div className="Settings">
    {/* The StripeProvider component lets the Stripe SDK know that we want to call the Stripe methods using config.STRIPE_KEY. And it needs to wrap around at the top level of our billing form. Similarly, the Elements component needs to wrap around any component that is going to be using the CardElement Stripe component. */}
    <StripeProvider apiKey={config.STRIPE_KEY}>
      <Elements>
        <BillingForm
        isLoading={isLoading}
        onSubmit={handleFormSubmit}
        />
      </Elements>
    </StripeProvider>
  </div>
);
}