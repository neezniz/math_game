var score = 0;
var numQuestions = 5;
var currentQuestion = null;
var currentOperator = '+';
var gameStarted = false;
var questionCount = 0;

function generateQuestion() {
    var num1 = Math.floor(Math.random() * 10) + 1;
    var num2 = Math.floor(Math.random() * 10) + 1;
    var operators = ["+", "-", "*", "/"];
    var operator = currentOperator;

    var question = num1 + " " + operator + " " + num2;
    var answer = eval(question);

    return { question: question, answer: answer };
}

function startGame() {
    gameStarted = true;
    questionCount = 0;
    document.getElementById('start-button').style.display = 'none';
    document.getElementById('operator-buttons').style.display = 'flex';
    document.getElementById('operator-buttons').style.justifyContent = 'center';
    document.getElementById('operator-buttons').style.marginBottom = '20px';
    document.getElementById('game-container').style.width = '100%';
    document.getElementById('restart-button').style.display = 'none';
    nextQuestion();
}

function setOperator(operator) {
    currentOperator = operator;
    nextQuestion();
}

function displayQuestion() {
    var questionObj = generateQuestion();
    var questionElement = document.getElementById("question");
    questionElement.textContent = questionObj.question;
    currentQuestion = questionObj.answer;
}

function checkAnswer() {
    if (!gameStarted) {
        return;
    }

    var userAnswer = parseFloat(document.getElementById("answer").value);
    var resultElement = document.getElementById("result");
    var scoreElement = document.getElementById("score");

    if (!isNaN(userAnswer)) {
        if (userAnswer === currentQuestion) {
            resultElement.textContent = "ถูกต้อง!";
            score++;
        } else {
            resultElement.textContent = "ผิด!";
        }
        document.getElementById("answer").disabled = true;
        scoreElement.textContent = "คะแนน: " + score + "/" + numQuestions;
        questionCount++;

        if (questionCount >= numQuestions) {
            endGame();
        }
    } else {
        resultElement.textContent = "คุณต้องใส่คำตอบก่อน!";
    }
}

function nextQuestion() {
    if (!gameStarted) {
        return;
    }

    document.getElementById("answer").disabled = false;
    document.getElementById("answer").value = "";
    document.getElementById("result").textContent = "";

    if (questionCount >= numQuestions) {
        endGame();
    } else {
        displayQuestion();
    }
}

function endGame() {
    document.getElementById("score").textContent = "คะแนนทั้งหมดของคุณคือ " + score + "/" + numQuestions;
    document.getElementById('operator-buttons').style.display = 'none';
    document.getElementById('restart-button').style.display = 'block';
}

function restartGame() {
    score = 0;
    questionCount = 0;
    gameStarted = false;
    document.getElementById('start-button').style.display = 'block';
    document.getElementById('operator-buttons').style.display = 'none';
    document.getElementById('game-container').style.width = 'auto';
    document.getElementById('restart-button').style.display = 'none';
    document.getElementById('score').textContent = '';
}