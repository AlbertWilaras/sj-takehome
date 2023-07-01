import { AppBar, Box } from '@mui/material';
import swipejobs from '../../swipejobs.svg';
import './Navbar.css';
import Profile from './Profile';

const Navbar = () => {

  return (
    <AppBar sx={{bgcolor: "black", padding: "0.5rem"}} position="sticky">
        <Box display="flex" justifyContent="space-between" alignItems="center">
            <img src={swipejobs} className="logo" alt="logo" />
            <Profile/>
        </Box>
    </AppBar>
  );
}

export default Navbar;
