import React, { useState, useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Modal } from '../../context/Modal';
import { logout } from '../../store/session';

import './DropDown.css';

const DropDown = ({ user }) => {
  const dispatch = useDispatch();
  
  const toggleMenu = () => {
    setMenu(open => !open);
  };
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    if (menu === false) return;

    const closeMenu = () => {
      console.log("closeMenu")
      setMenu(false);
    };
    console.log(user)
    document.addEventListener('click', closeMenu);
    const returnClose = () => {
      console.log('second return');
      document.removeEventListener("click", closeMenu);
    }
    return returnClose
  }, []);

  const logoutUser = e => {
    e.preventDefault();
    dispatch(logout());
  }
  console.log(menu)
  return (
    <>
      <button className='profile_button' onClick={toggleMenu}>
        <img className="profile_image" src={user.profileImageUrl} alt=""/> 
        <span className='drop_down_firstName'>{user.firstName}</span>
      </button>

      {menu && (
        // <ul className="profile_dropdown" onClick={() => setMenu(false)}>
        <ul className="profile_dropdown">
          <li id="profile_dropdown_navlink_firstName">{user.firstName} {user.lastName}</li>
          <li className='dropdown_divider'></li>
          <li className='profile_dropdown_navlink'>
            {/* <Link to={'/profile'}>
              <span className='profile_dropdown_span' id="your_trips_button">your trips</span>
            </Link> */}
          </li>

          <li className='profile_dropdown_navlink'> <button id="create_trip_button" >create a trip</button></li>

          <li className='profile_dropdown_navlink'> 
            <Link to={'/'}> 
              <button id="logout_button" onClick={logoutUser}>logout</button>
            </Link>
          </li>

        </ul>
      )}

    </>
  );
}

export default DropDown;