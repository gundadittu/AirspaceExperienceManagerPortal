import React from "react";
import { withRouter } from 'react-router-dom';
import { connect, Provider } from 'react-redux';

import * as servicePackageActionCreators from '../../store/actions/servicePackage';

import * as config from './ToDoConfig';

import "./ToDo.css";
import { Tabs } from 'antd';
const { TabPane } = Tabs;




class ToDo extends React.Component {


  componentDidMount(){
    this.props.loadServicePackages();
  }

  renderPackagesByStatus(status){
    let packages = this.props.packageList.filter( x => {
      return x.status === status
    });
    //put relevant packages data into renderable form

    return (<p> {status} work in progress</p>);
  }

  render() {
    return (
      <div>
        <h1>To Do</h1>
        <Tabs defaultActiveKey="1">
          {config.tabs.map(status => {
            return (
              <TabPane tab={status.title} key={status.key}>
                {this.renderPackagesByStatus(status.key)}
              </TabPane>
            )
          })}


          {/*<TabPane tab="Requested By Customer" key="REQUESTED_BY_CUSTOMER">
            {this.renderPackagesByStatus('REQUESTED_BY_CUSTOMER')}
          </TabPane>
          <TabPane tab="Setting Up Plan" key="SETTING_UP_PLAN">
            {this.renderPackagesByStatus('SETTING_UP_PLAN')}
          </TabPane>
          <TabPane tab="Pending Customer Approval" key="PENDING_CUSTOMER_APPROVAL">
            Content of Tab Pane 3
          </TabPane>
          <TabPane tab="Needs Setting Up" key="NEEDS_SETTING_UP">
            Content of Tab Pane 1
          </TabPane>
          <TabPane tab="Setting Up Service" key="SETTING_UP_SERVICE">
            Content of Tab Pane 1
          </TabPane>
          <TabPane tab="Active" key="ACTIVE">
            Content of Tab Pane 1
          </TabPane>
          <TabPane tab="Cancellation Requested" key="CANCELLATION_REQUESTED_BY_CUSTOMER">
            Content of Tab Pane 1
          </TabPane>
          <TabPane tab="Cancelled" key="CANCELLED">
            Content of Tab Pane 1
          </TabPane>
          <TabPane tab="Expired" key="EXPIRED">
            Content of Tab Pane 1
          </TabPane>*/}
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
      editServicePackageStatus: (servicePackageUID, newStatus) =>
      dispatch(servicePackageActionCreators.editServicePackageStatus(servicePackageUID, newStatus))
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ToDo));
