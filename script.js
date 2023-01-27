const quizz = document.querySelector('.tela1');
const criarQuizz = document.querySelector('.tela3');
const quizz2 = document.querySelector('.tela1-com-quizz');
function criarMeuQuizz() {
    quizz.classList.add('escondido');

    criarQuizz.classList.remove('escondido');

    quizz2.classList.add('escondido');
}
//Varáveis globais para serem usados nas descrições/informações do Quizz depois
let tituloQuizz = "";
let imagemQuizz = "";
let perguntasQuizz = 0;
let nivelQuizz = 0;

function prosseguirParaPerguntas() {
    tituloQuizz = document.querySelector('.novo-titulo-quizz').value;
    imagemQuizz = document.querySelector('.nova-imagem-quizz').value;
    perguntasQuizz = Number(document.querySelector('.nova-pergunta-quizz').value);
    nivelQuizz = Number(document.querySelector('.novo-nivel-quizz').value);

    if ((tituloQuizz.length >= 20 && tituloQuizz.length <= 65) && perguntasQuizz >= 3 && nivelQuizz >= 2) {
        //adicionar função para a criação das perguntas
        //Quando clicar no botão de "prosseguir para níveis" chamar função createLevels()
    } else {
        alert('Por favor! Preencha os dados corretamente');
    }
}
//Colocando na tela a quantidade de níveis pedidos
function createLevels() {
    const searchNiveis = document.querySelector('.niveis');

    for (let i = 2; i <= nivelQuizz; i++) {
        let template = `<div class="proximo-nivel">
            <h3>Nível ${i}</h3>
            <img src="img/Vector (2).png" onclick="openNextLevel()">
        </div>`;

        searchNiveis.innerHTML = searchNiveis.innerHTML + template;
    }
}
//Fim dos niveis pedidos
// Clicando no icone do lápis e abrindo os inputs para informação dos níveis
let i = 2;
function openNextLevel() {

    let template2 = `<div class="nivel">
        <h3>Nível ${i}</h3>
        <input class="titulo-nivel-${i}" type="text" placeholder="Título do nível">
        <input class="acerto-nivel-${i}" type="text" placeholder="% de acerto mínima">
        <input class="img-nivel-${i}" type="url" placeholder="URL da imagem do nível">
        <input class="descricao-nivel-${i}" type="text" placeholder="Descrição do nível">
    </div>`;

    i += 1;

    const openNivel = document.querySelector('.proximo-nivel');
    openNivel.classList.remove('proximo-nivel');
    openNivel.innerHTML = template2;
}
//Fim dos inputs dos niveis
// Validação de dados colocados nos inputs do quizz
let tituloNivel = "";
let percentualNivel = 0;
let imagemNivel = "";
let descricaoNivel = "";
let arrayTitulo = [];
let arrayPercentual = [];
let arrayImg = [];
let arrayDescricao = [];

function proceedToFinishQuizz() {
    let contador = 0;
    for(let indice = 1; indice <= nivelQuizz; indice++){
        tituloNivel = document.querySelector(`.titulo-nivel-${indice}`).value;
        percentualNivel = Number(document.querySelector(`.acerto-nivel-${indice}`).value);
        imagemNivel = document.querySelector(`.img-nivel-${indice}`).value;
        descricaoNivel = document.querySelector(`.descricao-nivel-${indice}`).value;

        if (tituloNivel.length >= 10 && (percentualNivel >= 0 && percentualNivel <= 100) && descricaoNivel.length >= 30) {
            contador += 1;
            console.log(contador);
            arrayTitulo.push(tituloNivel);
            arrayPercentual.push(percentualNivel)
            arrayImg.push(imagemNivel); 
            arrayDescricao.push(descricaoNivel);

        } else {
            contador = 0;
            alert('Por favor! Preencha os dados corretamente');
        }
    }
    if(contador === nivelQuizz){
        //Função para enviar quizz(get.post)
    }
}
//Fim da validação

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
function LoadQuizzes(Response) {
    let Quizzes = Response.data;
    //console.log(Quizzes);
    for (let i = 0; i < Quizzes.length; i++) {
        Quizz = `<li class="QuizzBox" style="background-image: url(${Quizzes[i].image})">
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
function SelectQuiz() {

    let SelectQuizz = document.querySelectorAll('.QuizzBox');
    SelectQuizz.forEach((Quizz) => {
        Quizz.addEventListener('click', (event) => {
            ID = Quizz.querySelector('.ID').innerHTML;
            quizz.classList.add('escondido');
            criarQuizz.classList.add('escondido');
            quizz2.classList.add('escondido');
            ListQuiz.classList.add('escondido');
            Tela2.classList.remove('escondido');
            const GetQuizz = axios.get(GetQuizzesURL + ID)
            GetQuizz.then(ShowQuizz);
            GetQuizz.catch(erro => console.log(erro.response.status));

        })
    })
}
// Fim Selecionar Quizz

// Função para randomizar array
function ShuffleArray(arr) {
    // Loop em todos os elementos
for (let i = arr.length - 1; i > 0; i--) {
        // Escolhendo elemento aleatório
    const j = Math.floor(Math.random() * (i + 1));
    // Reposicionando elemento
    [arr[i], arr[j]] = [arr[j], arr[i]];
}
// Retornando array com aleatoriedade
return arr;
}

const Tela2 = document.querySelector('.Tela2');
// Inicio Show Tela2 Quizz
function ShowQuizz(Response) {
    const CurrentQuizz = Response.data
    // console.log(CurrentQuizz);
    Tela2.innerHTML += `<div class="ImageTopQuizz" style="background-image: url(${CurrentQuizz.image})">
                        <div class="Obscure"></div>
                            <p class="CurrentQuizzTitle">
                                ${CurrentQuizz.title}
                            </p>
                        </div>`
    for (let i = 0; i < CurrentQuizz.questions.length; i++) {
        let RandomArray = ShuffleArray(CurrentQuizz.questions[i].answers);
        Tela2.innerHTML += `<div class="QuestionBox">
                                <div class="QuestionTitleBox">
                                    <h3 class="QuestionTitle">${CurrentQuizz.questions[i].title}</h3>
                                </div>
                                <div class="AnswersBox">
                                
                                </div>
                            </div>`
        for(let j = 0; j < CurrentQuizz.questions[i].answers.length; j++){
            // console.log(RandomArray[j].text)
            RenderAnswer(RandomArray[j])
        }
    }

}
// Fim Show Tela2 Quizz

function RenderAnswer(RandomArray){
    let Render = document.querySelector('.QuestionBox').querySelector('.AnswersBox');
    // console.log(RandomArray.text)
    Render.innerHTML +=    `<div class="Answer">
                                <img class="AnswersImage" src="${RandomArray.image}">
                                <h5>${RandomArray.text}</h5>
                            </div>`
}
