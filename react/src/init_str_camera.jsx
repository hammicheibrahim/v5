import React, { useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';
import us from 'react-route-dom'
import WebcamAndList from './Components/VideoFeed/WebcamAndList';

function StructureAndCameraSelector() {
    const [structures, setStructures] = useState([]);
    const [selectedStructure, setSelectedStructure] = useState('');
    const [cameras, setCameras] = useState([]);
    const [selectedCameraId, setSelectedCameraId] = useState(''); // Define selectedCameraId state
    const [isLoading, setIsLoading] = useState(false);
    const [showWebcam, setShowWebcam] = useState(false); // State to toggle webcam component
    const navigate = useNavigate();
    useEffect(() => {
        fetchStructures();
    }, []);

    const fetchStructures = () => {
        fetch('http://127.0.0.1:8000/structures/')
            .then(response => response.json())
            .then(data => setStructures(data))
            .catch(error => console.error('Error fetching structures:', error));
    };

    const fetchCamerasForStructure = (structureId) => {
        setIsLoading(true);
        fetch(`http://127.0.0.1:8000/cameras/${structureId}/`)
            .then(response => response.json())
            .then(data => {
                setCameras(data);
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Error fetching cameras:', error);
                setIsLoading(false);
            });
    };

    const handleStructureChange = (event) => {
        const structureId = event.target.value;
        setSelectedStructure(structureId);
        setSelectedCameraId(''); // Reset selectedCameraId when structure changes
        setShowWebcam(false); // Hide webcam component when structure changes
        if (structureId) {
            fetchCamerasForStructure(structureId);
        } else {
            setCameras([]);
        }
    };
    const handclick = () => {  
      navigate(`/WebcamAndList/${structureId}/${cameraId}`);    
      }

    const handleCameraChange = (event) => {
        const cameraId = event.target.value;
        setSelectedCameraId(cameraId);
        setShowWebcam(true); // Show webcam component when camera changes
    };
    
      return (
        <div>
          {!showWebcam && (
            <>
              <div>
                <label htmlFor="structureSelect">Select a structure:</label>
                <select
                  id="structureSelect"
                  value={selectedStructure}
                  onChange={handleStructureChange}
                >
                  <option value="">Select a structure</option>
                  {structures.map(structure => (
                    <option key={structure.id} value={structure.id}>
                      {structure.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="cameraSelect">Select a camera:</label>
                <select
                  id="cameraSelect"
                  disabled={isLoading || !selectedStructure}
                  value={selectedCameraId}
                  onChange={handleCameraChange}
                >
                  <option value="">Select a camera</option>
                  {cameras.map(camera => (
                    <option key={camera.id} value={camera.id}>
                      {camera.label}
                    </option>
                  ))}
                </select>
              </div>
            </>
          )}

          <button property='unclickaale' onClick={handclick}>
              lancer le controle !
          </button>
           
        
        </div>
      );
}

export default StructureAndCameraSelector;
