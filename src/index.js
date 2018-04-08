import React from 'react';
import ReactDOM from 'react-dom';
import Popular from './components/Popular';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Popular items_page="6" />, document.getElementById('root'));
registerServiceWorker();
