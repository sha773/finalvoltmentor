const quizData = {
    1: [
        { question: "What does LED stand for?", answers: ["Light Emitting Diode", "Low Energy Device", "Long Electrical Device"], correct: 0 },
        { question: "What is the function of a resistor?", answers: ["Store Energy", "Oppose Current Flow", "Increase Voltage"], correct: 1 },
        { question: "Which battery is commonly used in circuits?", answers: ["9V", "5V", "1.5V"], correct: 0 },
        { question: "What does a diode do?", answers: ["Amplify Signal", "Allow One-way Current Flow", "Reduce Resistance"], correct: 1 },
        { question: "What is the unit of resistance?", answers: ["Ohm", "Watt", "Volt"], correct: 0 },
        { question: "Which component emits light?", answers: ["Resistor", "LED", "Capacitor"], correct: 1 },
        { question: "What happens if a resistor is removed?", answers: ["No Effect", "Increased Current", "Reduced Voltage"], correct: 1 }
    ],
    2: [
        { question: "Which transistor is commonly used?", answers: ["BC547", "IC 555", "L298N"], correct: 0 },
        { question: "What does a capacitor do?", answers: ["Store Charge", "Increase Current", "Emit Light"], correct: 0 },
        { question: "What is IC 555 used for?", answers: ["Voltage Regulation", "Timing and Oscillation", "Increasing Power"], correct: 1 },
        { question: "What does LDR stand for?", answers: ["Light Dependent Resistor", "Low Delay Resistance", "Linear Dual Resistance"], correct: 0 },
        { question: "Which component amplifies a signal?", answers: ["Transistor", "Diode", "Relay"], correct: 0 },
        { question: "What is the function of a relay?", answers: ["Control High Voltage", "Store Charge", "Increase Resistance"], correct: 0 },
        { question: "Which component changes resistance with light?", answers: ["Capacitor", "LDR", "IC 555"], correct: 1 }
    ],
    3: [
        { question: "Which microcontroller is used in IoT?", answers: ["ESP8266", "LDR", "IC 555"], correct: 0 },
        { question: "What is the function of an Ultrasonic Sensor?", answers: ["Measure Distance", "Measure Voltage", "Store Energy"], correct: 0 },
        { question: "Which component controls a motor?", answers: ["Motor Driver", "LED", "Capacitor"], correct: 0 },
        { question: "Which display is used in electronics?", answers: ["LCD 16x2", "IC 555", "Transistor"], correct: 0 },
        { question: "Which module is used for Bluetooth?", answers: ["HC-05", "L298N", "LDR"], correct: 0 }
    ]
};

let currentLevel = 1;
let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = 10;

const questionText = document.getElementById("question-text");
const answerButtons = document.getElementById("answer-buttons");
const scoreDisplay = document.getElementById("score");
const timerDisplay = document.getElementById("time");

// Ensure proper UI layout
document.addEventListener("DOMContentLoaded", () => {
    document.body.style.display = "flex";
    document.body.style.justifyContent = "center";
    document.body.style.alignItems = "center";
    document.body.style.height = "100vh";
    document.body.style.flexDirection = "column";
    document.body.style.textAlign = "center";

    answerButtons.style.display = "flex";
    answerButtons.style.flexDirection = "column";
    answerButtons.style.alignItems = "center";
    answerButtons.style.marginTop = "20px";
});

function loadQuestion() {
    clearInterval(timer);
    timeLeft = 10;
    timerDisplay.innerText = timeLeft;
    timer = setInterval(() => {
        timeLeft--;
        timerDisplay.innerText = timeLeft;
        if (timeLeft === 0) {
            clearInterval(timer);
            nextQuestion();
        }
    }, 1000);

    const question = quizData[currentLevel][currentQuestionIndex];
    questionText.innerText = question.question;
    answerButtons.innerHTML = "";

    question.answers.forEach((answer, index) => {
        const button = document.createElement("button");
        button.innerText = answer;
        button.classList.add("answer-btn");

        // Button styling
        button.style.display = "block";
        button.style.width = "250px";
        button.style.margin = "10px auto";
        button.style.padding = "10px";
        button.style.fontSize = "16px";
        button.style.borderRadius = "5px";
        button.style.cursor = "pointer";

        button.onclick = () => selectAnswer(index, question.correct, button);
        answerButtons.appendChild(button);
    });
}

function selectAnswer(selected, correct, button) {
    clearInterval(timer);
    if (selected === correct) {
        score++;
        button.style.backgroundColor = "green";
    } else {
        button.style.backgroundColor = "red";
    }
    scoreDisplay.innerText = score;
    setTimeout(() => nextQuestion(), 500);
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizData[currentLevel].length) {
        loadQuestion();
    } else {
        checkLevelCompletion();
    }
}

function checkLevelCompletion() {
    if (score === quizData[currentLevel].length) {
        unlockComponents(currentLevel);
    } else {
        alert("You must answer all correctly to unlock components. Try again!");
        resetQuiz();
    }
}

function unlockComponents(level) {
    localStorage.setItem("unlockedLevel", level);
    
    if (level < 3) {
        alert(`Congrats! You unlocked Level ${level} components.`);
        currentLevel++;
        resetQuiz();
    } else {
        localStorage.setItem("quizCompleted", "true"); // Unlock circuit page
        alert("Congrats! You have unlocked the circuit builder.");
        window.location.href = "circuit.html";
    }
}

function resetQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    scoreDisplay.innerText = score;
    loadQuestion();
}

loadQuestion();
 

SCRIPT.JS
