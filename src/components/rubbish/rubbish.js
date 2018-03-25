import React from 'react';
import CSSModules from 'react-css-modules';
import { Droppable } from 'react-drag-and-drop'

import styles from './rubbish.css';
import {Button} from 'react-materialize'

class Rubbish extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        over: false,
      }
      this.onDrop = this.onDrop.bind(this);
      this.onDragOver = this.onDragOver.bind(this);
      this.onDragLeave = this.onDragLeave.bind(this);
    }
    onDrop(data, e) {
      this.setState({over: false});
      if (data.lesson) {
        this.props.deleteLesson(data.lesson);
      } else {
        this.props.deleteCouple(data.couple);
      }
    }
    onDragOver(e) {
      const {over} = this.state;
      if (!over) {
        this.setState({over: true});
      }
    }
    onDragLeave(e) {
      this.setState({over: false});
    }
    render() {
      return (
        <Droppable
          onDragOver={this.onDragOver}
          onDragLeave={this.onDragLeave}
          types={['couple', 'lesson']}
          onDrop={this.onDrop}
          className={styles.rubbish}>
          <Button floating large type="button" styleName={this.state.over ? 'green' : ''} className='red' waves='light' icon='delete' onClick={this.props.clearCouples}/>
        </Droppable>
      );
    }
}

export default CSSModules(Rubbish, styles);
