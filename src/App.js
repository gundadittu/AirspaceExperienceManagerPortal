import React from "react";
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
// import logo from "./logo.svg";
import "./App.css";
import Firebase from './components/Firebase';
import Login from './components/Login/Login';
import HomePage from './components/HomePage/HomePage';
import * as generalActionCreators from './store/actions/general';
import * as authActionCreators from './store/actions/auth';
import { DatePicker } from "antd";

class App extends React.Component {
  state = {
    toggle_render: false
  }

  componentWillMount() {
    // Sentry.init({ dsn: 'https://8825e624e2594f1d8ca77d056c8b56dd@sentry.io/1395312' });
    if (this.props.firebase === null) {
      this.firebase = new Firebase()
      this.props.setUpFirebase(this.firebase);
    }
  }

  componentDidMount() {
    const firebase = this.firebase || null;
    if (firebase) {
      const weakProps = this.props;
      this.listener = firebase.auth.onAuthStateChanged(function (user) {
        if (user) {
          weakProps.setUpUser(user.uid);
        } else {
          weakProps.clearRedux();
          weakProps.history.push('/');
        }
      });
    } else {
      const error = Error("Firebase NOT set up in App.js render()");
      // Sentry.captureException(error);
    }
  }

  componentWillUnmount() {
    this.listener();
  }




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

const mapDispatchToProps = dispatch => {
  return {
    clearRedux: () => dispatch(generalActionCreators.clearReduxState()),
    setUpFirebase: (firebaseInstance) => dispatch(generalActionCreators.setUpFirebaseInstanceAction(firebaseInstance)),
    setUpUser: (uid) => dispatch(authActionCreators.setUpUserAction(uid))
  }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
