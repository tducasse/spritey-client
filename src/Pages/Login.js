import React, { useState } from "react";
import { Auth } from "aws-amplify";
import { useAppContext } from "../utils/context";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { setIsLoggedIn } = useAppContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await Auth.signIn(email, password);
      setIsLoggedIn(true);
    } catch (err) {
      console.error(e.message);
    }
    setIsLoading(false);
  };

  const validateForm = () => email.length && password.length;

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="email">Email</label>
      <input
        type="text"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        autoFocus
      />
      <label htmlFor="password">Password</label>
      <input
        type="password"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button disabled={!validateForm()}>{isLoading ? "..." : "Log in"}</button>
    </form>
  );
};

export default Login;
