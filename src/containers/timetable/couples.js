import React from 'react';
import CSSModules from 'react-css-modules';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import styles from './couples.css';

import {
  addCouple,
  changeSelectedCouple,
  changeSubgroup,
  addSubCouple,
  deleteCouple
} from '../../actions/actions';
import Couple from '../../components/couple/couple';

import {Collection} from 'react-materialize'

class Couples extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        selected_couple: {},
      }
      this.selectCouple = this.selectCouple.bind(this);
      this.coupleAssociation = this.coupleAssociation.bind(this);
    }

    selectCouple(couple) {
      this.setState({selected_couple: couple});
    }

    coupleAssociation(data) {
      const s_couple = this.state.selected_couple;
      if (s_couple.value[0].subgroup === 'all') {
        this.props.changeSubgroup(s_couple.id, (data[1] === '1' ? 2 : 1));
      }
      if (s_couple.value[0].subgroup === data[1] && s_couple.value.length === 1) {
        this.props.changeSubgroup(s_couple.id, (data[1] === '1' ? 2 : 1));
      }
      if (s_couple.id === Number(data[0])) {
        this.props.changeSubgroup(s_couple.id, 'all');
      }
      if (s_couple.value.length === 1 && s_couple.id !== Number(data[0])) {
        this.props.addSubCouple(s_couple.id, data[0]);
        this.props.deleteCouple(s_couple.id);
      }
    }

    render() {
      return (
        <div styleName="collection">
            <Collection>
              {
                this.props.couples.map((couple, key) => {
                  return <Couple
                            key={key}
                            number={key}
                            couple={couple}
                            selectCouple={this.selectCouple}
                            coupleAssociation={this.coupleAssociation}
                            selected_couple={this.state.selected_couple}/>
                })
              }
            </Collection>
        </div>
      );
    }
}

const mapStateToProps = state => {
  return {
    couples: state.timetable.couples,
    selectedCouple: state.timetable.selectedCouple,
  };
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    changeSubgroup,
    addSubCouple,
    deleteCouple,
  }, dispatch);
};

const CouplesWithCss = CSSModules(Couples, styles);
export default connect(mapStateToProps, mapDispatchToProps)(CouplesWithCss);
