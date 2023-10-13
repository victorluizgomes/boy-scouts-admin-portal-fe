import React from 'react';
import { NavLink } from 'react-router-dom';

const Navigation: React.FC = () => {
  return (
    <nav className="flex justify-center items-center bg-neutral-100 gap-5">
      <NavLink
        to="/"
        exact
        className="text-neutral-500 text-lg p-4 hover:underline"
        activeClassName="font-bold text-neutral-900 hover:no-underline"
      >
        Home
      </NavLink>
      <NavLink
        to="/alert"
        className="text-neutral-500 text-lg p-4 hover:underline"
        activeClassName="font-bold text-neutral-900 hover:no-underline"
      >
        Alert
      </NavLink>
      <NavLink
        to="/camp-description"
        className="text-neutral-500 text-lg p-4 hover:underline"
        activeClassName="font-bold text-neutral-900 hover:no-underline"
      >
        Camp Description
      </NavLink>
    </nav>
  );
};

export default Navigation;