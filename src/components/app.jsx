import React, {useState} from 'react';
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
import Login from './login';
import NotFound from '../NotFound';
import Chat from './chat';
import ServiceProvider from './Service';

const getCurrentUser = () => {
  const userId = JSON.parse(localStorage.getItem('userId'));

  return userId ?? null;
};

const AuthProvider = ({ children }) => {
  const currentUser = getCurrentUser();
  const [loggedIn, setLoggedIn] = useState((currentUser && currentUser.token));
  const [user, setUser] = useState(currentUser);

  const logIn = () => {
    setLoggedIn(true)
  };
  const logOut = () => {
    localStorage.removeItem('userId');
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
  const auth = useAuth();

  return auth.loggedIn
    ? <Button onClick={auth.logOut}>LogOut</Button>
    : <Button as={Link} to='/login' >LogIn</Button>;
};


const App = () => (
<AuthProvider>
  <Router>
    <div className='h-100 d-flex flex-column'>
      <Navbar className="w-100 shadow-sm">
        <Nav className='mr-auto'>
          <Nav.Link as={Link} to='/'>Home</Nav.Link>
        </Nav>
        <AuthButton />
      </Navbar>
      <div className='h-100 my-4 overflow-hidden'>
        <Routes>
          <Route path='/' element={
            <PrivateRoute redirectTo='/login'>
              <ServiceProvider>
                <Chat />
              </ServiceProvider>
            </PrivateRoute>
          } />
          <Route path='/login' element={<Login />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </div>
    </div>
  </Router>
</AuthProvider>);

export default App;
