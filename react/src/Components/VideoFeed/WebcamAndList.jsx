// WebcamAndList.jsx
import React from 'react';
import WebcamComponent from './WebcamViewer';
import LastArrivalList from '../LastArrivalList/LastArrivalList';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
const Container = styled.div`
  display: flex;
  justify-content: space-between;
`;

const navigate = useNavigate();
const WebcamAndList =  ({ structureId, cameraId }) => {
const handclick = ()=>{
    navigate('/')  
}
  return (
    <Container>
      <button onClick={handclick}>stop</button>
      <LastArrivalList />
      <WebcamComponent
              structureId={structureId}
              cameraId={cameraId}
            />
    </Container>
  );
};

export default WebcamAndList;
