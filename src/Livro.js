import React, { Component } from 'react';
import $ from 'jquery';
import InputCustomizado from './componentes/InputCustomizado';
import BotaoSubmitCustomizado from './componentes/BotaoSubmitCustomizado';
import PubSub from 'pubsub-js'; // Biblioteca para trabalhar com topicos. Publisher and Subscribers.
import TratadorErros from './TratadorErros';

class FormularioLivro extends Component {

		constructor() {
				super(); //chama o construtor do Component
				this.state = { //atributo herdado de Component
						titulo: '',
						preco: '',
						autorId: ''
				};
				this.enviaForm = this.enviaForm.bind(this); //Outra forma de fazer o bind pro React a funcao
				this.setTitulo = this.setTitulo.bind(this);
				this.setPreco = this.setPreco.bind(this);
				this.setAutorId = this.setAutorId.bind(this);
		}

		enviaForm(evento) {
				console.log('Dados sendo enviados');
				evento.preventDefault();

				$.ajax({
						url: "http://localhost:8080/api/livros",
						//url: 'http://cdc-react.herokuapp.com/api/autores',
						contentType: 'application/json', //dados enviados
						dataType: 'json', //resposta
						type: 'post',
						data: JSON.stringify( //transforma um Json em string para envio ao servidor
						{
								titulo: this.state.titulo,
								preco: this.state.preco,
								autorId: this.state.autorId
						}),
						success: function(novaListagem) {
								console.log("sucesso");
								//disparar aviso geral de nova listagem disponivel
								PubSub.publish('atualiza-lista-livros', novaListagem);
								this.setState({titulo:'', preco:'', autorId:''});
						}.bind(this),
						error: function(resposta) {
								console.log("erro");
								if(resposta.status === 400) {
										new TratadorErros().publicaErros(resposta.responseJSON);
								}
						},
						beforeSend: function() {
								PubSub.publish('limpa-erros', {});
						}
				});
		}

		setTitulo(evento) {
				this.setState(
				{
						titulo: evento.target.value
				})
		}

		setPreco(evento) {
				this.setState(
				{
						preco: evento.target.value
				})
		}

		setAutorId(evento) {
				this.setState(
				{
						autorId: evento.target.value
				})
		}

		render() {
			return (
				<div className="pure-form pure-form-aligner">
					<form className="pure-form pure-form-aligned"
					onSubmit={this.enviaForm} method="post">

						<InputCustomizado id="titulo" type="text" name="titulo"
						value={this.state.titulo} onChange={this.setTitulo}
						label="Titulo"/>
						<InputCustomizado id="preco" type="text" name="preco"
						value={this.state.preco} onChange={this.setPreco}
						label="Preco"/>
						<div className="pure-control-group">
							<label htmlFor="autorId">Autor</label>
							<select name="autorId" id="autorID" onChange={this.setAutorId}>
								<option value="">Selecione autor</option>
									{
										this.props.autores.map(function(autor){
											return <option value={autor.id}>{autor.nome}</option>
										})
									}
							</select>
						</div>

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

class TabelaLivros extends Component {

	render() {
		return (
			<div>
				<table className="pure-table">
					<thead>
						<tr>
							<th>Titulo</th>
							<th>Preco</th>
							<th>Autor</th>
						</tr>
					</thead>

					<tbody>
						{
							this.props.lista.map(function(livro) {
								return (
									<tr key={livro.id}>
										<td>{livro.titulo}</td>
										<td>{livro.preco}</td>
										<td>{livro.autor.nome}</td>
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

export default class LivroBox extends Component {

	constructor() {
		super(); //chama o construtor do Component
		this.state = { //atributo herdado de Component
			lista: [],
			autores: []
		};
		//this.atualizaListagem = this.atualizaListagem.bind(this);
	}

	componentWillMount() { //executada antes do render
	}

	componentDidMount() { //executada apos o render, logo apos o compenente ser montado
		$.ajax({
			url: "http://localhost:8080/api/livros",
			dataType: 'json',
			success: function(resposta) {
				this.setState({lista:resposta}); // chama o render toda vez que o setState for chamado
			}.bind(this) // faz o bind do this para o react ou inves do jquery
		});

		$.ajax({
			url: "http://localhost:8080/api/autores",
			//url: 'http://cdc-react.herokuapp.com/api/autores',
			dataType: 'json',
			success: function(resposta) {
				this.setState({autores:resposta}); // chama o render toda vez que o setState for chamado
			}.bind(this) // faz o bind do this para o react ou inves do jquery
		});

		PubSub.subscribe('atualiza-lista-livros', function(topico, novaLista) {
			this.setState({lista:novaLista});
		}.bind(this));
	}

	render() {
		return (
			<div>
				<div className="header">
					<h1>Cadastro de livros</h1>
				</div>

				<div className="content" id="content">
					<FormularioLivro autores={this.state.autores}/>
					<TabelaLivros lista={this.state.lista} />
				</div>
		</div>
		);
	}
}