import React from 'react';
import { Avatar, Menu, Dropdown, Icon, List, Affix, Card } from 'antd';
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux';
import * as authActionCreators from '../../store/actions/auth';
import * as genActionCreators from '../../store/actions/general';
import { withRouter } from 'react-router-dom';


class NavBar extends React.Component {
  state = {
    current: null,
  }
  /*
  componentDidMount() {
    this.props.loadNotifications()
  }
  */
  handleClick = (e) => {
    if (e.key === "signOut") {
      this.props.signOutUser();
    }
  }


  renderProfileMenu() {
    return (
        <Menu
          className="navBarProfileMenu menu-tab"
          onClick={this.handleClick}
          style={{ textAlign: 'right', border: "0", borderColor: "white", borderWidth: 0 }}
        >
          <Menu.Item key="users">
            <Grid container justify="center" alignItems="center">
              Manage Users
          </Grid>
          </Menu.Item>
          <Menu.Item key="office-profile">
            <Grid container justify="center" alignItems="center">
              Office Profile
          </Grid>
          </Menu.Item>
          <Menu.Item key="signOut">
            <Grid container justify="center" alignItems="center">
              Sign Out
          </Grid>
          </Menu.Item>
        </Menu >
      );
  }


  render() {
    return (
        <Affix>
          <Menu
            className="menu-tab"
            onClick={this.handleClick}
            style={{ textAlign: 'right', border: 0}}
            mode="horizontal"
          >
            <Menu.Item key="profile">
              <Dropdown overlay={this.renderProfileMenu()} trigger={['click']}>
                <a className="ant-dropdown-link" href="#">
                  {
                    <Avatar style={{ color: '#ffffff', backgroundColor: '#f07c94' }}>{this.props.user.firstName[0]}</Avatar>
                  }
                </a>
              </Dropdown>
            </Menu.Item>
          </Menu>
        </Affix>
    )
  }
};

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    notifications: state.general.notifications,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    signOutUser: () => dispatch(authActionCreators.signOutUserAction()),
    // loadNotifications: () => dispatch(genActionCreators.loadNotifications())
  }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavBar));
