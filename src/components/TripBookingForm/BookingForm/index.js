import React, { PureComponent } from 'react';
import { DatePickerCustom, InputNumberCustom, ButtonCustom } from '../styled';
import { Select, Form, Col, Row, Icon } from 'antd';
import { withFormik, Form as FormikForm, Field } from 'formik';
import axios from 'axios';
import _ from 'lodash';
import queryString from 'query-string';

const FormItem = Form.Item;
const { Option } = Select;

class BookingForm extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            locationArr: []
        };
    }

    componentDidMount() {
        axios({
            method: 'GET',
            url: 'http://5d5bd36e4311db0014982d46.mockapi.io/api/provinces'
        })
            .then(res => {
                this.setState({
                    locationArr: res.data
                });
                console.log(queryString.stringify({abc:1,xyz:2}));
            })
            .catch(err => console.log(err));
    }

    render() {
        const locations = _.map(this.state.locationArr, (item, index) => {
            return (
                <Option key={index} value={item.ID}>
                    {item.Title}
                </Option>
            );
        });
        const { atHome } = this.props;

        return (
            <FormikForm className="trip-booking__form">
                <Row type={atHome && 'flex'} align="bottom">
                    <Col className={atHome && 'px-1'} md={atHome ? 6 : 24}>
                        <FormItem className={atHome ? 'mb-0' : 'mb-1'}>
                            <label
                                className={
                                    atHome
                                        ? 'font-weight-bold text-white mb-0'
                                        : 'mb-0'
                                }
                            >
                                From
                            </label>
                            <Select
                                size="large"
                                showSearch
                                placeholder="Enter location"
                                optionFilterProp="children"
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
                        <FormItem className={atHome ? 'mb-0' : 'mb-1'}>
                            <label
                                className={
                                    atHome
                                        ? 'font-weight-bold text-white mb-0'
                                        : 'mb-0'
                                }
                            >
                                To
                            </label>
                            <Select
                                size="large"
                                showSearch
                                placeholder="Enter location"
                                optionFilterProp="children"
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
                        <FormItem className={atHome ? 'mb-0' : 'mb-1'}>
                            <label
                                className={
                                    atHome
                                        ? 'font-weight-bold text-white mb-0'
                                        : 'mb-0'
                                }
                            >
                                Date
                            </label>
                            <DatePickerCustom
                                size="large"
                                format="DD/MM/YYYY"
                            />
                        </FormItem>
                    </Col>
                    <Col className={atHome && 'px-1'} md={atHome ? 2 : 24}>
                        <FormItem className={atHome ? 'mb-0' : 'mb-1'}>
                            <label
                                className={
                                    atHome
                                        ? 'font-weight-bold text-white mb-0'
                                        : 'mb-0'
                                }
                            >
                                Slot
                            </label>
                            <InputNumberCustom
                                min={1}
                                max={10}
                                defaultValue={2}
                                size="large"
                                formatter={value => `${value} slot`}
                            />
                        </FormItem>
                    </Col>
                    <Col
                        className={atHome ? 'px-1' : 'mt-4'}
                        md={atHome ? 6 : 24}
                    >
                        <ButtonCustom
                            type="primary"
                            size="large"
                            block
                            htmlType="submit"
                        >
                            <Icon type="car" />
                            Search
                        </ButtonCustom>
                    </Col>
                </Row>
            </FormikForm>
        );
    }
}

export default BookingForm;
