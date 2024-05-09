import { useState } from "react";
import { loadQuestion } from "../../classes/QuestionLoader";
import QuestionPanel from "../../components/QuestionPanel/QuestionPanel";
import WebCamGetter from "../../components/Webcam/Webcam";
import { getRoundManager } from "../../Global";

export default function Homepage() {

    const [question, setQuestion] = useState(loadQuestion);


    let roundManager = getRoundManager();


    return (

        <div style={{ height: "100vh", overflow: "hidden" }}>
            <WebCamGetter />
            <QuestionPanel question={question} questionNumber={roundManager.round + 1} changeQuestion={(answer) => { setQuestion(roundManager.getNextQuestion(answer)) }} />
        </div>
    );
}