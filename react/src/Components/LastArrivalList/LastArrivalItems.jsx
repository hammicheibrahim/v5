import React from 'react';
import styled from 'styled-components';

const OneResult = styled.div`
    padding: 15px;
    margin: 30px 0;
`;

const ListItem = styled.li`
    list-style: none;
    margin-bottom: 5px;
`;

const UlList = styled.ul`
    padding: 0;
`;

const LastArrivalItems = ({ result }) => {
    const { UserID, FirstName, LastName, Gender, DateOfBirth, IsActive, CreationTime, LastAccessLog } = result;

    return (
        <OneResult>
            <UlList>
                <ListItem>
                    <b>First Name:</b> <i>{FirstName}</i>
                </ListItem>
                <ListItem>
                    <b>Last Name:</b> <i>{LastName}</i>
                </ListItem>
                <ListItem>
                    <b>Creation Time:</b> <i>{CreationTime}</i>
                </ListItem>
                <ListItem>
                    <b>Access Time:</b> <i>{LastAccessLog.AccessTime}</i>
                </ListItem>
                <ListItem>
                    <b>Access Result:</b> <i>{LastAccessLog.AccessResult}</i>
                </ListItem>
            </UlList>
        </OneResult>
    );
};

export default LastArrivalItems;
