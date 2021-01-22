import React from "react";

const SettingsItem = ({ setting, setDirty }) => {
  const [action, value, name] = setting;
  const onChange = (e) => {
    setDirty();
    action(Number(e.target.value));
  };
  return (
    <>
      <label>{name}</label>
      <input type="number" value={value} onChange={onChange} />
    </>
  );
};

export default SettingsItem;
