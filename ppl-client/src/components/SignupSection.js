import React, { useState, useEffect } from "react";
import { useMutation, useLazyQuery } from "@apollo/react-hooks";
import {
  registerUserMutation,
  checkUniquenessOfUsernameQuery,
  checkUniquenessOfEmailQuery,
  verifyTokenQuery
} from "../queries/queries";
import { Redirect } from "react-router-dom";

const SignupSection = props => {
  const [verifyTokenResult, tokenData] = useLazyQuery(verifyTokenQuery);

  useEffect(() => {
    if (localStorage.getItem("ppl_token")) {
      verifyTokenResult({
        variables: {
          token: localStorage.getItem("ppl_token")
        }
      });
    }
  }, []);

  const [registerUser, { data }] = useMutation(registerUserMutation);

  const [checkUsername, checkUsernameResult] = useLazyQuery(
    checkUniquenessOfUsernameQuery
  );

  const [checkEmail, checkEmailResult] = useLazyQuery(
    checkUniquenessOfEmailQuery
  );

  const [focusElement, setFocusElement] = useState(null);

  const [userInfo, setUserInfo] = useState({
    username: "",
    password: "",
    firstname: "",
    lastname: "",
    email: ""
  });

  const [remember, setRemember] = useState(false);

  const handleChange = event => {
    const { name, value } = event.target;
    name === "checkbox"
      ? setRemember(!remember)
      : setUserInfo({ ...userInfo, [name]: value });
  };

  const onBlurCheckField = e => {
    e.preventDefault();
    const { name, value } = e.target;
    if (name === "email") {
      checkEmail({
        variables: {
          email: value
        }
      });
    }
    if (name === "username") {
      checkUsername({
        variables: {
          username: value
        }
      });
    }
    setFocusElement(null);
  };

  if (!checkUsernameResult.loading && focusElement !== "username") {
    if (checkUsernameResult.data && checkUsernameResult.data.userOnUsername) {
      window.alert("username already exist");
    }
  }
  if (!checkEmailResult.loading && focusElement !== "email") {
    if (checkEmailResult.data && checkEmailResult.data.userOnEmail) {
      window.alert("email already exist");
    }
  }

  const handleSubmit = async event => {
    event.preventDefault();
    if (
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        userInfo.email
      )
    ) {
      await registerUser({
        variables: {
          username: userInfo.username,
          password: userInfo.password,
          firstname: userInfo.firstname,
          lastname: userInfo.lastname,
          email: userInfo.email
        }
      });
    } else {
      window.alert("Invalid Email address!");
    }
  };

  return !tokenData.loading &&
    tokenData.data &&
    tokenData.data.verifyToken.username ? (
    <Redirect to="/timeline" />
  ) : (
    <div className="register_sec">
      <h1>Create An Account</h1>
      <ul>
        <form onSubmit={handleSubmit}>
          <li>
            <span>Username</span>
            <input
              type="text"
              name="username"
              placeholder="Enter your username"
              onChange={handleChange}
              value={userInfo.username}
              required
              onFocus={() => setFocusElement("username")}
              onBlur={onBlurCheckField}
            />
          </li>
          <li>
            <span>Password</span>
            <input
              type="text"
              name="password"
              placeholder="Enter your password"
              onChange={handleChange}
              value={userInfo.password}
              required
            />
          </li>
          <li>
            <span>Email</span>
            <input
              type="text"
              name="email"
              placeholder="Enter your email"
              onChange={handleChange}
              value={userInfo.email}
              onFocus={() => setFocusElement("email")}
              onBlur={onBlurCheckField}
              required
            />
          </li>
          <li>
            <span>First Name</span>
            <input
              type="text"
              name="firstname"
              placeholder="Enter your first name"
              onChange={handleChange}
              value={userInfo.firstname}
              required
            />
          </li>
          <li>
            <span>Last Name</span>
            <input
              type="text"
              name="lastname"
              placeholder="Enter your last name"
              onChange={handleChange}
              value={userInfo.lastname}
              required
            />
          </li>
          <li>
            <input
              type="checkbox"
              name="checkbox"
              onChange={e => handleChange(e)}
              checked={remember}
              required
            />
            I agree to Term &amp; Conditions
          </li>
          <li>
            <input type="submit" defaultValue="Register" />
          </li>
        </form>
      </ul>
      {data ? (
        data.registerUser ? (
          <h6>Email Sent! Verify your Email address</h6>
        ) : (
          <h6>user already exist</h6>
        )
      ) : (
        void 0
      )}
      <div className="addtnal_acnt">
        I already have an account.<a href="/login">Login My Account !</a>
      </div>
    </div>
  );
};

export default SignupSection;
