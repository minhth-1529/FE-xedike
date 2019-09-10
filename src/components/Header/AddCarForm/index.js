import React, { PureComponent } from 'react';
import { ModalCustom } from '../styled';
import { Form, Input, Button, InputNumber, Spin } from 'antd';
import * as Yup from 'yup';
import { withFormik, Form as FormikForm, Field } from 'formik';
import apiCaller from 'utils/apiCaller';
import { connect } from 'react-redux';
import { authLogin } from 'services/Auth/actions.js';

const FormItem = Form.Item;

class AddCarForm extends PureComponent {
    render() {
        const {
            errors,
            touched,
            handleSubmit,
            values,
            addCarVisible,
            addCarModal,
            setFieldValue
        } = this.props;

        return (
            <ModalCustom
                title={<h3 className="modal-title text-center">Add car</h3>}
                footer={[null, null]}
                visible={addCarVisible}
                onCancel={() => addCarModal(false)}
            >
                <Spin spinning={!errors && values.spinning} tip="Loading...">
                    <FormikForm onSubmit={handleSubmit}>
                        <div className="row">
                            <div className="col-6">
                                <FormItem
                                    validateStatus={
                                        touched.carName &&
                                        errors.carName &&
                                        'error'
                                    }
                                    help={touched.carName && errors.carName}
                                >
                                    <label className="mb-0">Car name</label>
                                    <Field
                                        name="carName"
                                        render={({ field }) => (
                                            <Input
                                                type="text"
                                                size="large"
                                                placeholder="Enter your car name..."
                                                {...field}
                                            />
                                        )}
                                    />
                                </FormItem>
                            </div>
                            <div className="col-6">
                                <FormItem
                                    validateStatus={
                                        touched.carModel &&
                                        errors.carModel &&
                                        'error'
                                    }
                                    help={touched.carModel && errors.carModel}
                                >
                                    <label className="mb-0">Car model</label>
                                    <Field
                                        name="carModel"
                                        render={({ field }) => (
                                            <Input
                                                type="text"
                                                size="large"
                                                placeholder="Enter your car model..."
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
                                        touched.autoMakers &&
                                        errors.autoMakers &&
                                        'error'
                                    }
                                    help={
                                        touched.autoMakers && errors.autoMakers
                                    }
                                >
                                    <label className="mb-0">Automakers</label>
                                    <Field
                                        name="autoMakers"
                                        render={({ field }) => (
                                            <Input
                                                type="text"
                                                size="large"
                                                placeholder="Enter your automakers..."
                                                {...field}
                                            />
                                        )}
                                    />
                                </FormItem>
                            </div>
                            <div className="col-6">
                                <FormItem
                                    validateStatus={
                                        touched.carSeats &&
                                        errors.carSeats &&
                                        'error'
                                    }
                                    help={touched.carSeats && errors.carSeats}
                                >
                                    <label className="mb-0">Car seats</label>
                                    <InputNumber
                                        min={2}
                                        name="carSeats"
                                        value={values.carSeats}
                                        style={{
                                            display: 'block',
                                            width: '100%'
                                        }}
                                        size="large"
                                        placeholder="Enter your car seats..."
                                        onChange={v =>
                                            setFieldValue('carSeats', v)
                                        }
                                    />
                                </FormItem>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <FormItem
                                    validateStatus={
                                        touched.carCertificate &&
                                        errors.carCertificate &&
                                        'error'
                                    }
                                    help={
                                        touched.carCertificate &&
                                        errors.carCertificate
                                    }
                                >
                                    <label className="mb-0">
                                        Car certificate
                                    </label>
                                    <Field
                                        name="carCertificate"
                                        render={({ field }) => (
                                            <Input
                                                type="text"
                                                size="large"
                                                placeholder="Enter your car certificate..."
                                                {...field}
                                            />
                                        )}
                                    />
                                </FormItem>
                            </div>
                        </div>
                        <div className="input-group">
                            <Button
                                htmlType="submit"
                                type="primary"
                                size="large"
                                block
                            >
                                Submit
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
            carModel: '',
            carSeats: 2,
            carName: '',
            autoMakers: '',
            carCertificate: ''
        };
    },
    validationSchema: Yup.object().shape({
        carModel: Yup.string().required('This field is required'),
        carName: Yup.string().required('This field is required'),
        autoMakers: Yup.string().required('This field is required'),
        carCertificate: Yup.string().required('This field is required')
    }),
    handleSubmit: values => {
        apiCaller('cars', 'POST', values)
            .then(res => {
                console.log(res);
            })
            .catch(err => console.log(err.response));
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
)(withFormikHOC(AddCarForm));
