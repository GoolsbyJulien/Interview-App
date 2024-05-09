import React, { useImperativeHandle, useState, forwardRef, useRef, useEffect } from "react";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import styles from './QuestionPanel.module.css';
import { useNavigate } from 'react-router-dom';
import { NUM_OF_QUESTIONS } from "../../classes/Round";




const QuestionPanel = ({ question, questionNumber, changeQuestion }) => {
    const timerRef = useRef(null);
    const navigate = useNavigate();


    /*
        0: Waiting for question
        1:Listening
        2:Question Answered
        3:

    */
    let state = 0;



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
        state = 1;

    if (!listening && transcript != "")
        state = 2;

    return (
        <div className={styles.questionPanel}>


            <div>
                <div> {state}</div>
                <Timer ref={timerRef} />
                <h2>
                    {question}

                    <span className={styles.questionCounter}>Question {questionNumber}/{NUM_OF_QUESTIONS}</span>
                </h2>

                <p>{state != 0 ? transcript : "Answer"}</p>
            </div>
            <div className={styles.controls}>


                <SpeechButton state={state} resetTranscript={resetTranscript} timerRef={timerRef} />
                <button disabled={state!=2} className={styles.nextButton} onClick={() => { resetTranscript(); changeQuestion(transcript) }}>Next ➔</button >

            </div>
        </div >
    );
};

const SpeechButton = ({ state, resetTranscript, timerRef }) => {


    const onClick = () => {

        if (state == 0 || state == 2) {
            window.speechSynthesis.cancel();
            timerRef.current.handleStart();
            resetTranscript(); SpeechRecognition.startListening({ continuous: true });
            console.log("Recording...");
        }
        else {

            if (timerRef.current.getTime() < 2)
                return;
            timerRef.current.handleReset();

            SpeechRecognition.stopListening()
        }
    };

    let buttonColor = "rgb(52, 137, 255)";
    let buttonText = "";


    if (state == 0) {
        buttonText = "Answer";
        buttonColor = "rgb(52, 137, 255)";

    }
    if (state == 1) {
        buttonText = "Done";
        buttonColor = "rgb(241, 69, 118)";

    }
    if (state == 2)
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
        handleStart, handleReset, getTime
    }));


    const handleStart = () => {
        if (isRunning) return;
        setIsRunning(true);
        timeInterval.current = setInterval(() => {
            setTimer((prev) => prev + 1);
        }, 1000);
    }

    const handlePause = () => {
        if (!isRunning) return;
        setIsRunning(false);
        clearInterval(timeInterval.current);
    }

    const handleReset = () => {
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

