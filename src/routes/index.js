import React from 'react';
import { Switch } from 'react-router-dom';

import MyRoute from './MyRoute';
import Login from '../pages/Login';
import Worker from '../pages/Worker';
import Workers from '../pages/Workers';
import Register from '../pages/Register';
import Pictures from '../pages/Pictures';
import Page404 from '../pages/Page404';

export default function AppRoutes() {
  return (
    <Switch>
      <MyRoute exact path="/" component={Workers} isClosed={false} />
      <MyRoute exact path="/worker/:id/edit" component={Worker} isClosed />
      <MyRoute exact path="/worker/" component={Worker} isClosed />
      <MyRoute exact path="/pictures/:id" component={Pictures} />
      <MyRoute exact path="/register/" component={Register} isClosed={false} />
      <MyRoute exact path="/login/" component={Login} isClosed={false} />
      <MyRoute path="*" component={Page404} />
    </Switch>
  );
}
