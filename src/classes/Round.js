import { loadQuestion } from "./QuestionLoader";

export const NUM_OF_QUESTIONS = 15;

export class RoundManager {

    constructor() {
        this.reset();
    }

    reset() {
        this.round = 0;
        this.questions = new Array(NUM_OF_QUESTIONS);

        this.answers = new Array(NUM_OF_QUESTIONS);
        for (let i = 0; i < NUM_OF_QUESTIONS; i++) {
            this.questions[i] = loadQuestion();
            this.answers[i] = "This is a test ";

        }

    }

    getNextQuestion(answer) {


        let q = this.questions[this.round];

        if (this.round >= NUM_OF_QUESTIONS)
            return "END OF ROUND";
        this.answers[this.round] = answer;
        this.round++;

        return q;


    }


}

