import React from "react";
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect, Provider } from 'react-redux';
import MediaQuery from 'react-responsive';
import { BrowserRouter }from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react'

import Firebase from './components/Firebase';
import Login from './components/Login/Login';
import SideNavBar from './components/SideNavBar/SideNavBar';
import NavBar from './components/NavBar/NavBar';
import HomePage from './components/HomePage/HomePage';
import Services from './components/Services/Services';
import SupportTickets from './components/SupportTickets/SupportTickets';
import Users from './components/Users/Users';
import OfficeMetrics from './components/OfficeMetrics/OfficeMetrics';
import ToDo from './components/ToDo/ToDo';
import Profile from './components/Profile/Profile';

import * as generalActionCreators from './store/actions/general';
import * as authActionCreators from './store/actions/auth';
import * as storeFile from './store/store';

// import logo from "./logo.svg";
import "./App.css";
import { DatePicker, Row, Col, Layout } from "antd";
const { Header, Content, Footer, Sider } = Layout;


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


    // set an office to be used for the bottom part of the menu

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
                      <Content style={{ padding: '0 10px' }}>
                        <Switch>
                          <Route exact path='/' component={HomePage} />
                          <Route exact path='/home' component={HomePage} />
                          <Route exact path='/to-do' component={ToDo} />
                          <Route exact path='/profile' component={Profile} />
                          <Route exact path='/:currentOfficeUID/services' component={Services} />
                          <Route exact path='/:currentOfficeUID/users' component={Users} />
                          <Route exact path='/:currentOfficeUID/office-metrics' component={OfficeMetrics} />
                          <Route exact path='/:currentOfficeUID/support-tickets' component={SupportTickets} />
                        </Switch>
                      </Content>
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
    currentOffice: state.general.currentOffice
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
