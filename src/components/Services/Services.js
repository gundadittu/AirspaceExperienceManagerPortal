import React from "react";
import { withRouter } from 'react-router-dom';
import { Table, Menu, Dropdown, Button, Icon, Divider, Descriptions } from 'antd';
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

  getNextStatus(currentStatus){
    const STATUSES = ['REQUESTED_BY_CUSTOMER', 'SETTING_UP_PLAN', 'PENDING_CUSTOMER_APPROVAL', 'NEEDS_SETTING_UP', 'SETTING_UP_SERVICE', 'ACTIVE', 'CANCELLATION_REQUESTED_BY_CUSTOMER', 'CANCELLED', 'EXPIRED'];
    for (let i = 0; i < STATUSES.length - 1; i++){
      if (STATUSES[i] == currentStatus){
        return STATUSES[i+1];
      }
    }
    return currentStatus;

    // need to make this more robust


  }

  componentDidMount() {
    this.props.loadServicePackages();
    // console.log('this.props.servicePackages below');
    // console.log(this.props.packageList);
    //this.props.editServicePackageStatus('ivAkLGclE005TZpLp59m', 'INACTIVE');

  };

  handleStatusEdit = (e, status, servicePackageUID) => {
    const key = e.key;

    if (key === "advanceStatus") {
      console.log("advancing status")
      this.props.editServicePackageStatus(servicePackageUID,            this.getNextStatus(status));
      //this.props.loadServicePackages();
    }
  }

  statusEditMenu = (status, servicePackageUID) => {
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


  packageDetails = (record) => {
    return (
      <div>
        { record.formData !== undefined &&
          record.formData.map(x => {
            return (
              <div>
                <p>Question: {x.question}</p>
                <p>Answer: {x.answer}</p>
              </div>
            );}
          )
         }
         { record.formData !== undefined &&
           <Divider />
         }
         <p>OfficeUID: {record.officeUID._path.segments[1]}</p>

      </div>
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
      render: (office) => (<span>{office.name}</span>)
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
          <span> {this.formatStatus(status)}<Divider type="vertical"/></span>
          <Dropdown overlay={this.statusEditMenu(status, record.uid)}>
            <a className="ant-dropdown-link" href="#" style={{fontSize: 16}}>
              Edit <Icon type="down" />
            </a>
          </Dropdown>
        </React.Fragment>
      )
    }
  ]


  //{/* rowKey={record => record.uid.toString()} */}
  // pagination={false}
  // loading={this.props.isLoadingServicePackages}

  render() {

    return(
      <div>
        <h1> Service Packages </h1>
        {/* need to add loading param to Table */}
        <Table
          columns={this.columns}
          expandedRowRender={record => this.packageDetails(record)}
          dataSource={this.props.packageList}
          loading={this.props.isLoadingServicePackages}
        />
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Services));
