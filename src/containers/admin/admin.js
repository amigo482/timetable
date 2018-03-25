import React from 'react';
import CSSModules from 'react-css-modules';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import styles from './admin.css';
import {Button, Container, Card, Input, Row, Col} from 'react-materialize'

import Catalog from '../../components/catalog/catalog';
import Modal from '../modal/modal';

import {getAllManagersLibraries, getAllAdminsLibraries, getAllTimetables} from '../../actions/actions';

class Admin extends React.Component {
    constructor(props) {
      super();
      this.selectFaculty = this.selectFaculty.bind(this);
    }

    componentDidMount() {
      const fac = this.props.faculty;
      const faculty = this.props.user.faculty ? this.props.user.faculty._id : '';
      if (this.props.user.faculty) {
        this.props.getAllManagersLibraries(faculty);
        this.props.getAllTimetables(faculty);
      }
      if (!this.props.user.faculty) {
        this.props.getAllTimetables();
        this.props.getAllAdminsLibraries(fac);
      }
    }

    componentWillReceiveProps(nextProps, nextState) {
      const fac = this.props.faculty;
      const faculty = nextProps.user.faculty ? nextProps.user.faculty._id : '';
      if (nextProps.user !== this.props.user && nextProps.user.faculty) {
        this.props.getAllManagersLibraries(faculty);
        this.props.getAllTimetables(faculty);
      }

      if (nextProps.user !== this.props.user && !nextProps.user.faculty) {
        this.props.getAllAdminsLibraries(fac);
        this.props.getAllTimetables();
      }
    }

    selectFaculty(event) {
      const faculty = event.currentTarget.value;
      this.props.getAllAdminsLibraries(faculty);
      this.props.getAllTimetables(faculty);
    }

    createFacultySelect(libraries) {
      return (
        <Input styleName="select" s={5} type='select' label="Факультет" onChange={this.selectFaculty}>
          <option key={`fac-228`} value=''>Все факультеты</option>
          {
            libraries[1] &&
              libraries[1].value.map((fac, key) => {
                return <option key={`fac-${key}`} value={fac._id}>{fac.name}</option>
              })
          }
        </Input>
      )
    }

    render() {
      const {user, libraries} = this.props;
      const faculty = user.faculty ? user.faculty.name : '';
      const select = !user.faculty ? this.createFacultySelect(libraries) : '';
      return (
        <Container>
          <Modal />
          <Card className='white'>
            <Row styleName="row">
              <Col s={7}>
                <div styleName="logo"></div>
                <div styleName="caption">
                  <h5 styleName="header">Система управления расписанием ТвГУ</h5>
                  <span styleName="faculty">{faculty}</span>
                </div>
              </Col>
              {select}
            </Row>
          </Card>
          <Catalog/>
        </Container>
      );
    }
}

const mapStateToProps = state => {
  return {
    user: state.login.user,
    faculty: state.libraries.faculty,
    libraries: state.libraries.list,
  };
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    getAllManagersLibraries,
    getAllAdminsLibraries,
    getAllTimetables,
  }, dispatch);
};

const AdminWithCss = CSSModules(Admin, styles);
export default connect(mapStateToProps, mapDispatchToProps)(AdminWithCss);
