import * as React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home as HomePage } from '../pages';

type Props = {};

const AppRoutes: React.FC<Props> = (_props: Props) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
