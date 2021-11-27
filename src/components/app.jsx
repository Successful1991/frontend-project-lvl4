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

const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);

  const logIn = () => {
    setLoggedIn(true)
  };
  const logOut = () => {
    localStorage.removeItem('userId');
    setLoggedIn(false);
  };
  return <authContext.Provider value={{loggedIn, logIn, logOut}}>{children}</authContext.Provider>
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
    <div className='col-12 h-100 d-flex flex-column'>
      <Navbar>
        <Nav className='mr-auto'>
          <Nav.Link as={Link} to='/'>Home</Nav.Link>
        </Nav>
        <AuthButton />
      </Navbar>
      <div className='container h-100'>
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
