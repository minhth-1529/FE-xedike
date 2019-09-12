import React, { PureComponent } from 'react';
import { ModalCustom } from '../styled';
import { object, string, ref } from 'yup';
import { withFormik, Form as FormikForm, Field } from 'formik';
import { Form, Button, DatePicker } from 'antd';
import { UserType } from './styled';
import Driver from 'assets/images/signup_driver.png';
import Passenger from 'assets/images/signup_passenger.png';
import { toast, ToastContainer } from 'react-toastify';
import apiCaller from 'utils/apiCaller';
import formInput from 'utils/formInput';

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
                    {formInput(
                        touched.email,
                        errors.email,
                        'email',
                        'Email',
                        'mail'
                    )}

                    {formInput(
                        touched.fullName,
                        errors.fullName,
                        'fullName',
                        'Full name',
                        'user'
                    )}
                    <div className="row">
                        <div className="col-6">
                            {formInput(
                                touched.password,
                                errors.password,
                                'password',
                                'Password',
                                'lock',
                                'password'
                            )}
                        </div>
                        <div className="col-6">
                            {formInput(
                                touched.verifyPassword,
                                errors.verifyPassword,
                                'verifyPassword',
                                'Verify password',
                                'lock',
                                'password'
                            )}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6">
                            {formInput(
                                touched.phoneNumber,
                                errors.phoneNumber,
                                'phoneNumber',
                                'Phone number',
                                'phone'
                            )}
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
                                    onChange={value =>
                                        setFieldValue('DOB', value)
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

const withFormikHOC = withFormik({
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
    validationSchema: object().shape({
        email: string()
            .required('Email is required')
            .email('Email is invalid'),
        fullName: string().required('Full name is required'),
        password: string()
            .required('Password is required')
            .min(3, 'Password must have min 3 characters'),
        verifyPassword: string()
            .required('Verify password is required')
            .oneOf([ref('password'), null], 'Passwords must match'),
        phoneNumber: string().required('Phone number is required'),
        DOB: string().required('Day of birth is required'),
        userType: string().required('User type is required')
    }),
    handleSubmit: (values, { resetForm, props, setFieldError }) => {
        apiCaller('users', 'POST', values)
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
});

export default withFormikHOC(RegisterForm);
