import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { LoginServiceLocatorBuilder } from './servicelocators/LoginServiceLocatorBuilder';
import { Router } from './presenters/Router';

const loginServiceLocator = LoginServiceLocatorBuilder.of().build();

ReactDOM.render(
  <Router loginServiceLocator={loginServiceLocator} />,
  document.getElementById('app')
);
