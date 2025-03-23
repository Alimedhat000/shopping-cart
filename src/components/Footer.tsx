import { IconBaseProps } from 'react-icons';
import { FaFacebookF, FaInstagram, FaTiktok } from 'react-icons/fa';
import { IoDiamondOutline } from 'react-icons/io5';
import { MdLockOutline } from 'react-icons/md';
import { SlSocialDropbox } from 'react-icons/sl';
import { TbHeadset } from 'react-icons/tb';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function FooterCard({
  icon,
  title,
  text,
}: {
  icon: React.ReactElement<IconBaseProps>;
  title: string;
  text: string;
}) {
  return (
    <div className="flex flex-col items-center gap-3">
      {icon}
      <h3 className="mt-2 font-bold">{title}</h3>
      <p className="text-center text-sm font-light">{text}</p>
    </div>
  );
}

function FooterServices() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const cards = [
    {
      title: 'Express Shipping',
      text: 'Your order will reach you within 1-3 working days',
      icon: <SlSocialDropbox className="text-3xl" />,
    },
    {
      title: 'Premium Quality',
      text: 'Our brands are using the best fabrics',
      icon: <IoDiamondOutline className="text-3xl" />,
    },
    {
      title: 'Customer service',
      text: 'Dedicated professionals are here to help you',
      icon: <TbHeadset className="text-3xl" />,
    },
    {
      title: 'Secure payment',
      text: 'Secure payment providers process you payments',
      icon: <MdLockOutline className="text-3xl" />,
    },
  ];

  const goToSlide = (index: number) => {
    if (currentSlide !== index && !isTransitioning) {
      setIsTransitioning(true);
      setCurrentSlide(index);
    }
  };

  // Reset the transition state after animation completes
  useEffect(() => {
    if (isTransitioning) {
      const timer = setTimeout(() => {
        setIsTransitioning(false);
      }, 300); // Match this with the CSS transition duration
      return () => clearTimeout(timer);
    }
  }, [isTransitioning]);

  // Auto-rotate slides
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isTransitioning) {
        const nextSlide = (currentSlide + 1) % cards.length;
        goToSlide(nextSlide);
      }
    }, 5000); // Change slide every 5 seconds
    return () => clearInterval(interval);
  }, [currentSlide, isTransitioning, cards.length]);

  return (
    <div className="bg-gray-100 px-12 pb-20 text-black">
      {/* Desktop view */}
      <div className="hidden lg:grid lg:grid-cols-4 lg:gap-8">
        {cards.map((card) => (
          <FooterCard
            key={card.title}
            title={card.title}
            text={card.text}
            icon={card.icon}
          />
        ))}
      </div>

      {/* Mobile slider view */}
      <div className="lg:hidden">
        <div className="relative h-40 overflow-hidden">
          {cards.map((card, index) => (
            <div
              key={card.title}
              className={`absolute w-full transition-all duration-300 ease-in-out ${
                currentSlide === index
                  ? 'translate-x-0 opacity-100'
                  : currentSlide < index
                    ? 'translate-x-full opacity-0'
                    : '-translate-x-full opacity-0'
              }`}
            >
              <FooterCard
                title={card.title}
                text={card.text}
                icon={card.icon}
              />
            </div>
          ))}
        </div>

        {/* Dots */}
        <div className="mt-6 flex justify-center gap-2">
          {cards.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2 w-2 rounded-full transition-all duration-300 ${
                currentSlide === index ? 'w-4 bg-black' : 'bg-gray-300'
              }`}
              aria-label={`Go to slide ${index + 1}`}
              disabled={isTransitioning}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="bg-black text-[#f2eada]">
      {/* Top Section: Service Highlights */}
      <FooterServices />
      {/* Bottom Section: Newsletter & Links */}
      <div className="px-5 py-10 md:px-9 md:py-15 lg:px-12">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
          {/* Newsletter - Full Width on Medium Screens */}
          <div className="md:col-span-2 lg:col-end-1">
            <h3 className="text-xl font-bold">
              Sign up for personalized offers
            </h3>
            <div className="mt-4">
              <input
                type="email"
                placeholder="E-mail"
                className="w-full rounded-lg bg-gray-800 p-3 text-[#f2eada]"
              />
            </div>
          </div>

          {/* Useful Links */}
          <div>
            <h3 className="font-bold">Useful Links</h3>
            <ul className="mt-2 space-y-2">
              <li>
                <a
                  href="#"
                  className="text-[#aaa499] hover:text-[#f2eada] hover:underline"
                >
                  Frequently Asked Questions
                </a>
              </li>
              <li>
                <Link
                  to="/"
                  className="text-[#aaa499] hover:text-[#f2eada] hover:underline"
                >
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="text-[#aaa499] hover:text-[#f2eada] hover:underline"
                >
                  Refund Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="text-[#aaa499] hover:text-[#f2eada] hover:underline"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="text-[#aaa499] hover:text-[#f2eada] hover:underline"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* About */}
          <div>
            <h3 className="font-bold">About</h3>
            <p className="mt-2 text-[#aaa499]">
              Support your community's creative economy while finding
              one-of-a-kind pieces. Visit our spacious hub today!
            </p>
          </div>
        </div>

        {/* Social Media & Copyright */}
        <div className="mt-8 flex items-center justify-between border-t border-gray-700 pt-6">
          <div className="flex space-x-4">
            <a href="#">
              <FaFacebookF className="text-xl text-[#f2eada] hover:text-gray-400" />
            </a>
            <a href="#">
              <FaInstagram className="text-xl text-[#f2eada] hover:text-gray-400" />
            </a>
            <a href="#">
              <FaTiktok className="text-xl text-[#f2eada] hover:text-gray-400" />
            </a>
          </div>
          <p className="text-xs sm:text-sm">
            © 2025, Logo Ipsum. Powered by Ali
          </p>
        </div>
      </div>
    </footer>
  );
}
