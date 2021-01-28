import React, { useEffect, useState } from "react";
import { API } from "aws-amplify";
import Sprite from "../Sprite";
import styled from "styled-components";
import { IoMdCube } from "react-icons/io";
import Spinner from "../Spinner";

const Tag = ({ tag }) => {
  const [open, setOpen] = useState(false);
  const [images, setImages] = useState([]);

  useEffect(() => {
    if (open) {
      const fetchSprites = async () => {
        const response = await API.get("spritey", "/getSprites/" + tag);
        setImages(response.data.Items);
      };
      fetchSprites();
    }
  }, [open, tag]);

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
          (images && images.length ? (
            images.map((image) => (
              <Sprite key={image.s3_path} {...image} tag={tag} />
            ))
          ) : (
            <Spinner />
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
