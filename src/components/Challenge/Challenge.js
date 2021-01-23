import React from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import duration from "dayjs/plugin/duration";
import styled from "styled-components";
import Spinner from "../Spinner";

dayjs.extend(relativeTime);
dayjs.extend(duration);

const Challenge = ({ challenge, toggleUpload }) => {
  const endDate = !!challenge && dayjs(Number(challenge.end_date) * 1000);
  return (
    <Container>
      <h2>Current challenge</h2>
      {challenge ? (
        <>
          <h3>{challenge.name.toUpperCase()}</h3>
          <h3>
            {`Challenge end: ${endDate.fromNow()} (${endDate.format(
              "DD/MM/YY - HH:mm Z"
            )})`}
          </h3>
          <button onClick={toggleUpload}>Participate!</button>
        </>
      ) : (
        <Spinner />
      )}
    </Container>
  );
};

const Container = styled.div`
  padding: 12px;
  border-bottom: 1px dotted black;
`;

export default Challenge;
