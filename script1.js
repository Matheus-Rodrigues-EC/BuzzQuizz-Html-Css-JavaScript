function criarMeuQuizz(){
    const quizz = document.querySelector('.tela1');
    quizz.classList.add('escondido');

    const criarQuizz = document.querySelector('.tela3');
    criarQuizz.classList.remove('escondido');

    const quizz2 = document.querySelector('.tela1-com-quizz');
    quizz2.classList.add('escondido');
}
const tituloQuizz = "";
const imagemQuizz = "";
const perguntasQuizz = "";
const nivelQuizz = "";
function prosseguirParaPerguntas(){
    tituloQuizz = document.querySelector('.novo-titulo-quizz').value;
    imagemQuizz = document.querySelector('.nova-imagem-quizz').value;
    perguntasQuizz = Number(document.querySelector('.nova-pergunta-quizz').value);
    nivelQuizz = Number(document.querySelector('.novo-nivel-quizz').value);
    
    if((tituloQuizz.length >= 20 && tituloQuizz.length <= 65) || perguntasQuizz >= 3|| nivelQuizz >= 2){
        //adcionar a página para a criação das perguntas
    } else {
        alert('Por favor! Preencha os dados corretamente');
    }
}