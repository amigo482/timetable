import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './day.css';

import Cell from './cell';
import { Table } from 'react-materialize';

class Day extends React.Component {

  render() {
    const {
      day, day_name, directions,
      couples, requestParams,
      addLesson, updateLesson,
      addLessonToEdit
    } = this.props;
    return (
      <div styleName="main">
        <h4 styleName="title">{day_name}</h4>
        <Table className="bordered centered" styleName="table">
          <thead>
            <tr>
              <th></th>
              {
                directions.map((direction, key) => {
                  return <th key={`direction${key}`}>{direction.name}</th>
                })
              }
            </tr>
          </thead>
          <tbody>
            {
              Object.values(day).map((time, timeIndex) => (
                <tr key={`day${timeIndex}`}>
                  {
                    time.map((cell, key) => {
                      return <Cell
                        key={`cell${key}`}
                        cell={cell}
                        day={this.props.day_name}
                        direction={directions[key - 1]}
                        number={timeIndex}
                        couples={couples}
                        requestParams={requestParams}
                        addLesson={addLesson}
                        updateLesson={updateLesson}
                        addLessonToEdit={addLessonToEdit}
                      />
                    })
                  }
                </tr>
              ))
            }
          </tbody>
        </Table>
      </div>
    );
  }
}

export default CSSModules(Day, styles);
