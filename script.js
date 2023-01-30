const quizz = document.querySelector('.tela1');
const criarQuizz = document.querySelector('.tela3');
const DoQuestions = document.querySelector('.MyQuestions');
const quizz2 = document.querySelector('.tela1-com-quizz');
const nameList = document.querySelector('.NameList');
const listQuizz = document.querySelector('.ListAll');

function criarMeuQuizz() {
    quizz.classList.add('escondido');

    criarQuizz.classList.remove('escondido');

    quizz2.classList.add('escondido');

    nameList.classList.add('escondido');

    listQuizz.classList.add('escondido');
}

//  BEGIN Message Errors
const msgsErrors = {
    title : {msg : 'O título deve ter no mínimo 20 e no máximo 65 caracteres', field : '#title'},
    url :{msg : 'O formato da URL está incorreto', field : '#url'},
    qtd_questions : {msg : 'Devem haver no mínimo 3 perguntas', field : '#qtd_questions'},
    qtd_levels : {msg : 'Devem haver no mínimo 2 níveis', field : '#qtd_levels'},
    question_title : {msg : 'A pergunta deve ter no mínimo 20 caracteres', field : '#question-'},
    question_color : {msg : 'O formato de cor é inválida', field : '#color-'},
    question_answer : {msg : 'Informe a resposta correta', field : '#answer-'},
    question_anwser_img : {msg : 'O formato da URL da resposta correta é inválido', field : '#img-'},
    question_answer_incorrect : {msg : 'Deve ter pelo menos uma resposta incorreta para a pergunta', field : '#incorrect-'},
    question_answer_incorrect_url: {msg : 'O formato da URL da resposta incorreta é inválido', field : '#incorrectUrl-'},
    level_title : {msg : 'Devem haver no mínimo 10 caracteres', field : '#level-title-'},
    level_min_value : {msg : 'O valor deve estar entre 0 e 100', field : '#level-percent-'},
    level_img : {msg : 'O formato da URL do level é inválido', field : '#level-img-'},
    level_text: {msg : 'Devem haver no mínimo 30 caracteres', field : '#level-description-'},
    level_min_percent: {msg : 'Devem haver pelo menos um nível com 0%', field : '#level-percent-1'},
    level_number_min: {msg : 'Devem haver pelo menos 2 níveis', field : '#min-levels'},
}
//  END Message Errors


//  Varáveis globais para serem usados nas descrições/informações do Quizz depois
let tituloQuizz = "";
let imagemQuizz = "";
let perguntasQuizz = 0;
let nivelQuizz = 0;

//  Informações básicas do Quizz
function prosseguirParaPerguntas() {
    tituloQuizz = document.querySelector('.novo-titulo-quizz').value;
    imagemQuizz = document.querySelector('.nova-imagem-quizz').value;
    perguntasQuizz = Number(document.querySelector('.nova-pergunta-quizz').value);
    nivelQuizz = Number(document.querySelector('.novo-nivel-quizz').value);
    
    const linker = new RegExp("^((http(s?):\/\/(www.)?[a-z]+.com\/))")

    if ((tituloQuizz.length >= 20 && tituloQuizz.length <= 65)) {
        if(linker.test(imagemQuizz)){
            // if(true){
            if(perguntasQuizz >= 3 && perguntasQuizz != NaN){
                if(nivelQuizz >= 2 && nivelQuizz != NaN){
                    //adicionar função para a criação das perguntas
                    CreateQuestions();
                    criarQuizz.classList.add('escondido');
                    //Quando clicar no botão de "prosseguir para níveis" chamar função createLevels()
                }else{
                    alert(msgsErrors.qtd_levels.msg);
                }
            }else{
                alert(msgsErrors.qtd_questions.msg);
            }
        }else{
            alert(msgsErrors.url.msg);
        }
    } else {
        alert(msgsErrors.title.msg);
    }
}

