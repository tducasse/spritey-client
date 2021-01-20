import React from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import duration from "dayjs/plugin/duration";

dayjs.extend(relativeTime);
dayjs.extend(duration);

const Challenge = ({ challenge }) => {
  if (!challenge) return null;
  const endDate = dayjs(Number(challenge.end_date) * 1000);
  return (
    <>
      <h2>Current challenge: {challenge.name}</h2>
      <h3>
        {`Challenge end: ${endDate.fromNow()} (${endDate.format(
          "DD/MM/YY - HH:mm Z"
        )})`}
      </h3>
    </>
  );
};

export default Challenge;
