import { Link, useMatch, useResolvedPath } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../contexts/UserProvider';

interface CustomLinkProps {
  to: string;
  children: React.ReactNode;
}

const CustomLink: React.FC<CustomLinkProps> = ({ to, children, ...props }) => {
  const resolvedPath = useResolvedPath(to);
  // used to determine if the site url matches the passed in url
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });

  return (
    <li className={isActive ? 'active' : ''}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  );
};

const Navbar: React.FC = () => {
  const { user, setUser } = useContext(AuthContext);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUsername = localStorage.getItem('username');
    if (storedToken && storedUsername) {
      setUser({ token: storedToken, username: storedUsername, loggedIn: true });
    }
  }, [setUser]);
  
  
  return (
    <nav className="nav">
      <Link to="/" className="site-title">
        AI Chat Hub
      </Link>
      <ul>
        <CustomLink to="/">Home</CustomLink>
        {user.token || localStorage.getItem('token') ? (
          <>
            <CustomLink to="/userpage">User Page</CustomLink>
            <CustomLink to="/logout">Logout</CustomLink>
          </>
        ) : (
          <>
            <CustomLink to="/register">Register</CustomLink>
            <CustomLink to="/signin">Sign In</CustomLink>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;