//  Perguntas do quizz
//  BEGIN Create Questions
    function CreateQuestions(){
        const CreateQuestions = document.querySelector('.CreateQuestions');
        CreateQuestions.classList.remove('escondido')
        let Quizz = '';

        DoQuestions.innerHTML += `<h3 Class="CreateYourQuestions">Crie Suas Perguntas</h3>`

        for(let i = 1; i <= perguntasQuizz; i++){
            Quizz =   `<div class="QuestionsMyQuizz">
                                                <div class="Questions Q${i}">
                                                <h3 class="MyQuestionTitle">Pergunta ${i}</h3>
                                                    <div class="Question Quest${i}">
                                                        <input class="Input T${i}" type="text" placeholder="Texto da Pergunta"/>
                                                        <input class="Color C${i}" type="text" placeholder="Cor de fundo da Pergunta"/>
                                                    </div>
                                                    <h3 class="MyQuestionTitle">Resposta Correta</h3>
                                                    <div class="CorrectAnswers">
                                                        <input class="CorrectAnswer Input" type="text" placeholder="Resposta correta"/>
                                                        <input class="CorrectURL Url" type="url" placeholder="URL da imagem"/>
                                                    </div>
                                                    <h3 class="MyQuestionTitle">Respostas Incorretas</h3>
                                                    <div class="WrongAnswers">
                                                        <div class="Wrong">
                                                            <input class="WrongAnswer1 Input" type="text" placeholder="Resposta Incorreta 1"/>
                                                            <input class="WrongURL1 Url" type="url" placeholder="URL da imagem 1"/>
                                                        </div>
                                                        <div class="Wrong">
                                                            <input class="WrongAnswer2 Input" type="text" placeholder="Resposta Incorreta 2"/>
                                                            <input class="WrongURL2 Url" type="url" placeholder="URL da imagem 2"/>
                                                        </div>
                                                        <div class="Wrong">
                                                            <input class="WrongAnswer3 Input" type="text" placeholder="Resposta Incorreta 3"/>
                                                            <input class="WrongURL3 Url" type="url" placeholder="URL da imagem 3"/>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>`

            DoQuestions.innerHTML += Quizz;
            Quizz = '';
            
        }
            DoQuestions.innerHTML += `<button class="NextToLevels" onclick="GetInfoQuizz()">Prosseguir pra criar níveis</button>`
    }
//  END

//  BEGIN Create Levels
    function createLevels() {
        const CreateQuestions =document.querySelector('.CreateQuestions');
        const CreateLevels = document.querySelector('.CreateLevels');
            CreateQuestions.classList.add('escondido');
            CreateLevels.classList.remove('escondido');
            
            let Level = '';
            const Levels = document.querySelector('.Levels');
        for(let i = 1; i <= nivelQuizz; i++){
            Level =    `<div class="Level">
                            <h3 class="LevelTitle">Nível ${i}</h3>
                            <ion-icon class="Open" name="create-outline"></ion-icon>
                            <input class="LevelTitle LT${i} Input" type="text" placeholder="Título do Nível    "/>
                            <input class="LevelPercent LP${i} Input" type="text" placeholder="% de acerto mínima    "/>
                            <input class="LevelURL LU${i} Url" type="url" placeholder="URL da imagem do nível    "/>
                            <input class="LevelDesc LD${i} Input" type="textarea" placeholder="Descrição do nível    "/>
                        </div>`

            // console.log(Level)
            Levels.innerHTML += Level;
            Level = '';
        }
        CreateLevels.innerHTML += `<button class="FinishQuizz" onclick="GetInfoLevels()">Finalizar Quizz</button>`
    }
//  END

