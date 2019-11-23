import React from "react";
import { withRouter, Link } from 'react-router-dom';
import { connect, Provider } from 'react-redux';
import * as servicePackageActionCreators from '../../store/actions/servicePackage';
import { List, Breadcrumb } from 'antd';
const moment = require('moment');



class ServicePackage extends React.Component {

    componentDidMount(){
        console.log(this.props.currentServicePackageUID);
        this.props.loadPackage(this.props.currentServicePackageUID);
    }

    formatTimestamp(time){
        return moment.unix(time).format("h:mm:ss A, dddd, MMMM D");
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

    renderActivityFeed(){
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


    

    render() {
        return (
            <React.Fragment>
                <Breadcrumb>
                    <Breadcrumb.Item><Link to={'/'}>Experience Manager Portal</Link></Breadcrumb.Item>
                    <Breadcrumb.Item><Link to={'/' + 'to-do'}>To Do</Link></Breadcrumb.Item>
                    <Breadcrumb.Item>{this.props.currentServicePackage.uid}</Breadcrumb.Item>
                </Breadcrumb>
                <h1>Service Package Info</h1>
                <p>Current Status: {this.formatStatus(this.props.currentServicePackage.status)}</p>
                <p>{this.props.currentServicePackage.uid}</p>
                {this.renderActivityFeed()}
            </React.Fragment>
        )
    }
}


const mapStateToProps = state => {
    return {
      currentServicePackageUID: state.servicePackages.currentServicePackageUID.servicePackageUID,
      currentServicePackage: state.servicePackages.currentServicePackage
    }
};

const mapDispatchToProps = dispatch => {
    return {
        loadPackage: (servicePackageUID) => dispatch(servicePackageActionCreators.loadPackage(servicePackageUID)),
        editServicePackageStatus: (servicePackageUID, newStatus) => dispatch(servicePackageActionCreators.editServicePackageStatus(servicePackageUID, newStatus))
      
    }
};


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ServicePackage));
