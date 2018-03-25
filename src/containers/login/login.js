import React from 'react';
import CSSModules from 'react-css-modules';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import styles from './login.css';

import {
  login,
} from '../../actions/actions';

import {Row, Input, Icon, Col, Card, Button} from 'react-materialize'

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.log_in = this.log_in.bind(this);
  }
  log_in() {
    this.props.login(this.login.state.value, this.password.state.value);
  }
  render() {
    return (
      <Row>
          <Col s={12} m={6} offset="m3">
              <Card styleName="card">
                  <Input ref={e => {this.login = e}} s={12} label='Логин' validate><Icon>account_circle</Icon></Input>
                  <Input ref={e => {this.password = e}} s={12} label='Пароль' validate type='password'><Icon>lock</Icon></Input>
                  <Button onClick={this.log_in} waves='light' styleName="button">Войти<Icon left>input</Icon></Button>
              </Card>
          </Col>
      </Row>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.login.user,
  };
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    login,
  }, dispatch);
};

const LoginWithCss = CSSModules(Login, styles);
export default connect(mapStateToProps, mapDispatchToProps)(LoginWithCss);
