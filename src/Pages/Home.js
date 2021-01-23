import React, { useCallback, useEffect, useState } from "react";
import ReactModal from "react-modal";
import Upload from "../components/Upload";
import PreviousChallenges from "../components/PreviousChallenges";
import { apiBaseURL } from "../utils/constants";
import axios from "axios";
import Challenge from "../components/Challenge/Challenge";
import styled from "styled-components";
import { IoMdClose } from "react-icons/io";

const Home = () => {
  const [tags, setTags] = useState([]);
  const [challenge, setChallenge] = useState(null);
  const [isUploadOpen, setIsUploadOpen] = useState(false);

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

  const toggleUpload = () => setIsUploadOpen(!isUploadOpen);

  return (
    <>
      <Challenge challenge={challenge} toggleUpload={toggleUpload} />
      <ReactModal
        isOpen={isUploadOpen}
        onRequestClose={toggleUpload}
        contentLabel="Upload a spritesheet"
      >
        <Row>
          <h2>Upload your spritesheet</h2>
          <BorderedIcon onClick={toggleUpload} />
        </Row>
        <Upload challenge={challenge} />
      </ReactModal>
      <PreviousChallenges tags={tags} />
    </>
  );
};

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  padding-right: 12px;
  padding-left: 12px;
  align-items: center;
  border-bottom: 1px dotted black;
`;

const BorderedIcon = styled(IoMdClose)`
  border: 1px solid black;
  border-radius: 100%;
  padding: 3px;
  :hover {
    cursor: pointer;
  }
`;

export default Home;
