import React from "react";
import { Route, Switch, Link, withRouter } from 'react-router-dom';
import { connect, Provider } from 'react-redux';

import * as servicePackageActionCreators from '../../store/actions/servicePackage';

import * as config from './ToDoConfig';

import "./ToDo.css";
import { Tabs, Card, Badge, Breadcrumb, Empty, Typography, Divider, Button, Icon, List, Statistic, Col, Row, Dropdown, Menu, Modal } from 'antd';
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

  renderModal(servicePackage){
    this.props.loadPackage(servicePackage.uid);
    return(
      <React.Fragment>
        <Button onClick={this.showModal}>
          <Link>More Info (Modal)</Link>
        </Button>

        <Modal
          title="More Info"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          width={1000}
        >
          <h1>Current Status: {this.formatStatus(this.props.currentServicePackage.status)}</h1>
          <p>{this.props.currentServicePackage.uid}</p>
          {this.renderModalActivityFeed()}
        </Modal>
      </React.Fragment>
    );
  };

  renderModalActivityFeed(){
    let data = this.props.currentServicePackage.activityFeed.sort(function(x, y){
        return y.time._seconds - x.time._seconds;
    });
    return (
        <List 
            itemLayout="horizontal" 
            dataSource={data}
            renderItem={x => (
                <List.Item>
                    <List.Item.Meta
                        title={<span>{this.formatStatus(x.type)}</span>}
                        description={this.formatTimestamp(x.time._seconds)}
                    />
                    {this.formatStatus(x.newStatus)}
                </List.Item>)}
        />
    )
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

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
                        <Link to={'/service-package/' + x.uid}>More Info (Separate Page)</Link>
                      </Button>
                      
                      <Divider type='vertical'/>
                      
                      {/*this.renderModal(x)*/}
                    </span>
                    }
                  extra={<span>Last Update: {this.formatTimestamp(x.mostRecentUpdate._seconds)}</span>}
                  hoverable
                >
                  <Row type="flex" justify="start">
                    <Col span={20}>
                      { x.formData !== undefined &&
                        x.formData.map(x => {
                          return (
                            <div>
                              <Col span={4}>
                                <Statistic title={x.question} value={x.answer} />
                              </Col>
                              
                            </div>
                          );}
                      )}
                    </Col>
                    <Col span={4}>
                      <Button 
                        type="primary" 
                        style={{float:'right'}}
                        onClick={(e) => this.handleAdvanceStatus(e,x.status,x.uid)}>
                         {this.formatStatus(this.getNextStatus(x.status))} <Icon type="arrow-right"/>
                      </Button>
                    </Col>
                  </Row>
                  
                  <br></br>
                  <Divider/>
                  <Row>
                    <Text type="secondary">Service Package UID: {x.uid}</Text>
                    <Dropdown style={{float:'right'}} overlay={this.changeStatusDropdownMenu(x.status,x.uid)}>
                      <Button style={{float:'right'}}>
                        Change Status <Icon type="down" />
                      </Button>
                    </Dropdown>
                  </Row>
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
        <Breadcrumb>
          <Breadcrumb.Item><Link to={'/'}>Experience Manager Portal</Link></Breadcrumb.Item>
          <Breadcrumb.Item>To Do</Breadcrumb.Item>
        </Breadcrumb>
        <h1>To Do</h1>
        <Tabs size="small" tabBarGutter="0" 
          defaultActiveKey={this.props.currentServicePackage.uid !== null ? this.props.currentServicePackage.status : config.statuses[0].key}>
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
      isLoadingServicePackages: state.servicePackages.isLoadingServicePackages,
      currentServicePackage: state.servicePackages.currentServicePackage
    }
};

const mapDispatchToProps = dispatch => {
    return {
      loadServicePackages: () => dispatch(servicePackageActionCreators.loadServicePackages()),
      editServicePackageStatus: (servicePackageUID, newStatus) => dispatch(servicePackageActionCreators.editServicePackageStatus(servicePackageUID, newStatus)),
      setCurrentServicePackageUID: (servicePackageUID) => dispatch(servicePackageActionCreators.setCurrentServicePackageUID(servicePackageUID)),
      loadPackage: (servicePackageUID) => dispatch(servicePackageActionCreators.loadPackage(servicePackageUID))
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ToDo));
