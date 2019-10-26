import React from "react";
import ServicesTable from './ServicesTable';
import { withRouter } from 'react-router-dom';
import { Table, Menu, Dropdown, Button, Icon } from 'antd';
import { connect, Provider } from 'react-redux';
import * as generalActionCreators from '../../store/actions/general';
import * as authActionCreators from '../../store/actions/auth';
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

  componentDidMount() {
    this.props.loadServicePackages();

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
      render: (ts) => (<span>{this.formatTimestamp(ts)} </span>)
    },
    // change the status into an action so it can be updated
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Dropdown.Button
          overlay={
            <Menu>
              <Menu.Item key="1">
                <Icon type="user" />
                1st menu item
              </Menu.Item>
              <Menu.Item key="2">
                <Icon type="user" />
                2nd menu item
              </Menu.Item>
              <Menu.Item key="3">
                <Icon type="user" />
                3rd menu item
              </Menu.Item>
            </Menu>
          }>
            {this.formatStatus(status)}
        </Dropdown.Button>)
    }



  ]


  //{/* rowKey={record => record.uid.toString()} */}
  // pagination={false}
  // loading={this.props.isLoadingServicePackages}

  render() {


    return(
      <div>
        <h1> Services Packages </h1>

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
      servicePackages: state.general.servicePackages

    }
};

const mapDispatchToProps = dispatch => {
    return {
      loadServicePackages: () => dispatch(generalActionCreators.loadServicePackages())
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Services));
