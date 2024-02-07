import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Switch, Route } from 'react-router-dom';

import { AuthRoute, ProtectedRoute } from './components/Routes/Routes';
// import NavBar from './components/NavBar/NavBar';
import Navigation from './components/Navigation/Navigation';
import ContactUs from './components/ContactUs/ContactUs';
import Message from './components/Message/Message';

import MainPage from './components/MainPage/MainPage';

import Profile from './components/Profile/Profile';

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

          <ProtectedRoute exact path='/profile' component={Profile} />
          <ProtectedRoute exact path='/messages' component={Message} />

        </Switch>
      </>
    )
  );
}

export default App;
