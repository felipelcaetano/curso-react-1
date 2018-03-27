import React, { Component } from 'react';
import './css/pure-min.css';
import './css/side-menu.css';
import {Link} from 'react-router';

class App extends Component {

	render() {
		return (

			<div id="layout">
				{ /*Menu toggle*/ }
				<a href="#menu" id="menuLink" className="menu-link">
					{ /* Hamburger icon */}
					<span></span>
				</a>

				<div id="menu">
						<div className="pure-menu">
								<a className="pure-menu-heading" href="#">Company</a>

								<ul className="pure-menu-list">
							{/* Utilizar Link ao inves de a para trabalhar com o react router */}
										<li className="pure-menu-item"><Link to="#"
										className="pure-menu-link">Home</Link></li>
										<li className="pure-menu-item"><Link to="/autor"
										className="pure-menu-link">Autor</Link></li>
										<li className="pure-menu-item"><Link to="/livros"
										className="pure-menu-link">Livro</Link></li>
								</ul>
						</div>
				</div>

				<div id="main">
						{/* acessa as propriedades do filho do router principal, atraves do argumento */}
						{this.props.children}
				</div>
			</div>
		);
	}
}

export default App;