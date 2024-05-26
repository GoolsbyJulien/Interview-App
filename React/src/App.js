import logo from './logo.svg';
import './App.css';
import Homepage from './pages/Homepage/homepage';
import ReviewPage from './pages/ReviewPage.js/ReviewPage';
import { Routes, Route } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import LoginPage from './pages/Homepage/LoginPage';



function App() {
  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLEID}>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="review" element={<ReviewPage />} />
      </Routes>
    </GoogleOAuthProvider>

  );

}

export default App;
