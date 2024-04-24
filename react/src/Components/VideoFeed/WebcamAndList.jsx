// WebcamAndList.jsx
import React from 'react';
import WebcamComponent from './WebcamViewer';
import LastArrivalList from '../LastArrivalList/LastArrivalList';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
`;


const WebcamAndList =  ({ structureId, cameraId }) => {

  return (
    <Container>
      <LastArrivalList />
      <WebcamComponent
              structureId={structureId}
              cameraId={cameraId}
            />
    </Container>
  );
};

export default WebcamAndList;
