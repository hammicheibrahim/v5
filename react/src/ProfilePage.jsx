import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useUser } from './UserContext';
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
  MDBBreadcrumb,
  MDBBreadcrumbItem,
  MDBProgress,
  MDBProgressBar,
  MDBIcon,
  MDBListGroup,
  MDBListGroupItem,
  MDBTable,
  MDBTableBody,
  MDBTableHead
} from 'mdb-react-ui-kit';


export default function ProfilePage() {
  const { userId } = useParams();
  const { users } = useUser();
  const [userProfile, setUserProfile] = useState(null);

 useEffect(() => {
  if (userId && users.length > 0) {
    const foundUser = users.find(user => user.UserID.toString() === userId);
    if (foundUser) {
      setUserProfile(foundUser);
    }
  }
}, [userId, users]);
const formatAccessTime = (accessTime) => {
  const dateObj = new Date(accessTime);
  const date = dateObj.toISOString().split('T')[0];
  const time = dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  return { date, time };
};
  return (
    <section style={{ backgroundColor: '#eee' }}>
      <MDBContainer className="py-5">
        <MDBRow>
          <MDBCol>
            <MDBBreadcrumb className="bg-light rounded-3 p-3 mb-4">
              <MDBBreadcrumbItem>
                <a href='#'>Home</a>
              </MDBBreadcrumbItem>
              <MDBBreadcrumbItem>
                <a href="/users">User</a>
              </MDBBreadcrumbItem>
              <MDBBreadcrumbItem active>User Profile</MDBBreadcrumbItem>
            </MDBBreadcrumb>
          </MDBCol>
        </MDBRow>

        <MDBRow>
          <MDBCol lg="4">
            <MDBCard className="mb-4">
              <MDBCardBody className="text-center">
              <MDBCardImage
                    src={`http://127.0.0.1:8000/static/${userId}.jpeg`}
                    alt="avatar"
                    
                    style={{ width: '300px' }}
                    fluid
                  />
                <p className="text-muted mb-1"></p>
                <p className="text-muted mb-4"></p>
                <div className="d-flex justify-content-center mb-2">
                  <MDBBtn color="success">ACTIVE</MDBBtn>
                  
                </div>
              </MDBCardBody>
            </MDBCard>

          </MDBCol>
          <MDBCol lg="8">
          {userProfile &&(
            <MDBCard className="mb-4">
              <MDBCardBody>
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>First Name</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{userProfile.FirstName}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Last Name </MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{userProfile.LastName}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Email</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{userProfile.FirstName+"_"+userProfile.LastName}@gmail.com</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Phone</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">(0673) 21454</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Date Of Birth:</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{userProfile.DateOfBirth}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Gendre</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{userProfile.Gender}</MDBCardText>
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>)
              } 
          </MDBCol>
          <MDBCol lg="12">
            {userProfile && (
              <MDBCard className="mb-4">
                <MDBCardBody>
                  {/* ... existing user profile code ... */}
                  
                  {/* Access Log Table */}
                  <h5 className="mt-4">Access Log</h5>
                  <MDBTable striped>
                    <MDBTableHead>
                      <tr>
                        <th>Log ID</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Access Result</th>
                      </tr>
                    </MDBTableHead>
                    <MDBTableBody>
                      {userProfile.AccessLogs.map(log => {
                        const { date, time } = formatAccessTime(log.AccessTime);
                        return (
                          <tr key={log.LogID}>
                            <td>{log.LogID}</td>
                            <td>{date}</td>
                            <td>{time}</td>
                            <td>{log.AccessResult}</td>
                          </tr>
                        );
                      })}
                    </MDBTableBody>
                  </MDBTable>
                </MDBCardBody>
              </MDBCard>
            )}
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  );
}