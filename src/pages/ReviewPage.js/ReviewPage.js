import { getRoundManager } from "../../Global";
import styles from './ReviewPage.module.css';

export default function ReviewPage() {
    let roundManager = getRoundManager();


    return (
        <ul>
            {roundManager.questions.map((question, index) => (
                <li className={styles.QABox} key={question}><h2>{index} {question}</h2> <p>{roundManager.answers[index]}</p></li>
            ))}
        </ul>
    );

}