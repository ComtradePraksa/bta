import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import setAuthToken from './utils/setAuthToken';

//set auth token on page reload
// setAuthToken(localStorage.jwtoken);

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();