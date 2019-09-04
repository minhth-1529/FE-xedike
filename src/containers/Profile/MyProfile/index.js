import React, { Component } from 'react';
import AvatarImg from 'assets/images/user-ic.png';
import { Avatar, Body, UploadCustom } from './styled';
import * as Yup from 'yup';
import { withFormik, Form as FormikForm, Field } from 'formik';
import { Form, Input, Button, Icon, DatePicker } from 'antd';
import { connect } from 'react-redux';
import moment from 'moment';
import apiCaller from 'utils/apiCaller';
import { withRouter } from 'react-router-dom';
import { API_URL } from 'constants/config';

class MyProfile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            fullName: '',
            registerDate: '',
            avatar: ''
        };
    }

    componentDidMount() {
        const { auth, setFieldValue } = this.props;

        if (!auth.authenticate) return this.props.history.push('/');

        apiCaller(`api/users/${auth.user.id}`, 'GET', null)
            .then(res => {
                this.setState({
                    fullName: res.data.fullName,
                    registerDate: moment(res.data.registerDate).format(
                        'DD/MM/YYYY'
                    ),
                    avatar: `${API_URL}/${res.data.avatar}`
                });

                setTimeout(() => {
                    setFieldValue('email', res.data.email);
                    setFieldValue('fullName', res.data.fullName);
                    setFieldValue('phoneNumber', res.data.phoneNumber);
                    setFieldValue('DOB', res.data.DOB);
                }, 1);
            })
            .catch(err => console.log(err));
    }

    render() {
        const { values, setFieldValue, handleSubmit, auth } = this.props;
        const { fullName, registerDate, avatar } = this.state;

        return (
            <div className="container">
                <div className="profile-page mt-4">
                    <div className="row">
                        <div className="col-3">
                            <Avatar>
                                <div className="text-center">
                                    <UploadCustom
                                        name="avatar"
                                        listType="picture-card"
                                        className={
                                            avatar !== ''
                                                ? 'avatar-uploader'
                                                : 'avatar-uploader img-uploaded'
                                        }
                                    >
                                        <img
                                            className="avatar"
                                            src={avatar}
                                            alt="avatar"
                                        />
                                        <div className="btn-upload">
                                            <Icon
                                                type="upload"
                                                style={{ fontSize: '24px' }}
                                            />
                                        </div>
                                    </UploadCustom>
                                    <h5 className="mb-0">{fullName}</h5>
                                </div>
                                <div className="mt-3 info">
                                    <p className="mb-0">
                                        Active day: {registerDate}
                                    </p>
                                    <p className="mb-0">Your rating: </p>
                                    <p className="mb-0">Total booking trip: </p>
                                </div>
                            </Avatar>
                        </div>
                        <div className="col-9">
                            <Body>
                                <h5 className="font-weight-normal d-flex align-items-center mb-4">
                                    <Icon type="user" className="mr-1" />
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
                                                    format="DD/MM/YYYY"
                                                    value={moment(values.DOB)}
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

const mapStateToProps = state => {
    return {
        auth: state.Authenticate
    };
};

const withFormikHOC = withFormik({
    mapPropsToValues(props) {
        return {
            email: '',
            fullName: '',
            phoneNumber: '',
            DOB: undefined,
            password: '',
            verifyPassword: '',
            newPassword: '',
            userType: props.auth.user.userType
        };
    },
    handleSubmit: (value, { props }) => {
        apiCaller(`api/users/${props.auth.user.id}`, 'PUT', value)
            .then(res => {
                console.log(res);
            })
            .catch(err => console.log(err));
    }
});

export default connect(
    mapStateToProps,
    null
)(withRouter(withFormikHOC(MyProfile)));
