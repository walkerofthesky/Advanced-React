import { mount } from 'enzyme';
import wait from 'waait';
import { MockedProvider } from 'react-apollo/test-utils';
import toJson from 'enzyme-to-json';
import Router from 'next/router';

import Order, { SINGLE_ORDER_QUERY } from '../components/Order';
import { CURRENT_USER_QUERY } from '../components/User';
import { fakeOrder } from '../lib/testUtils';

const mocks = [
  {
    request: { query: SINGLE_ORDER_QUERY, variables: { id: 'ord123' } },
    result: {
      data: {
        order: fakeOrder()
      }
    }
  }
];

describe('<Order />', () => {
  it('renders and matches snapshot', async () => {
    const wrapper = mount(
      <MockedProvider mocks={mocks}>
        <Order id="ord123" />
      </MockedProvider>
    );
    await wait();
    wrapper.update();
    const order = wrapper.find('[data-test="order"]');
    expect(toJson(order)).toMatchSnapshot();
  });
});
