import React, { Component } from 'react';
import AvatarImg from 'assets/images/user-ic.png';
import { Avatar, Body } from './styled';
import * as Yup from 'yup';
import { withFormik, Form as FormikForm, Field } from 'formik';
import { Form, Input, Button, Icon, DatePicker } from 'antd';

class MyProfile extends Component {
    render() {
        const { values, setFieldValue, handleSubmit } = this.props;
        return (
            <div className="container">
                <div className="profile-page mt-4">
                    <div className="row">
                        <div className="col-3">
                            <Avatar>
                                <div className="text-center"></div>
                                <div className="mt-3 info">
                                    <p className="mb-0">Active day: </p>
                                    <p className="mb-0">Your rating: </p>
                                    <p className="mb-0">Total booking trip: </p>
                                </div>
                            </Avatar>
                        </div>
                        <div className="col-9">
                            <Body>
                                <h5 className="font-weight-normal d-flex align-items-center mb-4">
                                    <Icon type="user" className="mr-1" />{' '}
                                    Personal info
                                </h5>
                                <FormikForm onSubmit={handleSubmit}>
                                    <Form.Item>
                                        <div className="row">
                                            <div className="col-3 text-right">
                                                <label className="mb-0 ant-form-item-required">
                                                    E-mail
                                                </label>
                                            </div>
                                            <div className="col-9">
                                                <Field
                                                    name="email"
                                                    render={({ field }) => (
                                                        <Input
                                                            suffix={
                                                                <Icon
                                                                    type="mail"
                                                                    style={{
                                                                        color:
                                                                            'rgba(0,0,0,.25)'
                                                                    }}
                                                                />
                                                            }
                                                            type="email"
                                                            size="large"
                                                            placeholder="Enter your email..."
                                                            {...field}
                                                        />
                                                    )}
                                                />
                                            </div>
                                        </div>
                                    </Form.Item>
                                    <Form.Item>
                                        <div className="row">
                                            <div className="col-3 text-right">
                                                <label className="mb-0 ant-form-item-required">
                                                    Full name
                                                </label>
                                            </div>
                                            <div className="col-9">
                                                <Field
                                                    name="fullName"
                                                    render={({ field }) => (
                                                        <Input
                                                            suffix={
                                                                <Icon
                                                                    type="user"
                                                                    style={{
                                                                        color:
                                                                            'rgba(0,0,0,.25)'
                                                                    }}
                                                                />
                                                            }
                                                            type="text"
                                                            size="large"
                                                            placeholder="Enter your name..."
                                                            {...field}
                                                        />
                                                    )}
                                                />
                                            </div>
                                        </div>
                                    </Form.Item>
                                    <Form.Item>
                                        <div className="row">
                                            <div className="col-3 text-right">
                                                <label className="mb-0 ant-form-item-required">
                                                    Phone number
                                                </label>
                                            </div>
                                            <div className="col-9">
                                                <Field
                                                    name="phoneNumber"
                                                    render={({ field }) => (
                                                        <Input
                                                            suffix={
                                                                <Icon
                                                                    type="phone"
                                                                    style={{
                                                                        color:
                                                                            'rgba(0,0,0,.25)'
                                                                    }}
                                                                />
                                                            }
                                                            type="text"
                                                            size="large"
                                                            placeholder="Enter your phone number..."
                                                            {...field}
                                                        />
                                                    )}
                                                />
                                            </div>
                                        </div>
                                    </Form.Item>
                                    <Form.Item>
                                        <div className="row">
                                            <div className="col-3 text-right">
                                                <label className="mb-0 ant-form-item-required">
                                                    Day of birth
                                                </label>
                                            </div>
                                            <div className="col-9">
                                                <DatePicker
                                                    value={values.DOB}
                                                    format="DD/MM/YYYY"
                                                    size="large"
                                                    className="d-block"
                                                    name="DOB"
                                                    onChange={value =>
                                                        setFieldValue(
                                                            'DOB',
                                                            value
                                                        )
                                                    }
                                                />
                                            </div>
                                        </div>
                                    </Form.Item>
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
                                </FormikForm>
                                <h5 className="font-weight-normal d-flex align-items-center mb-4 mt-5">
                                    <Icon type="lock" className="mr-1" /> Change
                                    password
                                </h5>
                                <FormikForm onSubmit={handleSubmit}>
                                    <Form.Item>
                                        <div className="row">
                                            <div className="col-3 text-right">
                                                <label className="mb-0 ant-form-item-required">
                                                    Password
                                                </label>
                                            </div>
                                            <div className="col-9">
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
                                            </div>
                                        </div>
                                    </Form.Item>
                                    <Form.Item>
                                        <div className="row">
                                            <div className="col-3 text-right">
                                                <label className="mb-0 ant-form-item-required">
                                                    Verify password
                                                </label>
                                            </div>
                                            <div className="col-9">
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
                                            </div>
                                        </div>
                                    </Form.Item>
                                    <Form.Item>
                                        <div className="row">
                                            <div className="col-3 text-right">
                                                <label className="mb-0 ant-form-item-required">
                                                    New password
                                                </label>
                                            </div>
                                            <div className="col-9">
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
                                            </div>
                                        </div>
                                    </Form.Item>
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
                                </FormikForm>
                            </Body>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withFormik({
    mapPropsToValues() {
        return {
            email: '',
            fullName: '',
            phoneNumber: '',
            DOB: undefined,
            password: '',
            verifyPassword: '',
            newPassword: ''
        };
    },
    handleSubmit: value => {
        console.log(value);
    }
})(MyProfile);
