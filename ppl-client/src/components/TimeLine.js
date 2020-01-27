import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import TimelineRightContent from "./TimelineRightContent";
import TimelineLeftContent from "./TimelineLeftContent";
import { useLazyQuery } from "@apollo/react-hooks";
import { verifyTokenQuery } from "../queries/queries";

const TimeLine = props => {
  const [verifyTokenResult, { loading, error, data }] = useLazyQuery(
    verifyTokenQuery
  );
  useEffect(() => {
    if (!localStorage.getItem("ppl_token")) {
      setRedirect(true);
    } else {
      let token = localStorage.getItem("ppl_token");
      verifyTokenResult({
        variables: {
          token
        }
      });
    }
  }, []);
  const logout = () => {
    localStorage.removeItem("ppl_token");
    setRedirect(true);
  };
  const [redirect, setRedirect] = useState(false);

  return !loading && data && data.username ? (
    <Redirect to="/login" />
  ) : redirect ? (
    <Redirect to="/login" />
  ) : (
    <div>
      <div className="container">
        <div className="content">
          <TimelineRightContent {...props} />
          <TimelineLeftContent {...props} logout={logout} />
        </div>
        <div className="clear" />
      </div>
    </div>
  );
};

export default TimeLine;
