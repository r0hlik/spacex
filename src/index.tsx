import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'urql';

import 'antd/dist/antd.css';
import { client } from './graphql'
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <Provider value={client}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);