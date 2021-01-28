import dayjs from "dayjs";
import React from "react";

const UpdateChallengeForm = ({
  setTimestamp,
  setName,
  name,
  timestamp,
  onSubmit,
}) => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSubmit();
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
      <button disabled={!validateForm()}>Update</button>
    </form>
  );
};

export default UpdateChallengeForm;
