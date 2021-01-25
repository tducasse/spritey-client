import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDropzone } from "react-dropzone";
import Sprite from "../Sprite";
import { API } from "aws-amplify";
import axios from "axios";

const baseStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "#eeeeee",
  borderStyle: "dashed",
  backgroundColor: "#fafafa",
  color: "#bdbdbd",
  outline: "none",
  transition: "border .24s ease-in-out",
};

const activeStyle = {
  borderColor: "#2196f3",
};

const acceptStyle = {
  borderColor: "#00e676",
};

const rejectStyle = {
  borderColor: "#ff1744",
};

const Upload = ({ challenge }) => {
  const [currentUpload, setCurrentUpload] = useState(null);
  const [tag, setTag] = useState("");

  useEffect(() => {
    if (challenge) {
      setTag(challenge.name);
    }
  }, [challenge]);

  const onDrop = useCallback(
    (files) => {
      const file = files[0];
      const name = file.name;
      const type = "image/png";
      API.post("spritey", "/requestUploadURL", {
        body: {
          name,
          type,
          tag,
        },
      }).then((response) => {
        const signedRequest = response.uploadURL;
        axios
          .put(signedRequest, file, { headers: { "Content-Type": type } })
          .then(() => setCurrentUpload(signedRequest.split("?")[0]));
        return false;
      });
    },
    [tag]
  );

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({ accept: "image/png", onDrop });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isDragActive, isDragReject, isDragAccept]
  );

  if (currentUpload) {
    return (
      <>
        <h3>All good, it's uploaded!</h3>
        <Sprite key={currentUpload} s3_path={currentUpload} tag={tag} />
      </>
    );
  }
  return (
    <>
      <ul>
        <li>export the spritesheet as a png</li>
        <li>with only 1 row</li>
      </ul>
      <div className="container">
        <div {...getRootProps({ style })}>
          <input {...getInputProps()} disabled={!tag} />
          <p>
            {!tag
              ? "Enter the name of the challenge first"
              : "Now drag and drop your spritesheet, or click here to select a file"}
          </p>
        </div>
      </div>
    </>
  );
};
export default Upload;
