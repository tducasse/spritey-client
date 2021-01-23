import React from "react";
import styled from "styled-components";

const LogoutButton = ({ isLoggedIn, logout }) => {
  if (!isLoggedIn) return null;
  return <Underlined onClick={logout}>Logout</Underlined>;
};

const Underlined = styled.div`
  text-decoration: underline;
  :hover {
    cursor: pointer;
  }
`;

export default LogoutButton;
