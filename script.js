const quizz = document.querySelector('.tela1');
const criarQuizz = document.querySelector('.tela3');
const quizz2 = document.querySelector('.tela1-com-quizz');
function criarMeuQuizz(){
    quizz.classList.add('escondido');

    criarQuizz.classList.remove('escondido');

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

// Inicio Buscar Lista de Quizzes
    const GetQuizzesURL = 'https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/';
    let ListQuizzes = axios.get(GetQuizzesURL);
    ListQuizzes.then(LoadQuizzes);
    ListQuizzes.catch(erro => console.log(erro.response.status));
// Fim Buscar Lista de Quizzes

// Inicio Carregar Quizzes na tela
let Quizz = '';
let ID = 0;
const QuizzRow = document.querySelector('.QuizzRow');
function LoadQuizzes(Response){
    let Quizzes = Response.data;
    //console.log(Quizzes);
    for(let i = 0; i < Quizzes.length; i++){
        Quizz =    `<li class="QuizzBox" style="background-image: url(${Quizzes[i].image})">
                        <div class="Layer"></div>
                        <h3 class="QuizzTitle">${Quizzes[i].title}</h3>
                        <p class="ID" style="display: none">${Quizzes[i].id}</p>
                    </li>`

        QuizzRow.innerHTML += Quizz;
        Quizz = '';
        
        SelectQuiz();
    }
}
// Fim Carregar Quizzes na tela

const ListQuiz = document.querySelector('.ListQuizzes');
// Inicio Selecionar Quizz
function SelectQuiz(){

    let SelectQuizz = document.querySelectorAll('.QuizzBox');
    SelectQuizz.forEach((Quizz) => {
        Quizz.addEventListener('click', (event) => {
            ID = Quizz.querySelector('.ID').innerHTML;
            quizz.classList.add('escondido');
            criarQuizz.classList.add('escondido');
            quizz2.classList.add('escondido');
            ListQuiz.classList.add('escondido');
            Tela2.classList.remove('escondido');
            const GetQuizz = axios.get(GetQuizzesURL+ID)
            GetQuizz.then(ShowQuizz);
            GetQuizz.catch(erro => console.log(erro.response.status));
            
        })
    })   
}
// Fim Selecionar Quizz

const Tela2 = document.querySelector('.Tela2');
// Inicio Show Tela2 Quizz
function ShowQuizz(Response){
    const CurrentQuizz = Response.data
    console.log(CurrentQuizz);
    Tela2.innerHTML += `<div class="ImageTopQuizz" style="background-image: url(${CurrentQuizz.image})">
                        <div class="Obscure"></div>
                            <p class="CurrentQuizzTitle">
                                ${CurrentQuizz.title}
                            </p>
                        </div>`
    for(let i = 0; i < CurrentQuizz.questions.length; i++){
        Tela2.innerHTML += `<div class="QuestionBox">
                                    <div class="QuestionTitleBox">
                                        <h3 class="QuestionTitle">${CurrentQuizz.questions[i].title}</h3>
                                    </div>
                                    </div>
                                </div>`
        for(let j = 0; j < CurrentQuizz.questions[i].answers.length; j++){
            const Answers = document.querySelector('.QuestionBox', '.Answers');
            Answers.innerHTML +=   `<div class="AnswersBox">
                                        <div class="Answer">
                                            <img class="AnswersImage" src="${CurrentQuizz.questions[i].answers[j].image}">
                                            <h5>${CurrentQuizz.questions[i].answers[j].text}</h5>
                                        </div>
                                    </div>`
        }
    }

}
// Fim Show Tela2 Quizz


