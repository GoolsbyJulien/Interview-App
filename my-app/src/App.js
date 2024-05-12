import logo from './logo.svg';
import './App.css';
import Homepage from './pages/Homepage/homepage';
import ReviewPage from './pages/ReviewPage.js/ReviewPage';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (

    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="review" element={<ReviewPage />} />


    </Routes>);

}

export default App;
