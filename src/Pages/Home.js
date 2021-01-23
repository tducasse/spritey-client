import React, { useCallback, useEffect, useState } from "react";
import Upload from "../components/Upload";
import Tags from "../components/Tags";
import { apiBaseURL } from "../utils/constants";
import axios from "axios";
import Challenge from "../components/Challenge/Challenge";
import styled from "styled-components";

const Home = () => {
  const [tags, setTags] = useState([]);
  const [challenge, setChallenge] = useState(null);

  const fetchTags = useCallback(async () => {
    const response = await axios.get(apiBaseURL + "/getTags");
    setTags(response.data.data.Items.map((el) => el.tag));
  }, []);

  const fetchChallenge = useCallback(async () => {
    const response = await axios.get(apiBaseURL + "/getChallenges");
    setChallenge(response.data.data.Items[0]);
  }, []);

  useEffect(() => {
    fetchChallenge();
    fetchTags();
  }, [fetchTags, fetchChallenge]);

  return (
    <Container>
      <Challenge challenge={challenge} />
      <details open>
        <summary>Upload a spritesheet</summary>
        <Upload challenge={challenge} />
      </details>
      <details open>
        <summary>Previous challenges</summary>
        <Tags tags={tags} />
      </details>
    </Container>
  );
};

const Container = styled.div`
  padding: 12px;
`;

export default Home;
