// declaração de variáveis
const answerBox = document.querySelector('#answers-box');
const quizzContainer = document.querySelector('#quizz-container');
const scoreContainer = document.querySelector('#score-container');
const explanationBox = document.querySelector('#explanation-box');
const explanationText = document.querySelector('#explanation-text');
const correctLetterSpan = document.querySelector('#correct-letter');
const prevQuestionBtn = document.querySelector('#prev-question-btn');
const nextQuestionBtn = document.querySelector('#next-question-btn');
const restartBtn = document.querySelector('#restart');

const letters = ['A', 'B', 'C', 'D'];
let points = 0;
let actualQuestionIndex = 0;
let userAnswers = {}; // Objeto para armazenar as respostas do usuário

// perguntas
const questions = [
    {
        question: 'Qual movimento artístico do século XIX é conhecido por seus artistas pintarem ao ar livre (en plein air), buscando capturar os efeitos da luz e da cor em um momento específico?',
        answers: [
            { answer: 'Impressionismo', correct: true, },
            { answer: 'Cubismo', correct: false, },
            { answer: 'Surrealismo', correct: false, },
            { answer: 'Barroco', correct: false, },
        ],
        explanation: 'O Impressionismo, com artistas como Monet e Renoir, revolucionou a pintura ao focar na luz, cor e no momento fugaz, pintando "en plein air" (ao ar livre).',
    },
    {
        question: 'Quem é o famoso artista espanhol co-fundador do Cubismo e criador da obra "Guernica"?',
        answers: [
            { answer: 'Salvador Dalí', correct: false, },
            { answer: 'Claude Monet', correct: false, },
            { answer: 'Andy Warhol', correct: false, },
            { answer: 'Pablo Picasso', correct: true, },
        ],
        explanation: 'Pablo Picasso, junto com Georges Braque, é considerado o pai do Cubismo. Sua obra "Guernica" é um poderoso protesto contra a guerra.',
    },
    {
        question: 'Qual movimento artístico do século XX utilizou temas da cultura de massa, como latas de sopa Campbels, histórias em quadrinhos e retratos de celebridades, tornando o cotidiano em arte?',
        answers: [
            { answer: 'Pop Art', correct: true, },
            { answer: 'Romantismo', correct: false, },
            { answer: 'Expressionismo', correct: false, },
            { answer: 'Abstracionismo', correct: false, },
        ],
        explanation: 'A Pop Art, popularizada por Andy Warhol, transformou objetos e ícones da cultura popular em temas de arte, criticando e celebrando a sociedade de consumo.',
    },
    {
        question: 'O que o Surrealismo buscava expressar ou explorar em suas obras de arte, sendo influenciado pelas teorias de Sigmund Freud?',
        answers: [
            { answer: 'A vida social das classes operarias', correct: false, },
            { answer: 'Os sonhos e o inconsciente', correct: true, },
            { answer: 'A simetria e a ordem', correct: false, },
            { answer: 'O movimentos das maquinas', correct: false, },
        ],
        explanation: 'O Surrealismo, com artistas como Salvador Dalí, procurava liberar o potencial criativo do inconsciente, muitas vezes representando cenas oníricas e ilógicas.',
    },
    {
        question: 'Qual período, iniciado na Itália, marcou a redescoberta e a valorização da cultura e dos ideais da Antiguidade Clássica (Grécia e Roma), colocando o ser humano no centro das atenções (Humanismo)?',
        answers: [
            { answer: 'Renascimento', correct: true, },
            { answer: 'Idade Média', correct: false, },
            { answer: 'Barroco', correct: false, },
            { answer: 'Modernismo', correct: false, },
        ],
        explanation: 'O Renascimento foi um período de grande florescimento cultural, revivendo o Classicismo e promovendo o Humanismo, destacando a importância do indivíduo.',
    },
    {
        question: 'Qual artista do Pós-Impressionismo é famoso por suas cores intensas, pinceladas visíveis e espessas (impasto), e pela obra "A Noite Estrelada"?',
        answers: [
            { answer: 'Vincent van Gogh', correct: true, },
            { answer: 'Paul Cézanne', correct: false, },
            { answer: 'Georges Seurat', correct: false, },
            { answer: 'Henri Matisse', correct: false, },
        ],
        explanation: 'Vincent van Gogh é um dos nomes mais reconhecidos do Pós-Impressionismo, famoso por suas emoções transmitidas através das cores vibrantes e do uso de "impasto" (tinta espessa).',
    },
    {
        question: 'O que significa "arte abstrata" ou "abstracionismo"?',
        answers: [
            { answer: 'Arte que representa a realidade de forma muita detalhada e fiel', correct: false, },
            { answer: 'Arte que não representa objetos reconheciveis do mundo real', correct: true, },
            { answer: 'Arte que só pode ser entendida por quem a cria', correct: false, },
            { answer: 'arte criada por maquinas e computadores', correct: false, },
        ],
        explanation: 'O Abstracionismo (ou arte abstrata) foca em cores, linhas e formas, sem a intenção de representar objetos, pessoas ou paisagens reconhecíveis.',
    },
    {
        question: 'O estilo Barroco do século XVII é famoso por usar uma técnica dramática de pintura que enfatiza o forte contraste entre áreas de luz e sombra. Qual é o nome dessa técnica?',
        answers: [
            { answer: 'Pontilhismo', correct: false, },
            { answer: 'Sfumato', correct: false, },
            { answer: 'Perspectiva Linear', correct: false, },
            { answer: 'Claro-Escuro (Tenebrismo)', correct: true, },
        ],
        explanation: 'O Claro-Escuro (ou Tenebrismo), popularizado por Caravaggio, utiliza o contraste extremo de luz e sombra para criar drama e profundidade, característica marcante do Barroco.',
    },
];

