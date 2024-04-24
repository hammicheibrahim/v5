import React, { useEffect, useRef, useState } from 'react';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Webcam from 'react-webcam';
import axios from 'axios';
import Input from '@mui/material/Input';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const Access = () => {
  const webcamRef = useRef(null);
  const [imageSrc, setImageSrc] = useState(null);
  const [loading, setLoading] = useState(false);
  const [resultImageSrc, setResultImageSrc] = useState(null);
  const [userChoice, setUserChoice] = useState(null);

  const handleCapture = () => {
    setLoading(true);
    const image = webcamRef.current.getScreenshot();
    setImageSrc(image);
  };

  const handleUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImageSrc(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleClear = () => {
    setImageSrc(null);
    setResultImageSrc(null);
    setUserChoice(null);
  };

  useEffect(() => {
    if (imageSrc) {
      setLoading(true);
      const formDataToSend = new FormData();
      formDataToSend.append('imageSrc', imageSrc);
      axios({
        method: 'post',
        url: 'http://127.0.0.1:8000/verify_access/',
        data: formDataToSend,
        headers: { 'Content-Type': 'multipart/form-data' },
      })
        .then(response => {
          console.log(response.data);
          setResultImageSrc(`data:image/png;base64,${response.data.image}`);
        })
        .catch(error => {
          console.error('Error verifying access:', error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [imageSrc]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100vh' }}>
      {loading ? (
        <CircularProgress
          style={{ marginTop: '20vh' }}
          size={100}
        />
      ) : (
        <>
          {userChoice === null && (
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
              <Button
                onClick={() => setUserChoice('upload')}
                variant="contained"
                color="primary"
                style={{ marginRight: '10px', fontSize: '1.2rem' }}
              >
                Upload Image
              </Button>
              <Button
                onClick={() => setUserChoice('capture')}
                variant="contained"
                color="primary"
                style={{ fontSize: '1.2rem' }}
              >
                Capture Image
              </Button>
            </div>
          )}
          {userChoice === 'upload' && (
            <label htmlFor="upload-input">
              <Input
                id="upload-input"
                type="file"
                accept="image/*"
                onChange={handleUpload}
                style={{ display: 'none' }}
              />
              <Button
                component="span"
                variant="outlined"
                startIcon={<CloudUploadIcon />}
                style={{ marginTop: '10px' }}
              >
                Upload Image
              </Button>
            </label>
          )}
          {userChoice === 'capture' && (
            <>
              <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                width={640}
                height={480}
                mirrored={true}
              />
              <Button
                onClick={handleCapture}
                variant="contained"
                color="primary"
                disabled={loading}
                style={{ marginTop: '10px' }}
              >
                Capture Image
              </Button>
            </>
          )}
          {userChoice && (
            <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              {resultImageSrc && (
                <img
                  src={resultImageSrc}
                  alt="Result"
                  style={{ marginTop: '20px', maxWidth: '60vh', maxHeight: '60vh' }}
                />
              )}
              <Button onClick={handleClear} variant="contained" color="secondary" style={{ marginTop: '10px' }}>
                Clear
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Access;
