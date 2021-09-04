import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routes from './routes';

type Props = {};

const App: React.FC<Props> = (_props) => {
  return (
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  );
};

export default App;
