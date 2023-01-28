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
        alert("Oi");
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
function openNextLevel() {
    const openNivel = document.querySelectorAll('.proximo-nivel');
    for (let i = 0; i < openNivel.length; i++) {
        openNivel[i].classList.remove('proximo-nivel');
        openNivel[i].innerHTML = '';
    }
    const searchInfoNiveis = document.querySelector('.niveis');

    for (let i = 2; i <= nivelQuizz; i++) {
        let template2 = `<div class="nivel">
            <h3>Nível ${i}</h3>
            <input class="titulo-nivel-${i}" type="text" placeholder="Título do nível">
            <input class="acerto-nivel-${i}" type="text" placeholder="% de acerto mínima">
            <input class="img-nivel-${i}" type="url" placeholder="URL da imagem do nível">
            <input class="descricao-nivel-${i}" type="text" placeholder="Descrição do nível">
        </div>`;

        searchInfoNiveis.innerHTML = searchInfoNiveis.innerHTML + template2;

    }
}
//Fim dos inputs dos niveis
// Validação de dados colocados nos inputs do quizz
let tituloNivel = "";
let percentualNivel = 0;
let imagemNivel = "";
let descricaoNivel = "";
function proceedToFinishQuizz() {

    tituloNivel = document.querySelector('.titulo-nivel-1').value;
    percentualNivel = Number(document.querySelector('.acerto-nivel-1').value);
    imagemNivel = document.querySelector('.img-nivel-1').value;
    descricaoNivel = document.querySelector('.descricao-nivel-1').value;

    if (tituloNivel.length >= 10 && (percentualNivel >= 0 && percentualNivel <= 100) && descricaoNivel.length >= 30) {
        alert("Oi");
        //adicionar função para a página final

    } else {
        alert('Por favor! Preencha os dados corretamente');
    }

}
//Fim da validação

//---------------------------------------------------------------------------------------------------------

//  BEGIN Variables
    const URL_API = 'https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/'
    const ListAllQuizzes = document.querySelector('.ListQuizzes');
    let   ID = 0;
    let AllQuizzesSerializabled;
    let AllQuizzesUnSerializabled;
    let MyQuizzesSerializabled;
    let MyQuizzesUnSerializabled;
    const ListAll =  document.querySelector('.ListAll');
//  END Variables

//  BEGIN Get Errors
    function GetError(error){
        console.log(error.response.status )
    }
//  END Get Errors

//  BEGIN Get Quizzes
    let GetAllQuizzes = axios.get(URL_API);
        GetAllQuizzes.then(SerializeQuizzes);
        GetAllQuizzes.catch(GetError)
//  END Get Quizzes

//  BEGIN SerializeQuizzes
    function SerializeQuizzes(response){
        AllQuizzesSerializabled = JSON.stringify(response.data)
        localStorage.setItem('AllQuizzes', AllQuizzesSerializabled);
        LoadQuizzes()
    }
//  END SerializeQuizzes

//  BEGIN Load Quizzes
    function LoadQuizzes(response){
        // console.log(response.data);
        AllQuizzesUnSerializabled = localStorage.getItem('AllQuizzes')
        let ListQuizzes = JSON.parse(AllQuizzesUnSerializabled);
        let Quizz = '';
        for(let i = 0; i < ListQuizzes.length; i++){
            // console.log(ListQuizzes[i].image)
            Quizz = `<li class="Quizz">
                        <img class="QuizzImg" src="${ListQuizzes[i].image}"/>
                        <div class="QuizzGradient">
                            <h3 class="QuizzTitle">${ListQuizzes[i].title}</h3>
                            <span class="ID" style="display:none">${ListQuizzes[i].id}</span>
                        </div>
                    </li>`
            
            ListAllQuizzes.innerHTML += Quizz;
            Quizz = '';
            Select()
        }
    }
//  END Load Quizzes

//  BEGIN Select Quizz
    function Select(){
        let SelectQuizz = document.querySelectorAll('.Quizz');
        SelectQuizz.forEach(Quizz => {
            Quizz.addEventListener('click', (event) => {
                ID = Quizz.querySelector('.ID').innerHTML;
                // console.log(ID);
                OpenQuizz(ID);
            })
        })
    }
//  END Select Quizz

//  BEGIN ShuffleArray
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
//  END ShuffleArray

//  BEGIN Open Quizz Selected
    function OpenQuizz(Id){
        const Tela2 = document.querySelector('.tela2');
        AllQuizzesUnSerializabled = localStorage.getItem('AllQuizzes')
        let ListQuizzes = JSON.parse(AllQuizzesUnSerializabled);
        for(let i = 0; i < ListQuizzes.length; i++){
            if(Id == ListQuizzes[i].id){
                let Questions = ListQuizzes[i].questions;
                // console.log(Questions)
                quizz.classList.add('escondido');
                ListAll.classList.add('escondido');
                Tela2.classList.remove('escondido');

                Tela2.innerHTML += `<div>
                                        <div class="ImageCurrentQuiz" style="background-image: url(${ListQuizzes[i].image})">
                                            <div class="Layer"></div>
                                            <p class="TitleCurrentQuizz">${ListQuizzes[i].title}</p>
                                        </div>
                                    </div>`
                for(let j = 0; j < Questions.length; j++){
                    let Answers = ShuffleArray(Questions[j].answers);
                    console.log(Answers)
                    Tela2.innerHTML += `<div class="QuestionBox">
                                            <div class="QuestionTitleBox">
                                                <h3 class="QuestionTitle">${Questions[j].title}</h3>
                                            </div>
                                            <div class="AnswersBox AnswersBox${j}">
                                            </div>
                                        </div>`
                    let AnswersBox = document.querySelector(`.AnswersBox${j}`);
                    for(let k = 0; k < Answers.length; k++){
                        AnswersBox.innerHTML += `<div class="Answer">
                                                    <img class="AnswersImage" src="${Answers[k].image}">
                                                    <h5 class="AnswersText">${Answers[k].text}</h5>
                                                </div` 
                    }
                }
            }
        }
    }
//  END Open Quizz Selected

//  BEGIN
//  END

//  BEGIN
//  END

//  BEGIN
//  END

//  BEGIN
//  END


