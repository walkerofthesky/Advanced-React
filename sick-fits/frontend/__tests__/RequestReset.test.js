import { mount } from 'enzyme';
import wait from 'waait';
import { MockedProvider } from 'react-apollo/test-utils';
import toJson from 'enzyme-to-json';

import RequestReset, {
  REQUEST_RESET_MUTATION
} from '../components/RequestReset';

const mocks = [
  {
    request: {
      query: REQUEST_RESET_MUTATION,
      variables: { email: 'adustinparker@gmail.com' }
    },
    result: {
      data: {
        requestReset: { message: 'success', __typename: 'Message' }
      }
    }
  }
];

describe('<RequestReset />', () => {
  it('renders and matches snapshot', () => {
    const wrapper = mount(
      <MockedProvider>
        <RequestReset />
      </MockedProvider>
    );
    const form = wrapper.find('[data-test="form"]');
    expect(toJson(form)).toMatchSnapshot();
  });

  it('calls the mutation', async () => {
    const wrapper = mount(
      <MockedProvider mocks={mocks}>
        <RequestReset />
      </MockedProvider>
    );
    // simulate typing in input
    wrapper.find('input').simulate('change', {
      target: {
        name: 'email',
        value: 'adustinparker@gmail.com'
      }
    });
    // submit the form
    wrapper.find('form').simulate('submit');
    await wait();
    wrapper.update();
    expect(wrapper.find('p').text()).toContain(
      'Success! Check you email for a reset link!'
    );
  });
});
