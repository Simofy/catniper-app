import 'react-native';
import React from 'react';
import { GridItem } from '../GridItem';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer.create(<GridItem style = {{width:800, height:600}} />).toJSON();
  expect(tree).toMatchSnapshot();
});
