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
			{
				text: 'Jennifer Lawrence and Zendaya',
				correct: false,
				images: ['../image/Jennifer Lawrence.png', '../image/Zendaya.jpg'],
			},
			{
				text: 'Eliza Taylor and Alycia Debnam-Carey',
				correct: false,
				images: [
					'../image/Eliza Teylor.png',
					'../image/Alicia-Debnam_Carey.png',
				],
			},
			{
				text: 'Zendaya and Emilia Clarke',
				correct: false,
				images: ['../image/Zendaya.jpg', '../image/Emilia Clarke.png'],
			},
			{
				text: 'Emilia Clarke and Alycia Debnam-Carey',
				correct: true,
				images: [
					'../image/Emilia Clarke.png',
					'../image/Alicia-Debnam_Carey.png',
				],
			},
		],
	},
	{
		question: 'What is my favorite actor?',
		answers: [
			{
				text: 'Bob Morley and Brad Pitt',
				correct: true,
				images: ['../image/Bob Morley.png', '../image/Brad Pitt.png'],
			},
			{
				text: 'Tom Holland and Andrew Garfield',
				correct: false,
				images: ['../image/Tom Holland.png', '../image/Andrew Garfield.png'],
			},
			{
				text: 'Brad Pitt and Jim Carrey',
				correct: false,
				images: ['../image/Brad Pitt.png', '../image/Jim Carrey.png'],
			},
			{
				text: 'Kit Harington and Bob Morley',
				correct: false,
				images: ['../image/Kit Harington.png', '../image/Bob Morley.png'],
			},
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
		button.classList.add('btn')

		// Добавление текста ответа
		const text = document.createElement('span')
		text.innerHTML = answer.text
		button.appendChild(text)

		// Добавление изображений (если они есть) под текстом
		if (answer.images && answer.images.length) {
			const imagesContainer = document.createElement('div')
			imagesContainer.classList.add('images-container')

			answer.images.forEach(imageUrl => {
				const img = document.createElement('img')
				img.src = imageUrl
				img.alt = 'Actor/Actress Image'
				img.classList.add('answer-image') // Для стилизации
				imagesContainer.appendChild(img)
			})

			button.appendChild(imagesContainer)
		}

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
