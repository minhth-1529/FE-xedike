import React, { PureComponent } from 'react';
import { ModalCustom } from '../styled';
import { Form, Input, Button, Icon, Spin, notification } from 'antd';
import * as Yup from 'yup';
import { withFormik, Form as FormikForm, Field } from 'formik';
import apiCaller from 'utils/apiCaller';
import { connect } from 'react-redux';
import { authLogin } from 'services/Auth/actions.js';
import jwtDecode from 'jwt-decode';

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
                        <FormItem
                            validateStatus={
                                touched.email && errors.email && 'error'
                            }
                            help={touched.email && errors.email}
                        >
                            <label className="mb-0">Email</label>
                            <Field
                                name="email"
                                render={({ field }) => (
                                    <Input
                                        disabled={values.disable}
                                        type="email"
                                        size="large"
                                        placeholder="Enter your email..."
                                        suffix={
                                            <Icon
                                                type="mail"
                                                style={{
                                                    color: 'rgba(0,0,0,.25)'
                                                }}
                                            />
                                        }
                                        {...field}
                                    />
                                )}
                            />
                        </FormItem>
                        <FormItem
                            validateStatus={
                                touched.password && errors.password && 'error'
                            }
                            help={touched.password && errors.password}
                        >
                            <label className="mb-0">Password</label>
                            <Field
                                name="password"
                                render={({ field }) => (
                                    <Input
                                        type="password"
                                        size="large"
                                        placeholder="Enter your password..."
                                        suffix={
                                            <Icon
                                                type="lock"
                                                style={{
                                                    color: 'rgba(0,0,0,.25)'
                                                }}
                                            />
                                        }
                                        {...field}
                                    />
                                )}
                            />
                        </FormItem>
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
    validationSchema: Yup.object().shape({
        email: Yup.string()
            .required('Email is required')
            .email('Email is invalid'),
        password: Yup.string()
            .required('Password is required')
            .min(3, 'Password must have min 3 characters')
    }),
    handleSubmit: (
        values,
        { resetForm, setFieldValue, setFieldError, props }
    ) => {
        setFieldValue('spinning', true);
        apiCaller('api/users/login', 'POST', values)
            .then(res => {
                setFieldValue('spinning', false);
                resetForm();
                props.authLogin(res.data.token);
                notification.success({
                    message: 'Login successfully',
                    duration: 2.5,
                    description: `Welcome ${jwtDecode(res.data.token).fullName}`,
                    placement: 'topLeft',
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
