const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progress-text = document.querySelector('#progress-text');
const score-text = document.querySelector('#score');
const progress-bar-full = document.querySelector('#progress-bar-full');

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
const max-questions = 5;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion ();
}

