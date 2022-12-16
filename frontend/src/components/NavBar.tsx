import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Button from './Button';
import MenuDropdown from './MenuDropdown';

interface INavBarProps {
  currentRoute?: string;
  onSignInPress?: () => void;
  onSignUpPress?: () => void;
  onSignOutPress?: () => any;
  isLoggedIn: boolean;
}

const teamsDropdownOptions = [
  {
    to: '/teams/own',
    label: 'My teams'
  },
  {
    to: '/teams/create',
    label: 'Create a new Team'
  }
];

const NavBar = (props: INavBarProps) => {
  const location = useLocation();
  console.log(location.pathname);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  const notLoggedIn = !props.isLoggedIn;

  const menuItemClass = (pathStart: string) => {
    const currPathStart = location.pathname.split('/')[1];
    return `block py-2 pr-4 pl-3 p-0 border-gray-100  border-0 hover:text-blue-700 hover:underline inline-flex items-center ${
      currPathStart === pathStart ? 'text-blue-700' : ''
    }`;
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  return (
    <header>
      <nav className=" bg-white border border-gray py-2.5 rounded dark:bg-gray-800">
        <div className="container flex flex-wrap justify-between items-center mx-auto">
          <Link to="/" className="bg-red flex items-center">
            <span className="text-xl font-semibold dark:text-white">
              Team App
            </span>
          </Link>
          <button
            onClick={toggleMobileMenu}
            data-collapse-toggle="mobile-menu"
            type="button"
            className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="mobile-menu"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              ></path>
            </svg>
            <svg
              className={`${mobileMenuOpen ? '' : 'hidden'} w-6 h-6`}
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
          <div
            className={`${
              mobileMenuOpen ? '' : 'hidden'
            } w-full md:block md:w-auto`}
            id="mobile-menu"
          >
            <ul className="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
              <li>
                <Link to="/" className={menuItemClass('')} aria-current="page">
                  Home
                </Link>
              </li>
              {props.isLoggedIn && (
                <li>
                  <MenuDropdown
                    togglerLabel="Teams"
                    toggleClassName={menuItemClass('teams')}
                    menuOptions={teamsDropdownOptions}
                  />
                </li>
              )}
              {props.isLoggedIn && (
                <li>
                  <Link
                    to="/my-events"
                    className={menuItemClass('my-events')}
                    aria-current="page"
                  >
                    My events
                  </Link>
                </li>
              )}
              <li>
                <Link
                  to="/about"
                  className={menuItemClass('about')}
                  aria-current="page"
                >
                  About
                </Link>
              </li>
              {notLoggedIn ? (
                <div className="flex">
                  <li>
                    <button
                      onClick={props.onSignInPress}
                      className={`${menuItemClass('l')} animate-pulse`}
                      type="button"
                    >
                      Log In
                    </button>
                  </li>
                  <li>
                    <Button onClick={props.onSignUpPress} color="green">
                      Sign Up
                    </Button>
                  </li>
                </div>
              ) : (
                <li>
                  <button
                    onClick={props.onSignOutPress}
                    className={`${menuItemClass('s')}`}
                    type="button"
                  >
                    {' '}
                    Sign out
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
