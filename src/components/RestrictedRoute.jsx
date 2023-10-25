import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

/**
 * - If the route is restricted and the user is logged in, render a <Navigate> to redirectTo
 * - Otherwise render the component
 */

export const RestrictedRoute = ({ component: Component, redirectTo = '/' }) => {
  const { email } = useSelector(state => state.user);
  const shouldRedirect = !!email;

  return shouldRedirect ? <Navigate to={redirectTo} /> : Component;
};
