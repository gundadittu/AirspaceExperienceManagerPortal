import React from "react";
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect, Provider } from 'react-redux';
import MediaQuery from 'react-responsive';
// import logo from "./logo.svg";
import "./App.css";
import Firebase from './components/Firebase';
import Login from './components/Login/Login';
import SideNavBar from './components/SideNavBar/SideNavBar';
import NavBar from './components/NavBar/NavBar';
import HomePage from './components/HomePage/HomePage';
import Services from './components/Services/Services';

import * as generalActionCreators from './store/actions/general';
import * as authActionCreators from './store/actions/auth';
import { DatePicker, Row, Col } from "antd";

import * as storeFile from './store/store';

import { BrowserRouter }from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react'

class App extends React.Component {
  state = {
    toggle_render: false
  }

  componentDidMount() {
    if (this.props.firebase === null) {
      this.firebase = new Firebase()
      this.props.setUpFirebase(this.firebase);
    }

    const firebase = this.firebase || null;
    if (firebase) {
      // firebase.auth.signOut();
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
      console.log(this.props.user);
      return(
        <Login />
      );
    } else {
      return(
        <BrowserRouter>
          <Provider store={storeFile.store}>
            <PersistGate loading={null} persistor={storeFile.persistor}>
              <div style={{ background: '#FFFFFF' }}>
                <Row>
                  <MediaQuery minDeviceWidth={1000}>
                    <Col span={4}>
                      <SideNavBar device={"desktop"}/>
                    </Col>
                    <Col span={20}>
                      <NavBar />
                      <Services />
                    </Col>
                  </MediaQuery>
                  {/*<MediaQuery maxDeviceWidth={1000}>
                    <Col span={24}>
                      <h1> hello </h1>
                      //<HomePage />
                      <Services />
                    </Col>
                  {</MediaQuery> */}
                </Row>
              </div>
            </PersistGate>
          </Provider>
        </BrowserRouter>

      )
    }
  };
};

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    firebase: state.firebase.firebase,
    currentPage: state.general.currentPage,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    clearRedux: () => dispatch(generalActionCreators.clearReduxState()),
    setUpFirebase: (firebaseInstance) => dispatch(generalActionCreators.setUpFirebaseInstanceAction(firebaseInstance)),
    setUpUser: (uid) => dispatch(authActionCreators.setUpUserAction(uid)),
  }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
