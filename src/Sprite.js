import React, { useCallback, useState } from "react";
import Spritesheet from "react-responsive-spritesheet";
import Settings from "./Settings";
import axios from "axios";
import { apiBaseURL } from "./constants";

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
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        padding: 12,
        paddingLeft: 0,
      }}
    >
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
      <div
        style={{
          marginLeft: 24,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
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
      </div>
    </div>
  );
};

export default Sprite;
