import * as React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Home } from '../pages';

type Props = {};

const AppRoutes: React.FC<Props> = (_props: Props) => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  );
};

export default AppRoutes;
