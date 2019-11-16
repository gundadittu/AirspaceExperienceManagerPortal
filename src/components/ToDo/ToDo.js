import React from "react";
import { Route, Switch, Link, withRouter } from 'react-router-dom';
import { connect, Provider } from 'react-redux';

import * as servicePackageActionCreators from '../../store/actions/servicePackage';

import * as config from './ToDoConfig';

import "./ToDo.css";
import { Tabs, Card, Badge, Empty, Typography, Divider, Button, Icon, Statistic, Col, Row, Dropdown, Menu } from 'antd';
const { TabPane } = Tabs;
const { Text } = Typography;
const STATUSES = ['REQUESTED_BY_CUSTOMER', 'SETTING_UP_PLAN', 'PENDING_CUSTOMER_APPROVAL', 'NEEDS_SETTING_UP', 'SETTING_UP_SERVICE', 'ACTIVE', 'CANCELLATION_REQUESTED_BY_CUSTOMER', 'CANCELLED', 'EXPIRED'];

const moment = require('moment');

class ToDo extends React.Component {

  state = {
    packageList: null
  }


  componentDidMount(){
    this.props.loadServicePackages();
  }

  formatTimestamp(time){
    return moment.unix(time).format("h:mm A, dddd, MMMM D");
  }

  formatStatus(str){
    if (str === undefined || str === null) {
      return "No Status Found"
    }
    str = str.replace(/[_-]/g, " ");
    str = str.toLowerCase()
      .split(' ')
      .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
      .join(' ');
    return str;
  }

  // need to make this more robust
  getNextStatus(currentStatus){
    for (let i = 0; i < STATUSES.length - 1; i++){
      if (STATUSES[i] == currentStatus){
        return STATUSES[i+1];
      }
    }
    return currentStatus;
  }

  handleAdvanceStatus(e, status, servicePackageUID){
    this.props.editServicePackageStatus(servicePackageUID, this.getNextStatus(status));
  };

  handleChangeStatus(e, servicePackageUID){
    const newStatus = e.key;
    this.props.editServicePackageStatus(servicePackageUID, newStatus);
  }

  changeStatusDropdownMenu = (currentStatus, servicePackageUID) => {
    return (
      <Menu placement="bottomLeft">
        {config.statuses.map(status => {
          return(
            <Menu.Item
              key={status.key}
              disabled={status.key === currentStatus}
              onClick={(e) => this.handleChangeStatus(e, servicePackageUID)}>
              {status.title}
            </Menu.Item>
          )
        })}
    </Menu>);
  }

  setCurrentServicePackageUID(e, servicePackageUID){
    this.props.setCurrentServicePackageUID(servicePackageUID);
  }

  renderPackagesByStatus(status){
    let packages = this.props.packageList.filter( x => {
      return x.status === status
    });

    if (packages.length == 0){
      return (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={<span>No packages at this stage</span>}/>
      );
    } else {
        return (
          packages.map( x => {
            return (
              <div>
                <Card
                  title={
                    <span>
                      {x.office.name} 
                      <Divider type='vertical'/>
                      <Button onClick = {(e) => this.setCurrentServicePackageUID(e,x.uid)}>
                        <Link to={'/service-package/' + x.uid}>More Info</Link>
                      </Button>
                    </span>
                    }
                  extra={<span>Last Update: {this.formatTimestamp(x.mostRecentUpdate._seconds)}</span>}
                  hoverable
                >
                  <Row gutter={16}>
                    <Button 
                      type="primary" 
                      onClick={(e) => this.handleAdvanceStatus(e,x.status,x.uid)}>
                      Advance Status to <Icon type="right"/> {this.formatStatus(this.getNextStatus(x.status))}
                      </Button>
                  </Row>
                  <br></br>
                  <Row type="flex" justify="start" gutter={16}>
                    { x.formData !== undefined &&
                      x.formData.map(x => {
                      return (
                        <div>
                          <Col>
                            <Statistic title={x.question} value={x.answer} />
                          </Col>
                          <br></br>
                        </div>
                      );}
                    )}
                  </Row>
                  <Row gutter={16}>
                    <Dropdown overlay={this.changeStatusDropdownMenu(x.status,x.uid)}>
                      <Button>
                        Change Status <Icon type="down" />
                      </Button>
                    </Dropdown>
                  </Row>
                  <br></br>
                  <br></br>
                  <Text type="secondary">Service Package UID: {x.uid}</Text>
                </Card>
                <br/>
              </div>
            );
        }));
    }
  }


  render() {
    return (
      <div>
        <h1>To Do</h1>
        <Tabs size="small" tabBarGutter="0">
          {config.statuses.map(status => {
            return (

              <TabPane tab={status.title} key={status.key}>

                  {this.renderPackagesByStatus(status.key)}

              </TabPane>

            )
          })}
        </Tabs>
      </div>
    );

  }
};

const mapStateToProps = state => {
    return {
      packageList: state.servicePackages.packageList,
      isLoadingServicePackages: state.servicePackages.isLoadingServicePackages
    }
};

const mapDispatchToProps = dispatch => {
    return {
      loadServicePackages: () => dispatch(servicePackageActionCreators.loadServicePackages()),
      editServicePackageStatus: (servicePackageUID, newStatus) => dispatch(servicePackageActionCreators.editServicePackageStatus(servicePackageUID, newStatus)),
      setCurrentServicePackageUID: (servicePackageUID) => dispatch(servicePackageActionCreators.setCurrentServicePackageUID(servicePackageUID))
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ToDo));
