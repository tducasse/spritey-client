import React from "react";

const SettingItem = ({ setting, setDirty }) => {
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

const Settings = ({
  setHeight,
  height,
  setWidth,
  width,
  setFrames,
  frames,
  setFps,
  fps,
  setScale,
  scale,
  setDirty,
}) => {
  const settings = [
    [setFrames, frames, "Number of frames"],
    [setHeight, height, "Height"],
    [setWidth, width, "Width"],
    [setFps, fps, "FPS"],
    [setScale, scale, "Scale"],
  ];
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        padding: 12,
        border: "1px solid black",
        borderRadius: 10,
      }}
    >
      {settings.map((setting) => (
        <SettingItem key={setting[2]} setting={setting} setDirty={setDirty} />
      ))}
    </div>
  );
};

export default Settings;
