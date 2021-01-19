import React, { useState } from "react";
import Spritesheet from "react-responsive-spritesheet";

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
}) => {
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
      <label>Frames</label>
      <input
        type="number"
        value={frames}
        onChange={(e) => setFrames(Number(e.target.value))}
      />
      <label>Height</label>
      <input
        type="number"
        value={height}
        onChange={(e) => setHeight(Number(e.target.value))}
      />
      <label>Width</label>
      <input
        type="number"
        value={width}
        onChange={(e) => setWidth(Number(e.target.value))}
      />
      <label>FPS</label>
      <input
        type="number"
        value={fps}
        onChange={(e) => setFps(Number(e.target.value))}
      />
      <label>Scale</label>
      <input
        type="number"
        value={scale}
        onChange={(e) => setScale(Number(e.target.value))}
      />
    </div>
  );
};

const Sprite = ({ src }) => {
  const [width, setWidth] = useState(32);
  const [height, setHeight] = useState(32);
  const [frames, setFrames] = useState(2);
  const [fps, setFps] = useState(12);
  const [scale, setScale] = useState(4);

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
      />
      <div style={{ marginLeft: 24 }}>
        <Spritesheet
          style={{ height: height * scale, width: width * scale }}
          key={`${frames}-${height}-${width}-${fps}-${scale}`}
          image={src}
          heightFrame={height}
          widthFrame={width}
          steps={frames}
          fps={fps}
          autoplay
          loop
        />
      </div>
    </div>
  );
};

export default Sprite;
