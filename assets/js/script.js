const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progress-text');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progress-bar-full');

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
    {
        question: 'Who won the first World Cup?',
        choice1: 'Brazil',
        choice2: 'Spain',
        choice3: 'Uruguay',
        choice4: 'England',
        answer: 3,
    },
    {
        question: 'What year was the first World Cup held?',
        choice1: '1922',
        choice2: '1902',
        choice3: '1990',
        choice4: '1930',
        answer: 4,
    },
    {
        question: 'Where was the first World Cup held?',
        choice1: 'Uruguay',
        choice2: 'Argentina',
        choice3: 'France',
        choice4: 'Peru',
        answer: 1,
    },
    {
        question: 'Who has scored the most World Cup goals?',
        choice1: 'Harry Kane',
        choice2: 'Miroslav Klose',
        choice3: 'Ronaldo',
        choice4: 'Pele',
        answer: 2,
    },
    {
        question: 'Which country has won the World Cup the most times?',
        choice1: 'France',
        choice2: 'Brazil',
        choice3: 'Italy',
        choice4: 'Germany',
        answer: 2,
    }
]

const score_points = 10;
const max_questions = 5;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion ();
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > max_questions) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('/end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${max_questions}`
    progressBarFull.style.width = `${(questionCounter/max_questions) * 100}%`

    const questionIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions [questionIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct-answer' : 'incorrect-answer'

        if(classToApply === 'correct') {
            incrementScore(score_points)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()
        }, 1000)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()

/* end game js */

const username = document.querySelector('#username');
const saveScoreBtn = document.querySelector('save-score-btn');
const finalScore = document.querySelector('#final-score');
const mostRecentScore = document.querySelector('#most-recent-score');

const highScores = JSON.parse(localStorage.getItem('highScores')) || []

const MAX_HIGH_SCORES = 5

finalScore.innerText = mostRecentScore

username.addEventListener('keyup', () => {
    saveScoreBtn.disabled = !username.value
})

saveHighScore = e => {
    e.preventDefault()

    const score = {
        score: mostRecentScore,
        name: username.value
    }

    highScores.push(score)

    highScores.sort((a,b) => {
        return b.score - a.score
    })

    highScores.splice(5)

    localStorage.setItem('highScores', JSON.stringify(highScores))
    window.location.assign('/')
}

/* leaderboard js */

const highScoresList = document.querySelector('#high-score-list')
const highScores = JSON.parse(localStorage.getItem('highScores')) || []

highScoresList.innerHTML = highScores.map(score => {
    return `<li class="high-score">${score.name} - ${score.score}</li>`
})