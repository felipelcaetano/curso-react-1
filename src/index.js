import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import AutorBox from './Autor';
import Home from './Home';
import registerServiceWorker from './registerServiceWorker';
import {Router, Route, browserHistory, IndexRoute} from 'react-router';

ReactDOM.render(
    //React.createElement(App), //Forma de se fazer sem JSX
    //<App />,
    (<Router history={browserHistory}>
      <div>
        <Route path="/" component={App} >
          {/* utilizada para resolver rotas padrao, quando nenhum outra for indicada */}
          <IndexRoute component={Home} />
          <Route path="/autor" component={AutorBox} />
          <Route path="/livro" component={App} />
        </Route>
      </div>
    </Router>),
    document.getElementById('root')
);

registerServiceWorker();
