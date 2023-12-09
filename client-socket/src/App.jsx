import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { HomePage } from '@/pages/home';
import { MatchPage } from '@/pages/match';

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/partido/:id' element={<MatchPage />} />
        <Route path='*' element={<Navigate to='/' />} />
      </Routes>
    </BrowserRouter>
  );
};
