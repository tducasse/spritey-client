import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { apiBaseURL } from "../../utils/constants";
import Sprite from "../Sprite";
import styled from "styled-components";
import { IoMdCube } from "react-icons/io";

const Tag = ({ tag }) => {
  const [open, setOpen] = useState(false);
  const [images, setImages] = useState([]);

  const fetchSprites = useCallback(async () => {
    const response = await axios.get(apiBaseURL + "/getSprites/" + tag);
    setImages(response.data.data.Items);
  }, [tag]);

  useEffect(() => {
    if (open) {
      fetchSprites();
    }
  }, [open, fetchSprites]);

  const toggleOpen = () => setOpen(!open);

  return (
    <>
      <RowH3>
        <IoMdCube />
        &nbsp;{tag} (
        <Underlined onClick={toggleOpen}>{open ? "Hide" : "Show"}</Underlined>)
      </RowH3>
      <SpritesContainer>
        {open &&
          (images || []).map((image) => (
            <Sprite key={image.s3_path} {...image} tag={tag} />
          ))}
      </SpritesContainer>
    </>
  );
};

const Underlined = styled.span`
  text-decoration: underline;
  :hover {
    cursor: pointer;
  }
`;

const RowH3 = styled.h3`
  display: flex;
  align-items: center;
`;

const SpritesContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

export default Tag;
