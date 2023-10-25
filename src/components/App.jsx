import { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';

import { SharedLayout } from './SharedLayout/SharedLayout';
import LoginPage from 'pages/LoginPage';
import RegisterPage from 'pages/RegisterPage';
import { RestrictedRoute } from './RestrictedRoute';
import Videos from './Videos/Videos';
import PersonDetailsPage from 'pages/PersonDetailsPage';
import PeoplesPage from 'pages/PeoplesPage';
import PersonCast from './Cast/PersonCast';

const Home = lazy(() => import('pages/HomePage'));
const Movies = lazy(() => import('pages/MoviesPage'));
const MovieDetails = lazy(() => import('pages/MovieDetailsPage'));
const NotFound = lazy(() => import('pages/NotFoundPage'));
const Cast = lazy(() => import('./Cast/Cast'));
const Reviews = lazy(() => import('./Reviews/Reviews'));

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<SharedLayout />}>
        <Route index element={<Home />} />
        <Route path="movies" element={<Movies />} />
        <Route path="movies/:movieId" element={<MovieDetails />}>
          <Route path="cast" element={<Cast />} />
          <Route path="reviews" element={<Reviews />} />
          <Route path="videos" element={<Videos />} />
        </Route>
        <Route path="people" element={<PeoplesPage />} />
        <Route path="people/:personId" element={<PersonDetailsPage />}>
          <Route path="cast" element={<PersonCast />} />
        </Route>
        <Route
          path="login"
          element={<RestrictedRoute redirectTo="/" component={<LoginPage />} />}
        />
        <Route
          path="register"
          element={
            <RestrictedRoute redirectTo="/" component={<RegisterPage />} />
          }
        />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};
