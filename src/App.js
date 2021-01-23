import React, { useEffect, useState } from "react";
import Pages from "./Pages";
import { useHistory } from "react-router-dom";
import { AppContext } from "./utils/context";
import { Auth } from "aws-amplify";
import Nav from "./components/Nav";
import Spinner from "./components/Spinner";

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
    <>
      <Nav isLoggedIn={isLoggedIn} logout={logout} />
      {isLoggingIn ? (
        <Spinner />
      ) : (
        <AppContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
          <Pages />
        </AppContext.Provider>
      )}
    </>
  );
};

export default App;
