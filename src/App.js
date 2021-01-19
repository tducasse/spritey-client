import React, { useCallback, useEffect, useState } from "react";
import Upload from "./Upload";
import Tags from "./Tags";
import { apiBaseURL } from "./constants";
import axios from "axios";

const App = () => {
  const [tag, setTag] = useState("");
  const [tags, setTags] = useState([]);

  const fetchTags = useCallback(async () => {
    const response = await axios.get(apiBaseURL + "/getTags");
    setTags(response.data.data.Items.map((el) => el.tag));
  }, []);

  useEffect(() => {
    fetchTags();
  }, [fetchTags]);

  return (
    <div style={{ padding: 12 }}>
      <details open>
        <summary>Upload a spritesheet</summary>
        <ul>
          <li>Only png</li>
          <li>Only 1 row</li>
          <li>Make sure you add the name for the current challenge</li>
          <li>Name your file "[CHALLENGE_NAME]_[USER_NAME].png"</li>
        </ul>
        <label htmlFor="tag">Enter the name of the challenge here</label>
        <input
          name="tag"
          onChange={(e) => setTag(e.target.value)}
          value={tag}
        />
        <Upload tag={tag}></Upload>
      </details>
      <details open>
        <summary>Previous challenges</summary>
        <Tags tags={tags} />
      </details>
    </div>
  );
};

export default App;
