import React, { useEffect, useState } from "react";
import Pages from "./Pages";
import { BrowserRouter as Router, useHistory } from "react-router-dom";
import { AppContext } from "./utils/context";
import { Auth } from "aws-amplify";
import LoginButton from "./components/LoginButton";

const App = () => {
  const [isLoggingIn, setIsLoggingIn] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const history = useHistory();

  const onLoad = async () => {
    try {
      await Auth.currentSession();
      setIsLoggedIn(true);
    } catch (err) {
      if (err !== "No current user") {
        console.error(err);
      }
    }
    setIsLoggingIn(false);
  };

  useEffect(() => {
    onLoad();
  }, []);

  const logout = async () => {
    await Auth.signOut();
    setIsLoggedIn(false);
    history.push("/login");
  };

  return (
    <Router>
      <LoginButton isLoggedIn={isLoggedIn} logout={logout} />
      {!isLoggingIn && (
        <AppContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
          <Pages />
        </AppContext.Provider>
      )}
    </Router>
  );
};

export default App;
