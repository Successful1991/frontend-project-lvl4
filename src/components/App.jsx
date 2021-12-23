import React, {Suspense, useState} from 'react';
import {
  BrowserRouter as Router,
  Link,
  Routes,
  Route,
  Navigate,
  useLocation
} from 'react-router-dom';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { authContext } from '../contexts/index';
import useAuth from '../hooks';
import Login from './Login';
import NotFound from './NotFound';
import Chat from './Chat';
import ServiceProvider from './Service';
import Signup from './Signup';
import Rollbar from './rollbar';
import { useTranslation } from 'react-i18next';


const getCurrentUser = () => {
  const userId = JSON.parse(localStorage.getItem('userId'));

  return userId ?? null;
};


const AuthProvider = ({ children }) => {
  const currentUser = getCurrentUser();
  const [loggedIn, setLoggedIn] = useState((currentUser && currentUser.token));
  const [user, setUser] = useState(currentUser);

  const logIn = () => {
    const currentUser = getCurrentUser();
    setUser(currentUser);
    setLoggedIn(true)
  };
  const logOut = () => {
    localStorage.removeItem('userId');
    setUser(null);
    setLoggedIn(false);
  };
  return <authContext.Provider value={{loggedIn, logIn, logOut, user, setUser}}>{children}</authContext.Provider>
};


const PrivateRoute = ({ children, redirectTo }) => {
  const auth = useAuth();
  const location = useLocation();

  return auth.loggedIn ? children : <Navigate to={redirectTo} state={location}/>;
};


const AuthButton = () => {
  const { t } = useTranslation();
  const auth = useAuth();

  return auth.loggedIn
    ? <Button onClick={auth.logOut}>{ t('buttons.logOut') }</Button>
    : <Button as={Link} to='/login' >{ t('buttons.logIn') }</Button>;
};


const SignUpButton = () => {
  const { t } = useTranslation();
  const auth = useAuth();

  return auth.loggedIn
    ? null
    : <Button className='me-2' as={Link} to='/signup'>{ t('buttons.signUp') }</Button>;
};

const App = () => {
  const { t } = useTranslation();
  return <Suspense fallback="Loading...">
    <Rollbar>
    <AuthProvider>
    <Router>
      <div className='h-100 d-flex flex-column'>
        <Navbar className="w-100 shadow-sm px-3">
          <Nav className='me-auto'>
            <Nav.Link as={Link} to='/'>{ t('links.home') }</Nav.Link>
          </Nav>
          <SignUpButton />
          <AuthButton />
        </Navbar>
        <div className='h-100 my-4 py-4 overflow-hidden'>
          <Routes>
            <Route path='/' element={
              <PrivateRoute redirectTo='/login'>
                <ServiceProvider>
                  <Chat />
                </ServiceProvider>
              </PrivateRoute>
            } />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </Router>
    </AuthProvider>
    </Rollbar>
  </Suspense>;
};

export default App;
