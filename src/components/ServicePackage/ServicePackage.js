import React from "react";
import { withRouter } from 'react-router-dom';
import { connect, Provider } from 'react-redux';
import * as servicePackageActionCreators from '../../store/actions/servicePackage';


class ServicePackage extends React.Component {

    componentDidMount(){
        this.props.loadServicePackage(this.props.currentServicePackageUID);
    }
    

    render() {
        return (
            <p>hello there</p>
            
        )
    }
}


const mapStateToProps = state => {
    return {
      currentServicePackageUID: state.servicePackages.currentServicePackageUID,
      servicePackage: state.servicePackages.servicePackage
    }
};

const mapDispatchToProps = dispatch => {
    return {
        loadServicePackage: (servicePackageUID) => dispatch(servicePackageActionCreators.loadServicePackage(servicePackageUID)),
        editServicePackageStatus: (servicePackageUID, newStatus) => dispatch(servicePackageActionCreators.editServicePackageStatus(servicePackageUID, newStatus))
      
    }
};


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ServicePackage));
