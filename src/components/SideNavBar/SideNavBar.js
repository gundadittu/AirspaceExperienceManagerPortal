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

    // change this to just reload the current page rather than loading the office metrics route in particular
    const pushOfficeMetricsRoute = (uid) => {
      this.props.history.push("/" + uid + "/office-metrics");
      document.location.reload();
    }

    return (
      <SubMenu key={"sub1"} title={<span><Icon type="appstore" /><span>Switch Offices</span></span>}>
        {this.props.experienceManagerOffices.map((office) => (
          <Menu.Item key={office.uid} onClick={() => pushOfficeMetricsRoute(office.uid)}>
          {<span style={{ fontSize: fontSize }}>
          <span>{office.name}</span></span>}
          </Menu.Item>
        ))}
      </SubMenu>
    );
  };

  renderStandardLinks(fontSize, iconSize){
    const links = config.standardLinks
    return (
      Object.keys(links).map((key) => (
        <Menu.Item key={links[key].keyVal}>
        <Link to={'/' + links[key].pageSubtitle}>
          {<span style={{ fontSize: fontSize }}>
          <Icon type={links[key].iconType} style={{ fontSize: iconSize }} /> <span>{links[key].linkTitle}</span></span>}
        </Link>
      </Menu.Item>)));
  };

  renderOfficeSpecificLinks(fontSize, iconSize){
    const links = config.officeSpecificLinks;
    return (
      Object.keys(links).map((key) => (
        <Menu.Item key={links[key].keyVal}>
        <Link to={'/' + this.props.currentOffice + '/' + links[key].pageSubtitle}>
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

    //const standardLinks = config.standardLinks;
    //const officeSpecificLinks = config.officeSpecificLinks;

    return (
      <Menu
      style={{ border: 0, position: 'absolute', zIndex: 10 }}
        //defaultSelectedKeys={currentPages}
        mode="inline"
        className="airspace-side-nav-bar menu-tab"
        forceSubMenuRender={true}
        mode="vertical"
      >
        {this.renderMainLogo()}
        {this.renderStandardLinks(fontSize, iconSize)}
        <Divider />
        {this.renderOfficeSwitcher(fontSize, iconSize)}
        {this.renderOfficeSpecificLinks(fontSize, iconSize)}
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
    currentOffice: state.general.currentOffice,
    officesUnderExperienceManager: state.auth.user.officesUnderExperienceManager
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
