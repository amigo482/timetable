import React from 'react';
import CSSModules from 'react-css-modules';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import styles from './shedule.css';
import Day from '../../components/day/day';
import {Card, Button, Dropdown, NavItem} from 'react-materialize';
import {addLesson, deleteLesson, addLessonToEdit} from '../../actions/actions';

class Schedule extends React.Component {
    constructor(props) {
      super(props);
    }
    render() {
      const {table, courses, directions, couples, requestParams, addLesson, addLessonToEdit} = this.props;
      return (
        <div styleName="main">
          {
            Object.keys(table).map(day => {
              return <Day
                      key={day}
                      requestParams={requestParams}
                      couples={couples}
                      course={courses[0]}
                      day_name={day}
                      day={table[day]}
                      directions={directions}
                      addLesson={addLesson}
                      addLessonToEdit={addLessonToEdit}
                    />
            })
          }
        </div>
      );
    }
}

const mapStateToProps = state => {
  return {
    couples: state.timetable.couples,
    table: state.timetable.table,
    courses: state.timetable.courses,
    directions: state.timetable.directions,
    requestParams: state.timetable.requestParams,
  };
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    addLesson,
    addLessonToEdit,
  }, dispatch);
};

const ScheduleWithCss = CSSModules(Schedule, styles);
export default connect(mapStateToProps, mapDispatchToProps)(ScheduleWithCss);;
