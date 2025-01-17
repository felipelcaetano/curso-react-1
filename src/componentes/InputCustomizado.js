import React, { Component } from 'react';
import PubSub from 'pubsub-js'; // Biblioteca para trabalhar com topicos. Publisher and Subscribers.

export default class InputCustomizado extends Component {

	constructor() {
		super();
		this.state = {
			msgErro: ''
		};
	}

	render() {
		return (
			<div className="pure-control-group">

				<label htmlFor={this.props.id}>{this.props.label}</label>

				{/* Forma repassando todos os atributos um a um
				<input id={this.props.id} type={this.props.type}
					name={this.props.name} value={this.props.value}
					onChange={this.props.onChange}
				/> */}
				<input {...this.props}/>
				<span className="error">{this.state.msgErro}</span>
			</div>
		);
	}

	componentDidMount() {
		PubSub.subscribe('erro-validacao', function(topico, erro) {
			if(erro.field === this.props.name) {
				this.setState({msgErro: erro.defaultMessage});
			}
		}.bind(this));

		PubSub.subscribe('limpa-erros', function(topico) {
			this.setState({msgErro: ''});
		}.bind(this));
	}


}
