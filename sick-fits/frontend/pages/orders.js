import React from 'react';
import Orders from '../components/Orders';
import PleaseSignIn from '../components/PleaseSignIn';

const OrdersPage = props => (
  <div>
    <PleaseSignIn>
      <Orders />
    </PleaseSignIn>
  </div>
);

export default OrdersPage;
