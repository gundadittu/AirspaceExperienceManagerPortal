import React from 'react';
import { Form, Icon, Input, Button, Checkbox, Card, Row, Col, Spin } from 'antd';
import Grid from '@material-ui/core/Grid';
import SigninLogo from "../../assets/images/fogg-logged-out-1.png";
import { connect } from 'react-redux';
import * as authActionCreators from '../../store/actions/auth';
import '../../App.css'
import './Login.css'
// import * as generalActionCreators from '../../store/actions/general';
import PasswordReset from './PasswordReset';

class LoginForm extends React.Component {

  state = {
    showPasswordReset: false
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const email = values.emailAddress || null;
        const password = values.password || null;
        const rememberMe = values.remember || false;
        this.props.signInUser(email, password, rememberMe);
      }
    });
  }

  showForm() {
    this.setState({ showPasswordReset: true });
  }

  hideForm() {
    this.setState({ showPasswordReset: false });
  }

  render() {

    const { getFieldDecorator } = this.props.form;

    const spinner = () => {
      if (this.props.isLoadingSignIn === true) {
        return (
          <Grid container justify="center" alignItems="center" style={{ marginTop: 20 }}>
            <Spin />
          </Grid>
        );
      } else {
        return null;
      }
    }

    return (
      <div>
        <PasswordReset visible={this.state.showPasswordReset} hideForm={this.hideForm.bind(this)} />
        <Card className="login-card">
          <Row>
            <Col span={12}>
              <Card
                cover={<img alt="example" src={SigninLogo} />}
                bordered={false}
              >
              </Card>
            </Col>
            <Col span={12}>
              <Card bordered={false}>
                <Form onSubmit={this.handleSubmit} className="login-form">
                  <Form.Item>
                    {getFieldDecorator('emailAddress', {
                      validateTrigger: 'onBlur',
                      rules: [{ required: true, message: 'Please input your email address!', whitespace: true, pattern: /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+.)+([a-zA-Z0-9]{2,4})+$/ }],
                    })(
                      <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Email Address" />
                    )}
                  </Form.Item>
                  <Form.Item>
                    {getFieldDecorator('password', {
                      validateTrigger: 'onBlur',
                      rules: [{ required: true, message: 'Please input your Password!', whitespace: true }],
                    })(
                      <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                    )}
                  </Form.Item>
                  <Form.Item>
                    {getFieldDecorator('remember', {
                      valuePropName: 'checked',
                      initialValue: true,
                    })(
                      <Checkbox className="">Remember me</Checkbox>
                    )}
                    <a className="login-form-forgot airspaceColor" onClick={this.showForm.bind(this)}>Forgot password?</a>
                    <Button type="primary" htmlType="submit" className="login-form-button airspace-submit-button">
                      Log in
                      </Button>
                    {spinner()}
                  </Form.Item>
                </Form>
              </Card>
            </Col>
          </Row>
        </Card>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    signInUser: (email, password, rememberMe) => dispatch(authActionCreators.signInUserAction(email, password, rememberMe)),
  }
};

const mapStateToProps = state => {
  return {
    isLoadingSignIn: state.general.isLoadingSignIn
  }
}

export default Form.create({ name: 'normal_login' })(connect(mapStateToProps, mapDispatchToProps)(LoginForm));
