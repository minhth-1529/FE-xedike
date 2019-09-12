import React, { PureComponent } from 'react';
import { ModalCustom } from '../styled';
import { Form, Button, InputNumber, Spin } from 'antd';
import { object, string } from 'yup';
import { withFormik, Form as FormikForm } from 'formik';
import apiCaller from 'utils/apiCaller';
import { connect } from 'react-redux';
import { authLogin } from 'services/Auth/actions.js';
import formInput from 'utils/formInput';

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
                                {formInput(
                                    touched.carName,
                                    errors.carName,
                                    'carName',
                                    'Car name',
                                    ''
                                )}
                            </div>
                            <div className="col-6">
                                {formInput(
                                    touched.carModel,
                                    errors.carModel,
                                    'carModel',
                                    'Car model',
                                    ''
                                )}
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                {formInput(
                                    touched.autoMakers,
                                    errors.autoMakers,
                                    'autoMakers',
                                    'Automakers',
                                    ''
                                )}
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
                                {formInput(
                                    touched.carCertificate,
                                    errors.carCertificate,
                                    'carCertificate',
                                    'Car certificate',
                                    ''
                                )}
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
    validationSchema: object().shape({
        carModel: string().required('This field is required'),
        carName: string().required('This field is required'),
        autoMakers: string().required('This field is required'),
        carCertificate: string().required('This field is required')
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
