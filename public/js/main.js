function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

console.log(
    '%c😎 Hello, you found the secret console log! ',
    'color: cyan; font-size: 24px; border: 1px solid cyan; padding: 10px; border-radius: 5px;',
);
console.log(
    "%c🔐 Let's take a security quiz! ",
    'color: cyan; font-size: 20px; border: 1px solid cyan; padding: 10px; border-radius: 5px;',
);

let quiz = {
    questions: [
        {
            question: 'What does XSS stand for in security?',
            answers: [
                'Cross Site Scripting',
                'Cross Security System',
                'Cross Site System',
            ],
            correct: 0,
        },
        {
            question: 'What is the purpose of a VPN?',
            answers: [
                'Make your internet connection slower',
                'Hide your internet activity from your ISP',
                'Increase your internet download speed',
            ],
            correct: 1,
        },
        {
            question: 'What does 2FA stand for?',
            answers: [
                'Two Factor Authentication',
                'Two Fundamental Actions',
                'Two Factor Alignment',
            ],
            correct: 0,
        },
        {
            question:
                'In the context of cryptocurrency wallets, what is a "private key"?',
            answers: [
                'A password for your email',
                'A secret key that can control access to your crypto assets',
                'A special key that makes your transactions faster',
            ],
            correct: 1,
        },
        {
            question:
                'What does "decentralization" mean in the context of blockchain?',
            answers: [
                'The data is stored in a single location',
                'The data is spread across multiple nodes or participants',
                'The data can be accessed faster',
            ],
            correct: 1,
        },
        {
            question:
                'In Discord, what is the purpose of enabling two-factor authentication?',
            answers: [
                'To unlock new Discord features',
                'To add an extra layer of security to your Discord account',
                'To increase the number of people that can join your server',
            ],
            correct: 1,
        },
        {
            question: 'What is a "server raid" in the context of Discord?',
            answers: [
                'A fun event where users try to win prizes',
                'A spam attack that can cause chaos and distract server administrators',
                'A routine process for maintaining server performance',
            ],
            correct: 1,
        },
        {
            question: 'What is the purpose of "slowmode" in Discord?',
            answers: [
                'To limit how fast messages can be sent, helping to control the pace of conversation',
                'To deliberately slow down server performance',
                'To limit the number of new members joining in a certain time period',
            ],
            correct: 0,
        },
        {
            question: 'In Web3, what is the purpose of "gas" in Ethereum?',
            answers: [
                'To power virtual vehicles in Ethereum-based games',
                'To pay for computations and transactions on the Ethereum network',
                'A type of digital currency used within the Ethereum ecosystem',
            ],
            correct: 1,
        },
        {
            question: 'What is a "smart contract" in the context of Web3?',
            answers: [
                'A digital version of a legal contract',
                'A piece of code on the blockchain that automatically executes actions when certain conditions are met',
                'A technique for speeding up website loading times',
            ],
            correct: 1,
        },
        {
            question:
                'What does "cold admin" refer to in the context of Discord server security?',
            answers: [
                'An admin who rarely participates in server activities',
                'An account with high-level permissions that is used sparingly to improve security',
                'An admin who hasnt logged into Discord for a long time',
            ],
            correct: 1,
        },
        {
            question:
                'In Discord server security, what is the role of "audit logs"?',
            answers: [
                'To keep track of the funniest memes shared in the server',
                'To record administrative actions for future review, helping to identify and address security issues',
                'To count how many messages each user sends',
            ],
            correct: 1,
        },
    ],
    currentQuestion: 0,
    score: 0,
    maxAttempts: 3,
    isRunning: false,
    start: function () {
        this.isRunning = true;
        this.score = 0;
        this.questions.forEach((q) => {
            q.correctAnswer = q.answers[q.correct];
            q.answers = shuffleArray(q.answers);
            q.correct = q.answers.indexOf(q.correctAnswer);
        });
        this.askQuestion();
    },
    stop: function () {
        this.isRunning = false;
        this.currentQuestion = 0;
        console.log(
            `%c🎉 Your final score is: ${this.score}`,
            'color: green; font-size: 20px;',
        );
    },
    askQuestion: function () {
        if (!this.isRunning) return;
        let question = this.questions[this.currentQuestion];
        let answer = prompt(
            `Question: ${question.question}\nOptions:\n0: ${question.answers[0]}\n1: ${question.answers[1]}\n2: ${question.answers[2]}\nType 'close' to stop the quiz.`,
        );

        if (answer === null || answer.toLowerCase() === 'close') {
            this.stop();
            return;
        }
        this.checkAnswer(answer);
    },
    checkAnswer: function (answer, attempt = 1) {
        let question = this.questions[this.currentQuestion];
        if (answer == question.correct) {
            console.log(
                '%c👍 Correct answer! You earn 8.33 points.',
                'color: green; font-size: 20px;',
            );
            this.score += 8.33;
        } else {
            console.log('%c👎 Wrong answer.', 'color: red; font-size: 20px;');
            if (attempt < this.maxAttempts) {
                console.log(
                    '%c💡 Hint: Read the question carefully again.',
                    'color: yellow; font-size: 20px;',
                );
                let newAnswer = prompt(
                    `Question: ${question.question}\nOptions:\n0: ${question.answers[0]}\n1: ${question.answers[1]}\n2: ${question.answers[2]}\nType 'close' to stop the quiz.`,
                );
                this.checkAnswer(newAnswer, attempt + 1);
            } else {
                console.log(
                    `%c😢 You've reached the max attempts for this question. The correct answer was ${question.correctAnswer}. Moving on to the next question.`,
                    'color: orange; font-size: 20px;',
                );
            }
        }
        this.currentQuestion++;
        if (this.currentQuestion < this.questions.length) {
            this.askQuestion();
        } else {
            this.stop();
        }
    },
};

console.log(
    '%c💡 To start the quiz, type "quiz.start()" in your console.',
    'color: cyan; font-size: 20px;',
);
window.quiz = quiz;
