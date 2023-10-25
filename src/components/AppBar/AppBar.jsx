import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { setUser } from 'redux/userSlice';

const AppBar = () => {
  const dispatch = useDispatch();
  const { email } = useSelector(state => state.user);

  const hahdleLogout = () => {
    dispatch(
      setUser({
        id: null,
        email: null,
        token: null,
      })
    );
  };

  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      className="bg-body-tertiary"
      bg="dark"
      data-bs-theme="dark"
    >
      <Container>
        <Navbar.Brand href="#home">Filmoteka</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="">
              Home
            </Nav.Link>
            <Nav.Link as={NavLink} to="movies">
              Movies
            </Nav.Link>
          </Nav>

          <Nav>
            {!email && (
              <>
                <Nav.Link as={NavLink} to="login">
                  Login
                </Nav.Link>
                <Nav.Link as={NavLink} to="register">
                  Register
                </Nav.Link>
              </>
            )}
            {email && (
              <>
                <Nav.Link as={NavLink} to="watchlist">
                  Watchlist
                </Nav.Link>
                <NavDropdown title={email} id="collapsible-nav-dropdown">
                  <NavDropdown.Item href="">My List</NavDropdown.Item>

                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={hahdleLogout} as="button">
                    LogOut
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppBar;
