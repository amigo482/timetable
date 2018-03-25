import React from 'react';
import CSSModules from 'react-css-modules';
import ReactDOM from 'react-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import styles from './tables.css';
import { Button, Collapsible, CollapsibleItem, CardPanel, Row, Col } from 'react-materialize';
import {setCurrentModal, deleteTimetable, selectTimetable, getTT} from '../../actions/actions';

class Tables extends React.Component {
  constructor(props) {
    super(props);
    this.buttons = [];
    this.edit = this.edit.bind(this);
    this.add = this.add.bind(this);
    this.editItem = this.editItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
  }

  edit(faculty, year, semester) {
    const { history } = this.props
    history.push('/timetable');
    this.props.getTT(faculty, year, semester);
  }

  editItem(data) {
    this.props.selectTimetable(data)
    this.props.setCurrentModal('editTimetable');
  }

  deleteItem(e) {
    const id = e.currentTarget.getAttribute('id');
    this.props.deleteTimetable(id);
  }

  add() {
    this.props.setCurrentModal('addTimetable');
  }

  render() {
    const list = this.props.tables.map((el, key) => {
      const {_id, tables} = el;
      const onClick = () => {
        this.edit(_id.faculty._id, _id.year, _id.semester);
      }
      return (
        <CollapsibleItem
          header={
            <div>{_id.faculty.name} {_id.year} {_id.semester}
              <Button
                ref={button => {this.buttons.push(button)}}
                onClick={onClick} floating
                styleName="button"
                className='blue darken-2 right not-collapse'
                icon='build'
              />
            </div>
          } styleName="category" key={`category-${key}`}>
          <ul styleName="collection">
            {
              tables.map((item, id) => {
                const select = () => {
                  this.editItem(item);
                }
                return (
                  <div key={`item-${id}`}>
                    <li onClick={select} styleName="item">{item.direction.name} ({item.direction.profile}) {item.course} курс {item.direction.level}</li>
                    {
                      item.cells.length === 0 &&
                        <div id={item._id} onClick={this.deleteItem} styleName="delete" />
                    }
                  </div>
                )
              })
            }
          </ul>
        </CollapsibleItem>
      )
    });
    return (
      <div>
        <Button onClick={this.add} styleName="add" className='green right not-collapse'>Добавить расписание</Button>
        <Collapsible accordion styleName="collapsible">
          {list}
        </Collapsible>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    tables: state.tables.list,
  };
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    setCurrentModal,
    deleteTimetable,
    selectTimetable,
    getTT,
  }, dispatch);
};

const TablesWithCss = CSSModules(Tables, styles);
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(TablesWithCss));