import React from "react";
import WelcomePPl from "./WelcomePPl";
import LoginSection from "./LoginSection";

const Login = props => {
  return (
    <div>
      <div className="container">
        <div className="content">
          <div className="content_rgt">
            <LoginSection {...props} />
          </div>
          <WelcomePPl />
        </div>
      </div>
    </div>
  );
};

export default Login;
