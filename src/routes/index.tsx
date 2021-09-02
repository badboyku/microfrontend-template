import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import HomePage from '../pages/Home';

export default (_props: object) => {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
    </Switch>
  );
};
