import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './couple.css';
import { Draggable, Droppable } from 'react-drag-and-drop';
import { CollectionItem, Chip } from 'react-materialize'
import { slideInDown } from 'react-animations';
import Radium, {StyleRoot} from 'radium';

class Couple extends React.Component {
    constructor(props) {
      super(props);
      this.onDragStart = this.onDragStart.bind(this);
      this.onDragEnd = this.onDragEnd.bind(this);
      this.onDrop = this.onDrop.bind(this);
      this.onDragEnter = this.onDragEnter.bind(this);
      this.onDragLeave = this.onDragLeave.bind(this);
      this.state = {
        over: false,
      }
      this.animation = {
        slideInDown: {
          animation: 'x 500ms',
          animationName: Radium.keyframes(slideInDown, 'slideInDown')
        }
      }
    }

    onDragStart() {
      this.props.selectCouple(this.props.couple);
    }

    onDragEnd() {
      this.props.selectCouple({});
    }

    onDrop(value, e) {
      const data = e.target.getAttribute('data').split(',');
      this.props.coupleAssociation(data);
      this.setState({over: false});
    }

    onDragEnter(e) {
      this.props.selected_couple.value.length === 1 ? this.setState({over: true}) : this.setState({over: false});
    }

    onDragLeave(e) {
      this.setState({over: false});
    }
    render() {
      const {teacher, subject, subgroup, room, plus_minus} = this.props.couple.value[0];
      const couple = this.props.couple.value;
      return (
        <StyleRoot>
          <div style={this.animation.slideInDown}>
            <Draggable
              onDragStart={this.onDragStart}
              data={this.props.couple.id}
              type="couple"
              onDragEnd={this.onDragEnd}
              styleName="couple"
              >
              {
                couple.map((item, key) => {
                  return (
                    <CollectionItem key={key} styleName="item" className={item.subgroup === 'all' ? '' : (item.subgroup === '1' ? styles.subgroup1 : (couple[1] ? styles.subgroup2Double : styles.subgroup2))}>
                      <div styleName="week" className={!item.plus_minus ? styles.all : (item.plus_minus === '+' ? styles.plus : styles.minus)}>
                        {!item.plus_minus ? '' : item.plus_minus}
                      </div>
                      <div styleName="text">{item.teacher}</div>
                      <div styleName="text">{item.subject}</div>
                      {
                        item.auditory ? (
                          <span styleName="chip">
                            <Chip>{item.auditory}</Chip>
                          </span>
                        ) : ''
                      }
                    </CollectionItem>);
                })
              }
              {
                subgroup !== 'all' && !couple[1] ? (
                  <Droppable
                    data={[this.props.couple.id, subgroup]}
                    types={['couple']}
                    onDrop={this.onDrop}
                    onDragEnter={this.onDragEnter}
                    onDragLeave={this.onDragLeave}
                    className={subgroup === '1' ? styles.droppableRight : styles.droppableLeft}
                    styleName={this.state.over ? 'over' : ''}>
                </Droppable>) : ''
              }
            </Draggable>
          </div>
        </StyleRoot>
      );
    }
}

export default CSSModules(Couple, styles);;
