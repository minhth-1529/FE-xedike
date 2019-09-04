import React, { Component } from 'react';
import { DatePickerCustom, InputNumberCustom, ButtonCustom } from '../styled';
import { Select, Form, Col, Row, Icon } from 'antd';
import { withFormik, Form as FormikForm } from 'formik';
import * as Yup from 'yup';
import _ from 'lodash';
import queryString from 'query-string';
import apiCaller from 'utils/apiCaller';
import { toast, ToastContainer } from 'react-toastify';
import { connect } from 'react-redux';
import { searchTrips } from 'services/Trip/actions.js';
import { withRouter } from 'react-router-dom';
import moment from 'moment';

const FormItem = Form.Item;
const { Option } = Select;

class BookingForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            locationArr: []
        };
    }

    componentDidMount() {
        const { setFieldValue, location } = this.props;
        const stringObject = queryString.parse(location.search);

        setTimeout(() => {
            setFieldValue('locationFrom', stringObject.from);
            setFieldValue('locationTo', stringObject.to);
            setFieldValue('startTime', moment(stringObject.startTime));
            setFieldValue('slot', stringObject.slot);
        }, 1);

        apiCaller('api/provinces', 'GET', null)
            .then(res => {
                this.setState({
                    locationArr: res.data
                });
            })
            .catch(err => console.log(err));
    }

    render() {
        const locations = _.map(this.state.locationArr, (item, index) => {
            return (
                <Option key={index} value={item.Title}>
                    {item.Title}
                </Option>
            );
        });
        const { atHome, setFieldValue, values, touched, errors } = this.props;

        return (
            <FormikForm className="trip-booking__form">
                <Row type={atHome && 'flex'} align="bottom">
                    <Col className={atHome && 'px-1'} md={atHome ? 6 : 24}>
                        <label
                            className={
                                atHome ? 'font-weight-bold text-white mb-0' : ''
                            }
                        >
                            From
                        </label>
                        <FormItem
                            className={atHome ? 'mb-0' : ''}
                            validateStatus={
                                touched.locationFrom &&
                                errors.locationFrom &&
                                'error'
                            }
                            help={
                                !atHome &&
                                touched.locationFrom &&
                                errors.locationFrom
                            }
                        >
                            <Select
                                name="locationFrom"
                                size="large"
                                showSearch
                                placeholder="Enter location"
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
                        </FormItem>
                    </Col>
                    <Col className={atHome && 'px-1'} md={atHome ? 6 : 24}>
                        <label
                            className={
                                atHome ? 'font-weight-bold text-white mb-0' : ''
                            }
                        >
                            To
                        </label>
                        <FormItem
                            className={atHome ? 'mb-0' : ''}
                            validateStatus={
                                touched.locationTo &&
                                errors.locationTo &&
                                'error'
                            }
                            help={
                                !atHome &&
                                touched.locationTo &&
                                errors.locationTo
                            }
                        >
                            <Select
                                name="locationTo"
                                size="large"
                                showSearch
                                value={values.locationTo}
                                placeholder="Enter location"
                                optionFilterProp="children"
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
                        </FormItem>
                    </Col>
                    <Col className={atHome && 'px-1'} md={atHome ? 4 : 24}>
                        <label
                            className={
                                atHome ? 'font-weight-bold text-white mb-0' : ''
                            }
                        >
                            Date
                        </label>
                        <FormItem
                            className={atHome ? 'mb-0' : ''}
                            validateStatus={
                                touched.startTime && errors.startTime && 'error'
                            }
                            help={
                                !atHome && touched.startTime && errors.startTime
                            }
                        >
                            <DatePickerCustom
                                size="large"
                                format="DD/MM/YYYY"
                                name="startTime"
                                value={values.startTime}
                                onChange={v => setFieldValue('startTime', v)}
                            />
                        </FormItem>
                    </Col>
                    <Col className={atHome && 'px-1'} md={atHome ? 2 : 24}>
                        <label
                            className={
                                atHome ? 'font-weight-bold text-white mb-0' : ''
                            }
                        >
                            Slot
                        </label>
                        <FormItem
                            className={atHome ? 'mb-0' : ''}
                            validateStatus={
                                touched.slot && errors.slot && 'error'
                            }
                            help={touched.slot && errors.slot}
                        >
                            <InputNumberCustom
                                min={1}
                                max={10}
                                defaultValue={2}
                                size="large"
                                // value={values.slot}
                                name="slot"
                                onChange={value => setFieldValue('slot', value)}
                            />
                        </FormItem>
                    </Col>
                    <Col className={atHome ? 'px-1' : ''} md={atHome ? 6 : 24}>
                        {atHome ? (
                            <ButtonCustom
                                type="primary"
                                size="large"
                                block
                                htmlType="submit"
                            >
                                <Icon type="car" />
                                Search
                            </ButtonCustom>
                        ) : (
                            <ButtonCustom
                                type="primary"
                                size="large"
                                block
                                htmlType="submit"
                            >
                                <Icon type="car" />
                                Search
                            </ButtonCustom>
                        )}
                    </Col>
                </Row>
                <ToastContainer autoClose={2000} />
            </FormikForm>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        searchTrips: payload => {
            dispatch(searchTrips(payload));
        }
    };
};

const withFormikHOC = withFormik({
    mapPropsToValues() {
        return {
            locationFrom: undefined,
            locationTo: undefined,
            startTime: undefined,
            slot: 2
        };
    },
    validationSchema: Yup.object().shape({
        locationFrom: Yup.string().required('This field is required'),
        locationTo: Yup.string().required('This field is required')
    }),
    handleSubmit: (values, { props }) => {
        const string = queryString.stringify({
            from: values.locationFrom,
            to: values.locationTo,
            startTime: values.startTime,
            slot: values.slot || 2
        });

        props.history.push(`/trips/search?${string}`);

        if (!props.atHome) {
            apiCaller(`api/trips/search?${string}`, 'POST', null)
                .then(res => {
                    props.searchTrips(res.data);
                })
                .catch(err => {
                    toast.error(err.response.data.message);
                    props.searchTrips([]);
                });
        }
    }
});

export default withRouter(
    connect(
        null,
        mapDispatchToProps
    )(withFormikHOC(BookingForm))
);
