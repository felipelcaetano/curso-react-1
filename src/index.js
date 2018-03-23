import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    //React.createElement(App), //Forma de se fazer sem JSX
    <App />, document.getElementById('root')
);

registerServiceWorker();
