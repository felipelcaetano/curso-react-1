import PubSub from 'pubsub-js'; // Biblioteca para trabalhar com topicos. Publisher and Subscribers.

export default class TratadorErros {
    publicaErros(erros) {
        console.log(erros);
        erros.errors.forEach(function (erro, index) {
            console.log(erro);
            var erro = erro;
            PubSub.publish('erro-validacao', erro);
        })
    }
}