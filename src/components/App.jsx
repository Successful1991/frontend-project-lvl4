import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { Navbar, Nav, Button } from 'react-bootstrap';
import {
  BrowserRouter as Router,
  Link,
  Routes,
  Route,
  Navigate,
  useLocation,
} from 'react-router-dom';
import routes from '../routes';
import { authContext } from '../contexts/index';
import useAuth from '../hooks';
import Login from './Login';
import NotFound from './NotFound';
import Chat from './Chat';
import Signup from './Signup';
import ModalRoot from './modal/RootModal';

const getCurrentUser = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  return user ?? null;
};

const AuthProvider = ({ children }) => {
  const user = getCurrentUser();
  const [loggedIn, setLoggedIn] = useState(Boolean(user?.token));

  const getHeader = () => {
    if (user?.token) {
      return {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
    }
    return {};
  };
  const logIn = (newUser) => {
    localStorage.setItem('user', JSON.stringify(newUser));
    setLoggedIn(true);
  };
  const logOut = () => {
    localStorage.removeItem('user');
    setLoggedIn(false);
  };
  return (
    <authContext.Provider
      value={{
        loggedIn,
        logIn,
        logOut,
        user,
        getHeader,
      }}
    >
      {children}
    </authContext.Provider>
  );
};

const AuthButton = () => {
  const { t } = useTranslation();
  const auth = useAuth();

  return auth.loggedIn && <Button onClick={auth.logOut}>{ t('buttons.logOut') }</Button>;
};

const PrivateRoute = ({ children, redirectTo }) => {
  const auth = useAuth();
  const location = useLocation();

  return auth.loggedIn ? children : <Navigate to={redirectTo} state={location} />;
};

const App = () => {
  const { t } = useTranslation();
  const { isShowing } = useSelector((state) => state.modal);

  return (
    <AuthProvider>
      <Router>
        <div className="h-100 d-flex flex-column">
          <Navbar className="w-100 shadow-sm px-3">
            <Nav className="me-auto">
              <Nav.Link as={Link} to={routes.homePage()}>{t('links.home')}</Nav.Link>
            </Nav>
            <AuthButton />
          </Navbar>
          <div className="h-100 my-4 py-4 overflow-hidden" aria-hidden={isShowing}>
            <Routes>
              <Route
                path={routes.homePage()}
                element={(
                  <PrivateRoute redirectTo={routes.loginPage()}>
                    <Chat />
                  </PrivateRoute>
                )}
              />
              <Route path={routes.loginPage()} element={<Login />} />
              <Route path={routes.signUpPage()} element={<Signup />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
          <ModalRoot />
        </div>
      </Router>
      <ToastContainer draggable={false} />
    </AuthProvider>
  );
};

export default App;
