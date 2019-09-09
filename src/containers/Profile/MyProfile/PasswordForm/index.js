import React, { PureComponent } from 'react';
import { string, object, ref } from 'yup';
import { Formik, Field } from 'formik';
import { Form, Input, Button, notification } from 'antd';
import apiCaller from 'utils/apiCaller';
import _ from 'lodash';

const FormItem = Form.Item;

class PasswordForm extends PureComponent {
    render() {
        const { id } = this.props;
        return (
            <Formik
                initialValues={{
                    password: '',
                    verifyPassword: '',
                    newPassword: ''
                }}
                validationSchema={object().shape({
                    password: string().required('Password is required').min(3, 'Password must have min 3 characters'),
                    verifyPassword: string().required(
                        'Verify password is required'
                    ).oneOf([ref('password'), null], 'Passwords must match'),
                    newPassword: string().required('New password is required')
                })}
                onSubmit={(values, { setFieldError }) => {
                    apiCaller(`users/password/${id}`, 'PUT', values)
                        .then(() => {
                            notification.success({
                                message: 'Update successfully',
                                duration: 2.5,
                                placement: 'topLeft'
                            });
                        })
                        .catch(err => {
                            _.map(Object.keys(err.response.data), field => {
                                setFieldError(field, err.response.data[field]);
                            });
                        });
                }}
                render={({ touched, errors, handleSubmit }) => (
                    <form onSubmit={handleSubmit}>
                        <div className="row">
                            <div className="col-3 text-right">
                                <label className="mb-0 ant-form-item-required">
                                    Password
                                </label>
                            </div>
                            <div className="col-9">
                                <FormItem
                                    validateStatus={
                                        touched.password &&
                                        errors.password &&
                                        'error'
                                    }
                                    help={touched.password && errors.password}
                                >
                                    <Field
                                        name="password"
                                        render={({ field }) => (
                                            <Input.Password
                                                type="password"
                                                size="large"
                                                placeholder="Enter your password..."
                                                {...field}
                                            />
                                        )}
                                    />
                                </FormItem>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-3 text-right">
                                <label className="mb-0 ant-form-item-required">
                                    Verify password
                                </label>
                            </div>
                            <div className="col-9">
                                <FormItem
                                    validateStatus={
                                        touched.verifyPassword &&
                                        errors.verifyPassword &&
                                        'error'
                                    }
                                    help={
                                        touched.verifyPassword &&
                                        errors.verifyPassword
                                    }
                                >
                                    <Field
                                        name="verifyPassword"
                                        render={({ field }) => (
                                            <Input.Password
                                                type="password"
                                                size="large"
                                                placeholder="Enter your password..."
                                                {...field}
                                            />
                                        )}
                                    />
                                </FormItem>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-3 text-right">
                                <label className="mb-0 ant-form-item-required">
                                    New password
                                </label>
                            </div>
                            <div className="col-9">
                                <FormItem
                                    validateStatus={
                                        touched.newPassword &&
                                        errors.newPassword &&
                                        'error'
                                    }
                                    help={
                                        touched.newPassword &&
                                        errors.newPassword
                                    }
                                >
                                    <Field
                                        name="newPassword"
                                        render={({ field }) => (
                                            <Input.Password
                                                type="password"
                                                size="large"
                                                placeholder="Enter your password..."
                                                {...field}
                                            />
                                        )}
                                    />
                                </FormItem>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6 offset-3">
                                <Button
                                    htmlType="submit"
                                    type="primary"
                                    size="large"
                                >
                                    Submit
                                </Button>
                            </div>
                        </div>
                    </form>
                )}
            />
        );
    }
}

export default PasswordForm;
