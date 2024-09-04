let nextQuestionNo = 0;
let questions = fetchQuestions();
let noOfQuestionsCorrectlyAnswered = 0;
let skipedQuestions = 0;

async function loadQuestion() {
    await questions.then(data => {        
        for (nextQuestionNo; nextQuestionNo < 10;) {
            let multipleAnswers = data[nextQuestionNo].multiple_correct_answers;
            console.log('Question ' + nextQuestionNo + ' has multiple answers: ' + multipleAnswers);
            if (multipleAnswers === 'true') {
                skipedQuestions++;
                nextQuestionNo++;
            } else break;
        }

        let question = data[nextQuestionNo].question;
        document.getElementById('quiz-question').innerHTML = escapeHTML(question);

        let answers = data[nextQuestionNo].answers;

        for (const answerKey in answers) {
            let answer = answers[answerKey];
            if (answer !== null) {
                let divEle = createOption(answerKey, answer);
                document.getElementById('answers-container').appendChild(divEle);
            }
        }
    }
    );
}

function escapeHTML(str) {
    return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function createOption(answerKey, answer) {
    const divEle = document.createElement('div');
    divEle.className = 'form-check col-sm-6';

    const inputEle = document.createElement('input');
    inputEle.className = 'form-check-input';
    inputEle.type = 'radio';
    inputEle.name = 'option'
    inputEle.id = answerKey;

    const labelEle = document.createElement('label');
    labelEle.className = 'form-check-label';
    labelEle.innerHTML = escapeHTML(answer);
    labelEle.setAttribute('for', answerKey);
    labelEle.id = answerKey + '-label'

    divEle.appendChild(inputEle);
    divEle.appendChild(labelEle);

    return divEle;
}

async function submit() {
    const selectedOption = document.querySelector('input[name="option"]:checked');
    let selectedAnswer = selectedOption.id;
    const answer = document.getElementById(selectedAnswer + '-label').innerHTML;
    await questions.then(data => {
        if (data[nextQuestionNo].correct_answer === selectedAnswer) {
            noOfQuestionsCorrectlyAnswered++;
            allCorrectAnswers.push(answer);
        }
    })   
    nextQuestionNo++
    document.getElementById('answers-container').innerHTML = '';
    if (nextQuestionNo >= 10) {
        document.getElementById('quiz-question').innerHTML = 
        'You have answered: ' + noOfQuestionsCorrectlyAnswered + ' of ' + (nextQuestionNo - skipedQuestions) + ' correctly!!!';
        document.getElementById('quiz-question').style.color = 'green';
        document.getElementById('submit-btn').style.display = 'none';

        const startOverBtn = document.createElement('button');
        startOverBtn.className = 'btn btn-primary mx-auto btn-sm w-25 col mt-3';
        startOverBtn.innerHTML = 'Start over';
        startOverBtn.addEventListener('click', startOver)
        startOverBtn.id = 'startOverBtn';

        document.getElementById('main-container').appendChild(startOverBtn);
    } else {
        loadQuestion();
    }
}

function startOver() {
    location.reload();
}

async function fetchQuestions() {
    const API_TOKEN = 'M6XgQMOYpkIcUBgvmynQjVJRyzf5197BkDLklrYd';
    
    return await fetch(`https://quizapi.io/api/v1/questions?apiKey=${API_TOKEN}&limit=10`)
    .then(response => {
        if (!response.ok) throw new Error('Did not receive any data');
        return response.json();
    }).catch(error => console.error('Error: ' + error));
}

document.addEventListener('DOMContentLoaded', loadQuestion);