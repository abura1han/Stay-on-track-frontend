import React, { useState } from "react";
import GoogleLogin from "react-google-login";
import configs from "../configs";
import Button from "./Button";

const GoogleLoginBtn = ({ label }) => {
  const [userData, setUserData] = useState(
    localStorage.getItem("userData")
      ? JSON.parse(localStorage.getItem("userData"))
      : null
  );
  const [isLogin, setIsLogin] = useState(userData ? true : false);

  /**
   * Handle google login
   */
  const handleGoogleLoginSuccess = (response) => {
    console.log(response);
    fetch(`${configs.serverUrl}/api/google-login`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        token: response.tokenId,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        // Store data to localstorage
        window.localStorage.setItem(
          "userData",
          JSON.stringify({ ...data.data, stayToken: null })
        );

        window.localStorage.setItem(
          "stayToken",
          JSON.stringify(data.data.stayToken)
        );

        // Redirect to dashboard
        window.location.replace("/stay/dashboard");
      });
  };

  /**
   * Handle google login failure
   */
  const handleGoogleLoginFailure = () => {
    // todo show notification popup google login failed
  };

  /**
   * Handle google logout
   */
  const handleGoogleLogout = () => {
    setUserData(null);
    setIsLogin(false);

    window.localStorage.clear();
  };

  return (
    <>
      {!isLogin ? (
        <GoogleLogin
          clientId={configs.clientId}
          render={(renderProps) => (
            <Button
              className="bg-stay-primary text-white"
              onClick={renderProps.onClick}
              disabled={renderProps.disabled}
            >
              {label ? label : "Sign in"}
            </Button>
          )}
          onSuccess={handleGoogleLoginSuccess}
          onFailure={handleGoogleLoginFailure}
          cookiePolicy={"single_host_origin"}
        />
      ) : (
        <Button
          onClick={handleGoogleLogout}
          className="bg-stay-primary text-white"
        >
          Logout
        </Button>
      )}
    </>
  );
};

export default GoogleLoginBtn;