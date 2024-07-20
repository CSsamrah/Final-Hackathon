import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import Logo from '../images/logo.png'
import {FaBars} from 'react-icons/fa'
import {AiOutlineClose} from 'react-icons/ai'


const Header = () => {
  const [isNavShowing, setIsNavShowing] = useState(window.innerWidth>800? true: false)
  const closeNavHandler = () => {
    if(window.innerWidth < 800){
      setIsNavShowing(false);
    } else {
      setIsNavShowing(true);
    }
  }
  return (
    <div className='container nav_container'>
      <Link to="/" className="nav_logo" onClick={closeNavHandler}>
        <img src={Logo} alt="Navbar Logo"/>
      </Link>
      {isNavShowing && 
      <ul className='nav_menu'>
        <li><Link to="/" onClick={closeNavHandler}>Home</Link></li>
        <li><Link to="/" onClick={closeNavHandler}>About</Link></li>
        <li><Link to="/" onClick={closeNavHandler}>Services</Link></li>
        <li><Link to="/" onClick={closeNavHandler}>Media</Link></li>
        <li><Link to="/" onClick={closeNavHandler}>Contact Us</Link></li>
        <li><Link to="/" onClick={closeNavHandler}>Bank Detail</Link></li>
        <li><Link to="/" className='btn category ' >DONATE NOW</Link></li>
        <li><Link to="/" className='btn category sponsor'>BE A SPONSOR</Link></li>
      </ul>}
      <button className='nav_toggle-btn' onClick={() => setIsNavShowing(!isNavShowing)}>
        {isNavShowing ? <AiOutlineClose/> : <FaBars/>}
      </button>
    </div>
  );
}

export default Header