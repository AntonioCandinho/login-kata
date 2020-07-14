import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { RouterApplication } from './apps/router/RouterApplication';

const Router = RouterApplication.createDefault().getRouterComponent();

ReactDOM.render(<Router />, document.getElementById('app'));
