import React from 'react';
import CSSModules from 'react-css-modules';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Droppable } from 'react-drag-and-drop';
import { Field, reduxForm } from 'redux-form';
import ReactDOM from 'react-dom';
import { getCellData, hasCellPlusMinus } from '../../selectors/selectors'

import { validate } from '../../utils/validate';

import {addCouple, deleteCouple, clearCouples, deleteLesson, saveCouple} from '../../actions/actions';
import Couples from './couples';
import Rubbish from '../../components/rubbish/rubbish';

import styles from './elector.css';
import Select from 'react-select';
import {Row, Input, option, Icon, Button, Dropdown, Badge, Col} from 'react-materialize';

class Elector extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        selected_room: 'Кабинет',
        plus_minus: 'disabled',
        couple_count: 0,
        p_m: '0',
      }
      this.changePlusMinus = this.changePlusMinus.bind(this);
      this.createInput = this.createInput.bind(this);
    }

    componentWillReceiveProps(nextProps) {
      const {initialize} = this.props;
      const {cell, isPlusMinus} = nextProps;
      if (cell !== this.props.cell) {
        initialize(cell);
        this.setState({
          plus_minus: isPlusMinus ? '' : 'disabled',
        });
        this.pm.state.checked = isPlusMinus;
      }
    }

    changePlusMinus() {
      if (this.state.plus_minus === 'disabled') {
        this.setState({plus_minus: ''});
        this.props.change('plus_minus', false);
      } else {
        this.setState({plus_minus: 'disabled'});
        this.props.change('plus_minus', '');
      }
    }

    createTeachersList(array) {
      if (array) {
        return array.value.map(element => ({label: element.fio}));
      }
    }

    createSubjectsList(array) {
      if (array) {
        return array.value.map(element => ({label: element.name}));
      }
    }

    createAuditoriesList(array) {
      if (array) {
        return array.value.map(element => ({
          label: `${element.name} корпус: ${element.housing}`,
          capacity: element.capacity,
          computer: element.computer,
          projector: element.projector
        }));
      }
    }

    createAuditoryItem(props) {
      const {className, option: {label, capacity, computer, projector}, onSelect} = props;
      const handleMouseDown = (event) => {
        event.preventDefault();
        event.stopPropagation();
        onSelect(props.option, event);
      }
      return (
        <div
          className={className}
          onMouseDown={handleMouseDown}
        >
          {label}
          <Badge className={styles.badge}><Icon className={styles.icon}>people</Icon>{capacity}</Badge>
          {computer ? <Icon right className={styles.icon}>computer</Icon> : ''}
          {projector ? <Icon right className={styles.icon}>camera_roll</Icon> : ''}
        </div>
      )
    }

    createInput(props) {
      const {type, title, label, minLength, disabled, data, input} = props;
      const Auditory = this.createAuditoryItem;
      switch (type) {
        case 'autocomplete':
          if (title === 'Аудитории') {
            return (
              <Select
                className="col input-field s12"
                value={input.value}
                onChange={input.onChange}
                onBlur={() => input.onBlur(input.value)}
                options={data}
                placeholder={title}
                optionComponent={Auditory}
              />
            );
          }
          return (
            <Select
              className="col input-field s12"
              value={input.value}
              onChange={input.onChange}
              onBlur={() => input.onBlur(input.value)}
              options={data}
              placeholder={title}
            />
          );
        case 'select':
          return (
            <Input s={12} m={12} l={6} className={styles.select} label={label} type='select' { ...input } >
              <option value="all">Обe</option>
              <option value="1">Первая</option>
              <option value="2">Вторая</option>
            </Input>
          );
        case 'switch':
          return (
            <div className="switch">
              <label>
                +
                <input disabled={disabled} type="checkbox" { ...input } checked={input.value} />
                <span className="lever"></span>
                -
              </label>
            </div>
          );
        default:
          return (
            <Input label={label} s={12} type='text' { ...input } />
          );
          break;
      }
    }

    render() {
      const {teachers, subjects, auditories, selectedCouple, handleSubmit, saveCouple, initialValues} = this.props;
      const teachersList = this.createTeachersList(teachers);
      const subjectsList = this.createSubjectsList(subjects);
      const auditoriesList = this.createAuditoriesList(auditories);
      return (
        <form styleName="root" onSubmit={handleSubmit(saveCouple)}>
          <div styleName="main">
            <h4 styleName="title">Генератор</h4>
            <Row>
              <Field
                name="teacher"
                component={this.createInput}
                title="Преподаватель"
                data={teachersList}
                type="autocomplete"
                minLength={2}
              />
              <Field
                name="subject"
                component={this.createInput}
                title="Предмет"
                data={subjectsList}
                type="autocomplete"
                minLength={2}
              />
              <Field
                name="comment"
                component={this.createInput}
                label="Комментарий"
                type="text"
              />
              <Col s={12} m={12} l={6}>
                <div styleName="plus-minus">
                  <Input type='checkbox' ref={e => this.pm = e} label=' ' onClick={this.changePlusMinus}/>
                  <Field
                    name="plus_minus"
                    component={this.createInput}
                    type="switch"
                    disabled={this.state.plus_minus}
                  />
                </div>
              </Col>
              <Field
                name="subgroup"
                component={this.createInput}
                label="Подгруппа"
                type="select"
              />
              <Field
                name="auditory"
                component={this.createInput}
                title="Аудитории"
                data={auditoriesList}
                type="autocomplete"
                minLength={1}
              />
            </Row>
            <Button type="submit" waves='light' className='green' styleName="save">Создать<Icon left>save</Icon></Button>
          </div>
          <Couples
            couples={this.props.couples}
          />
          <Rubbish
            deleteCouple={this.props.deleteCouple}
            clearCouples={this.props.clearCouples}
            deleteLesson={this.props.deleteLesson}
          />
        </form>
      );
    }
}

const mapStateToProps = state => {
  return {
    couples: state.timetable.couples,
    teachers: state.libraries.list[3],
    subjects: state.libraries.list[4],
    auditories: state.libraries.list[5],
    selectedCouple: state.timetable.selectedCouple,
    cell: getCellData(state),
    isPlusMinus: hasCellPlusMinus(state),
    initialValues: {
      subgroup: 'all',
    }
  };
}

const mapDispatchToProps = dispatch => ({
  addCouple(data) {
    dispatch(addCouple(data));
  },
  deleteCouple(data) {
    dispatch(deleteCouple(data));
  },
  clearCouples(data) {
    dispatch(clearCouples(data));
  },
  deleteLesson(data) {
    dispatch(deleteLesson(data));
  },
  saveCouple,
});

Elector = reduxForm({
  form: 'elector',
  validate,
})(CSSModules(Elector, styles));

export default connect(mapStateToProps, mapDispatchToProps)(Elector);