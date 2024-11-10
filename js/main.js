const questions = [
	{
		question: 'What is my favorite series?',
		answers: [
			{ text: 'Paper house', correct: false },
			{ text: 'Game of Thrones', correct: true },
			{ text: 'The last of us', correct: false },
			{ text: 'The100', correct: false },
		],
	},
	{
		question: 'What is my favorite film?',
		answers: [
			{ text: 'Challengers', correct: true },
			{ text: 'Hunger Games', correct: false },
			{ text: 'Spider Man', correct: false },
			{ text: 'Hacksaw Ridge', correct: false },
		],
	},
	{
		question: 'What is my favorite acctress?',
		answers: [
			{ text: 'Jennifer Lawrence and Zendaya', correct: false },
			{ text: 'Eliza Taylor and Alycia Debnam-Carey', correct: false },
			{ text: 'Zendaya and Emilia Clarke', correct: false },
			{ text: 'Emilia Clarke and Alycia Debnam-Carey', correct: true },
		],
	},
	{
		question: 'What is my favorite actor?',
		answers: [
			{ text: 'Bob Morley and Brad Pitt', correct: true },
			{ text: 'Tom Holland and Andrew Garfield', correct: false },
			{ text: 'Brad Pitt and Jim Carrey', correct: false },
			{ text: 'Kit Harington and Bob Morley', correct: false },
		],
	},
	{
		question: 'What is my favorite football club?',
		answers: [
			{ text: 'Bayern Munich', correct: false },
			{ text: 'Real Madrid', correct: true },
			{ text: 'Barcelona', correct: false },
			{ text: 'Manchester United', correct: false },
		],
	},
	{
		question: 'What is favorite footballer right now?',
		answers: [
			{ text: 'Andriy Lunin', correct: false },
			{ text: 'Arda Guler', correct: false },
			{ text: 'Jude Bellingham', correct: true },
			{ text: 'Erling Haaland', correct: false },
		],
	},
	{
		question: 'What is favorite footballer of all time?',
		answers: [
			{ text: 'Leonel Messi', correct: false },
			{ text: 'Cristiano Ronaldo', correct: true },
			{ text: 'Andrii Shevchenko', correct: false },
			{ text: 'Zinedine Zidane', correct: false },
		],
	},
	{
		question: 'Which country did I want to move to as a child?',
		answers: [
			{ text: 'USA', correct: false },
			{ text: 'Spain', correct: true },
			{ text: 'There wasn`t one', correct: false },
			{ text: 'Portugal', correct: false },
		],
	},
	{
		question: 'Which country do I want to move to now',
		answers: [
			{ text: 'USA', correct: true },
			{ text: 'Spain', correct: false },
			{ text: 'There wasn`t one', correct: false },
			{ text: 'Portugal', correct: false },
		],
	},
]

const questionElement = document.getElementById('question')
const answerButton = document.getElementById('answer-buttons')
const nextButton = document.getElementById('next-btn')

let currentQuestionIndex = 0
let score = 0

function startQuiz() {
	currentQuestionIndex = 0
	score = 0
	nextButton.innerHTML = 'Next'
	showQuestion()
}

function showQuestion() {
	resetState()
	let currentQuestion = questions[currentQuestionIndex]
	let questionNO = currentQuestionIndex + 1
	questionElement.innerHTML = questionNO + '. ' + currentQuestion.question

	currentQuestion.answers.forEach(answer => {
		const button = document.createElement('button')
		button.innerHTML = answer.text
		button.classList.add('btn')
		answerButton.appendChild(button)
		if (answer.correct) {
			button.dataset.correct = answer.correct
		}
		button.addEventListener('click', selectAnswer)
	})
}

function resetState() {
	nextButton.style.display = 'none'
	while (answerButton.firstChild) {
		answerButton.removeChild(answerButton.firstChild)
	}
}

function selectAnswer(e) {
	const selectedBtn = e.target
	const isCorrect = selectedBtn.dataset.correct === 'true'
	if (isCorrect) {
		selectedBtn.classList.add('correct')
		score++
	} else {
		selectedBtn.classList.add('incorrect')
	}
	Array.from(answerButton.children).forEach(button => {
		if (button.dataset.correct === 'true') {
			button.classList.add('correct')
		}
		button.disabled = true
	})
	nextButton.style.display = 'block'
}

function showScore() {
	resetState()
	questionElement.innerHTML = `You scored ${score} out of ${questions.length} questions!`
	nextButton.innerHTML = 'Play Again'
	nextButton.style.display = 'block'
}

function handleNextButton() {
	currentQuestionIndex++
	if (currentQuestionIndex < questions.length) {
		showQuestion()
	} else {
		showScore()
	}
}

nextButton.addEventListener('click', () => {
	if (currentQuestionIndex < questions.length) {
		handleNextButton()
	} else {
		startQuiz()
	}
})

startQuiz()
