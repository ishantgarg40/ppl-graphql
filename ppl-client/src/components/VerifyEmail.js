import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { userEmailVerificationQuery } from "../queries/queries";
import { verifyEmailMutation } from "../queries/queries";
import { Redirect } from "react-router-dom";

const queryString = require("qs");

const VerifyEmail = props => {
  let params = queryString.parse(props.location.search.split("?")[1]);
  const { loading, data } = useQuery(userEmailVerificationQuery, {
    variables: { id: params.id }
  });
  const [verifyUser] = useMutation(verifyEmailMutation);

  const [redirect, setRedirect] = useState(false);

  if (!loading && data.user.isVerified) {
    return <Redirect to="/login" />;
  }

  console.log(data);
  const verifyEmail = () => {
    verifyUser({
      variables: {
        id: params.id
      }
    });
    setRedirect(true);
  };
  return redirect ? (
    <Redirect to="/login" />
  ) : loading ? (
    <div>Loading...</div>
  ) : (
    <div
      style={{
        textAlign: "center"
      }}
    >
      <h2>Verify your email...</h2>
      <button onClick={verifyEmail} className="btn btn-primary">
        VerifyEmail
      </button>
    </div>
  );
};

export default VerifyEmail;
