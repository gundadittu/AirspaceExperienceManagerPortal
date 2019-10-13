import React from 'react';
import { connect } from 'react-redux';
import { Menu, Icon, Divider } from 'antd';
import * as config from "./SideNavBarConfig";

const { SubMenu } = Menu;

class SideNavBar extends React.Component {

  renderMainLogo() {
    return (
      <img style={{ height: 30, width: 200, paddingLeft: 30 }} className="logo-nav-image" src={require('../../assets/images/nav-logo.png')} />
    );
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
        {Object.keys(standardLinks).map((key) => (
          <Menu.Item key={standardLinks[key].keyVal} >
              {<span style={{ fontSize: fontSize }}><Icon type={standardLinks[key].iconType} style={{ fontSize: iconSize }} /><span>{standardLinks[key].linkTitle}</span></span>}
          </Menu.Item>
        ))}
        <Divider />
        <SubMenu key="sub4" title={ <span> <Icon type="setting" />        <span>Office Name</span> </span> } >
          <Menu.Item key="9">Office 1</Menu.Item>
          <Menu.Item key="10">Office 2</Menu.Item>
          <Menu.Item key="11">Office 3</Menu.Item>
        </SubMenu>
        {Object.keys(officeSpecificLinks).map((key) => (
          <Menu.Item key={officeSpecificLinks[key].keyVal} >
              {<span style={{ fontSize: fontSize }}><Icon type={officeSpecificLinks[key].iconType} style={{ fontSize: iconSize }} /><span>{officeSpecificLinks[key].linkTitle}</span></span>}
          </Menu.Item>
        ))}
      </Menu>
    );
  }
};

export default SideNavBar;
