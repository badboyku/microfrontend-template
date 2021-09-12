import * as React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import HomePage from '../pages/Home/Home';

type Props = {};

const Routes = (_props: Props): JSX.Element => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={HomePage} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
