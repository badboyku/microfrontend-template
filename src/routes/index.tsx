import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import HomePage from '../pages/Home';

type Props = {};

const Routes = (_props: Props): JSX.Element => {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
    </Switch>
  );
};

export default Routes;
