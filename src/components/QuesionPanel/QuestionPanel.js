import React, { useImperativeHandle, useState, forwardRef, useRef } from "react";
import sound from "../../assets/test.wav"
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import styles from './QuestionPanel.module.css';
const QuestionPanel = () => {
    const timerRef = useRef(null);

    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition
    } = useSpeechRecognition();

    if (!browserSupportsSpeechRecognition) {
        return <span>Browser doesn't support speech recognition.</span>;
    }


    return (
        <div className={styles.questionPanel}>


            <div>
                <Timer ref={timerRef} />
                <h2> Can you please tell me a bit about yourself?
                </h2>

                <p>{transcript != "" ? transcript : "Answer"}</p>
            </div>
            <div className={styles.controls}>
                <SpeechButton listening={listening} resetTranscript={resetTranscript} timerRef={timerRef} />
            </div>
        </div >
    );
};

const SpeechButton = ({ listening, resetTranscript, timerRef }) => {


    const onClick = () => {

        if (!listening) {
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
    return (<button style={{ backgroundColor: listening ? "rgb(241, 69, 118)" : "rgb(52, 137, 255)" }} className={styles.speechButton}
        onClick={onClick}>{listening ? "Done" : "Answer"}</button>);


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
