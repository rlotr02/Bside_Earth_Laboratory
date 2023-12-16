import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppContainer } from './App.style';
import StartPage from './components/pages/StartPage';
import SetNamePage from './components/pages/SetNamePage';
import ChatPage from './components/pages/ChatPage';
import ResultPage from './components/pages/ResultPage';

const App: React.FC = () => {
  return (
    <AppContainer>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<StartPage />} />
          <Route path="/set-name" element={<SetNamePage />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/result" element={<ResultPage />} />
        </Routes>
      </BrowserRouter>
    </AppContainer>
  );
};

export default App;
