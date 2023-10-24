import AppBar from 'components/AppBar/AppBar';
import { Header } from 'components/Header/Header';
import { Loader } from 'components/Loader/Loader';
import { Suspense } from 'react';
import { Outlet } from 'react-router-dom/dist';

export const SharedLayout = () => {
  return (
    <div>
      <Header />
      <AppBar />
      <div className="container">
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </div>
    </div>
  );
};
