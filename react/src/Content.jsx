import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';

import Users from './Users';  // Import the Users component
import SignUp from './SingUp';
import Access from './Access';
import ProfilePage from './ProfilePage';
import WebcamComponent from '../../react/src/Components/VideoFeed/WebcamViewer';
import LastArrivalList from '../../react/src/Components/LastArrivalList/LastArrivalList'
import WebcamAndList from './Components/VideoFeed/WebcamAndList';
import SignUpForm from './Components/adduser';
import StructureAndCameraSelector from './init_str_camera';

const Content = () => {
  return (
    <div>
      <Routes>
        <Route path="/users" element={<Users />} />
        <Route path="/signUp" element={<SignUp />} /> {/* Corrected path */}
        <Route path="/access" element={<Access />} /> {/* Assuming Access is another component */}
        <Route path="/profile/:userId" element={<ProfilePage />} /> {/* Assuming profile/:userId route */}
        {/* Add more routes for other components */}
        <Route path="/LastArrivalList" element={<LastArrivalList />} /> 
        <Route path="/WebcamComponent" element={<WebcamAndList /> } /> 
        <Route path="/StructureAndCameraSelector" element={<StructureAndCameraSelector /> } />
        
        <Route path="/Adduser" element={<SignUpForm /> } />
      </Routes>
    </div>
  );
};

export default Content;

