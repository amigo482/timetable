import React from 'react';
import CSSModules from 'react-css-modules';
import ReactDOM from 'react-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import libraries from '../../constants/librariesTypes';
import styles from './libraries.css';
import { Button, Collapsible, CollapsibleItem, CardPanel, Row, Col } from 'react-materialize';
import {deleteLibraryRequest, setCurrentModal, selectLibrary} from '../../actions/actions';

class Libraries extends React.Component {
  constructor(props) {
    super(props);
    this.delete = this.delete.bind(this);
    this.edit = this.edit.bind(this);
    this.add = this.add.bind(this);
    this.buttons = [];
  }

  add(event) {
    const type = event.currentTarget.getAttribute('type');
    libraries.forEach(el => {
      if (el.type === type) {
        this.props.selectLibrary(el);
        this.props.setCurrentModal('add');
      }
    })
  }

  edit(event) {
    const id = event.currentTarget.getAttribute('id');
    this.props.libraries.forEach(element => {
      element.value.forEach(el => {
        if(el._id === id) {
          this.props.selectLibrary({type: element.type, value: el});
          this.props.setCurrentModal('edit');
        }
      })
    });
  }

  delete(event) {
    const type = event.currentTarget.getAttribute('type');
    const id = event.currentTarget.getAttribute('id');
    this.props.deleteLibraryRequest(type, id);
  }

  getProps(element, item) {
    switch(element.icon) {
      case 'group':
        return item.fio;
      case 'vpn_key':
        return <div>{item.login}</div>;
      case 'directions':
        return <div>{item.code} {item.name}</div>;
      default:
        return item.name;
    }
  }

  render() {
    const {libraries, isAdmin} = this.props;
    let filteredLibraries = [];
    if (isAdmin) {
      filteredLibraries = libraries;
    } else {
      filteredLibraries = libraries.filter(element => element.name === 'Направления' || element.name === 'Преподаватели' || element.name === 'Предметы')
    }
    const list = filteredLibraries.map((el, key) => {
      return (
        <CollapsibleItem
          header={
            <div>{el.name}
              <Button ref={button => {this.buttons.push(button)}} onMouseDown={this.add} type={el.type} floating styleName="add" className='green right not-collapse' icon='add' />
            </div>
          } styleName="category" icon={el.icon} key={`category-${key}`}>
          <ul styleName="collection">
            {
              el.value.map((item, id) => {
                return (
                  <div key={`item${el.type}${id}`}>
                    <li onClick={this.edit} id={item._id} styleName="item">{this.getProps(el, item)}</li>
                    {
                      item.used === 0 &&
                        <div onClick={this.delete} styleName="delete" id={item._id} type={el.type}/>
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
      <Collapsible accordion styleName="collapsible">
        {list}
      </Collapsible>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAdmin: state.login.user.faculty ? false : true,
    libraries: state.libraries.list,
  };
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    deleteLibraryRequest,
    setCurrentModal,
    selectLibrary,
  }, dispatch);
};

const LibrariesWithCss = CSSModules(Libraries, styles);
export default connect(mapStateToProps, mapDispatchToProps)(LibrariesWithCss);
