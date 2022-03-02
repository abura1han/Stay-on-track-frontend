import React, { useEffect, useState } from "react";
import configs from "../configs";

const ProtectedRoute = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const stayToken = JSON.parse(window.localStorage.getItem("stayToken"));
    if (!stayToken) {
      window.location.replace("/");
    }
    fetch(`${configs.serverUrl}/api/check-authorization`, {
      headers: {
        "Content-Type": "application/json",
        authorization: stayToken,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.success) {
          setIsLogin(true);
        } else {
          window.location.replace("/");
        }
      });
  }, []);

  return (
    <div>
      {isLogin ? <div>{children && children}</div> : <div>Loading...</div>}
    </div>
  );
};

export default ProtectedRoute;
