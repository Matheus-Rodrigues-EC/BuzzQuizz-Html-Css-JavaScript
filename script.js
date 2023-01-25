function criarMeuQuizz(){
    const quizz = document.querySelector('.tela1');
    quizz.classList.add('escondido');

    const criarQuizz = document.querySelector('.tela3');
    criarQuizz.classList.remove('escondido');

    const quizz2 = document.querySelector('.tela1-com-quizz');
    quizz2.classList.add('escondido');
}
let tituloQuizz = "";
let imagemQuizz = "";
let perguntasQuizz = "";
let nivelQuizz = "";
function prosseguirParaPerguntas(){
    tituloQuizz = document.querySelector('.novo-titulo-quizz').value;
    imagemQuizz = document.querySelector('.nova-imagem-quizz').value;
    perguntasQuizz = Number(document.querySelector('.nova-pergunta-quizz').value);
    nivelQuizz = Number(document.querySelector('.novo-nivel-quizz').value);
    
    if((tituloQuizz.length >= 20 && tituloQuizz.length <= 65) || imagemQuizz === URL || perguntasQuizz >= 3|| nivelQuizz >= 2){
        //adcionar a página para a criação das perguntas
    } else {
        alert('Por favor! Preencha os dados corretamente');
    }
}

const GetQuizzesURL = 'https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes';
let ListQuizzes = axios.get(GetQuizzesURL);
ListQuizzes.then(LoadQuizzes);
ListQuizzes.catch(erro => console.log(erro.response.status));


function LoadQuizzes(Response){
    const QuizzRow = document.querySelector('.QuizzRow');
    let Quizzes = Response.data;
    console.log(Quizzes);
    
    let Quizz = '';
    for(let i = 0; i < Quizzes.length; i++){
        Quizz =    `<li class="QuizzBox" style="background-image: url(${Quizzes[i].image})">
                        <h3 class="QuizzTitle">${Quizzes[i].title}</h3>
                    </li>`

        QuizzRow.innerHTML += Quizz;
        Quizz = '';

    }
}
