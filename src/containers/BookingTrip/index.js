import React, { Component } from 'react';
import { Wrapper } from 'styled';
import { Price, Thumb } from 'components/Trips/TripItem/styled';
import { Form, Input, Button, Icon, Select, notification } from 'antd';
import { object, string } from 'yup';
import { withFormik, Form as FormikForm } from 'formik';
import _ from 'lodash';
import apiCaller from 'utils/apiCaller';
import { InputNumberCustom } from 'components/TripBookingForm/styled';
import { withRouter } from 'react-router-dom';
import { BodyWrapper } from 'styled';
import swal from 'sweetalert';
import { connect } from 'react-redux';

const FormItem = Form.Item;
const { Option } = Select;

class BookingTrip extends Component {
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
        const { touched, errors, values, setFieldValue } = this.props;

        const locations = _.map(this.state.locationArr, (item, index) => {
            return (
                <Option key={index} value={item.Title}>
                    {item.Title}
                </Option>
            );
        });

        return (
            <div className="container">
                <BodyWrapper>
                    <Wrapper>
                        <h5 className="font-weight-normal d-flex align-items-center mb-3">
                            <Icon type="car" className="mr-1" /> Trip
                            information
                        </h5>
                        <div className="d-flex">
                            <div className="flex-grow-1">
                                <div className="d-flex align-items-center mb-1">
                                    sdsd
                                    <Icon type="arrow-right" className="mx-2" />
                                    sdsd
                                </div>
                                <div className="d-flex align-items-center">
                                    <Icon type="calendar" className="mr-1" />
                                    2/2/1993
                                </div>
                            </div>
                            <div className="flex-grow-1">
                                <div className="mb-1">Honda</div>
                                <div className="d-flex align-items-center">
                                    <Icon type="team" className="mr-1" />6
                                </div>
                            </div>
                            <div className="flex-grow-1 d-inline-flex">
                                <Thumb
                                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSivuKfPqK-w1-eXntjE5MgV1VtoLLxZMtagarm5zVNoXBK3KpE"
                                    alt="driver"
                                    className="mr-2"
                                />
                                <div>
                                    <p className="mb-1">adasdas</p>
                                    <div className="d-flex align-items-center">
                                        <Icon
                                            type="star"
                                            theme="twoTone"
                                            className="mr-1"
                                            twoToneColor="#ffc107"
                                        />
                                        4
                                    </div>
                                </div>
                            </div>
                            <Price priceFont="30px" className="flex-grow-1">
                                122222 <sup>vnd</sup>
                            </Price>
                        </div>
                    </Wrapper>
                    <Wrapper className="mt-5">
                        <h5 className="font-weight-normal d-flex align-items-center mb-3">
                            <Icon type="carry-out" className="mr-1" /> Booking
                        </h5>
                        <FormikForm>
                            <div className="row">
                                <div className="col-2 text-right">
                                    <label className="mb-0 ant-form-item-required">
                                        From
                                    </label>
                                </div>
                                <div className="col-10">
                                    <FormItem
                                        validateStatus={
                                            touched.locationFrom &&
                                            errors.locationFrom &&
                                            'error'
                                        }
                                        help={
                                            touched.locationFrom &&
                                            errors.locationFrom
                                        }
                                    >
                                        <Select
                                            name="locationFrom"
                                            size="large"
                                            showSearch
                                            placeholder="Select location"
                                            optionFilterProp="children"
                                            value={values.locationFrom}
                                            onChange={value =>
                                                setFieldValue(
                                                    'locationFrom',
                                                    value
                                                )
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
                                    </FormItem>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-2 text-right">
                                    <label className="mb-0 ant-form-item-required">
                                        To
                                    </label>
                                </div>
                                <div className="col-10">
                                    <FormItem
                                        validateStatus={
                                            touched.locationTo &&
                                            errors.locationTo &&
                                            'error'
                                        }
                                        help={
                                            touched.locationTo &&
                                            errors.locationTo
                                        }
                                    >
                                        <Select
                                            name="locationTo"
                                            size="large"
                                            showSearch
                                            placeholder="Select location"
                                            optionFilterProp="children"
                                            value={values.locationTo}
                                            onChange={value =>
                                                setFieldValue(
                                                    'locationTo',
                                                    value
                                                )
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
                                    </FormItem>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-2 text-right">
                                    <label className="mb-0 ant-form-item-required">
                                        Payment
                                    </label>
                                </div>
                                <div className="col-10">
                                    <FormItem>
                                        <Input
                                            disabled
                                            size="large"
                                            value="Cash"
                                            suffix={
                                                <Icon
                                                    type="money-collect"
                                                    style={{
                                                        color: 'rgba(0,0,0,.25)'
                                                    }}
                                                />
                                            }
                                        />
                                    </FormItem>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-2 text-right">
                                    <label className="mb-0 ant-form-item-required">
                                        Slot
                                    </label>
                                </div>
                                <div className="col-10">
                                    <FormItem
                                        validateStatus={
                                            touched.numberOfBookingSeats &&
                                            errors.numberOfBookingSeats &&
                                            'error'
                                        }
                                        help={
                                            touched.numberOfBookingSeats &&
                                            errors.numberOfBookingSeats
                                        }
                                    >
                                        <InputNumberCustom
                                            min={1}
                                            max={10}
                                            defaultValue={2}
                                            size="large"
                                            name="numberOfBookingSeats"
                                            onChange={value =>
                                                setFieldValue(
                                                    'numberOfBookingSeats',
                                                    value
                                                )
                                            }
                                        />
                                    </FormItem>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-2 text-right">
                                    <label className="mb-0">Note</label>
                                </div>
                                <div className="col-10">
                                    <FormItem>
                                        <Input.TextArea
                                            name="note"
                                            autosize={{ minRows: 5 }}
                                            onChange={value =>
                                                setFieldValue(
                                                    'note',
                                                    value.target.value
                                                )
                                            }
                                        />
                                    </FormItem>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-10 offset-2">
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
                    </Wrapper>
                </BodyWrapper>
            </div>
        );
    }
}

const withFormikHOC = withFormik({
    mapPropsToValues() {
        return {
            locationFrom: undefined,
            locationTo: undefined,
            numberOfBookingSeats: 2,
            note: ''
        };
    },
    validationSchema: object().shape({
        locationFrom: string().required('This field is required'),
        locationTo: string().required('This field is required')
    }),
    handleSubmit: (values, { props }) => {
        if (!props.user.authenticate) {
            return swal({
                text: 'You have to login for booking trip',
                icon: 'warning',
                buttons: false,
                timer: 1500
            });
        }

        apiCaller(`trips/booking-trip/${props.match.params.id}`, 'PUT', values)
            .then(() => {
                swal({
                    text: 'Booking trip successfully!',
                    icon: 'success',
                    buttons: false,
                    timer: 1500
                }).then(() => {
                    props.history.push('/');
                });
            })
            .catch(err => {
                let errs = err.response;
                if (_.get(err, 'response.data.message')) {
                    errs = err.response.data.message;
                }
                notification.error({
                    message: errs,
                    duration: 2.5,
                    placement: 'topLeft'
                });
            });
    }
});

const mapStateToProps = state => {
    return {
        user: state.Authenticate
    };
};

export default connect(
    mapStateToProps,
    null
)(withRouter(withFormikHOC(BookingTrip)));
