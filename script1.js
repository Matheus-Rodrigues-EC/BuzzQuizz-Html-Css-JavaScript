function criarMeuQuizz(){
    const quizz = document.querySelector('.tela1');
    quizz.classList.add('escondido');

    const criarQuizz = document.querySelector('.tela3');
    criarQuizz.classList.remove('escondido');

    const quizz2 = document.querySelector('.tela1-com-quizz');
    quizz2.classList.add('escondido');
}