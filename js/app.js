import 'babel-polyfill';
import App from './components/App';
import React from 'react';
import ReactDOM from 'react-dom';
import Relay from 'react-relay/classic';

import AppHomeRoute from './routes/AppHomeRoute';


ReactDOM.render(
  <Relay.Renderer
    environment={Relay.Store}
    Container={App}
    queryConfig={new AppHomeRoute()}
  />,
  document.getElementById('root')
);
