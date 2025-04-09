import React from 'react';
import { CssBaseline } from '@mui/material';
import { CustomThemeProvider } from './features/theme/ThemeContext';
import VocabularyList from './features/vocabulary/VocabularyList'; 
import AddWordForm from './features/vocabulary/AddWordForm';
import QuizCard from './features/quiz/QuizCard.jsx'
import VocabularyStats from './features/stats/VocabularyStats.jsx'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <CustomThemeProvider>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<VocabularyList />} />
          <Route path="/addVocabulary" element={<AddWordForm />} />
          <Route path="/quiz" element={<QuizCard />} />
          <Route path="/statistics" element={<VocabularyStats/>} />
        </Routes>
      </Router>
    </CustomThemeProvider>
  );
}

export default App;

