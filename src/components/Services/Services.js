import React from "react";
import { withRouter } from 'react-router-dom';
import { Table, Menu, Dropdown, Button, Icon } from 'antd';
import { connect, Provider } from 'react-redux';
import * as servicePackageActionCreators from '../../store/actions/servicePackage';
const moment = require('moment');

class Services extends React.Component {

  state = {
      dataSource: "active", // or "inactive" or "pending"
  };

  handleClick(e) {
      var key = e.key;
      if ((key === 'active') || (key === 'inactive') || (key === 'pending')) {
          this.setState({ dataSource: key });
      }
  };

  formatTimestamp(time){
    var description = moment(time).format('dddd MMM DD, YYYY') + ' ';
    description += moment(time).format('hh:mm A');
    return description;
  }

  formatStatus(str){
    str = str.replace(/[_-]/g, " ");
    str = str.toLowerCase()
      .split(' ')
      .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
      .join(' ');
    return str;
  }

  getNextStatus(currentStatus){
    const STATUSES = ['REQUESTED_BY_CUSTOMER', 'SETTING_UP_PLAN', 'PENDING_CUSTOMER_APPROVAL', 'NEEDS_SETTING_UP', 'SETTING_UP_SERVICE', 'ACTIVE', 'CANCELLATION_REQUESTED_BY_CUSTOMER', 'CANCELLED', 'EXPIRED'];
    for (let i = 0; i < STATUSES.length - 1; i++){
      if (STATUSES[i] == currentStatus){
        return STATUSES[i+1];
      }
    }
    return currentStatus;

    // need to change this


  }

  componentDidMount() {
    this.props.loadServicePackages();
    //this.props.editServicePackageStatus('ivAkLGclE005TZpLp59m', 'INACTIVE');

  };

  handleStatusEdit = (e, status, servicePackageUID) => {
    const key = e.key;
    console.log("key");
    console.log(key);
    if (key === "advanceStatus") {
      this.props.editServicePackageStatus(servicePackageUID, this.getNextStatus(status));
    }
  }

  menu = (status, servicePackageUID) => {
    return (
      <Menu onClick={(e) => this.handleStatusEdit(e,status,servicePackageUID)}>
        <Menu.Item key="advanceStatus" >
          <Icon type="arrow-right" />
          Advance Status to: {this.formatStatus(this.getNextStatus(status))}
        </Menu.Item>
        <Menu.Item key="manuallyChangeStatus">
          <Icon type="form" />
          Manually Change Status
        </Menu.Item>
        <Menu.Item key="cancelPackage">
          <Icon type="close" />
          Cancel Package
        </Menu.Item>
      </Menu>
    );
  };

  columns = [
    {
      title: 'ID',
      dataIndex: 'uid',
      key: 'uid'
    },
    {
      title: 'Office',
      dataIndex: 'office',
      key: 'office',
      render: (office) => (<a>{office.name}</a>)
    },
    {
      title: 'Latest Update',
      dataIndex: 'mostRecentUpdate',
      key: 'mostRecentUpdate',
      render: (ts) => (<span> {this.formatTimestamp(ts)} </span>)
    },
    // change the status into an action so it can be updated
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status, record) => (
        <React.Fragment>
          {console.log(record.uid)}
          {console.log(status)}
          <span> {this.formatStatus(status)} | </span>
          <Dropdown overlay={this.menu(status, record.uid)}>
            <a className="ant-dropdown-link" href="#" style={{fontSize: 16}}>
              Edit <Icon type="down" />
            </a>
          </Dropdown>
        </ React.Fragment>
      )
    },
    {
      title: 'More Info',
      dataIndex: ''
    }



  ]


  //{/* rowKey={record => record.uid.toString()} */}
  // pagination={false}
  // loading={this.props.isLoadingServicePackages}

  render() {

    return(
      <div>
        <h1> Service Packages </h1>

        <Table
          columns={this.columns}
          dataSource={this.props.servicePackages}
        />
      </div>
    );
  }
};



const mapStateToProps = state => {
    return {
      servicePackages: state.servicePackages.servicePackages

    }
};

const mapDispatchToProps = dispatch => {
    return {
      loadServicePackages: () => dispatch(servicePackageActionCreators.loadServicePackages()),
      editServicePackageStatus: (servicePackageUID, newStatus) =>
      dispatch(servicePackageActionCreators.editServicePackageStatus(servicePackageUID, newStatus))
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Services));
