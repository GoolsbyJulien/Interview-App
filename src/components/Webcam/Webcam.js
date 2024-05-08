
import Webcam from "react-webcam";
import styles from './Webcam.module.css';

function WebCamGetter() {


    return (
        <div className={styles.camContainer}>
            <Webcam className={styles.webcam} audio={false} width={500} height={500} />
        </div>)
}

export default WebCamGetter;