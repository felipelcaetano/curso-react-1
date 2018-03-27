import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import AutorBox from './Autor';
import LivroBox from './Livro';
import Home from './Home';
import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';

ReactDOM.render(
    //React.createElement(App), //Forma de se fazer sem JSX
    (<Router>
      <App>
        <Switch path="/" component={App} >
          {/* Switch garante que apenas uma das rotas sera acionada */}
          {/* utilizada para resolver rotas padrao, quando nenhum outra for indicada */}
          <Route exact path="/" component={Home} />
          <Route path="/autores" component={AutorBox} />
          <Route path="/livros" component={LivroBox} />
        </Switch>
      </App>
    </Router>),
    document.getElementById('root')
);

registerServiceWorker();
