import React, { useState, useEffect } from 'react';
import { Auth } from 'aws-amplify';
import LoaderButton from './LoaderButton';

function waitForInit() {
  return new Promise((res, rej) => {
    const hasFbLoaded = () => {
      if (window.FB) {
        res();
      } else {
        setTimeout(hasFbLoaded, 300);
      }
    };
    hasFbLoaded();
  });
}

export default function FacebookButton(props) {
  const [isLoading, setIsLoading] = useState(false);

  useEffect( () => {
    waitForInit();
  }, []);

  function handleError(error){
    alert(error);
  };

  async function handleResponse(data) {
    const { email, accessToken: token, expiresIn } = data;
    const expires_at = expiresIn * 1000 + new Date().getTime();
    const user = { email };

    setIsLoading(true);

    try {
      const response = await Auth.federatedSignIn(
        'facebook',
        { token, expires_at },
        user
      );
      setIsLoading(false);
      props.onLogin(response);
    } catch(e) {
      setIsLoading(false);
      handleError(e);
    }
  }

  function statusChangeCallback(response){
    if (response.status === 'connected') {
      handleResponse(response.authResponse);
    } else {
      handleError(response);
    }
  };

  function checkLoginState(){
    window.FB.getLoginStatus(statusChangeCallback);
  };

  function handleClick(){
    window.FB.login(checkLoginState, {scope: 'public_profile, email'});
  };

  return(
    <LoaderButton
    block
    bsSize='large'
    bsStyle='primary'
    className='FacebookButton'
    onClick={handleClick}
    disabled={isLoading}
    > Login with Facebook
      </LoaderButton>
  );
}