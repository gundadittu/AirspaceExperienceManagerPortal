import React from 'react';
import { connect } from 'react-redux';
import { Form, Input, Modal } from 'antd';
import * as generalActionCreator from '../../store/actions/general';

class PasswordReset extends React.Component {

    onCreate() {
        const form = this.props.form;
        form.validateFields((err, values) => {
            this.onCancel();

            if (err) {
                return;
            }

            const email = values.email || null;
            // this.props.mixpanel.track("Send Password Reset Email");
            this.props.sendPasswordReset(email);
        });
    }

    onCancel() {
        this.props.form.setFields({
            email: {
                value: '',
                error: null
            }
        });

        this.props.hideForm();
    }

    render() {
        // Must provide hideForm() in props too
        const visible = this.props.visible || false;
        const { getFieldDecorator } = this.props.form;

        return (
            <Modal
                visible={visible}
                title={"Forgot your password?"}
                okText="Submit"
                onCancel={this.onCancel.bind(this)}
                onOk={this.onCreate.bind(this)}
            // confirmLoading={confirmLoading}
            >
                <Form layout="vertical">
                    <Form.Item label="Email Address">
                        {getFieldDecorator('email', {
                            rules: [{ required: true, whitespace: true, message: 'Please input your email address.', pattern: /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+.)+([a-zA-Z0-9]{2,4})+$/ }],
                        })(
                            <Input />
                        )}
                    </Form.Item>
                </Form>
            </Modal>
        );
    }

}

const mapDispatchToProps = dispatch => {
    return {
        sendPasswordReset: (email) => dispatch(generalActionCreator.sendPasswordReset(email))
    }
};

const mapStateToProps = state => {
    return {
    }
}

export default Form.create({ name: 'passwordResetForm' })(connect(mapStateToProps, mapDispatchToProps)(PasswordReset));
