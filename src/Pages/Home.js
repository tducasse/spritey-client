import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import Upload from "../components/Upload";
import PreviousChallenges from "../components/PreviousChallenges";
import Challenge from "../components/Challenge/Challenge";
import styled from "styled-components";
import { IoMdClose } from "react-icons/io";
import { API } from "aws-amplify";

const Home = () => {
  const [tags, setTags] = useState([]);
  const [challenge, setChallenge] = useState(null);
  const [isUploadOpen, setIsUploadOpen] = useState(false);

  useEffect(() => {
    const fetchTags = async () => {
      const response = await API.get("spritey", "/getTags");
      setTags(response.data.Items.map((el) => el.tag));
    };

    const fetchChallenge = async () => {
      const response = await API.get("spritey", "/getChallenges");
      setChallenge(response.data.Items[0]);
    };

    fetchChallenge();
    fetchTags();
  }, []);

  const toggleUpload = () => setIsUploadOpen(!isUploadOpen);

  return (
    <>
      <Challenge
        challenge={challenge}
        toggleUpload={toggleUpload}
        setChallenge={setChallenge}
      />
      <Modal
        isOpen={isUploadOpen}
        onRequestClose={toggleUpload}
        contentLabel="Upload a spritesheet"
      >
        <Row>
          <h2>Upload your spritesheet</h2>
          <BorderedIcon onClick={toggleUpload} />
        </Row>
        <Upload challenge={challenge} />
      </Modal>
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
