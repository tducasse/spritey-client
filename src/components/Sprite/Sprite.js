import React, { useCallback, useState } from "react";
import Spritesheet from "react-responsive-spritesheet";
import Settings from "./Settings/Settings";
import { API } from "aws-amplify";
import styled from "styled-components";
import { VscSettingsGear } from "react-icons/vsc";
import ReactModal from "react-modal";
import { IoMdClose } from "react-icons/io";

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
  const [open, setOpen] = useState(false);

  const saveSettings = useCallback(async () => {
    await API.patch("spritey", "/updateSettings", {
      body: {
        width,
        height,
        frames,
        fps,
        scale,
        src,
        tag,
      },
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

  ReactModal.setAppElement("#root");

  const toggleOpen = () => setOpen(!open);

  return (
    <SpriteContainer>
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
      <VscSettingsGear onClick={toggleOpen} />
      <ReactModal
        isOpen={open}
        contentLabel="Settings"
        onRequestClose={toggleOpen}
      >
        <Row>
          <h2>Settings</h2>
          <BorderedIcon onClick={toggleOpen} />
        </Row>
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
          isDirty={isDirty}
          saveSettings={saveSettings}
        />
      </ReactModal>
    </SpriteContainer>
  );
};

const SpriteContainer = styled.div`
  border-radius: 10px;
  border: 1px solid black;
  display: flex;
  padding: 12px;
  flex-direction: column;
  margin-right: 6px;
  margin-bottom: 6px;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  padding-right: 12px;
  padding-left: 12px;
  align-items: center;
  border-bottom: 1px dotted black;
`;

const BorderedIcon = styled(IoMdClose)`
  border: 1px solid black;
  border-radius: 100%;
  padding: 3px;
  :hover {
    cursor: pointer;
  }
`;

export default Sprite;
