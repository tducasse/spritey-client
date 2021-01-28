import dayjs from "dayjs";
import React, { useState } from "react";
import Spinner from "../Spinner";

const UpdateChallengeForm = ({
  setTimestamp,
  setName,
  name,
  timestamp,
  onSubmit,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    await onSubmit();
    setIsLoading(false);
  };

  const validateForm = () => {
    if (!name) return false;
    try {
      new Date(timestamp);
    } catch (err) {
      return false;
    }
    return true;
  };

  return (
    <form onSubmit={handleSubmit}>
      <span>Just letters, no spaces, special characters, etc</span>
      <label htmlFor="name">Name</label>
      <input
        type="text"
        name="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        autoFocus
      />
      <label htmlFor="timestamp">
        Timestamp ({dayjs(Number(timestamp) * 1000).format("DD/MM/YY - HH:mmZ")}
        )
      </label>
      <input
        type="timestamp"
        value={timestamp}
        onChange={(e) => setTimestamp(e.target.value)}
      />
      <button disabled={!validateForm()}>
        {isLoading ? <Spinner /> : "Update"}
      </button>
    </form>
  );
};

export default UpdateChallengeForm;
