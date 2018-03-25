import React from 'react';
import CSSModules from 'react-css-modules';
import {Row, Input} from 'react-materialize'

import styles from './modals.css';
import studies from '../../../constants/studiesTypes';

class EditModal extends React.Component {
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
      const {type, value} = this.props.current;
      const values = {};
      this.inputs.forEach(el => {values[el.props.label] = el.state.value;})
      Object.keys(values).forEach(el => {
        value[el] = values[el] !== 'on' ? values[el] : false;
      })
      this.props.setCurrentModal('');
      const result = {
        type,
        value,
      }
      this.props.updateLibrary(result);
    }

    createRedactor() {
      const faculties = this.props.libraries[1].value;
      const current = this.props.current.value;
      return Object.keys(current).map((type, key)=> {
        if (type !== '_id' && type !== 'used' && type !== '__v' && type !== 'faculty' && type !== 'computer' && type !== 'projector' && type !== 'level') {
          return <Input ref={el => {this.inputs.push(el)}} key={`input-${key}`} type="text" label={type} s={12} defaultValue={current[type]}/>
        }
        if (type === 'computer' || type === 'projector') {
          return <Input ref={el => {this.inputs.push(el)}} key={`input-${key}`} type='checkbox' label={type} s={6} defaultChecked={current[type]} defaultValue={current[type]}/>
        }
        if (type === 'faculty' && this.props.libraries[1].type === 'faculties') {
          return (
            <Input ref={el => {this.inputs.push(el)}} styleName="select" key={`input-${key}`} s={12} type='select' label={type} defaultValue={current.faculty}>
              {
                faculties.map((fac, key) => {
                  return <option key={`fac-${key}`} value={fac._id}>{fac.name}</option>
                })
              }
            </Input>
          )
        }
        if (type === 'level') {
          return (
            <Input styleName="select" ref={el => {this.inputs.push(el)}} key={`input-${key}`} s={12} type='select' label={type} defaultValue={current.level}>
              {
                studies.map((study, key) => {
                  return <option key={`study-${key}`} value={study.name}>{study.name}</option>
                })
              }
            </Input>
          )
        }
      })
    }
    render() {
      const redactor = this.createRedactor();
      return (
        <div styleName="background">
          <div styleName="modal" ref={modal => {this.modal = modal}} className="modal modal-fixed-footer">
            <div className="modal-content">
                <h4>Редактирование</h4>
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

export default CSSModules(EditModal, styles);
