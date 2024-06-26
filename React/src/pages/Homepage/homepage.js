import { useState, useEffect } from "react";
import { loadQuestion } from "../../classes/QuestionLoader";
import QuestionPanel from "../../components/QuestionPanel/QuestionPanel";
import WebCamGetter from "../../components/Webcam/Webcam";
import { getRoundManager } from "../../Global";
import { Navigate, useNavigate } from "react-router-dom";
import { NUM_OF_QUESTIONS } from "../../classes/Round";

export default function Homepage() {
    let roundManager = getRoundManager();

    const [question, setQuestion] = useState(roundManager.questions[0]);
    const navigate = useNavigate();

    useEffect(() => {

        textToSpeech(question);

    }, [question]);

    console.log("dad " + process.env.REACT_APP_TEST);
    return (

        <div style={{ height: "100vh", overflow: "hidden" }}>
            <WebCamGetter />
            <QuestionPanel question={question} questionNumber={roundManager.round + 1} changeQuestion={(answer) => {
                setQuestion(roundManager.getNextQuestion(answer));
                if (roundManager.round >= NUM_OF_QUESTIONS)
                    navigate("/review");
            }} />
        </div>
    );
}

function textToSpeech(text) {


    window.speechSynthesis.cancel();
    const msg = new SpeechSynthesisUtterance();
    msg.voice = window.speechSynthesis.getVoices()[5];
    msg.text = text;
    //window.speechSynthesis.speak(msg);

}