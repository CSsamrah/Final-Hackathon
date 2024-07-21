import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../images/logo.png';
import { FaBars } from 'react-icons/fa';
import { AiOutlineClose } from 'react-icons/ai';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

const Header = () => {
  const [isNavShowing, setIsNavShowing] = useState(window.innerWidth > 800 ? true : false);
  
  const closeNavHandler = () => {
    if (window.innerWidth < 800) {
      setIsNavShowing(false);
    } else {
      setIsNavShowing(true);
    }
  };

  return (
    <div className='Nav-container nav_container'>
      <Link to="/" className="nav_logo" onClick={closeNavHandler}>
        <img src={Logo} alt="Navbar Logo" />
      </Link>
      {isNavShowing && (
        <ul className='nav_menu'>
          <li><Link to="/dashboard" onClick={closeNavHandler}>Current</Link></li>
          <li><Link to="/submitted" onClick={closeNavHandler}>Submitted</Link></li>
          <li><Link to="/failed" onClick={closeNavHandler}>Failed</Link></li>
          <li><Link to="/leaderboard" onClick={closeNavHandler}>Leaderboard</Link></li>
          <li className='profile_avatar'>
            <Stack direction="row" spacing={2}>
              <Avatar>H</Avatar>
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

export default Header;