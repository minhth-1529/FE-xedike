import React, { PureComponent } from 'react';
import { ModalCustom } from '../styled';
import * as Yup from 'yup';
import { withFormik, Form as FormikForm, Field } from 'formik';
import { Form, Input, Button, Icon, DatePicker } from 'antd';
import { UserType } from './styled';
import Driver from 'assets/images/signup_driver.png';
import Passenger from 'assets/images/signup_passenger.png';
import { toast, ToastContainer } from 'react-toastify';
import apiCaller from 'utils/apiCaller';

const FormItem = Form.Item;

class RegisterForm extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            date: undefined
        };
    }

    render() {
        const {
            registerVisible,
            errors,
            touched,
            loginModal,
            registerModal,
            handleSubmit,
            setFieldValue,
            values
        } = this.props;

        return (
            <ModalCustom
                title={
                    <>
                        <h3 className="modal-title text-center">Register</h3>
                        <p className="text-center mb-0">
                            Do you have account?{' '}
                            <span
                                className="cursor-point text-primary"
                                onClick={() => loginModal(true)}
                            >
                                Login
                            </span>
                        </p>
                    </>
                }
                footer={[null, null]}
                visible={registerVisible}
                onCancel={() => registerModal(false)}
            >
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
                                    suffix={
                                        <Icon
                                            type="mail"
                                            style={{
                                                color: 'rgba(0,0,0,.25)'
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
                    </FormItem>
                    <FormItem
                        validateStatus={
                            touched.fullName && errors.fullName && 'error'
                        }
                        help={touched.fullName && errors.fullName}
                    >
                        <label className="mb-0">Full name</label>
                        <Field
                            name="fullName"
                            render={({ field }) => (
                                <Input
                                    suffix={
                                        <Icon
                                            type="user"
                                            style={{
                                                color: 'rgba(0,0,0,.25)'
                                            }}
                                        />
                                    }
                                    type="text"
                                    size="large"
                                    placeholder="Enter your full name..."
                                    {...field}
                                />
                            )}
                        />
                    </FormItem>
                    <div className="row">
                        <div className="col-6">
                            <FormItem
                                validateStatus={
                                    touched.password &&
                                    errors.password &&
                                    'error'
                                }
                                help={touched.password && errors.password}
                            >
                                <label className="mb-0">Password</label>
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
                        <div className="col-6">
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
                                <label className="mb-0">Verify password</label>
                                <Field
                                    name="verifyPassword"
                                    render={({ field }) => (
                                        <Input.Password
                                            type="password"
                                            size="large"
                                            placeholder="Verify password..."
                                            {...field}
                                        />
                                    )}
                                />
                            </FormItem>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <FormItem
                                validateStatus={
                                    touched.phoneNumber &&
                                    errors.phoneNumber &&
                                    'error'
                                }
                                help={touched.phoneNumber && errors.phoneNumber}
                            >
                                <label className="mb-0">Phone number</label>
                                <Field
                                    name="phoneNumber"
                                    render={({ field }) => (
                                        <Input
                                            suffix={
                                                <Icon
                                                    type="phone"
                                                    style={{
                                                        color: 'rgba(0,0,0,.25)'
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
                            </FormItem>
                        </div>
                        <div className="col-6">
                            <FormItem
                                validateStatus={
                                    touched.DOB && errors.DOB && 'error'
                                }
                                help={touched.DOB && errors.DOB}
                            >
                                <label className="mb-0">Date of birth</label>
                                <DatePicker
                                    format="DD/MM/YYYY"
                                    size="large"
                                    className="d-block"
                                    name="DOB"
                                    onChange={(date, dateString) =>
                                    setFieldValue('DOB', dateString)
                                }
                                />
                            </FormItem>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <label className="mb-3 mt-2">Register with?</label>
                        </div>
                        <div className="col-12">
                            <div className="row">
                                <div className="col-6">
                                    <FormItem
                                        validateStatus={
                                            touched.userType &&
                                            errors.userType &&
                                            'error'
                                        }
                                        help={
                                            touched.userType && errors.userType
                                        }
                                    >
                                        <UserType>
                                            <Field
                                                name="userType"
                                                render={({ field }) => (
                                                    <input
                                                        type="radio"
                                                        {...field}
                                                        value="passenger"
                                                        checked={
                                                            values.userType ===
                                                            'passenger'
                                                        }
                                                    />
                                                )}
                                            />
                                            <div className="label-wrapper">
                                                <img
                                                    src={Passenger}
                                                    alt="passenger"
                                                />
                                                <strong className="text-center d-block">
                                                    Passenger
                                                </strong>
                                            </div>
                                        </UserType>
                                    </FormItem>
                                </div>
                                <div className="col-6">
                                    <FormItem>
                                        <UserType>
                                            <Field
                                                name="userType"
                                                render={({ field }) => (
                                                    <input
                                                        type="radio"
                                                        {...field}
                                                        value="driver"
                                                        checked={
                                                            values.userType ===
                                                            'driver'
                                                        }
                                                    />
                                                )}
                                            />
                                            <div className="label-wrapper">
                                                <img
                                                    src={Driver}
                                                    alt="driver"
                                                />
                                                <strong className="text-center d-block">
                                                    Driver
                                                </strong>
                                            </div>
                                        </UserType>
                                    </FormItem>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="input-group mt-3">
                        <Button
                            htmlType="submit"
                            type="primary"
                            size="large"
                            block
                        >
                            Register
                        </Button>
                    </div>
                </FormikForm>
                <ToastContainer autoClose={2000} />
            </ModalCustom>
        );
    }
}

export default withFormik({
    mapPropsToValues() {
        return {
            email: '',
            fullName: '',
            password: '',
            verifyPassword: '',
            phoneNumber: '',
            DOB: undefined,
            userType: ''
        };
    },
    validationSchema: Yup.object().shape({
        email: Yup.string()
            .required('Email is required')
            .email('Email is invalid'),
        fullName: Yup.string().required('Full name is required'),
        password: Yup.string().required('Password is required'),
        verifyPassword: Yup.string()
            .required('Verify password is required')
            .oneOf([Yup.ref('password'), null], 'Passwords must match'),
        phoneNumber: Yup.string().required('Phone number is required'),
        DOB: Yup.string().required('Day of birth is required'),
        userType: Yup.string().required('User type is required')
    }),
    handleSubmit: (values, { resetForm, props, setFieldError }) => {
        apiCaller('api/users', 'POST', values)
            .then(res => {
                if (res.status === 200) {
                    toast.success(res.data.statusText, {
                        onClose: () => {
                            resetForm();
                            props.registerModal(false);
                        }
                    });
                }
            })
            .catch(err => {
                toast.error('Some error has occurred');
                setFieldError('email', err.response.data.email);
                setFieldError('phoneNumber', err.response.data.phoneNumber);
            });
    }
})(RegisterForm);
