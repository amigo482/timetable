import React from 'react';
import CSSModules from 'react-css-modules';
import {Row, Input, Col} from 'react-materialize';
import Datepicker from '../../../components/datepicker/datepicker';

import {subFields, dateOptions} from '../../../constants/TimetablesValues';
import styles from './modals.css';

class EditTimetableModal extends React.Component {
    constructor() {
      super();
      this.close = this.close.bind(this);
      this.save = this.save.bind(this);
      this.inputs = [];
    }

    save() {
      let values = {};
      const {currentTimetable, updateTimetable} = this.props;
      this.inputs.forEach(input => {
        let item = values[input.props['data-item']];
        if (item) {
          item = [item, input.state.value];
        } else item = input.state.value;
      });
      values.id = currentTimetable._id;
      updateTimetable(values);
    }

    close() {
      this.props.setCurrentModal('');
    }

    createFields() {
      const selected = this.props.currentTimetable;
      return subFields.map((field, key) => {
        switch(field.type) {
          case 'text':
            return <Input data-item={field.item} ref={el => {this.inputs.push(el)}} key={`input-${key}`} s={6} type="text" label={field.name} defaultValue={selected[field.item] ? selected[field.item][field.index] : ''}/>
          case 'date':
            return (
              <Col s={6} key={`date-${key}`}>
                <Datepicker
                  data-item={field.item}
                  ref={el => {this.inputs.push(el)}}
                  date={selected[field.item]}
                />
              </Col>
            );
        }
      });
    }

    render() {
      const list = this.createFields();
      return (
        <div styleName="background">
          <div styleName="modal" className="modal modal-fixed-footer">
            <div className="modal-content">
                <h4>Изменение расписания</h4>
                <Row>
                  {list}
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

export default CSSModules(EditTimetableModal, styles);
