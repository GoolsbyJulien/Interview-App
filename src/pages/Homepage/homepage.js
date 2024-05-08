import QuestionPanel from "../../components/QuesionPanel/QuestionPanel";
import WebCamGetter from "../../components/Webcam/Webcam";

export default function Homepage() {
    return (

        <div style={{ height: "100vh", overflow: "hidden" }}>
            <WebCamGetter />
            <QuestionPanel />
        </div>
    );
}