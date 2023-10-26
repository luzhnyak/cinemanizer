import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { FaFilm } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { setUser } from 'redux/userSlice';
import { getDatabase, onValue, ref } from 'firebase/database';
// import { getAuth } from 'firebase/auth';
import { addMovie, loadMovies } from 'redux/watchlistSlice';
import { useEffect } from 'react';

const AppBar = () => {
  const dispatch = useDispatch();
  const { email, name, id } = useSelector(state => state.user);
  const watchlist = useSelector(state => state.watchlist.movies);

  useEffect(() => {
    if (!id || watchlist.length !== 0) return;

    const readUserData = () => {
      const db = getDatabase();
      // const auth = getAuth();
      // const userId = auth.currentUser.uid;

      // console.log('user', auth.currentUser);

      const starCountRef = ref(db, 'users/' + id);

      onValue(starCountRef, snapshot => {
        const data = snapshot.val();
        if (!data) return;
        console.log(data);
        dispatch(loadMovies(data.movies));

        // console.log('read', data);

        // updateStarCount(postElement, data);
      });
      // console.log('read end');
    };

    readUserData();
  }, [dispatch]);

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
      className="bg-body-tertiary mb-3"
      bg="dark"
      data-bs-theme="dark"
    >
      <Container>
        <Navbar.Brand as={NavLink} to="">
          <FaFilm className="d-inline-block align-text-top mt-1 mr-2" />
          <span> Filmoteka</span>
        </Navbar.Brand>
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
                <NavDropdown title={name} id="collapsible-nav-dropdown">
                  <NavDropdown.Item href="">My profile</NavDropdown.Item>

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
