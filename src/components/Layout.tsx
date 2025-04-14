import { Outlet } from 'react-router-dom';
import NavBar from '@components/NavBar';
import Footer from '@components/Footer';

export default function Layout() {
  return (
    <div className="bg-main-bg">
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
}
