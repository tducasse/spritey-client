import React from "react";
import styled from "styled-components";
import Tag from "./Tag";

const Tags = ({ tags }) => {
  return (
    <TagsContainer>
      {(tags || []).map((tag) => (
        <Tag key={tag} tag={tag} />
      ))}
    </TagsContainer>
  );
};

const TagsContainer = styled.div`
  padding: 12px;
  flex-direction: column;
  display: flex;
`;

export default Tags;
