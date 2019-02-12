import React, { Fragment } from 'react';
import Link from 'next/link';
import NavStyes from './styles/NavStyles';
import User from './User';

const Nav = () => (
  <User>
    {({ data: { me } }) => (
      <NavStyes>
        <Link href="/items">
          <a>Shop</a>
        </Link>
        {me && (
          <Fragment>
            <Link href="/sell">
              <a>Sell</a>
            </Link>
            <Link href="/orders">
              <a>Orders</a>
            </Link>
            <Link href="/me">
              <a>Account</a>
            </Link>
          </Fragment>
        )}
        {!me && (
          <Link href="/signup">
            <a>Sign In</a>
          </Link>
        )}
      </NavStyes>
    )}
  </User>
);

export default Nav;
