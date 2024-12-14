'use client';

import Link from "next/link";
import UserIcon from './UserIcon';
import * as React from "react";
import styles from './Nav.module.css';
import { auth0 } from "@/lib/auth0";

const Mainscreen = React.lazy(() => import("@/app/mainscreen"));

interface SpartanScreen {
  name: string;
  component: React.LazyExoticComponent<React.FC>; 
  path: string;
}

const screens: SpartanScreen[] = [
  { name: 'Addon 1', component: Mainscreen, path: '/addon1' },
];

interface NavProps {
  setCurrentScreen: (screen: React.LazyExoticComponent<() => JSX.Element>) => void;
}

const Nav: React.FC<NavProps> = ({ setCurrentScreen }) => {
  const session = auth0.getSession();

  return (
    <nav className={styles.navbar}>
      <div className="navbar">
        Nav

        {screens.length > 0 ? (
          <div className="navbar-nav">
            {screens.map((screenlist) => (
              <div
                key={screenlist.name}
                className={screenlist.name + " nav-link"}
                onClick={() => setCurrentScreen(screenlist.component)}
              >
                {screenlist.name}
              </div>
            ))}
          </div>
        ) : (
          <p>Error screen</p>
        )}

        <a href="/auth/login">Login</a>
      </div>
      <div className={styles.UserIcon}>
        <UserIcon />
      </div>
    </nav>
  );
};

export default Nav;