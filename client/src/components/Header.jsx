import React, { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import Logo from '../images/logo.png';
import { FaBars } from 'react-icons/fa';
import { AiOutlineClose } from 'react-icons/ai';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/IconButton';

const Header = ({ userName }) => {
  const { studentId } = useParams();
  const navigate = useNavigate();
  const [isNavShowing, setIsNavShowing] = useState(window.innerWidth > 800 ? true : false);
  const [anchorEl, setAnchorEl] = useState(null);

  const closeNavHandler = () => {
    if (window.innerWidth < 800) {
      setIsNavShowing(false);
    } else {
      setIsNavShowing(true);
    }
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    const token = localStorage.getItem('token'); // or sessionStorage.getItem('token')
  
    if (!token) {
      alert('No token found. Please log in again.');
      navigate('/'); // Redirect to login page
      return;
    }
  
    try {
      const response = await fetch('http://localhost:8000/api/logout', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
  
      if (response.ok) {
        localStorage.removeItem('token'); // Remove the token from storage
        navigate('/'); // Redirect to the login page

        window.history.pushState(null, '', window.location.href);
        window.onpopstate = function () {
        navigate('/');
      }}
       else {
        const result = await response.json();
        console.error('Logout failed:', result.message);
        alert(`Logout failed: ${result.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred during logout. Please try again later.');
    }
  };

  // Get the first character of the userName
  const avatarInitial = userName ? userName.charAt(0).toUpperCase() : '';

  return (
    <div className='Nav-container nav_container'>
      <Link to="/" className="nav_logo" onClick={closeNavHandler}>
        <img src={Logo} alt="Navbar Logo" />
      </Link>
      {isNavShowing && (
        <ul className='nav_menu'>
          <li><Link to={`/dashboard/${studentId}`} onClick={closeNavHandler}>Current</Link></li>
          <li><Link to={`/submitted/${studentId}`} onClick={closeNavHandler}>Submitted</Link></li>
          <li><Link to={`/failed/${studentId}`} onClick={closeNavHandler}>Failed</Link></li>
          <li><Link to={`/leaderboard/${studentId}`} onClick={closeNavHandler}>Leaderboard</Link></li>
          <li className='profile_avatar'>
            <Stack direction="row" spacing={2} alignItems="center">
              <Avatar>{avatarInitial}</Avatar>
              <div className='selectClass'>
                <IconButton
                  aria-controls="simple-menu"
                  aria-haspopup="true"
                  onClick={handleClick}
                >
                  <MoreVertIcon />
                </IconButton>
                <Menu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={() => { handleClose(); handleLogout(); }}>
                    Logout
                  </MenuItem>
                </Menu>
              </div>
            </Stack>
          </li>
        </ul>
      )}
      <button className='nav_toggle-btn' onClick={() => setIsNavShowing(!isNavShowing)}>
        {isNavShowing ? <AiOutlineClose /> : <FaBars />}
      </button>
    </div>
  );
};

export default Header;
