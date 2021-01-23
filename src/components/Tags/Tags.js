import React from "react";
import styled from "styled-components";
import Spinner from "../Spinner";
import Tag from "./Tag";

const Tags = ({ tags }) => {
  return (
    <TagsContainer>
      {tags && tags.length ? (
        tags.map((tag) => <Tag key={tag} tag={tag} />)
      ) : (
        <Spinner />
      )}
    </TagsContainer>
  );
};

const TagsContainer = styled.div`
  flex-direction: column;
  display: flex;
`;

export default Tags;
