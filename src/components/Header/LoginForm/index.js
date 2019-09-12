import React, { PureComponent } from 'react';
import { ModalCustom } from '../styled';
import { Form, Button, Spin, notification } from 'antd';
import { object, string } from 'yup';
import { withFormik, Form as FormikForm } from 'formik';
import apiCaller from 'utils/apiCaller';
import { connect } from 'react-redux';
import { authLogin } from 'services/Auth/actions.js';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import formInput from 'utils/formInput';

const FormItem = Form.Item;

class LoginForm extends PureComponent {
    render() {
        const {
            signInVisible,
            errors,
            touched,
            loginModal,
            registerModal,
            handleSubmit,
            values
        } = this.props;

        return (
            <ModalCustom
                title={<h3 className="modal-title text-center">Login</h3>}
                footer={[null, null]}
                visible={signInVisible}
                onCancel={() => loginModal(false)}
            >
                <Spin spinning={!errors && values.spinning} tip="Loading...">
                    <FormikForm onSubmit={handleSubmit}>
                        {formInput(
                            touched.email,
                            errors.email,
                            'email',
                            'Email',
                            'mail'
                        )}
                        {formInput(
                            touched.password,
                            errors.password,
                            'password',
                            'Password',
                            'lock',
                            'password'
                        )}

                        <div className="input-group text-center mb-3 justify-content-center">
                            Are you member?
                            <span
                                className="text-primary ml-1 cursor-point"
                                onClick={() => registerModal(true)}
                            >
                                Register
                            </span>
                        </div>
                        <div className="input-group">
                            <Button
                                htmlType="submit"
                                type="primary"
                                size="large"
                                block
                            >
                                Login
                            </Button>
                        </div>
                    </FormikForm>
                </Spin>
            </ModalCustom>
        );
    }
}

const withFormikHOC = withFormik({
    mapPropsToValues() {
        return {
            email: '',
            password: '',
            spinning: false
        };
    },
    validationSchema: object().shape({
        email: string()
            .required('Email is required')
            .email('Email is invalid'),
        password: string()
            .required('Password is required')
            .min(3, 'Password must have min 3 characters')
    }),
    handleSubmit: (
        values,
        { resetForm, setFieldValue, setFieldError, props }
    ) => {
        setFieldValue('spinning', true);
        apiCaller('users/login', 'POST', values)
            .then(res => {
                setFieldValue('spinning', false);
                axios.defaults.headers.common['token'] = res.data.token;
                resetForm();
                props.loginModal(false);
                props.authLogin(res.data.token);
                notification.success({
                    message: 'Login successfully',
                    duration: 2.5,
                    description: `Welcome ${
                        jwtDecode(res.data.token).fullName
                    }`,
                    placement: 'topLeft'
                });
            })
            .catch(err => {
                setFieldError('email', err.response.data);
                setFieldError('password', err.response.data);
            });
    }
});

const mapDispatchToProps = dispatch => {
    return {
        authLogin: payload => {
            dispatch(authLogin(payload));
        }
    };
};

export default connect(
    null,
    mapDispatchToProps
)(withFormikHOC(LoginForm));
