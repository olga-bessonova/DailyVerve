import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Switch, Route } from 'react-router-dom';

import { AuthRoute, ProtectedRoute } from './components/Routes/Routes';
// import NavBar from './components/NavBar/NavBar';
import Navigation from './components/Navigation/Navigation';
import ContactUs from './components/ContactUs/ContactUs';
import Message from './components/Message/Message';

import MainPage from './components/MainPage/MainPage';
import LoginForm from './components/SessionForms/LoginForm';
import SignupForm from './components/SessionForms/SignupForm';

import LoginFormModal from './components/SessionForms/LoginFormModal';
import SignupFormModal from './components/SessionForms/SignupFormModal';
import Tweets from './components/Tweets/Tweets';
import Profile from './components/Profile/Profile';
import TweetCompose from './components/Tweets/TweetCompose';

import { getCurrentUser } from './store/session';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCurrentUser()).then(() => setLoaded(true));
  }, [dispatch]);

  return (
    loaded && (
      <>
        {/* <NavBar /> */}
        <Navigation />
        <Switch>
          <Route exact path="/contact"><ContactUs /></Route>
          <AuthRoute exact path='/' component={MainPage} />
          <AuthRoute exact path='/login' component={LoginForm} />
          <AuthRoute exact path='/signup' component={SignupForm} />

          <ProtectedRoute exact path='/tweets' component={Tweets} />
          <ProtectedRoute exact path='/profile' component={Profile} />
          <ProtectedRoute exact path='/tweets/new' component={TweetCompose} />

          <ProtectedRoute exact path='/messages' component={Message} />

        </Switch>
      </>
    )
  );
}

export default App;
