import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/index';

type Props = {};

const App: React.FC<Props> = (_props: Props) => {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
};

export default App;
