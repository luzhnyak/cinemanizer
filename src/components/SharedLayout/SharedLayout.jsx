import AppBar from 'components/AppBar/AppBar';
// import Footer from 'components/Footer/Footer';
import { Loader } from 'components/Loader/Loader';
import { Suspense } from 'react';
import { Toaster } from 'react-hot-toast';
import { Outlet } from 'react-router-dom/dist';

export const SharedLayout = () => {
  return (
    <div>
      <AppBar />
      <div className="container">
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </div>
      <Toaster position="top-right" />
      {/* <Footer /> */}
    </div>
  );
};
