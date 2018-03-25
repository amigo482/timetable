import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './header.css';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import history from '../../history/history';
import {
  Navbar,
  NavItem,
  Icon,
  MenuItem,
  Dropdown,
  Card,
  Button,
  Pagination,
  PaginationButton,
} from 'react-materialize';

import {changeCourse, changeEducation, redirect, getTT} from '../../actions/actions';

class Header extends React.Component {
  constructor(props) {
      super(props);
      this.changeType = this.changeType.bind(this);
      this.changeCourse = this.changeCourse.bind(this);
      this.goBack = this.goBack.bind(this);
      this.state = {
        selectedCouse: props.courses[0],
        selectedLevel: props.levels[0],
      }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.courses[0] !== this.props.courses[0]) {
      this.setState({
        selectedCouse: nextProps.courses[0],
      });
    }
    if (nextProps.levels[0] !== this.props.levels[0]) {
      this.setState({
        selectedLevel: nextProps.levels[0],
      });
    }
  }

  goBack() {
    const { history } = this.props
    history.push('/admin');
  }

  changeType(type) {
    const {getTT, selectedProps: {faculty, year, semester}} = this.props;
    this.setState({
      selectedLevel: type,
    });
    getTT(faculty, year, semester, type);
  }

  changeCourse(number) {
    const {getTT, selectedProps: {faculty, year, semester}} = this.props;
    const {selectedLevel} = this.state;
    this.setState({
      selectedCouse: number,
    });
    getTT(faculty, year, semester, selectedLevel, number);
  }

  render() {
    const {levels, courses} = this.props;
    const {selectedCouse, selectedLevel} = this.state;
    return (
      <Card className='white'>
        <div styleName="logo" onClick={this.goBack}></div>
        <Dropdown styleName="dropdown" trigger={
            <Button styleName="button">{selectedLevel}<Icon right>arrow_drop_down</Icon></Button>
          }>
          {
            levels.map((type, key) => {
              const changeType = () => {
                this.changeType(type);
              }
              return <li key={key} value={key} styleName="type" onClick={changeType}>{type}</li>
            })
          }
        </Dropdown>
        <Pagination styleName="course">
          {
            courses.map(course => {
              const changeCourse = () => {
                this.changeCourse(course);
              }
              return (
                <PaginationButton onSelect={changeCourse} key={course} active={selectedCouse === course}>{course} курс</PaginationButton>
              )
            })
          }
        </Pagination>
      </Card>
    );
  }
}

const mapStateToProps = state => {
  return {
    levels: state.timetable.levels,
    courses: state.timetable.courses,
    selectedProps: state.timetable.selectedProps,
  };
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    redirect,
    getTT,
  }, dispatch);
};

const HeaderWithCss = CSSModules(Header, styles);
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(HeaderWithCss));