//  BEGIN Get informatios of Questions
let MyQuizz = {
    title: tituloQuizz,
    image: imagemQuizz,
    questions: [],
    levels: []
}
    function GetInfoQuizz(){
        
        let question = {
            title: '',
            color: '',
            answers: []
        }
        // console.log(perguntasQuizz)
        for(let i = 1; i <= perguntasQuizz; i++){
            let Correctanswer = {
                text: '',
                image: '',
                isCorrectAnswer: false
            }
            for(let j = 1; j <= 3; j++){
                let Wronganswer = {
                    text: '',
                    image: '',
                    isCorrectAnswer: false
                }
                //--Recebe e verifica se o a pergunta tem mais de 20 caracteres-----------------------------------|
                question.title = document.querySelector(`.Q${i}`).querySelector(`.T${i}`).value;                //|
                if(question.title.length <= 20){                                                                //|
                    alert(msgsErrors.question_title.msg);                                                       //|
                }                                                                                               //|
                //------------------------------------------------------------------------------------------------|

                //--Recebe e verifica se a cor foi digitada no padrão hexadecimal---------------------------------|
                const color = new RegExp(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/);                                 //|
                question.color = document.querySelector(`.Q${i}`).querySelector(`.C${i}`).value;                //|
                if(color.test(question.color)){                                                                 //|
                }else{                                                                                          //|
                    alert(msgsErrors.question_color.msg);                                                       //|
                    break;                                                                                      //|
                }                                                                                               //|
                //------------------------------------------------------------------------------------------------|

                //--Recebe e verifica se a resposta errada foi digitada-------------------------------------------|
                Wronganswer.text = document.querySelector(`.Q${i}`).querySelector(`.WrongAnswer${j}`).value;    //|
                if((Wronganswer.text.length <= 0)){                                                             //|
                    alert(msgsErrors.question_answer_incorrect.msg);                                            //|
                    break;                                                                                      //|
                }                                                                                               //|
                //------------------------------------------------------------------------------------------------|

                //--Recebe e verifica se a URL digitada está no padrão de URL-------------------------------------|
                const linker = new RegExp("^((http(s?):\/\/(www.)?[a-z]+.com\/))")                              //|
                Wronganswer.image = document.querySelector(`.Q${i}`).querySelector(`.WrongURL${j}`).value;      //|
                if(linker.test(Wronganswer.image)){                                                             //|
                                                                                                                //|
                }else{                                                                                          //|
                    alert(msgsErrors.question_anwser_img.msg);                                                  //|
                    break;                                                                                      //|
                }                                                                                               //|
                //------------------------------------------------------------------------------------------------|
                Wronganswer.isCorrectAnswer = false;
                
                //--Adiciona a resposta no array caso não seja nula-----------------------------------------------|
                if(Wronganswer.text !== ''){                                                                    //|
                    question.answers.push(Wronganswer);                                                      //|
                }                                                                                               //|
                //------------------------------------------------------------------------------------------------|
            }

            //--Recebe e verifica se o a pergunta tem mais de 20 caracteres---------------------------------------|
            Correctanswer.text = document.querySelector(`.Q${i}`).querySelector(`.CorrectAnswer`).value;        //|
            if((Correctanswer.text.length <= 0)){                                                               //|
                alert(msgsErrors.question_answer.msg);                                                          //|
                break;                                                                                          //|
            }                                                                                                   //|
            //----------------------------------------------------------------------------------------------------|

            //--Recebe e verifica se a URL digitada está no padrão de URL-----------------------------------------|
            const linker = new RegExp("^((http(s?):\/\/(www.)?[a-z]+.com\/))");                                  //|
            Correctanswer.image = document.querySelector(`.Q${i}`).querySelector(`.CorrectURL`).value;          //|
            if(linker.test(Correctanswer.image)){                                                               //|
                                                                                                                //|
            }else{                                                                                              //|
                alert(msgsErrors.question_anwser_img.msg);                                                      //|
                break;                                                                                          //|
            }                                                                                                   //|
            //----------------------------------------------------------------------------------------------------|
            Correctanswer.isCorrectAnswer = true;

            if(Correctanswer.text !== ''){
                question.answers.push(Correctanswer);
            }
            MyQuizz.questions.push(question);
            // console.log(question);
            question = {
                title: '',
                color: '',
                answers: []
            }
        }

        // return MyQuizz;
        if(MyQuizz.questions.length >= 3){
            // console.log(MyQuizz);
            createLevels();
        }
    }
//  END Get informatios of Questions


function GetInfoLevels(){
    let level = {
        title: '',
        image: '',
        text: '',
        minValue: ''
    }

    for(let i = 1; i <= nivelQuizz; i++){
            level.title = document.querySelector(`.LT${i}`).value;
            level.image = document.querySelector(`.LU${i}`).value;
            level.text = document.querySelector(`.LD${i}`).value;
            level.minValue = document.querySelector(`.LP${i}`).value;
            
            const linker = new RegExp("^((http(s?):\/\/(www.)?[a-z]+.com\/))");
            if (level.title.length >= 10) {
                if(level.minValue >= 0 && level.minValue <= 100){
                    if(linker.test(level.image)){
                        if(level.text.length >= 30){
                            if(MyQuizz.title !== ''){
                                MyQuizz.levels.push(level);
                                sendQuizz();
                            }else{
                                alert('Verifique os dados digitados.')
                            }
                        }else{
                            alert(msgsErrors.level_text.msg);
                        }
                    }else{
                        alert(msgsErrors.level_img.msg)
                    }
                }else{
                    alert(msgsErrors.level_min_value.msg)
                }
            }else{
                alert(msgsErrors.level_title.msg)
            }

            level = {
                title: '',
                image: '',
                text: '',
                minValue: ''
        }
    }
    MyQuizz.title = document.querySelector('.novo-titulo-quizz').value;
    MyQuizz.image = document.querySelector('.nova-imagem-quizz').value;
    console.log(MyQuizz);
}


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

