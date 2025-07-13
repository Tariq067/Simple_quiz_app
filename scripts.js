const questions = [
    {
        question: "How did they feel when they visited the forest?",
        options: ["safe", "dangerous", "very small", "too dark"],
        answer: "dangerous"
    },
    {
        question: "What frightened them in the jungle?",
        options: ["lion", "jackal", "bear", "tiger"],
        answer: "bear"
    },
    {
        question: "How did Basit feel when he saw the bear coming towards him?",
        options: ["happy", "sad", "frightened", "upset"],
        answer: "frightened"
    },
    {
        question: "What is the chemical symbol for water?",
        options: ["H2O", "CO2", "O2", "NaCl"],
        answer: "H2O"
    },
    {
        question: "What did both friends do on the nearby canal on weekends?",
        options: ["laughed", "joked", "fished", "swam"],
        answer: "fished"
    }
];
const questionElement = document.getElementById("question");
const options = document.getElementById("options");
const optionElements = document.querySelectorAll(".option");
const nextButton = document.getElementById("next-btn");
let currentQuestionIndex = 0;
let score = 0;
 optionElements.forEach(option => {
        option.setAttribute("disabled", true);
        option.classList.add("disabled");
    });
function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;   
    nextButton.innerHTML = "Next Question";
    loadQuestion();    
   }
function loadQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    let question_number = currentQuestionIndex + 1;
    questionElement.innerHTML = `Question ${question_number}: ${currentQuestion.question}`;    
    currentQuestion.options.forEach((choice, index) => {
        optionElements[index].innerHTML = choice; 
        optionElements[index].removeAttribute("disabled");
        optionElements[index].classList.remove("disabled");       
    });
    
    nextButton.onclick = nextQuestion;
}
function selectOption(selectedOption) {
    const currentQuestion = questions[currentQuestionIndex];
    optionElements.forEach(option => {
        option.setAttribute("disabled", true);
       if (option.innerHTML === currentQuestion.answer) {
            option.classList.add("correct");
        }
    });
    if (currentQuestion.answer === selectedOption.innerHTML) {
        selectedOption.classList.add("correct");
        score++;
    } else {
        selectedOption.classList.add("wrong");
    }
    // Enable the next button to go to the next question
    nextButton.onclick = nextQuestion;
}
function nextQuestion() {
    // Remove highlight classes for next question
    optionElements.forEach(option => {
        option.classList.remove("correct", "wrong", "disabled");
    });
   
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    }
    else if (currentQuestionIndex === questions.length) {
        console.log(currentQuestionIndex);
        alert("You have reached the end of the quiz.");
        nextButton.innerHTML = "Finish Quiz";  
        nextButton.onclick = function() {
            optionElements.forEach((option, i) => {
                option.innerHTML = "option " + (i + 1);                
            });
            questionElement.innerHTML = "Quiz completed! Your score is : " + score + " out of " + questions.length;
            nextButton.innerHTML = "Restart Quiz";
            nextButton.onclick = function() {
                startQuiz();
            };
        };
    }
    else {
        // Quiz completed
        alert("Quiz completed! Your score is : " + score + " out of " + questions.length);
        nextButton.innerHTML = "Restart Quiz";
        nextButton.onclick = function() {
            startQuiz();
        };        
    }
}