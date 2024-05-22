let listaNumerosSorteados = [];
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;


function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;   
    responsiveVoice.speak(texto,'Brazilian Portuguese Male', {rate:1.2});
}

function exibirMensagemInicial() {
    exibirTextoNaTela('h1','Jogo do número secreto do TitiBiligue');
    exibirTextoNaTela('p','Escolha um número entre 1 e ' + numeroLimite);
    document.getElementById('reiniciar').setAttribute('disabled',true);
}

exibirMensagemInicial();

function verificarChute() {
    
    let chute = document.querySelector('input').value; 

    if (chute != '') {

        if (chute == numeroSecreto) {
            exibirTextoNaTela('h1','Acertou!');
            let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
            let msgTetantivas = 'Você acertou o numero correto! com ' + tentativas + ' ' + palavraTentativa;
            exibirTextoNaTela('p',msgTetantivas);
            document.getElementById('reiniciar').removeAttribute('disabled');
        } else {
            if (chute > numeroSecreto) {
                exibirTextoNaTela('p','O numero secreto é menor');
            } else {
                exibirTextoNaTela('p','O numero secreto é maior');
            }
            tentativas++;
            limparCampo();
        }
   }
}

function gerarNumeroAleatorio(){
    let numeroEscolhido = parseInt(Math.random() * 10 +1);
    let quantidadeElementosLista = listaNumerosSorteados.length;
    
    if (quantidadeElementosLista == numeroLimite) {
        listaNumerosSorteados.push([]);
    }

    if (listaNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
    } else {
        listaNumerosSorteados.push(numeroEscolhido);
        return numeroEscolhido;
    }
}

function limparCampo () {
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();  
}