import React, {useState} from 'react';
import {
  BrowserRouter as Router,
  Link,
  Routes,
  Route,
  Navigate,
  useLocation
} from 'react-router-dom';
import routes from '../routes';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { authContext } from '../contexts/index';
import useAuth from '../hooks';
import Login from './Login';
import NotFound from './NotFound';
import Chat from './Chat';
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

  const setUserId = userId => {
    localStorage.setItem('userId', JSON.stringify(userId));
  };
  const removeUserId = () => {
    localStorage.removeItem('userId');
  };

  const logIn = () => {
    const currentUser = getCurrentUser();
    setUser(currentUser);
    setLoggedIn(true)
  };
  const logOut = () => {
    removeUserId();
    setUser(null);
    setLoggedIn(false);
  };
  return <authContext.Provider value={{loggedIn, logIn, logOut, setUserId, user, setUser}}>{children}</authContext.Provider>
};

const AuthButton = () => {
  const { t } = useTranslation();
  const auth = useAuth();

  return auth.loggedIn && <Button onClick={auth.logOut}>{ t('buttons.logOut') }</Button>;
};

const PrivateRoute = ({ children, redirectTo }) => {
  const auth = useAuth();
  const location = useLocation();

  return auth.loggedIn ? children : <Navigate to={redirectTo} state={location}/>;
};

const App = () => {
  const { t } = useTranslation();
  return <Rollbar>
    <AuthProvider>
    <Router>
      <div className='h-100 d-flex flex-column'>
        <Navbar className="w-100 shadow-sm px-3">
          <Nav className='me-auto'>
            <Nav.Link as={Link} to={routes.homePage()} >{ t('links.home') }</Nav.Link>
          </Nav>
          <AuthButton />
        </Navbar>
        <div className='h-100 my-4 py-4 overflow-hidden'>
          <Routes>
            <Route path={routes.homePage()} element={
              <PrivateRoute redirectTo={routes.loginPage()}>
                  <Chat />
              </PrivateRoute>
            } />
            <Route path={routes.loginPage()} element={<Login />} />
            <Route path={routes.signUpPage()} element={<Signup />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </Router>
    </AuthProvider>
    </Rollbar>;
};

export default App;
