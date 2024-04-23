import React from 'react';
import { useNavigate } from 'react-router-dom';
const WebcamComponent =  ({ structureId, cameraId }) => {
  const webcamStreamUrl = `http://127.0.0.1:8000/stream/${structureId}/${cameraId}/`;
  const navigate = useNavigate();
  return (
    <>
    <img
      style={{
        display: 'block',
        WebkitUserSelect: 'none',
        margin: 'auto',
        backgroundColor: 'hsl(0, 0%, 25%)'
      }}
      src={webcamStreamUrl}/>

      </>
  );
};

export default WebcamComponent;
