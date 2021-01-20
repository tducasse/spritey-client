import React, { useState } from "react";
import Spritesheet from "react-responsive-spritesheet";
import Settings from "./Settings";

const Sprite = ({
  width: initWidth,
  height: initHeight,
  fps: initFps,
  frames: initFrames,
  scale: initScale,
  s3_path: src,
}) => {
  const [width, setWidth] = useState(initWidth || 32);
  const [height, setHeight] = useState(initHeight || 32);
  const [frames, setFrames] = useState(initFrames || 2);
  const [fps, setFps] = useState(initFps || 12);
  const [scale, setScale] = useState(initScale || 4);

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
      </div>
    </div>
  );
};

export default Sprite;
