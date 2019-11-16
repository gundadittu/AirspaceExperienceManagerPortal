import React from "react";
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { List } from 'antd';

class Profile extends React.Component {

  //const officesUnderExperienceManagerData = this.props.user.officesUnderExperienceManager.map( office)

  render() {
    return (
      <React.Fragment>
        <h1>Your Profile</h1>
        <h2>{this.props.user.firstName} {this.props.user.lastName}</h2>
        {/*<List
          itemLayout="horizontal"
          dataSource={officesUnderExperienceManagerData}
          renderItem={item => (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                title={<a href="https://ant.design">{item.title}</a>}
                description="Ant Design, a design language for background applications, is refined by Ant UED Team"
              />
          </List.Item>*/}
    )}
  />

      </React.Fragment>
      
    );

  }
};

const mapStateToProps = state => {
  return {
    user: state.auth.user
  }
};

const mapDispatchToProps = dispatch => {
  return {
    //loadServicePackages: () => dispatch(servicePackageActionCreators.loadServicePackages())
  }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Profile));
