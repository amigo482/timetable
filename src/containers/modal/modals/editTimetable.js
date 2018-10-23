import React from 'react';
import CSSModules from 'react-css-modules';
import { Row, Input, Col } from 'react-materialize';
import Datepicker from '../../../components/datepicker/datepicker';

import { subFields, dateOptions } from '../../../constants/TimetablesValues';
import styles from './modals.css';

class EditTimetableModal extends React.Component {
  constructor() {
    super();
    this.close = this.close.bind(this);
    this.save = this.save.bind(this);
    this.inputs = [];
  }

  async save() {
    let values = {};
    const { currentTimetable, updateTimetable } = this.props;
    await this.inputs.forEach(input => {
      if (input.props['data-item'] === 'subgroups') {
        if (values[input.props['data-item']]) {
          values[input.props['data-item']].push(input.state.value);
        } else {
          values[input.props['data-item']] = [input.state.value];
        }
      } else {
        values[input.props['data-item']] = input.state.value;
      }
    });

    values.id = currentTimetable._id;
    await updateTimetable(values);
  }

  close() {
    this.props.setCurrentModal('');
  }

  createFields() {
    const selected = this.props.currentTimetable;
    return subFields.map((field, key) => {
      switch (field.type) {
        case 'text':
          const value = selected[field.item] ? selected[field.item] : '';
          return <Input data-item={field.item} ref={el => { this.inputs.push(el) }} key={`input-${key}`} s={field.s} type="text" label={field.name} defaultValue={field.index !== undefined ? value[field.index] : value} />
        case 'date':
          return (
            <Col s={field.s} key={`date-${key}`}>
              <Datepicker
                data-item={field.item}
                ref={el => { this.inputs.push(el) }}
                date={selected[field.item]}
              />
            </Col>
          );
        default:
          return null;
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
