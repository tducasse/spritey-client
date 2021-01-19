import React, { useCallback, useMemo } from 'react'
import { useDropzone } from 'react-dropzone'
import axios from 'axios'

const apiBaseURL = "https://24pjv4vvf0.execute-api.us-east-1.amazonaws.com/dev"

const baseStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#eeeeee',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: '#bdbdbd',
  outline: 'none',
  transition: 'border .24s ease-in-out'
};

const activeStyle = {
  borderColor: '#2196f3'
};

const acceptStyle = {
  borderColor: '#00e676'
};

const rejectStyle = {
  borderColor: '#ff1744'
};

const Upload = () => {
  const onDrop = useCallback(files => {

    let file = files[0]
    let fileParts = file.name.split('.');
    let fileName = fileParts[0];
    let fileType = fileParts[1];
    axios.post(apiBaseURL + "/requestUploadURL", {
      fileName,
      fileType
    })
      .then(response => {
        var signedRequest = response.data.uploadURL;
        var options = {
          headers: {
            'Content-Type': fileType
          }
        };
        axios.put(signedRequest, file, options)
        return false;
      });
  }, [])

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject
  } = useDropzone({ accept: 'image/*', onDrop });


  const style = useMemo(() => ({
    ...baseStyle,
    ...(isDragActive ? activeStyle : {}),
    ...(isDragAccept ? acceptStyle : {}),
    ...(isDragReject ? rejectStyle : {})
  }), [
    isDragActive,
    isDragReject,
    isDragAccept
  ]);

  return (
    <div className="container">
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </div>
    </div>
  );
}
export default Upload
