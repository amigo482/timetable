import React from 'react';
import CSSModules from 'react-css-modules';
import { Row, Input } from 'react-materialize';

import studies from '../../../constants/studiesTypes';
import styles from './modals.css';

class AddModal extends React.Component {
  constructor() {
    super();
    this.close = this.close.bind(this);
    this.save = this.save.bind(this);
    this.inputs = [];
    this.createRedactor = this.createRedactor.bind(this);
  }
  close() {
    this.props.setCurrentModal('');
  }
  save() {
    const { type, schema } = this.props.current;
    const { faculty } = this.props;
    const lib = Object.assign({}, schema);
    const values = {};
    this.inputs.forEach(el => { values[el.props.label] = el.state.value });
    Object.keys(values).forEach(el => {
      lib[el] = values[el] !== 'on' ? values[el] : false;
    })

    if (faculty) {
      lib.faculty = faculty._id;
    }
    const result = {
      type,
      value: lib,
    }
    this.props.setCurrentModal('');
    this.props.addLibrary(result);
  }

  createRedactor() {
    const faculties = this.props.libraries[1].value;
    const current = this.props.current.schema;
    const faculty = this.props.faculty;

    return Object.keys(current).map((type, key) => {
      switch (current[type]) {
        case 'text':
          return (<Input ref={el => { this.inputs.push(el) }} key={`input-${key}`} type="text" label={type} s={12} />);
        case 'checkbox':
          return (
            <Input ref={el => { this.inputs.push(el) }} key={`input-${key}`} defaultValue='false' type='checkbox' label={type} s={6} />
          );
        case 'pass':
          return (
            <Input ref={el => { this.inputs.push(el) }} key={`input-${key}`} type='password' label={type} s={12} />
          );
        case 'select':
          if (type === 'faculty' && this.props.libraries[1].type === 'faculties' && !faculty) {
            return (
              <Input ref={el => { this.inputs.push(el) }} styleName="select" key={`input-${key}`} s={12} type='select' label={type} defaultValue={this.props.libraries[1].value[0]._id}>
                {
                  faculties.map((fac, key) => {
                    return <option key={`fac-${key}`} value={fac._id}>{fac.name}</option>
                  })
                }
              </Input>
            );
          }
          if (type === 'level') {
            return (
              <Input ref={el => { this.inputs.push(el) }} styleName="select" key={`input-${key}`} s={12} type='select' label={type} defaultValue='Бакалавриат'>
                {
                  studies.map((study, key) => {
                    return <option key={`study-${key}`} value={study.name}>{study.name}</option>
                  })
                }
              </Input>
            );
          }
        default:
          return null;
      }
    });
  }
  render() {
    const redactor = this.createRedactor();
    return (
      <div styleName="background">
        <div styleName="modal" ref={modal => { this.modal = modal }} className="modal modal-fixed-footer">
          <div className="modal-content">
            <h4>Добавление {this.props.current.name}</h4>
            <Row>
              {redactor}
            </Row>
          </div>
          <div className="modal-footer">
            <button onClick={this.save} className="modal-action modal-close waves-effect waves-green btn-flat">Сохранить</button>
            <button onClick={this.close} className="modal-action modal-close waves-effect waves-red btn-flat">Отменить</button>
          </div>
        </div>
      </div>
    );
  }
}

export default CSSModules(AddModal, styles);
