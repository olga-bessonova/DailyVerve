import React, {useState} from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Modal } from '../../context/Modal';
import DropDown from '../DropDown/DropDown';
import LoginFormModal from '../SessionForms/LoginFormModal';
import SignupFormModal from '../SessionForms/SignupFormModal';
import './Navigation.css';


function Navigation () {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const currentUser = useSelector(state => state.session.user);

  const loggedIn = useSelector(state => !!state.session.user);
  const location = useLocation();
  
  const getLinks = () => {
    if (loggedIn) {
      return (

        <div className="navlinkdiv" >
          <DropDown user={currentUser} />
          <Link className="navlink"  to={'/contact'}>contact us</Link>
        </div>
      );
    } 
    else {
      return (
        <div className="navlinkdiv" >
          <button className="navlink splash_page" onClick={()=> setShowLoginModal(true)}>login</button>
          <button className="navlink splash_page" onClick={()=> setShowSignupModal(true)}>signup</button>
          <Link className="navlink splash_page"  to={'/contact'}>contact us</Link> 
        </div>
      );
    }
  }

  return (
    <>
      {location.pathname === "/" ? (
        <header className="site_header">
          <NavLink className="nav_title" exact to="/" >
            <div className = "logo-box">
              <div className="logo_name">
                {/* <img className="logo_name" src={require("../../assets/logo/logo.png")} alt=""/> */}
                <p>Daily Verve</p>
              </div>
            </div>
          </NavLink>
  
          <div className="site_header_right_side">
              { getLinks() }
          </div>
          
          {showLoginModal && (
            <Modal onClose={() => setShowLoginModal(false)}>
              <LoginFormModal showLoginModal={showLoginModal} setShowLoginModal={setShowLoginModal}/>
            </Modal>
          )}
  
          {showSignupModal && (
            <Modal onClose={() => setShowSignupModal(false)}>
              <SignupFormModal setShowSignupModal={setShowSignupModal}/>
            </Modal>
          )} 
              
              
        </header>
      ) : (
        <header className="site_header notsplash_page">
          <NavLink className="nav-title" exact to="/" >
            <div className = "logo-box">
              <div className="logo_name notsplash_page">
                {/* <img className="logo_name" src={require("../../assets/logo/logo.png")} alt=""/> */}
                <p>Daily Verve</p>
              </div>
            </div>
          </NavLink>

          <div className="site_header_right_side">
              { getLinks() }
          </div>
          
          {showLoginModal && (
            <Modal onClose={() => setShowLoginModal(false)}>
              <LoginFormModal showLoginModal={showLoginModal} setShowLoginModal={setShowLoginModal}/>
            </Modal>
          )}

          {showSignupModal && (
            <Modal onClose={() => setShowSignupModal(false)}>
              <SignupFormModal setShowSignupModal={setShowSignupModal}/>
            </Modal>
          )}

       </header>
      )}
    </>
  );
}

export default Navigation;