// Inicia o Quiz
function init() {
    // Inicializa o total de perguntas na tela
    document.querySelector('#questions-qty-current').textContent = questions.length;
    document.querySelector('#questions-qty-total').textContent = questions.length;

    // Cria a primeira pergunta
    createQuestion(actualQuestionIndex);
    updateNavigationButtons();
}

// Cria uma pergunta
function createQuestion(i) {
    // Esconder explicação ao carregar uma nova questão
    explanationBox.classList.add('hide');

    // Limpar questão anterior
    const oldButtons = answerBox.querySelectorAll('.answer-button:not(.answer-template)');
    oldButtons.forEach((btn) => {
        btn.remove();
    });

    // Alterar texto da pergunta
    const questionText = document.querySelector('#question-text');
    const questionNumber = document.querySelector('#question-number');

    questionText.textContent = questions[i].question;
    questionNumber.textContent = i + 1;

    // Inserir alternativas
    questions[i].answers.forEach((answer, j) => {
        // Cria template botão quizz
        const answerTemplate = document.querySelector('.answer-template').cloneNode(true);

        // Preenche o texto da letra e da resposta
        const letterBtn = answerTemplate.querySelector('.btn-letra');
        const answerText = answerTemplate.querySelector('.question-answer');

        letterBtn.textContent = letters[j];
        answerText.textContent = answer['answer'];

        answerTemplate.setAttribute('correct-answer', answer['correct']);
        answerTemplate.setAttribute('data-answer-index', j); // Armazena o índice da resposta

        // Remover hide e template class
        answerTemplate.classList.remove('hide');
        answerTemplate.classList.remove('answer-template');

        // Inserir alternativa na tela
        answerBox.appendChild(answerTemplate);

        // Adicionar evento click APENAS se a questão ainda não foi respondida
        if (!userAnswers[i]) {
            answerTemplate.addEventListener('click', function () {
                checkAnswer(this);
            });
        }
    });

    // Recarrega o estado da resposta se ela já tiver sido respondida
    if (userAnswers[i]) {
        highlightAnswer(i, userAnswers[i].chosenIndex);
        showExplanation(i);
        disableAnswerButtons(); // Desabilita os botões em questões já respondidas
    } else {
        // Garante que os botões estão habilitados para uma nova questão
        enableAnswerButtons();
    }

    updateNavigationButtons();
}

// Desabilita todos os botões de resposta
function disableAnswerButtons() {
    const buttons = answerBox.querySelectorAll('.answer-button:not(.answer-template)');
    buttons.forEach(button => {
        button.disabled = true;
    });
}

// Habilita todos os botões de resposta
function enableAnswerButtons() {
    const buttons = answerBox.querySelectorAll('.answer-button:not(.answer-template)');
    buttons.forEach(button => {
        button.disabled = false;
    });
}

