import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import LastArrivalItems from '../LastArrivalList/LastArrivalItems';
import realodImg from "../../assets/img/reload.png";

const LastArrivalList = () => {
    const LastArrivalSection = styled.section`
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 10px 10px;
        background-color: #ffffff;
        padding: 20px;
        width: 60vw; /* Modify width as needed */
        max-width: 500px; /* Optional: Set maximum width */
        min-height: 300px; /* Modify min-height as needed */
    `;

    const AnswerDiv = styled.div`
        min-width: 80%;
        max-height: 500px; /* Set maximum height for scrolling */
        overflow-y: auto; /* Enable vertical scrolling */
        width: 400px; /* Change width of the container */
        height: 10000px; /* Change height of the container */
    `;

    const ReloadImgTag = styled.img`
        height: 50px;
        width: 50px;
        margin-left: 10px;
        cursor: pointer;
    `;

    const [employeeList, setEmployeeList] = useState([]);
    const [isListIsLoad, setIsListIsLoad] = useState(false);

    useEffect(() => {
        // Fetch data from the backend when component mounts
        fetchData();
    }, []);

    const fetchData = () => {
        // Simulate fetching data
        setIsListIsLoad(false);
        // Fetch data from your API endpoint
        fetch('http://127.0.0.1:8000/get_logs/')
            .then(response => response.json())
            .then(data => {
                setEmployeeList(data.users);
                setIsListIsLoad(true);
            })
            .catch(error => console.error('Error fetching data:', error));
    };

    const LastEntriestAnswer = () => {
        return employeeList.map(user => (
            <LastArrivalItems key={user.UserID} result={user} />
        ));
    };

    const reloadList = () => {
        // Reload data
        fetchData();
    };

    return (
        <LastArrivalSection className='some-space'>
            <h2>Last arrivals</h2>
            <ReloadImgTag onClick={reloadList} src={realodImg} alt="reload" />
            <AnswerDiv>
                {/* Show user's data if user found */}
                {isListIsLoad ? <LastEntriestAnswer /> : <p>Loading...</p>}
            </AnswerDiv>
        </LastArrivalSection>
    );
};

export default LastArrivalList;
