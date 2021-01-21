import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { apiBaseURL } from "./constants";
import Sprite from "./Sprite";

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
      <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
        {open &&
          (images || []).map((image) => (
            <Sprite key={image.s3_path} {...image} tag={tag} />
          ))}
      </div>
    </div>
  );
};

const Tags = ({ tags }) => {
  return (
    <div style={{ padding: 12, flexDirection: "column", display: "flex" }}>
      {(tags || []).map((tag) => (
        <Tag key={tag} tag={tag} />
      ))}
    </div>
  );
};

export default Tags;
