import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import duration from "dayjs/plugin/duration";
import styled from "styled-components";
import Spinner from "../Spinner";
import { API } from "aws-amplify";
import Modal from "react-modal";
import UpdateChallengeForm from "./UpdateChallengeForm";
import { VscSettingsGear } from "react-icons/vsc";
import { IoMdClose } from "react-icons/io";

dayjs.extend(relativeTime);
dayjs.extend(duration);

const roundTime = (timestamp = +new Date(), hours = 23, minutes = 59) =>
  Math.floor(+new Date(timestamp + 172800000).setHours(hours, minutes) / 1000);

const Challenge = ({ challenge, toggleUpload, setChallenge }) => {
  const [timestamp, setTimestamp] = useState(roundTime());
  const [name, setName] = useState("");
  const [open, setOpen] = useState(false);

  const updateChallenge = async () => {
    if (!name) return null;
    await API.post("spritey", "/updateChallenge", {
      body: {
        name,
        end_date: "" + timestamp,
        oldName: challenge.name,
        oldDate: "" + challenge.end_date,
      },
    });
    setOpen(false);
    setChallenge({ name, end_date: timestamp });
  };

  useEffect(() => {
    setName("");
    setTimestamp(roundTime());
  }, [open]);

  Modal.setAppElement("#root");
  const toggleOpen = () => setOpen(!open);

  const endDate = !!challenge && dayjs(Number(challenge.end_date) * 1000);

  return (
    <>
      <Modal
        isOpen={open}
        requestClose={toggleOpen}
        contentLabel={"Update challenge"}
      >
        <Row>
          <h2>Update Challenge</h2>
          <BorderedIcon onClick={toggleOpen} />
        </Row>
        <UpdateChallengeForm
          setName={setName}
          setTimestamp={setTimestamp}
          timestamp={timestamp}
          name={name}
          onSubmit={updateChallenge}
        />
      </Modal>
      <Container>
        <Row>
          <h2>Current challenge</h2>
          <VscSettingsGear onClick={toggleOpen} />
        </Row>
        {challenge ? (
          <>
            <h3>{challenge.name.toUpperCase()}</h3>
            <h3>
              {`Challenge end: ${endDate.fromNow()} (${endDate.format(
                "DD/MM/YY - HH:mm Z"
              )})`}
            </h3>
            <button onClick={toggleUpload}>Participate!</button>
          </>
        ) : (
          <Spinner />
        )}
      </Container>
    </>
  );
};

const Container = styled.div`
  padding: 12px;
  border-bottom: 1px dotted black;
`;

const Row = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const BorderedIcon = styled(IoMdClose)`
  border: 1px solid black;
  border-radius: 100%;
  padding: 3px;
  :hover {
    cursor: pointer;
  }
`;

export default Challenge;
