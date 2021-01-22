import React from "react";
import Tag from "./Tag";

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
