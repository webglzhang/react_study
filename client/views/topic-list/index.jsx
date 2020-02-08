import React from 'react';
import {
  observer,
  inject,
} from 'mobx-react';
import PropTypes from 'prop-types';
import { AppState } from '../../store/app.state'


@inject('appState') @observer
class TopicList extends React.Component {
  constructor() {
    super();
    this.changeName = this.changeName.bind(this);
  }

  componentDidMount() {
    // do something here
  }

  changeName(event) {
    const { appState } = this.props;
    appState.changeName(event.target.value)
  }

  render() {
    const { appState } = this.props;
    const { msg } = appState;

    return (
      <div>
        <input type="text" onChange={this.changeName} />
        <div>{msg}</div>
      </div>
    )
  }
}

TopicList.propTypes = {
  appState: PropTypes.instanceOf(AppState),
};

export default TopicList;
