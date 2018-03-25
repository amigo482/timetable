import React, { Component } from 'react';
import CSSModules from 'react-css-modules';

import styles from './notFound.css';

class NotFound extends Component {

  render() {
    return (
      <div styleName="notFound">
        <h1>404 - Page Not Found</h1>
        <p>I'm sorry, the page you were looking for cannot be found!</p>
      </div>
    )
  }
}

export default CSSModules(NotFound, styles);