import { shallow } from 'enzyme';
import * as React from 'react';
import { App } from '../../../src/app/App';

describe('tests/unit/index.tsx', () => {
  it('Should say hello world', () => {
    const component = shallow(<App />);
    expect(component.text()).toEqual('Hello World!');
  });
});
