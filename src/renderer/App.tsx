import { ThemeProvider } from '@mui/material';
import { FC } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import icon from '../../assets/icon.svg';
import './App.css';
import { dark } from './themes';
import Index from './views';
import MainHome from './views/main';
import SearchHome from './views/search';


const App: FC = () => (
  <ThemeProvider theme={dark}>
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/main" element={<MainHome />} />
        <Route path="/search" element={<SearchHome />} />
      </Routes>
    </Router>
  </ThemeProvider>
)

export default App
