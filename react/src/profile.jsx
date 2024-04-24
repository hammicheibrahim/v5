import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Breadcrumbs,
  Link,
} from '@mui/material';
import { useUser } from './UserContext';

const ProfilePage = () => {
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

  return (
    <section className="profile-section">
      <Container>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Breadcrumbs aria-label="breadcrumb">
              <Link color="inherit" href="/">
                Home
              </Link>
              <Typography color="textPrimary">User Profile</Typography>
            </Breadcrumbs>
          </Grid>
          <Grid item lg={4} xs={12}>
            <Card className="profile-card mb-4">
              <CardContent>
                {userProfile && (
                  <CardMedia
                    component="img"
                    className="avatar"
                    image={`http://127.0.0.1:8000/static/${userId}.jpeg`}
                    alt="avatar"
                  />
                )}
              </CardContent>
            </Card>
          </Grid>
          <Grid item lg={8} xs={12}>
            {userProfile && (
              <Card className="profile-card mb-4">
                <CardContent>
                  <Typography variant="body1" component="p">
                    <strong>First Name:</strong> {userProfile.FirstName}
                  </Typography>
                  <Typography variant="body1" component="p">
                    <strong>Last Name:</strong> {userProfile.LastName}
                  </Typography>
                  <Typography variant="body1" component="p">
                    <strong>Date Of Birth:</strong> {userProfile.DateOfBirth}
                  </Typography>
                  <Typography variant="body1" component="p">
                    <strong>Gender:</strong> {userProfile.Gender}
                  </Typography>
                </CardContent>
              </Card>
            )}
          </Grid>
        </Grid>
      </Container>
    </section>
  );
};

export default ProfilePage;
