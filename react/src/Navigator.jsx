import * as React from 'react';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { NavLink } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import DnsRoundedIcon from '@mui/icons-material/DnsRounded';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import ApartmentIcon from '@mui/icons-material/Apartment';

const categories = [
  {
    id: 'Build',
    children: [
      // {
      //   id: 'Users',
      //   icon: <PeopleIcon />,
      //   route: '/users',
      //   active: true,
      // },
      // {
      //   id: 'SignUp',
      //   icon: <DnsRoundedIcon />,
      //   route: '/signUp',
      // },
      // {
      //   id: 'Access',
      //   icon: <HomeIcon />,
      //   route: '/Access',
      // }
      //   ,
      {
        id: 'Adduser',
        icon: <CameraAltIcon />,
        route: '/Adduser',
      }
      ,
      {
        id: 'init',
        icon: <CameraAltIcon />,
        route: '/StructureAndCameraSelector',
      }
      ,


      {
        id: 'Structure',
        icon: <ApartmentIcon />,
        route: '/WebcamComponent',
      }
      ,
      {
        id: 'PeopleAccces',
        icon: <PeopleIcon />,
        route: '/LastArrivalList',
      }
    ],
  },
];

const item = {
  py: '8px',
  px: 3,
  color: 'rgba(255, 255, 255, 0.9)',
  '&:hover, &:focus': {
    bgcolor: 'rgba(255, 255, 255, 0.1)',
  },
};

const itemCategory = {
  boxShadow: '0 -1px 0 rgb(255,255,255,0.1) inset',
  py: 1.5,
  px: 3,
};

const header = {
  fontSize: 24,
  fontWeight: 'bold',
  color: '#fff',
};

export default function Navigator(props) {
  const { ...other } = props;

  return (
    <Drawer variant="permanent" {...other}>
      <List disablePadding>
        <ListItem sx={{ ...item, ...itemCategory, ...header }}>
        Options
        </ListItem>
        <ListItem sx={{ ...item, ...itemCategory }}>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText>
            <NavLink to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
              Project 
            </NavLink>
          </ListItemText>
        </ListItem>
        {categories.map(({ id, children }) => (
          <Box key={id} sx={{ bgcolor: '#101F33' }}>
            <ListItem sx={{ py: 2, px: 3 }}>
              <ListItemText sx={{ ...header }}>{id}</ListItemText>
            </ListItem>
            {children.map(({ id: childId, icon, route, active }) => (
              <ListItem disablePadding key={childId}>
                <ListItemButton selected={active} sx={item}>
                  <ListItemIcon>{icon}</ListItemIcon>
                  <ListItemText>
                    <NavLink to={route} style={{ textDecoration: 'none', color: 'inherit' }}>
                      {childId}
                    </NavLink>
                  </ListItemText>
                </ListItemButton>
              </ListItem>
            ))}
            <Divider sx={{ mt: 2 }} />
          </Box>
        ))}
      </List>
    </Drawer>
  );
}
