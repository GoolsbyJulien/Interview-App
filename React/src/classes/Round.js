import { BYPASS_SERVER } from "../Server";
import { loadQuestion, loadQuestions } from "./QuestionLoader";

export const NUM_OF_QUESTIONS = 15;

export class RoundManager {

    constructor() {
        this.reset();
    }

    reset() {
        this.round = 0;
        this.questions = new Array(NUM_OF_QUESTIONS);
        this.answers = new Array(NUM_OF_QUESTIONS);



        if (false) {
            for (let i = 0; i < NUM_OF_QUESTIONS; i++) {
                this.questions[i] = loadQuestion();
                this.answers[i] = "NA";
            }
            return;

        }

        loadQuestions().then((res) => {


            if (res == null) {

                console.warn("Sever is offline");
                return;
            }

            for (let i = 0; i < NUM_OF_QUESTIONS; i++) {
                this.answers[i] = "NA";


                this.questions[i] = (res[i]);
            }
        });

    }

    getNextQuestion(answer) {

        console.log(this.questions);
        let q = this.questions[this.round];
        this.answers[this.round] = answer;
        this.round++;

        if (this.round >= NUM_OF_QUESTIONS)
            return "-1";


        return q;


    }


}

