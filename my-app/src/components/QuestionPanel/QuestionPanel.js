import React, { useImperativeHandle, useState, forwardRef, useRef, useEffect } from "react";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import styles from './QuestionPanel.module.css';
import { useNavigate } from 'react-router-dom';
import { NUM_OF_QUESTIONS } from "../../classes/Round";


const STATES = {
    WAITING: 0,
    LISTENING: 1,
    ANSWERED: 2
}

const QuestionPanel = ({ question, questionNumber, changeQuestion }) => {
    const timerRef = useRef(null);
    let state = STATES.WAITING;


    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition
    } = useSpeechRecognition();

    if (!browserSupportsSpeechRecognition) {
        return <span>Browser doesn't support speech recognition.</span>;
    }

    if (listening)
        state = STATES.LISTENING;

    if (!listening && transcript !== "")
        state = STATES.ANSWERED;

    return (
        <div className={styles.questionPanel}>

            <div>
                <Timer ref={timerRef} />
                <h2>
                    {question}

                    <span className={styles.questionCounter}>Question {questionNumber}/{NUM_OF_QUESTIONS}</span>
                </h2>

                <p>{state !== 0 ? transcript : "Answer"}</p>
            </div>
            <div className={styles.controls}>


                <SpeechButton state={state} resetTranscript={resetTranscript} timerRef={timerRef} />
                <button disabled={state !== 2} className={styles.nextButton} onClick={() => { resetTranscript(); changeQuestion(transcript) }}>Next ➔</button >

            </div>
        </div >
    );
};

const SpeechButton = ({ state, resetTranscript, timerRef }) => {


    const onClick = () => {

        if (state === STATES.WAITING || state === STATES.ANSWERED) {
            timerRef.current.reset();
            window.speechSynthesis.cancel();
            timerRef.current.start();
            resetTranscript();
            SpeechRecognition.startListening({ continuous: true });
            console.log("Recording...");
        }
        else {

            if (timerRef.current.getTime() < 2)
                return;
            timerRef.current.pause();

            SpeechRecognition.stopListening()
        }
    };

    let buttonColor = "rgb(52, 137, 255)";
    let buttonText = "";


    if (state === STATES.WAITING) {
        buttonText = "Answer";
        buttonColor = "rgb(52, 137, 255)";

    }
    if (state === STATES.LISTENING) {
        buttonText = "Done";
        buttonColor = "rgb(241, 69, 118)";

    }
    if (state === STATES.ANSWERED)
        buttonText = "Redo";
    return (
        <button
            style={{ backgroundColor: buttonColor }}
            className={styles.speechButton}
            onClick={onClick}>
            {buttonText}

        </button>
    );


}

const Timer = forwardRef((props, ref) => {
    let timeInterval = useRef(null);

    const [timer, setTimer] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    useImperativeHandle(ref, () => ({
        start, reset, pause, getTime
    }));


    const start = () => {
        if (isRunning) return;
        setIsRunning(true);
        timeInterval.current = setInterval(() => {
            setTimer((prev) => prev + 1);
        }, 1000);
    }

    const pause = () => {
        if (!isRunning) return;
        setIsRunning(false);
        clearInterval(timeInterval.current);
    }

    const reset = () => {
        setIsRunning(false);
        clearInterval(timeInterval.current);
        setTimer(0);
    }

    const getTime = () => {
        return timer;
    }

    return <p className={styles.timer} > {timer}</p >;
});



export default QuestionPanel;

