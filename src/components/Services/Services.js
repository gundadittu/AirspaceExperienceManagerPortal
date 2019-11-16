import React from "react";
import { withRouter } from 'react-router-dom';
import { Table, Menu, Dropdown, Button, Icon, Divider, Descriptions, Col, Row, Statistic, Typography } from 'antd';
import { connect, Provider } from 'react-redux';
import * as servicePackageActionCreators from '../../store/actions/servicePackage';
import * as config from '../ToDo/ToDoConfig';
const moment = require('moment');
const { Text } = Typography;
const STATUSES = ['REQUESTED_BY_CUSTOMER', 'SETTING_UP_PLAN', 'PENDING_CUSTOMER_APPROVAL', 'NEEDS_SETTING_UP', 'SETTING_UP_SERVICE', 'ACTIVE', 'CANCELLATION_REQUESTED_BY_CUSTOMER', 'CANCELLED', 'EXPIRED'];

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
    return moment.unix(time).format("MMMM Do YYYY, h:mm a");
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
  componentDidMount() {
    this.props.loadServicePackages();
  };

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
    </Menu>)
  };

  packageDetails = (record) => {
    return (
      <div>
        <Row type="flex" justify="start" gutter={16}>
          { record.formData !== undefined &&
            record.formData.map(x => {
            return (
              <div>
                <Col>
                  <Statistic title={x.question} value={x.answer} />
                </Col>
              </div>
            );}
          )}
        </Row>
        <Divider />
        <Text type="secondary">ServicePackageUID: {record.uid}</Text>
        <br></br>
        <Text type="secondary">OfficeUID: {record.officeUID._path.segments[1]}</Text>
      </div>
    );
  };

  columns = [
    {
      title: 'Office',
      dataIndex: 'office',
      key: 'office',
      render: (office) => (<span>{office.name}</span>)
    },
    {
      title: 'Latest Update',
      dataIndex: 'mostRecentUpdate',
      key: 'mostRecentUpdate',
      render: (ts) => (<span> {this.formatTimestamp(ts._seconds)} </span>)
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status, record) => (<span> {this.formatStatus(status)} </span> )
    },
    {
      title: 'Advance Status',
      render: (record) => (
        <Button 
        type="primary" onClick={(e) => this.handleAdvanceStatus(e,record.status,record.uid)}>
          Advance Status to <Icon type="right"/> {this.formatStatus(this.getNextStatus(record.status))}
        </Button>
      )
    },
    {
      title: 'Change Status',
      render: (record) => (
        <Dropdown  overlay={this.changeStatusDropdownMenu(record.status,record.uid)}>
          <Button>
            Change Status <Icon type="down"/>
          </Button>
        </Dropdown>
      )
    }
  ]

  render() {

    return(
      <div>
        <h1> Service Packages </h1>
        {/* need to add loading param to Table */}
        <Table
          columns={this.columns}
          expandedRowRender={record => this.packageDetails(record)}
          dataSource={this.props.packageList.filter(x => {
            return x.office.uid === this.props.currentOffice
          })}
          loading={this.props.isLoadingServicePackages}
        />
      </div>
    );
  }
};

const mapStateToProps = state => {
    return {
      packageList: state.servicePackages.packageList,
      isLoadingServicePackages: state.servicePackages.isLoadingServicePackages,
      currentOffice: state.general.currentOffice
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
