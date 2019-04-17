import React from 'react';
import TestRenderer from 'react-test-renderer';
import ESButton from "../Button";

it('renders correctly', () => {
  const component = <ESButton>Button</ESButton>;

  const tree = TestRenderer.create(component).toJSON();
  expect(tree).toMatchSnapshot();
});
