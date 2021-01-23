import React, { useCallback, useState } from "react";
import Spritesheet from "react-responsive-spritesheet";
import Settings from "./Settings/Settings";
import axios from "axios";
import { apiBaseURL } from "../../utils/constants";
import styled from "styled-components";

const Sprite = ({
  width: initWidth,
  height: initHeight,
  fps: initFps,
  frames: initFrames,
  scale: initScale,
  s3_path: src,
  tag,
}) => {
  const [width, setWidth] = useState(initWidth || 32);
  const [height, setHeight] = useState(initHeight || 32);
  const [frames, setFrames] = useState(initFrames || 2);
  const [fps, setFps] = useState(initFps || 12);
  const [scale, setScale] = useState(initScale || 6);
  const [savedWidth, setSavedWidth] = useState(initWidth || 32);
  const [savedHeight, setSavedHeight] = useState(initHeight || 32);
  const [savedFrames, setSavedFrames] = useState(initFrames || 2);
  const [savedFps, setSavedFps] = useState(initFps || 12);
  const [savedScale, setSavedScale] = useState(initScale || 6);
  const [dirty, setDirty] = useState(false);

  const saveSettings = useCallback(async () => {
    await axios.patch(apiBaseURL + "/updateSettings", {
      width,
      height,
      frames,
      fps,
      scale,
      src,
      tag,
    });
    setSavedFps(fps);
    setSavedScale(scale);
    setSavedHeight(height);
    setSavedWidth(width);
    setSavedFrames(frames);
  }, [width, height, frames, fps, scale, src, tag]);

  const isDirty =
    dirty &&
    (frames !== savedFrames ||
      height !== savedHeight ||
      width !== savedWidth ||
      scale !== savedScale ||
      fps !== savedFps);

  return (
    <SpriteContainer>
      <Settings
        setHeight={setHeight}
        height={height}
        setWidth={setWidth}
        width={width}
        frames={frames}
        setFrames={setFrames}
        setFps={setFps}
        fps={fps}
        scale={scale}
        setScale={setScale}
        setDirty={() => setDirty(true)}
      />
      <SpritesheetContainer>
        <Spritesheet
          style={{
            height: height * scale,
            width: width * scale,
            imageRendering: "pixelated",
          }}
          key={`${frames}-${height}-${width}-${fps}-${scale}`}
          image={src}
          heightFrame={height}
          widthFrame={width}
          steps={frames}
          fps={fps}
          autoplay
          loop
        />
        {isDirty && (
          <div>
            <button onClick={saveSettings}>Save</button>
          </div>
        )}
      </SpritesheetContainer>
    </SpriteContainer>
  );
};

const SpriteContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding: 12px;
  padding-left: 0;
`;

const SpritesheetContainer = styled.div`
  margin-left: 24px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export default Sprite;
