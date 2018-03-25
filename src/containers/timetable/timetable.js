import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './timetable.css';
import {Row, Col} from 'react-materialize'

import Schedule from './shedule';
import Elector from './elector';
import Header from '../header/header';

class TimeTable extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
      return (
        <Row styleName="main">
          <Col s={12} m={9} styleName="left-block"><Header /><Schedule /></Col>
          <Col s={12} m={3} styleName="right-block"><Elector /></Col>
        </Row>
      );
    }
}

export default CSSModules(TimeTable, styles);