//Funcção de envio do quizz do usuário
function sendQuizz(){
    let documento = ser
    const send = axios.post('https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes', MyQuizz);

    send.then(FinishQuizz);
    send.catch(GetError);
}
//Inicio Da Func para finalizar quizz
const showYourQuizz = document.querySelector('.tela11-info-quizz');

function FinishQuizz(response){
    console.log(response.data)
    // const closeLevel = document.querySelector('.tela3-niveis');
    // closeLevel.classList.add('escondido');
    // const quizzFinish = document.querySelector('.tela11');
    // quizzFinish.classList.remove('escondido');

    // let template3 = `<div>
    // <img src="${imagemQuizz}" alt="Imagem do Quizz">
    // <h4>${tituloQuizz}</h4>
    // </div>`;

    // showYourQuizz.innerHTML = showYourQuizz.innerHTML + template3;
}

//Fim do finalizar quizz

//Botao de voltar home

function backHome(){
    const fim = document.querySelector('.tela11');
    const inicio = document.querySelector('.tela1-com-quizz');
    const nameList2 = document.querySelector('.NameList');
    const listQuizz2 = document.querySelector('.ListQuizzes');
    const YourQuizz = document.querySelector('.quizzes-criados');

    fim.classList.add('escondido');
    inicio.classList.remove('escondido');
    nameList2.classList.remove('escondido');
    listQuizz2.classList.remove('escondido');

    let template4 = `<div>
    <img src="${imagemQuizz}" alt="Imagem do Quizz">
    <h4>${tituloQuizz}</h4>
    </div>`;

    YourQuizz.innerHTML = YourQuizz.innerHTML + template4;
    
}
// Fim do botão de voltar

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
    console.log(error.response.status)
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
        //console.log(response.data);
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
                quizz2.classList.add('escondido');
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
                    // console.log(Answers)
                    Tela2.innerHTML += `<div class="QuestionBox">
                                            <div class="QuestionTitleBox">
                                                <h3 class="QuestionTitle">${Questions[j].title}</h3>
                                            </div>
                                            <div class="AnswersBox${j} AnswersBox">
                                            </div>
                                        </div>`
                    let AnswersBox = document.querySelector(`.AnswersBox${j}`);
                    for(let k = 0; k < Answers.length; k++){
                        AnswersBox.innerHTML += `<div onclick = "SelectedAnswers(this)" class="Answer">
                                                    <img class="AnswersImage" src="${Answers[k].image}">
                                                    <h5 class="AnswersText">${Answers[k].text}</h5>
                                                </div` 
                    }
                }
            }
        }
    }
//  END Open Quizz Selected

// Comportamente das respostas
let x = 0;
function SelectedAnswers(click){
    click.classList.add('clicado');
    let response = document.querySelectorAll(`.AnswersBox${x} .Answer`);
    for(let j = 0; j < response.length; j++){
        if(response[j].classList.contains('clicado') !== null){
            response[j].classList.add('otherAnswers');
            click.classList.remove('otherAnswers');
            setTimeout(scrollarQuestions, 2000);
        }
        if(AllQuizzesSerializabled.isCorrectAnswer === true){
            response[j].classList.add('correctAnswer');
        } else {
            response[j].classList.add('wrongAnswers');
        }
    }
    x += 1;
    if(x === perguntasQuizz){
        //Adicionar finalização do quizz
    }
}

function scrollarQuestions(){
    window.scroll(0, 900);
}

//---------------------------------------------------------------------------------------------------------

//  BEGIN
//  END

    
