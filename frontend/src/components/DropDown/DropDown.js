import React, { useState, useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../../store/session';

import './DropDown.css';

const DropDown = ({ user }) => {
  const [showCreateTripModal, setShowCreateTripModal] = useState(false);
  const dispatch = useDispatch();

  const toggleMenu = () => {
    setMenu(open => !open);21``
  };

  const [menu, setMenu] = useState(false);

  useEffect(() => {
    if (!menu) return;

    const closeMenu = () => {
      setMenu(false);
    };
    document.addEventListener('click', closeMenu);
    return () => document.removeEventListener("click", closeMenu);
  }, [menu, showCreateTripModal]);

  const logoutUser = e => {
    e.preventDefault();
    dispatch(logout());
}

  return (
    <>
      <button className='profile_button' onClick={toggleMenu}>
        <img className="profile_image" src={user.profileImageUrl} alt=""/> 
        <span className='drop_down_username'>{user.username}</span>
      </button>

      {menu && (
        <ul className="profile_dropdown" onClick={() => setMenu(false)}>
          {/* <li className='profile_dropdown_navlink' id="profile_dropdown_navlink_username">{user.username}</li> */}
          <li id="profile_dropdown_navlink_username">{user.username}</li>
          <li className='dropdown_divider'></li>
          <li className='profile_dropdown_navlink'>
            <Link to={'/profile'}>
              <span className='profile_dropdown_span' id="your_trips_button">your trips</span>
            </Link>
          </li>

          <li className='profile_dropdown_navlink'> <button id="create_trip_button" onClick={()=> setShowCreateTripModal(true)}>create a trip</button></li>

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