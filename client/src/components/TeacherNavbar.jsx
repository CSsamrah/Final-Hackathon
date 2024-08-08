import React, { useState, useEffect } from 'react';
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

const TeacherNavbar = ({ name }) => {
  const { teacherId } = useParams();
  const navigate = useNavigate();
  const [isNavShowing, setIsNavShowing] = useState(window.innerWidth > 800 ? true : false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [currentTeacherName, setCurrentTeacherName] = useState(name);

  useEffect(() => {
    setCurrentTeacherName(name);
  }, [name]);

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
    const token = localStorage.getItem('token'); // Retrieve token from local storage

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
        localStorage.removeItem('token'); // Remove token from local storage
        navigate('/'); // Redirect to login page

        window.history.pushState(null, '', window.location.href);
        window.onpopstate = function () {
        navigate('/');
      }
      } else {
        const result = await response.json();
        console.error('Logout failed:', result.message);
        alert('Logout failed: ' + (result.message || 'Unknown error'));
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred during logout. Please try again later.');
    }
  };

  // Get the first character of the teacherName
  const avatarInitial = currentTeacherName ? currentTeacherName.charAt(0).toUpperCase() : '';

  return (
    <div className='Nav-container nav_container'>
      <Link to={`/teacherdashboard/${teacherId}`} className="nav_logo" onClick={closeNavHandler}>
        <img src={Logo} alt="Navbar Logo" />
      </Link>
      {isNavShowing && (
        <ul className='nav_menu'>
          <li><Link to={`/teacherdashboard/${teacherId}`} onClick={closeNavHandler}>Submitted</Link></li>
          <li><Link to={`/failedStudents/${teacherId}`} onClick={closeNavHandler}>Failed</Link></li>
          <li><Link to={`/teacherleaderboard/${teacherId}`} onClick={closeNavHandler}>Leaderboard</Link></li>
          <li><Link to={`/upload/${teacherId}`} onClick={closeNavHandler}>Upload</Link></li>
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

export default TeacherNavbar;
