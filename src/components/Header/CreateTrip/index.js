import React, { PureComponent } from 'react';
import { withFormik } from 'formik';
import { Form, Icon, Select, Button } from 'antd';
import _ from 'lodash';
import { ModalCustom, InputNumberCustom, DatePickerCustom } from '../styled';
import apiCaller from 'utils/apiCaller';
import { string, object } from 'yup';
import swal from 'sweetalert';
import { connect } from 'react-redux';
import { getTrips } from 'services/Trip/actions';

const { Option } = Select;

class CreateTrip extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            locationArr: []
        };
    }

    componentDidMount() {
        apiCaller('provinces', 'GET', null)
            .then(res => {
                this.setState({
                    locationArr: res.data
                });
            })
            .catch(err => console.log(err.response));
    }

    render() {
        const {
            createVisible,
            createModal,
            handleSubmit,
            errors,
            touched,
            values,
            setFieldValue
        } = this.props;

        const locations = _.map(this.state.locationArr, (item, index) => {
            return (
                <Option key={index} value={item.Title}>
                    {item.Title}
                </Option>
            );
        });

        return (
            <ModalCustom
                title={<h3 className="modal-title text-center">Create trip</h3>}
                footer={[null, null]}
                visible={createVisible}
                onCancel={() => createModal(false)}
            >
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-6">
                            <Form.Item
                                validateStatus={
                                    touched.locationFrom &&
                                    errors.locationFrom &&
                                    'error'
                                }
                                help={
                                    touched.locationFrom && errors.locationFrom
                                }
                            >
                                <label className="mb-0">From</label>
                                <Select
                                    name="locationFrom"
                                    size="large"
                                    showSearch
                                    placeholder="Select location"
                                    optionFilterProp="children"
                                    value={values.locationFrom}
                                    onChange={value =>
                                        setFieldValue('locationFrom', value)
                                    }
                                    suffixIcon={
                                        <Icon
                                            type="environment"
                                            style={{ color: '#28a745' }}
                                        />
                                    }
                                >
                                    {locations}
                                </Select>
                            </Form.Item>
                        </div>
                        <div className="col-6">
                            <Form.Item
                                validateStatus={
                                    touched.locationTo &&
                                    errors.locationTo &&
                                    'error'
                                }
                                help={touched.locationTo && errors.locationTo}
                            >
                                <label className="mb-0">To</label>
                                <Select
                                    name="locationTo"
                                    size="large"
                                    showSearch
                                    placeholder="Select location"
                                    optionFilterProp="children"
                                    value={values.locationTo}
                                    onChange={value =>
                                        setFieldValue('locationTo', value)
                                    }
                                    suffixIcon={
                                        <Icon
                                            type="environment"
                                            style={{ color: '#dc3545' }}
                                        />
                                    }
                                >
                                    {locations}
                                </Select>
                            </Form.Item>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <Form.Item
                                validateStatus={
                                    touched.availableSeats &&
                                    errors.availableSeats &&
                                    'error'
                                }
                                help={
                                    touched.availableSeats &&
                                    errors.availableSeats
                                }
                            >
                                <label className="mb-0">Slot</label>
                                <InputNumberCustom
                                    min={1}
                                    max={10}
                                    defaultValue={2}
                                    size="large"
                                    name="availableSeats"
                                    onChange={value =>
                                        setFieldValue('availableSeats', value)
                                    }
                                />
                            </Form.Item>
                        </div>
                        <div className="col">
                            <Form.Item
                                validateStatus={
                                    touched.fee && errors.fee && 'error'
                                }
                                help={touched.fee && errors.fee}
                            >
                                <label className="mb-0">Fee</label>
                                <InputNumberCustom
                                    min={10000}
                                    defaultValue={10000}
                                    size="large"
                                    name="fee"
                                    onChange={value =>
                                        setFieldValue('fee', value)
                                    }
                                />
                            </Form.Item>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <Form.Item
                                validateStatus={
                                    touched.startTime &&
                                    errors.startTime &&
                                    'error'
                                }
                                help={touched.startTime && errors.startTime}
                            >
                                <label className="mb-0">Start time</label>
                                <DatePickerCustom
                                    allowClear={false}
                                    size="large"
                                    format="DD/MM/YYYY"
                                    name="startTime"
                                    value={values.startTime}
                                    onChange={value =>
                                        setFieldValue('startTime', value)
                                    }
                                />
                            </Form.Item>
                        </div>
                    </div>
                    <Button htmlType="submit" type="primary" size="large" block>
                        Submit
                    </Button>
                </form>
            </ModalCustom>
        );
    }
}

const withFormikHOC = withFormik({
    mapPropsToValues() {
        return {
            locationFrom: '',
            locationTo: '',
            availableSeats: 2,
            fee: 10000,
            startTime: undefined
        };
    },
    validationSchema: object().shape({
        locationFrom: string().required('This field is required'),
        locationTo: string().required('This field is required'),
        startTime: string().required('This field is required')
    }),
    handleSubmit: (values, { resetForm, props }) => {
        apiCaller('trips', 'POST', values).then(res => {
            swal({
                text: 'Create trip successfully!',
                icon: 'success',
                buttons: false,
                timer: 1500
            }).then(() => {
                resetForm();
                props.createModal(false);
                props.getTrips();
            });
        });
    }
});

export default connect(
    null,
    { getTrips }
)(withFormikHOC(CreateTrip));
