import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import CSSModules from 'react-css-modules';
import { setCurrentModal, updateLibraryRequest, addLibraryRequest, addTimetable, updateTimetable, getTimes } from '../../actions/actions';

import styles from './modal.css';

import EditModal from './modals/edit';
import AddModal from './modals/add';
import AddTimetableModal from './modals/addTimetable';
import EditTimetableModal from './modals/editTimetable';

class Modal extends Component {
  componentDidMount() {
    document.onkeydown=( event ) => {
      event=event||window.event;
      if ( event.keyCode==27 ) {
        this.props.setCurrentModal( '' );
      };
    };
  }

  render() {
    const {
      modal,
      setCurrentModal,
      updateLibraryRequest,
      addLibraryRequest,
      current,
      libraries,
      faculty,
      addTimetable,
      currentTimetable,
      updateTimetable,
      getTimes,
      times,
    }=this.props;
    switch ( modal ) {
      case 'edit':
        return <EditModal setCurrentModal={setCurrentModal} current={current} updateLibrary={updateLibraryRequest} libraries={libraries} />
      case 'add':
        return <AddModal setCurrentModal={setCurrentModal} current={current} libraries={libraries} faculty={faculty} addLibrary={addLibraryRequest} />
      case 'addTimetable':
        return <AddTimetableModal addTimetable={addTimetable} setCurrentModal={setCurrentModal} libraries={libraries} faculty={faculty} getTimes={getTimes} times={times} />
      case 'editTimetable':
        return <EditTimetableModal setCurrentModal={setCurrentModal} currentTimetable={currentTimetable} updateTimetable={updateTimetable} />
      default:
        return false
    }
  }
}

const mapStateToProps=state => ( {
  modal: state.modal.currentModal,
  current: state.libraries.current,
  libraries: state.libraries.list,
  faculty: state.login.user.faculty,
  currentTimetable: state.tables.currentTimetable,
  times: state.timetable.times,
} );

const mapDispatchToProps=dispatch => {
  return bindActionCreators( {
    setCurrentModal,
    updateLibraryRequest,
    addLibraryRequest,
    addTimetable,
    updateTimetable,
    getTimes,
  }, dispatch );
};


const ModalWithStyle=CSSModules( Modal, styles );
export default connect( mapStateToProps, mapDispatchToProps )( ModalWithStyle );
