import { shallow } from 'enzyme';

import Item from '../components/item';

const fakeItem = {
  id: 'fakeid',
  title: 'Something Cool',
  price: 5000,
  description: 'Something you wish you had, like a pet turtle.',
  image: 'felix.gif',
  largeImage: 'garfield.png'
};

describe('<Item />', () => {
  it('renders the image properly', () => {
    const wrapper = shallow(<Item item={fakeItem} />);
    const img = wrapper.find('img');
    expect(img.props().src).toBe(fakeItem.image);
    expect(img.props().alt).toBe(fakeItem.title);
  });

  it('renders and displays properly', () => {
    const wrapper = shallow(<Item item={fakeItem} />);

    const PriceTag = wrapper.find('PriceTag');
    expect(PriceTag.children().text()).toBe('$50');

    expect(wrapper.find('Title a').text()).toBe(fakeItem.title);
  });

  it('renders the buttons properly', () => {
    const wrapper = shallow(<Item item={fakeItem} />);
    const buttonList = wrapper.find('.buttonList');

    expect(buttonList.children()).toHaveLength(3);
    expect(buttonList.find('Link').exists()).toBe(true);
    expect(buttonList.find('AddToCart').exists()).toBe(true);
    expect(buttonList.find('DeleteItem').exists()).toBe(true);
  });
});
