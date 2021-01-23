import React from "react";
import { IoMdLogOut } from "react-icons/io";
import styled from "styled-components";

const Nav = ({ isLoggedIn, logout }) => {
  if (!isLoggedIn) return null;
  return (
    <Row>
      <h1>Spritey</h1>
      <BorderedIcon title="Log out" onClick={logout} />
    </Row>
  );
};

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  padding-right: 12px;
  padding-left: 12px;
  align-items: center;
  border-bottom: 1px dotted black;
`;

const BorderedIcon = styled(IoMdLogOut)`
  border: 1px solid black;
  border-radius: 100%;
  padding: 3px;
  :hover {
    cursor: pointer;
  }
`;

export default Nav;
