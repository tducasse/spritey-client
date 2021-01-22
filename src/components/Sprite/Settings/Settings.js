import React from "react";
import SettingsItem from "./SettingsItem";

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
        <SettingsItem key={setting[2]} setting={setting} setDirty={setDirty} />
      ))}
    </div>
  );
};

export default Settings;
