import * as React from 'react';
import Box from '@mui/joy/Box';
import Grid from '@mui/joy/Grid';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemButton from '@mui/joy/ListItemButton';
import HomeRounded from '@mui/icons-material/HomeRounded';
import AboutMenu from './AboutMenu';  // Assuming you have an AboutMenu component
import AdmissionsMenu from './AdmissionsMenu';  // Assuming you have an AdmissionsMenu component

export default function Navbar() {
  return (
    <Box sx={{ minHeight: 90, flexGrow: 1 }}>
      <Grid container spacing={2} justifyContent="space-between" alignItems="center">
        <Grid item>
          <img className="images" src="/logo.png" alt="" style={{ height: "50px",marginTop:"20px" }} />
        </Grid>
        <Grid item>
          <List
            role="menubar"
            orientation="horizontal"
            sx={{
              '--List-radius': '8px',
              '--List-padding': '4px',
              '--List-gap': '8px',
              '--ListItem-gap': '0px',
            }}
          >
            <ListItem role="none">
              <ListItemButton role="menuitem" component="a" href="#navigation-menu">
                <HomeRounded />
                Home
              </ListItemButton>
            </ListItem>
            <ListItem role="none">
              <AboutMenu />
            </ListItem>
            <ListItem role="none">
              <AdmissionsMenu />
            </ListItem>
          </List>
        </Grid>
      </Grid>
    </Box>
  );
}
