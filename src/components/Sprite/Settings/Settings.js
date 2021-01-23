import React from "react";
import styled from "styled-components";
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
    <SettingsContainer>
      {settings.map((setting) => (
        <SettingsItem key={setting[2]} setting={setting} setDirty={setDirty} />
      ))}
    </SettingsContainer>
  );
};

const SettingsContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 12px;
  border: 1px solid black;
  border-radius: 10px;
`;

export default Settings;
