 // declaração de variáveis
        const answerBox = document.querySelector('#answers-box');
        const quizzContainer = document.querySelector('#quizz-container');
        const scoreContainer = document.querySelector('#score-container');
        const letters = ['A', 'B', 'C', 'D'];
        let points = 0;
        let actualQuestion = 0;

        // perguntas (Seu Array de perguntas)
        const questions = [
            {
                question: 'Qual movimento artístico do século XIX é conhecido por seus artistas pintarem ao ar livre (en plein air), buscando capturar os efeitos da luz e da cor em um momento específico?',
                answers: [
                    { answer: 'Impressionismo', correct: true, },
                    { answer: 'Cubismo', correct: false, },
                    { answer: 'Surrealismo', correct: false, },
                    { answer: 'Barroco', correct: false, },
                ],
            },
            {
                question: 'Quem é o famoso artista espanhol co-fundador do Cubismo e criador da obra "Guernica"?',
                answers: [
                    { answer: 'Salvador Dalí', correct: false, },
                    { answer: 'Claude Monet', correct: false, },
                    { answer: 'Andy Warhol', correct: false, },
                    { answer: 'Pablo Picasso', correct: true, },
                ],
            },
            {
                question: 'Qual movimento artístico do século XX utilizou temas da cultura de massa, como latas de sopa Campbels, histórias em quadrinhos e retratos de celebridades, tornando o cotidiano em arte?',
                answers: [
                    { answer: 'Pop Art', correct: true, },
                    { answer: 'Romantismo', correct: false, },
                    { answer: 'Expressionismo', correct: false, },
                    { answer: 'Abstracionismo', correct: false, },
                ],
            },
        ];

        // substituição do quizz para a primeira pergunta
        function init() {
            // Atualiza o total de perguntas na tela
            document.querySelector('#questions-qty-total').textContent = questions.length;
            
            // criar primeira pergunta
            createQuestion(0);
        }

        // cria uma pergunta
        function createQuestion(i) {
            // limpar questão anterior
            const oldButtons = answerBox.querySelectorAll('.answer-button:not(.answer-template)');
            oldButtons.forEach((btn) => {
                btn.remove();
            });

            // alterar texto da pergunta
            const questionText = document.querySelector('#question-text');
            const questionNumber = document.querySelector('#question-number');

            questionText.textContent = questions[i].question;
            questionNumber.textContent = i + 1;

            // inserir alternativas
            questions[i].answers.forEach((answer, j) => {
                // cria template botão quizz
                // 🚨 CORRIGIDO: Busca o template (o botão com a classe 'answer-template') para clonar
                const answerTemplate = document.querySelector('.answer-template').cloneNode(true);

                // Preenche o texto da letra e da resposta
                const letterBtn = answerTemplate.querySelector('.btn-letra');
                const answerText = answerTemplate.querySelector('.question-answer');

                letterBtn.textContent = letters[j];
                answerText.textContent = answer['answer'];

                answerTemplate.setAttribute('correct-answer', answer['correct']);

                // remover hide e template class
                answerTemplate.classList.remove('hide');
                answerTemplate.classList.remove('answer-template');

                // garantir que o botão não está desabilitado ao criar
                answerTemplate.disabled = false;

                // inserir alternativa na tela
                answerBox.appendChild(answerTemplate);

                // inserir evento click no botão
                answerTemplate.addEventListener('click', function () {
                    checkAnswer(this);
                });
            });

            // incrementa o número da questão para a próxima chamada
            actualQuestion++;
        }

        // verificar resposta do usuário
        function checkAnswer(btn) {
            // seleciona todos os botões que não são o template
            const buttons = answerBox.querySelectorAll('.answer-button:not(.answer-template)');

            // desabilita todos os botões após a primeira seleção
            buttons.forEach(button => {
                button.disabled = true;
            });

            // verifica se resposta correta e adiciona classe
            buttons.forEach((button) => {
                if (button.getAttribute('correct-answer') === 'true') {
                    // Marca a resposta correta em verde
                    button.classList.add('correct-answer');

                    // checa se usuário acertou a pergunta
                    if (btn === button) {
                        // incremento dos pontos
                        points++;
                    }
                } else {
                    // Se o botão clicado for o incorreto, marca-o em vermelho
                    if (btn === button) {
                        button.classList.add('wrong-answer');
                    }
                }
            });

            // exibir próxima pergunta
            nextQuestion();
        }

        // exibe a pŕoxima pergunta no quizz
        function nextQuestion() {
            // timer para usuário ver as respostas
            setTimeout(function () {
                // verifica se ainda há perguntas
                if (actualQuestion < questions.length) {
                    createQuestion(actualQuestion);
                } else {
                    // apresenta mensagem de sucesso
                    showSuccessMessage();
                }
            }, 1200);
        }

        // exibe a tela final
        function showSuccessMessage() {
            hideOrShowQuizz();

            // calcular score
            const score = ((points / questions.length) * 100).toFixed(2);

            const displayScore = document.querySelector('#display-score');
            displayScore.textContent = score.toString();

            // alterar o número de perguntas corretas
            const correctAnswers = document.querySelector('#correct-answers');
            correctAnswers.textContent = points;
            
            // alterar o total de perguntas
            const totalQuestions = document.querySelector('#questions-qty-total');
            totalQuestions.textContent = questions.length;
        }

        // mostra ou esonde o score
        function hideOrShowQuizz() {
            quizzContainer.classList.toggle('hide');
            scoreContainer.classList.toggle('hide');
        }

        // reiniciar quizz
        const restartBtn = document.querySelector('#restart');
        restartBtn.addEventListener('click', function () {
            // zerar jogo
            actualQuestion = 0;
            points = 0;
            hideOrShowQuizz(); // Volta para a tela do quiz
            init();
        });

        // inicialização do quizz
        init();
