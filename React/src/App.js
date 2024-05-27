import logo from './logo.svg';
import './App.css';
import Homepage from './pages/Homepage/homepage';
import ReviewPage from './pages/ReviewPage.js/ReviewPage';
import { Routes, Route } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import LoginPage, { UserProvider } from './pages/Homepage/LoginPage';



function App() {

  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLEID}>
      <UserProvider>

        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="review" element={<ReviewPage />} />
        </Routes>
      </UserProvider >

    </GoogleOAuthProvider>

  );

}

export default App;
