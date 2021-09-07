import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routes from './routes';

type Props = {};

const App = (_props: Props): JSX.Element => {
  return (
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  );
};

export default App;
