import React, { useState, useEffect } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { verifyTokenQuery } from "../queries/queries";
import { useLazyQuery } from "@apollo/react-hooks";

const LoginSection = props => {
  const [verifyTokenResult, tokenData] = useLazyQuery(verifyTokenQuery);

  useEffect(() => {
    if (localStorage.getItem("ppl_token")) {
      console.log("hello >>>>>>>");
      verifyTokenResult({
        variables: {
          token: localStorage.getItem("ppl_token")
        }
      });
    }
  }, []);

  const [loginInfo, setLoginInfo] = useState({
    username: localStorage.getItem("username"),
    password: localStorage.getItem("password")
  });

  const [remember, setRemember] = useState(false);
  const [message, setMessage] = useState(null);
  const [redirect, setRedirect] = useState(false);

  const onChangeHandler = e => {
    const { name, value } = e.target;
    name === "checkbox"
      ? setRemember(!remember)
      : setLoginInfo({ ...loginInfo, [name]: value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    let response = await axios.post(`${process.env.REACT_APP_LOGIN_URL}`, {
      username: loginInfo.username,
      password: loginInfo.password
    });
    const { data } = response;
    if (data.authenticate) {
      localStorage.setItem("ppl_token", data.token);
      if (remember) {
        localStorage.setItem("username", loginInfo.username);
        localStorage.setItem("password", loginInfo.password);
      }
      setRedirect(true);
    } else {
      setMessage("Invalid username or password");
    }
  };

  return !tokenData.loading &&
    tokenData.data &&
    tokenData.data.verifyToken.username ? (
    <Redirect to="/timeline" />
  ) : redirect ? (
    <Redirect to="/timeline" />
  ) : (
    <div className="login_sec">
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        <ul>
          <li>
            <span>Username</span>
            <input
              type="text"
              name="username"
              placeholder="Enter your username"
              onChange={onChangeHandler}
              value={loginInfo.username}
              required
            />
          </li>
          <li>
            <span>Password</span>
            <input
              type="text"
              name="password"
              placeholder="Enter your password"
              onChange={onChangeHandler}
              value={loginInfo.password}
              required
            />
          </li>
          <li>
            <input
              type="checkbox"
              name="checkbox"
              onChange={onChangeHandler}
              checked={remember}
            />
            Remember Me
          </li>
          <li>
            <input type="submit" defaultValue="Log In" />
            <a href>Forgot Password</a>
          </li>
        </ul>
      </form>
      {message && <h6>{message}</h6>}
      <div className="addtnal_acnt">
        I do not have any account yet.
        <a href="/">Create My Account Now !</a>
      </div>
    </div>
  );
};

export default LoginSection;
