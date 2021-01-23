import React from "react";
import styled from "styled-components";
import Tags from "../Tags";

const PreviousChallenges = ({ tags }) => {
  return (
    <Container>
      <h2>Previous challenges</h2>
      <Tags tags={tags} />
    </Container>
  );
};

const Container = styled.div`
  padding: 12px;
`;

export default PreviousChallenges;
