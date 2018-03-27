import React, { Component } from 'react';
import $ from 'jquery';
import InputCustomizado from './componentes/InputCustomizado';
import BotaoSubmitCustomizado from './componentes/BotaoSubmitCustomizado';
import PubSub from 'pubsub-js'; // Biblioteca para trabalhar com topicos. Publisher and Subscribers.
import TratadorErros from './TratadorErros';

class FormularioAutor extends Component {

	constructor() {
		super(); //chama o construtor do Component
		this.state = { //atributo herdado de Component
			nome: '',
			email: '',
			senha: ''
		};
		this.enviaForm = this.enviaForm.bind(this); //Outra forma de fazer o bind pro React a funcao
		this.setNome = this.setNome.bind(this);
		this.setEmail = this.setEmail.bind(this);
		this.setSenha = this.setSenha.bind(this);
	}

	enviaForm(evento) {
		console.log('Dados sendo enviados');
		evento.preventDefault();

		$.ajax({
			url: "http://localhost:8080/api/autores",
			//url: 'http://cdc-react.herokuapp.com/api/autores',
			contentType: 'application/json', //dados enviados
			dataType: 'json', //resposta
			type: 'post',
			data: JSON.stringify( //transforma um Json em string para envio ao servidor
			{
				nome: this.state.nome,
				email: this.state.email,
				senha: this.state.senha
			}),
			success: function(novaListagem) {
				console.log("sucesso");
				//disparar aviso geral de nova listagem disponivel
				PubSub.publish('atualiza-lista-autores', novaListagem);
				this.setState({nome:'', email:'', senha:''});
			}.bind(this),
			error: function(resposta) {
				console.log("erro");
				if(resposta.status === 400) {
					new TratadorErros().publicaErros(resposta.responseJSON);
				}
			},
			beforeSend: function() {
				PubSub.publish('limpa-erros', );
			}
		});
	}

	setNome(evento) {
		this.setState(
		{
			nome: evento.target.value
		})
	}

	setEmail(evento) {
		this.setState(
		{
			email: evento.target.value
		})
	}

	setSenha(evento) {
		this.setState(
		{
			senha: evento.target.value
		})
	}

	render() {
			return (
				<div className="pure-form pure-form-aligner">
					<form className="pure-form pure-form-aligned"
						onSubmit={this.enviaForm} method="post">

						<InputCustomizado id="nome" type="text" name="nome"
							value={this.state.nome} onChange={this.setNome}
							label="Nome"/>
						<InputCustomizado id="email" type="email" name="email"
							value={this.state.email} onChange={this.setEmail}
							label="Email"/>
						<InputCustomizado id="senha" type="password" name="senha"
							value={this.state.senha} onChange={this.setSenha}
							label="Senha"/>

						<div className="pure-control-group">
								<label></label>
								<input type="submit" className="pure-button pure-button-primary"
									value={this.props.label} />
						</div>
					</form>
				</div>
			);
	}
}

class TabelaAutores extends Component {

	render() {
		return (
				<div>
						<table className="pure-table">
							<thead>
								<tr>
									<th>Nome</th>
									<th>email</th>
								</tr>
							</thead>

							<tbody>
								{
									this.props.lista.map(function(autor) {
										return (
											<tr key={autor.id}>
												<td>{autor.nome}</td>
												<td>{autor.email}</td>
											</tr>
										);
									})
								}
							</tbody>
						</table>
				</div>
		);
	}
}

export default class AutorBox extends Component {

	constructor() {
			super(); //chama o construtor do Component
			this.state = { //atributo herdado de Component
					lista: []
			};
			//this.atualizaListagem = this.atualizaListagem.bind(this);
	}

	componentWillMount() { //executada antes do render
	}

	componentDidMount() { //executada apos o render, logo apos o compenente ser montado
		$.ajax({
				url: "http://localhost:8080/api/autores",
				//url: 'http://cdc-react.herokuapp.com/api/autores',
				dataType: 'json',
				success: function(resposta) {
						this.setState({lista:resposta}); // chama o render toda vez que o setState for chamado
				}.bind(this) // faz o bind do this para o react ou inves do jquery
		});

		PubSub.subscribe('atualiza-lista-autores', function(topico, novaLista) {
			this.setState({lista:novaLista});
		}.bind(this));
	}

	render() {
		return (
				<div>
						<FormularioAutor />
						<TabelaAutores lista={this.state.lista} />
				</div>
		);
	}
}