// Função para marcar a resposta correta e a resposta do usuário
function highlightAnswer(questionIndex, chosenIndex) {
    const buttons = answerBox.querySelectorAll('.answer-button:not(.answer-template)');

    buttons.forEach((button) => {
        const answerIndex = parseInt(button.getAttribute('data-answer-index'));

        // Limpa classes de todos os botões primeiro
        button.classList.remove('correct-answer', 'wrong-answer');

        if (button.getAttribute('correct-answer') === 'true') {
            // Marca a resposta correta em verde
            button.classList.add('correct-answer');
        } else if (answerIndex === chosenIndex) {
            // Se o botão clicado for o incorreto, marca-o em vermelho
            button.classList.add('wrong-answer');
        }
    });
}

// Verifica e armazena a resposta do usuário
function checkAnswer(btn) {
    disableAnswerButtons(); // Desabilita todos os botões

    const chosenIndex = parseInt(btn.getAttribute('data-answer-index'));
    const isCorrect = btn.getAttribute('correct-answer') === 'true';

    // Armazena a resposta
    userAnswers[actualQuestionIndex] = {
        chosenIndex: chosenIndex,
        isCorrect: isCorrect
    };

    // Recalcula os pontos
    recalculatePoints();

    // Destaca as respostas e mostra a explicação
    highlightAnswer(actualQuestionIndex, chosenIndex);
    showExplanation(actualQuestionIndex);
    updateNavigationButtons(); // Habilita o botão Próxima após responder
}

// Exibe a explicação
function showExplanation(i) {
    const question = questions[i];
    const correctAnswerObj = question.answers.find(ans => ans.correct);
    const correctIndex = question.answers.indexOf(correctAnswerObj);

    correctLetterSpan.textContent = letters[correctIndex];
    explanationText.innerHTML = question.explanation; // Usando innerHTML para o negrito

    explanationBox.classList.remove('hide');
}

// Recalcula os pontos
function recalculatePoints() {
    points = 0;
    Object.values(userAnswers).forEach(answer => {
        if (answer.isCorrect) {
            points++;
        }
    });
}

// Atualiza o estado dos botões de navegação
function updateNavigationButtons() {
    // Botão Voltar: Desabilita se estiver na primeira questão
    prevQuestionBtn.disabled = actualQuestionIndex === 0;

    // Botão Próxima: Desabilita se a questão atual não foi respondida
    nextQuestionBtn.disabled = !userAnswers[actualQuestionIndex];

    // Botão Próxima: Muda o texto se for a última questão
    if (actualQuestionIndex === questions.length - 1) {
        nextQuestionBtn.innerHTML = '<i class="bi bi-check-lg mr-2"></i> Finalizar Quiz';
    } else {
        nextQuestionBtn.innerHTML = 'Próxima <i class="bi bi-arrow-right ml-2"></i>';
    }
}

// Evento: Voltar Questão
prevQuestionBtn.addEventListener('click', function () {
    if (actualQuestionIndex > 0) {
        actualQuestionIndex--;
        createQuestion(actualQuestionIndex);
    }
});

// Evento: Próxima Questão
nextQuestionBtn.addEventListener('click', function () {
    // Só avança se a questão atual foi respondida
    if (!userAnswers[actualQuestionIndex]) {
        return;
    }

    if (actualQuestionIndex < questions.length - 1) {
        actualQuestionIndex++;
        createQuestion(actualQuestionIndex);
    } else {
        // Se for a última questão, finaliza
        showSuccessMessage();
    }
});

// Exibe a tela final
function showSuccessMessage() {
    hideOrShowQuizz();

    // Exibe o score
    const score = ((points / questions.length) * 100).toFixed(2);
    document.querySelector('#display-score').textContent = score.toString();

    // Exibe o número de acertos
    document.querySelector('#correct-answers').textContent = points;
}

// Mostra ou esconde o score
function hideOrShowQuizz() {
    quizzContainer.classList.toggle('hide');
    scoreContainer.classList.toggle('hide');
}

// Evento: Reiniciar Quiz
restartBtn.addEventListener('click', function () {
    // Zera o jogo
    actualQuestionIndex = 0;
    points = 0;
    userAnswers = {}; // Limpa as respostas armazenadas

    hideOrShowQuizz(); // Volta para a tela do quiz
    init();
});

// Inicia o quiz quando o script é carregado
init();