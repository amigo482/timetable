import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Switch, Route, Router } from 'react-router';
import store from './store/configureStore';
import history from './history/history';
import TimeTable from './containers/timetable/timetable';
import NotFound from './components/notFound/notFound';
import Login from './containers/login/login';
import Admin from './containers/admin/admin';
import './index.css';

require("./react-datepicker-cssmodules.css");

render(
  <div>
    <Provider store={store}>
      <Router history={history}>
        <Switch>
          <Route exact={true} path="/admin" component={Admin}/>
          <Route exact={true} path="/timetable" component={TimeTable}/>
          <Route path="/login" component={Login}/>
          <Route path="*" component={NotFound} />
        </Switch>
      </Router>
    </Provider>
  </div>,
  document.getElementById('root'),
);
