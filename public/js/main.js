function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

console.log('%c😎 Hello, you found the secret console log! ', 'color: cyan; font-size: 24px; border: 1px solid cyan; padding: 10px; border-radius: 5px;');
console.log('%c🔐 Let\'s take a security quiz! ', 'color: cyan; font-size: 20px; border: 1px solid cyan; padding: 10px; border-radius: 5px;');

let quiz = {
    questions: [
        {
            question: 'What does XSS stand for in security?',
            answers: ['Cross Site Scripting', 'Cross Security System', 'Cross Site System'],
            correct: 0
        },
        {
            question: 'What is the purpose of a VPN?',
            answers: ['Make your internet connection slower', 'Hide your internet activity from your ISP', 'Increase your internet download speed'],
            correct: 1
        },
        {
            question: 'What does 2FA stand for?',
            answers: ['Two Factor Authentication', 'Two Fundamental Actions', 'Two Factor Alignment'],
            correct: 0
        },
        {
            question: 'In the context of cryptocurrency wallets, what is a "private key"?',
            answers: ['A password for your email', 'A secret key that can control access to your crypto assets', 'A special key that makes your transactions faster'],
            correct: 1
        },
        {
            question: 'What does "decentralization" mean in the context of blockchain?',
            answers: ['The data is stored in a single location', 'The data is spread across multiple nodes or participants', 'The data can be accessed faster'],
            correct: 1
        },
    ],
    currentQuestion: 0,
    isRunning: false,
    start: function() {
        this.isRunning = true;
        this.questions.forEach(q => {
            q.correctAnswer = q.answers[q.correct];
            q.answers = shuffleArray(q.answers);
            q.correct = q.answers.indexOf(q.correctAnswer);
        });
        this.askQuestion();
    },
    stop: function() {
        this.isRunning = false;
        this.currentQuestion = 0;
    },
    askQuestion: function() {
        if (!this.isRunning) return;
        let question = this.questions[this.currentQuestion];
        let answer = prompt(`Question: ${question.question}\nOptions:\n0: ${question.answers[0]}\n1: ${question.answers[1]}\n2: ${question.answers[2]}\nType 'close' to stop the quiz.`);
        
        if (answer === null || answer.toLowerCase() === 'close') {
            this.stop();
            console.log('%c🛑 You stopped the quiz.', 'color: red; font-size: 20px;');
            return;
        }
        this.checkAnswer(answer);
    },
    checkAnswer: function(answer) {
        let question = this.questions[this.currentQuestion];
        if (answer == question.correct) {
            console.log('%c👍 Correct answer!', 'color: green; font-size: 20px;');
        } else {
            console.log('%c👎 Wrong answer, try again.', 'color: red; font-size: 20px;');
            this.askQuestion();
            return;
        }
        this.currentQuestion++;
        if (this.currentQuestion < this.questions.length) {
            this.askQuestion();
        } else {
            console.log('%c🎉 Congratulations, you completed the security quiz!', 'color: green; font-size: 24px;');
            this.stop();
        }
    }
}

console.log('%c💡 To start the quiz, type "quiz.start()" in your console.', 'color: cyan; font-size: 20px;');
window.quiz = quiz;