import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LuSearch, LuShoppingBag, LuUserRound } from 'react-icons/lu';
import logo from '@/assets/logo.svg';
import ButtonWithIconGroup from '@components/NavBar/ButtonGroup';
import DropDownGroup from '@components/NavBar/DropDownGroup';
import AnnouncementBar from '@components/NavBar/AnnouncementBar';
import {
  AnnouncementBarProps,
  ButtonGroupProps,
} from '@components/NavBar/types';
import { useCart } from '@/util/CartProvider';

export default function NavBar() {
  const [scrollY, setScrollY] = useState(0);
  const [showNav, setShowNav] = useState(true); // Initially show the navbar
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const { itemCount } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Show navbar when scrolling up, hide when scrolling down
      if (currentScrollY < scrollY) {
        setShowNav(true); // Show navbar when scrolling up
      } else if (currentScrollY > scrollY && currentScrollY > 150) {
        setShowNav(false); // Hide navbar when scrolling down past 150px
      }
      // Update scrollY state
      setScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrollY]);

  const buttongroup: ButtonGroupProps = {
    buttons: [
      { icon: LuSearch, size: 22, onClick: () => {}, color: '#fff' },
      { icon: LuUserRound, size: 22, onClick: () => {}, color: '#fff' },
      {
        icon: LuShoppingBag,
        size: 22,
        onClick: () => {},
        color: '#fff',
        to: '/cart',
        count: itemCount,
      },
    ],
    className: '',
  };

  const announcementbar: AnnouncementBarProps = {
    items: [
      { text: 'END OF SEASON SALE', link: '/' },
      { text: 'LIMITED TIME OFFER', link: '/' },
      { text: 'NEW ARRIVALS AVAILABLE', link: '/' },
      { text: 'HUGE DISCOUNTS', link: '/' },
    ],
    speed: 80,
    direction: 'left',
  };

  return (
    <div
      className={`${!isHomePage ? 'sticky' : 'fixed'} top-0 left-0 z-50 w-full transition-transform duration-300`}
    >
      {/* Announcement Bar */}
      <div
        className="overflow-hidden transition-all duration-300"
        style={{
          opacity: scrollY > 50 || !isHomePage ? 0 : 1,
          height: scrollY > 50 || !isHomePage ? 0 : '40px',
        }}
      >
        <AnnouncementBar {...announcementbar} />
      </div>

      {/* Main Navbar */}
      <div
        className={`site-padding relative flex items-center justify-between py-10 transition-all duration-300`}
        style={{
          opacity: showNav ? 1 : 0,
          background: !isHomePage || scrollY > 50 ? '#000' : 'transparent',
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
