import React from "react";
import WelcomePPl from "./WelcomePPl";
import SignupSection from "./SignupSection";

const Signup = props => {
  return (
    <div>
      <div className="container">
        <div className="content">
          <div className="content_rgt">
            <SignupSection {...props} />
          </div>
          <WelcomePPl />
        </div>
      </div>
    </div>
  );
};

export default Signup;
