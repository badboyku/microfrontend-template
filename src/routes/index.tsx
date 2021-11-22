import * as React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Home as HomePage } from '../pages';

type Props = {};

const Routes: React.FC<Props> = (_props) => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={HomePage} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
