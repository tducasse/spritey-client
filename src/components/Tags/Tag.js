import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { apiBaseURL } from "../../utils/constants";
import Sprite from "../Sprite";
import styled from "styled-components";

const Tag = ({ tag }) => {
  const [open, setOpen] = useState(false);
  const [images, setImages] = useState([]);

  const fetchSprites = useCallback(async () => {
    const response = await axios.get(apiBaseURL + "/getSprites/" + tag);
    setImages(response.data.data.Items);
  }, [tag]);

  useEffect(() => {
    fetchSprites();
  }, [fetchSprites]);

  return (
    <div>
      <button onClick={() => setOpen(true)}>{tag}</button>
      <SpritesContainer>
        {open &&
          (images || []).map((image) => (
            <Sprite key={image.s3_path} {...image} tag={tag} />
          ))}
      </SpritesContainer>
    </div>
  );
};

const SpritesContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

export default Tag;
