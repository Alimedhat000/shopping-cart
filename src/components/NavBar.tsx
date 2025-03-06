import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { LuSearch, LuShoppingCart, LuUserRound } from 'react-icons/lu';
import logo from '../assets/logo.svg';
import ButtonWithIconGroup from './NavBar/ButtonGroup';
import DropDownGroup from './NavBar/DropDownGroup';
import AnouncementBar from './NavBar/AnouncementBar';
import { AnnouncementBarProps, ButtonGroupProps } from './NavBar/types';

export default function NavBar() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const buttongroup: ButtonGroupProps = {
    buttons: [
      { icon: LuUserRound, size: 22, onClick: () => {}, color: '#fff' },
      { icon: LuSearch, size: 22, onClick: () => {}, color: '#fff' },
      { icon: LuShoppingCart, size: 22, onClick: () => {}, color: '#fff' },
    ],
    className: '',
  };

  const anouncmentbar: AnnouncementBarProps = {
    items: [
      { text: 'END OF SEASON SALE', link: '/' },
      { text: 'LIMITED TIME OFFER', link: '/' },
      { text: 'NEW ARRIVALS AVAILABLE', link: '/' },
    ],
    speed: 80,
    direction: 'left',
  };

  return (
    <div
      className={`fixed top-0 left-0 z-50 w-full transition-transform duration-300 ${
        scrollY > 150 ? '-translate-y-full' : 'translate-y-0'
      }`}
    >
      {/* Announcement Bar */}
      <div
        className="overflow-hidden transition-all duration-300"
        style={{
          opacity: scrollY > 50 ? 0 : 1,
          height: scrollY > 50 ? 0 : '40px',
        }}
      >
        <AnouncementBar {...anouncmentbar} />
      </div>

      {/* Main Navbar */}
      <div
        className={`relative flex items-center justify-between px-5 py-10 transition-all duration-300 md:px-22`}
        style={{
          opacity: scrollY > 150 ? 0 : 1,
          background: scrollY > 50 ? '#000' : 0,
        }}
      >
        {/* Left side menu */}
        <div className="">
          <DropDownGroup color={'#fff'} />
        </div>

        {/* Centered Logo */}
        <div className="absolute left-1/2 -translate-x-1/2 transform">
          <Link to="/">
            <img src={logo} className="w-35" alt="Logo" />
          </Link>
        </div>

        {/* Right side buttons */}
        <div className="">
          <ButtonWithIconGroup {...buttongroup} />
        </div>
      </div>
    </div>
  );
}
