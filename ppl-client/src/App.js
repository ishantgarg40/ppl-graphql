import React from "react";
import { Switch, Route } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import VerifyEmail from "./components/VerifyEmail";
import TimeLine from "./components/TimeLine";

const client = new ApolloClient({
  uri: `${process.env.REACT_APP_SERVER_BASE_URL}/graphql`
});
function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Switch>
          <Route exact path={"/"} component={Signup} />
          <Route exact path={"/login"} component={Login} />
          <Route path={"/emailverify"} component={VerifyEmail} />
          <Route path={"/timeline"} component={TimeLine} />
        </Switch>
      </div>
    </ApolloProvider>
  );
}

export default App;
