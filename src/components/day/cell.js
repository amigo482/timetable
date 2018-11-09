import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './cell.css';
import { Droppable, Draggable } from 'react-drag-and-drop';

import { Chip } from 'react-materialize'

class Cell extends React.Component {
  constructor(props) {
    super(props);
    this.onDrop = this.onDrop.bind(this);
    this.checkSubgroup = this.checkSubgroup.bind(this);
    this.editLesson = this.editLesson.bind(this);
    this.subgroup = false;
  }
  onDrop(data, e) {
    const { direction, day, number, couples, requestParams, addLesson, updateLesson } = this.props;
    const couple = couples.find(el => el.id === Number(data.couple));

    if (data.lesson) {
      const cell = {
        table: {
          direction: direction.id,
          ...requestParams,
        },
        day,
        number,
        id: data.lesson,
      }

      updateLesson(cell);
      return;
    }

    if (couple) {
      const cell = {
        table: {
          direction: direction.id,
          ...requestParams,
        },
        day,
        number,
        lessons: couple.value,
      }
      addLesson(cell);
    }
  }
  checkSubgroup(cell) {
    let subgroup = false;
    cell.lessons.forEach(lesson => {
      if (lesson.subgroup !== 0) {
        subgroup = true;
      }
    })
    return subgroup;
  }
  isSubgroup1Bordered(array, index) {
    if (array[index - 1] && array[index - 1].subgroup === 2 && array[index - 2] && array[index - 2].subgroup === 2) {
      return true;
    }
    return false;
  }
  isSubgroup2Bordered(array, index) {
    if (array[index - 1] && array[index - 1].subgroup === 1 && array[index - 2] && array[index - 2].subgroup === 1) {
      return true;
    }
    return false;
  }
  isSubgroup2Independent(array, index) {
    if (array[index - 1] && array[index - 1].subgroup === 2 && !array[index + 1] || !array[index - 1]) {
      return true;
    }
    return false;
  }
  editLesson(lesson) {
    const { addLessonToEdit } = this.props;
    addLessonToEdit(lesson);
  }
  render() {
    const { cell, addLessonToEdit } = this.props;
    if (typeof cell === "object" && cell !== null && cell._id) {
      return (
        <Droppable
          types={['couple', 'lesson']}
          styleName="droppable"
          onDrop={this.onDrop}>
          {
            this.checkSubgroup(cell) &&
            <div styleName="subBorder"></div>
          }
          {
            cell.lessons.map((item, key) => {
              const handleDoubleClick = () => {
                this.editLesson(item);
              }
              return (
                <Draggable
                  data={item._id}
                  type="lesson"
                  key={key} styleName="item" className={item.subgroup === 0 ? '' : (item.subgroup === 1 ? (this.isSubgroup1Bordered(cell.lessons, key) ? styles.subgroup1Bordered : styles.subgroup1) : (this.isSubgroup2Bordered(cell.lessons, key) ? styles.subgroup2bordered : (this.isSubgroup2Independent(cell.lessons, key) ? styles.subgroup2Independent : styles.subgroup2)))}
                  onDoubleClick={handleDoubleClick}
                >
                  <div styleName="week" className={!item.plus_minus ? styles.all : (item.plus_minus === '+' ? styles.plus : styles.minus)}>
                    {!item.plus_minus ? '' : item.plus_minus}
                  </div>
                  <div styleName="inner_content">
                    {
                      item.teacher &&
                      <div styleName="text">{item.teacher.fio}</div>
                    }
                    {
                      item.subject &&
                      <div styleName="text">{item.subject.name}</div>
                    }
                    {
                      item.auditory && item.auditory.name ? (
                        <span styleName="chip">
                          <Chip>{item.auditory.name} корпус {item.auditory.housing}</Chip>
                        </span>
                      ) : ''
                    }
                  </div>
                </Draggable>);
            })
          }
        </Droppable>
      );
    } else if (cell === null) {
      return (
        <Droppable
          types={['couple', 'lesson']}
          styleName="droppable"
          onDrop={this.onDrop}
        />
      )
    } else return (<td styleName="time">{cell}</td>);
  }
}

export default CSSModules(Cell, styles);
