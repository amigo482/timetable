import React from 'react';
import CSSModules from 'react-css-modules';
import {Row, Input, Col} from 'react-materialize';
import Datepicker from '../../../components/datepicker/datepicker';

import fields from '../../../constants/TimetablesValues';
import {dateOptions} from '../../../constants/TimetablesValues';
import styles from './modals.css';

class AddTimetableModal extends React.Component {
    constructor() {
      super();
      this.close = this.close.bind(this);
      this.save = this.save.bind(this);
      this.inputs = [];
      this.createFields = this.createFields.bind(this);
      this.toggleSubgroups = this.toggleSubgroups.bind(this);
      this.state = {
        subgroups: true,
      }
    }

    componentWillMount() {
      const {getTimes} = this.props;
      getTimes();
    }

    save() {
      const values = {};
      this.inputs.forEach(el => {
        if (el) {
          if (el.props['data-item'] === 'subgroups') {
            values[el.props['data-item']] ? values[el.props['data-item']].push(el.state.value) : values[el.props['data-item']] = [el.state.value];
          } else {
            values[el.props['data-item']] = el.state.value;
          }
        }
      });
      const directions = this.props.libraries.find(element => element.type === 'directions');
      const direction = directions.value.find(element => element._id === values['direction']);
      values.faculty = direction.faculty;
      values['subgroups'].splice(2);
      this.props.addTimetable(values);
      this.props.setCurrentModal('');
    }

    close() {
      this.props.setCurrentModal('');
    }

    toggleSubgroups() {
      const {subgroups} = this.state;
      this.setState({subgroups: !subgroups});
    }

    createFields() {
      const directions = this.props.libraries.find(element => element.type === 'directions');
      const {times} = this.props;
      return fields.map((field, key) => {
        switch(field.type) {
          case 'checkbox':
            return (
              <div key={`input-${key}`}>
                <div styleName="checkbox">
                  <Input type='checkbox' label=' ' onClick={this.toggleSubgroups}/>
                </div>
                <Input data-item="subgroups" ref={el => {this.inputs.push(el)}} type="text" s={5} label='Название первой подгруппы' disabled={this.state.subgroups}/>
                <Input data-item="subgroups" ref={el => {this.inputs.push(el)}} type="text" s={5} label='Название второй подгруппы' disabled={this.state.subgroups}/>
              </div>
            )
          case 'text':
            return <Input data-item={field.item} ref={el => {this.inputs.push(el)}} key={`input-${key}`} s={12} type="text" label={field.name}/>
          case 'select':
            if (field.name === 'Направление' && directions.value[0]) {
              return (
                <Input data-item={field.item} ref={el => {this.inputs.push(el)}} styleName="select" key={`input-${key}`} s={12} type='select' label={field.name} defaultValue={directions.value[0]._id}>
                  {
                    directions.value.map((value, key) => {
                      return <option key={`value-${key}`} value={value._id}>({value.level}) {value.name} ({value.profile})</option>
                    })
                  }
                </Input>
              );
            } else if (field.name === 'Время' && times.length > 0) {
              return (
                <Input data-item={field.item} ref={el => {this.inputs.push(el)}} styleName="select" key={`input-${key}`} s={12} type='select' label={field.name} defaultValue={times[0]._id}>
                  {
                    times.map((value, key) => {
                      return <option key={`value-${key}`} value={value._id}>{value.name}</option>
                    })
                  }
                </Input>
              );
            }
            return (
              <Input data-item={field.item} ref={el => {this.inputs.push(el)}} styleName="select" key={`input-${key}`} s={12} type='select' label={field.name} defaultValue={field.values[0]}>
                {
                  field.values.map((value, key) => {
                    return <option key={`value-${key}`} value={value}>{value}</option>
                  })
                }
              </Input>
            );
          case 'date':
          return (
            <Col s={6} key={`date-${key}`}>
              <Datepicker
                data-item={field.item}
                ref={el => {this.inputs.push(el)}}
              />
            </Col>
          );
        }
      })
    }

    render() {
      const list = this.createFields();
      return (
        <div styleName="background">
          <div styleName="modal" className="modal modal-fixed-footer">
            <div className="modal-content">
                <h4>Создание расписания</h4>
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

export default CSSModules(AddTimetableModal, styles);
