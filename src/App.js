import React, { useCallback, useEffect, useState } from "react";
import Upload from "./Upload";
import Tags from "./Tags";
import { apiBaseURL } from "./constants";
import axios from "axios";
import Challenge from "./Challenge";

const App = () => {
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
    <div style={{ padding: 12 }}>
      <Challenge challenge={challenge} />
      <details open>
        <summary>Upload a spritesheet</summary>
        <Upload challenge={challenge} />
      </details>
      <details open>
        <summary>Previous challenges</summary>
        <Tags tags={tags} />
      </details>
    </div>
  );
};

export default App;
