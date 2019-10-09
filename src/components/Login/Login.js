import React from "react";
import { connect } from "react-redux";
import LoginNavBar from "./LoginNavBar";
import LoginForm from "./LoginForm";
import { Row, Col } from "antd";
import "./Login.css";

class Login extends React.Component {
  render() {
    return (
      <Row
        type="flex"
        justify="space-around"
        align="middle"
        style={{ marginTop: 300 }}
      >
        <Col>
          <LoginForm />
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = state => {
  return {
    error: state.general.error
  };
};

export default connect(
  mapStateToProps,
  null
)(Login);
