import React from 'react';
import {
  Route,
  Redirect,
} from 'react-router';

import TopicList from '../views/topic-list/index';
import TopicDetail from '../views/topic-detail/index';

export default () => [
  <Route path="/" render={() => <Redirect to="/list" />} exact key="frist" />,
  <Route path="/list" component={TopicList} key="list" />,
  <Route path="/detail" component={TopicDetail} key="detail" />,
]
