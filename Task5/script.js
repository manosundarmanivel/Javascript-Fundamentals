const quizContainer = document.getElementById("quiz");
const resultContainer = document.getElementById("result");

let currentQuestionIndex = 0;
let score = 0;
let questions = [];

fetch("questions.json")
    .then(response => response.json())
    .then(data => {
        questions = data;
        loadQuestion();
    })
    .catch(error => console.error("Error loading questions:", error));

function loadQuestion() {
    if (currentQuestionIndex >= questions.length) {
        showResults();
        return;
    }

    const questionData = questions[currentQuestionIndex];
    
    quizContainer.innerHTML = `<h3>${questionData.question}</h3>`;

    questionData.options.forEach((option, index) => {
        const button = document.createElement("button");
        button.innerText = option;
        button.classList.add("option");
        button.addEventListener("click", () => checkAnswer(index));
        quizContainer.appendChild(button);
    });
}

function checkAnswer(selectedIndex) {
    if (questions[currentQuestionIndex].correct === selectedIndex) {
        score++;
    }
    currentQuestionIndex++;
    loadQuestion();
}

function showResults() {
    quizContainer.innerHTML = "";
    resultContainer.innerHTML = `<h2>Your Score: ${score} / ${questions.length}</h2>`;
}
