import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import RouterComponent from './route';
import registerServiceWorker from './registerServiceWorker';


ReactDOM.render(<RouterComponent/>, document.getElementById('root'));
registerServiceWorker();
