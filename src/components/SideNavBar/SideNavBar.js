import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch, Link, withRouter } from 'react-router-dom';
import { Menu, Icon, Divider } from 'antd';
import * as config from "./SideNavBarConfig";
import * as generalActionCreators from '../../store/actions/general';
import * as authActionCreators from '../../store/actions/auth';

const { SubMenu } = Menu;

class SideNavBar extends React.Component {

  renderMainLogo() {
    return (
      <img style={{ height: 30, width: 200, paddingLeft: 30 }} className="logo-nav-image" src={require('../../assets/images/nav-logo.png')} />
    );
  };


  renderOfficeSwitcher(fontSize, iconSize) {
    if (this.props.experienceManagerOffices == null) {
      return null;
    }

    const pushOfficeHomeRoute = (uid) => {
      this.props.history.push("/office/" + uid + "/home")
      document.location.reload()
    }

    return (
      <SubMenu key={"sub1"} title={<span><Icon type="appstore" /><span>Switch Offices</span></span>}>
        {this.props.experienceManagerOffices.map((office) => (
          //<Menu.Item key={office.uid} onClick={() => pushOfficeHomeRoute(office.uid)}>
          <Menu.Item key={office.uid}>
          {<span style={{ fontSize: fontSize }}>
          <span>{office.name}</span></span>}
          </Menu.Item>
        ))}
      </SubMenu>
    );
  };

  renderNavigationLinks(links, fontSize, iconSize){
    return (
      Object.keys(links).map((key) => (
        <Menu.Item key={links[key].keyVal}>
        <Link to={'/experienceManagerPortal/' + this.props.user.uid + '/' + links[key].pageSubtitle}>
          {<span style={{ fontSize: fontSize }}>
          <Icon type={links[key].iconType} style={{ fontSize: iconSize }} /> <span>{links[key].linkTitle}</span></span>}
        </Link>
      </Menu.Item>)));
  };

  render() {
    let fontSize = 14;
    let iconSize = 14;
    if (this.props.device == "mobile") {
      fontSize = 35;
      iconSize = 25
    }

    const standardLinks = config.standardLinks;
    const officeSpecificLinks = config.officeSpecificLinks;

    return (
      <Menu
        onClick={this.handleClick} style={{ width: 256, height: 100, border: 0 }} defaultSelectedKeys={['Home']} mode="vertical" lassName="side-nav-bar"
      >
        {this.renderMainLogo()}
        {this.renderNavigationLinks(standardLinks, fontSize, iconSize)}
        <Divider />
        {this.renderOfficeSwitcher(fontSize, iconSize)}
        {this.renderNavigationLinks(officeSpecificLinks, fontSize, iconSize)}
      </Menu>
    );
  }
};

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    userType: state.auth.type,
    experienceManagerOffices: state.auth.experienceManagerOffices,
    currentPage: state.general.currentPage,
    // currentOfficeAdminUID: state.general.currentOfficeAdminUID,
    // currentOfficeAdmin: state.general.currentOfficeAdmin,
    // badgeCount: state.officeAdmin.pendingServicePlanCount,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    changePage: (payload) => dispatch(generalActionCreators.changePage(payload))
  }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SideNavBar));
