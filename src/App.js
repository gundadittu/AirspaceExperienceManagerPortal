import React from "react";
import { connect } from 'react-redux';
// import logo from "./logo.svg";
import "./App.css";
import Login from './components/Login/Login';
import HomePage from './components/HomePage/HomePage';
import { DatePicker } from "antd";

class App extends React.Component {
  render() {
    if (!this.props.user){
      return(
        <Login />
      );
    } else {
      return(
        <HomePage />
      )
    }
  };
};

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    firebase: state.firebase.firebase,
    currentPage: state.general.currentPage
  }
};

export default App;
