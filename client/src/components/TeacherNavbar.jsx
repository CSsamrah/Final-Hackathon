import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Logo from '../images/logo.png';
import { FaBars } from 'react-icons/fa';
import { AiOutlineClose } from 'react-icons/ai';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/IconButton';

const TeacherNavbar = () => {
  const { teacherId } = useParams();
  const [isNavShowing, setIsNavShowing] = useState(window.innerWidth > 800 ? true : false);

  const closeNavHandler = () => {
    if (window.innerWidth < 800) {
      setIsNavShowing(false);
    } else {
      setIsNavShowing(true);
    }
  };

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className='Nav-container nav_container'>
      <Link to={`/teacherdashboard/${teacherId}`} className="nav_logo" onClick={closeNavHandler}>
        <img src={Logo} alt="Navbar Logo" />
      </Link>
      {isNavShowing && (
        <ul className='nav_menu'>
          <li><Link to={`/teacherdashboard/${teacherId}`} onClick={closeNavHandler}>Submitted</Link></li>
          <li><Link to={`/failedStudents/${teacherId}`} onClick={closeNavHandler}>Failed</Link></li>
          <li><Link to={`/leaderboard/${teacherId}`} onClick={closeNavHandler}>Leaderboard</Link></li>
          <li><Link to={`/upload/${teacherId}`} onClick={closeNavHandler}>Upload</Link></li>
          <li className='profile_avatar'>
            <Stack direction="row" spacing={2} alignItems="center">
              <Avatar>H</Avatar>
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
                  <MenuItem onClick={handleClose}><Link to={"/"}>Logout</Link></MenuItem>
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
}

export default TeacherNavbar;
