import React, { PureComponent } from 'react';
import { Empty, Button, Rate } from 'antd';
import _ from 'lodash';
import { Price, Thumb } from './styled';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import swalReact from '@sweetalert/with-react';
import apiCaller from 'utils/apiCaller';
import { FaArrowRight, FaCalendarAlt, FaUsers, FaStar } from 'react-icons/fa';
class TripItem extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            rate: 0
        };
    }

    handleFinish = (tripID, driverID) => {
        swal({
            title: 'Would you like to rating for driver?',
            icon: 'info',
            buttons: {
                close: {
                    text: 'No thanks!',
                    className: 'ant-btn ant-btn-danger',
                    value: 'close'
                },
                rate: {
                    text: 'Rate now',
                    value: 'rate',
                    className: 'ant-btn ant-btn-primary'
                }
            }
        })
            .then(value => {
                if (value !== 'rate') {
                    return apiCaller(`trips/finish-trip/${tripID}`, 'PUT', null)
                        .then(() => {
                            swal({
                                title: 'Finish trip successfully!',
                                text: '',
                                icon: 'success',
                                timer: 2000
                            });
                        })
                        .catch(err => console.log(err.response));
                }

                return swalReact(<Rate onChange={this.handleRating} />, {
                    buttons: {
                        close: {
                            text: 'Cancel',
                            className: 'ant-btn ant-btn-danger',
                            value: 'close'
                        },
                        submit: {
                            text: 'Submit',
                            className: 'ant-btn ant-btn-primary',
                            value: 'submit'
                        }
                    }
                });
            })
            .then(value => {
                if (value !== 'submit') {
                    return apiCaller(`trips/finish-trip/${tripID}`, 'PUT', null)
                        .then(() => {
                            swal({
                                title: 'Finish trip successfully!',
                                icon: 'success',
                                timer: 2000
                            });
                        })
                        .catch(err => console.log(err.response));
                }

                apiCaller(`users/rating/${driverID}`, 'PUT', {
                    rate: this.state.rate
                })
                    .then(() => {
                        swal({
                            title: 'Finish trip and Rating successfully!',
                            icon: 'success',
                            timer: 2000
                        });
                    })
                    .catch(err => console.log(err.response));
            });
    };

    handleRating = value => {
        this.setState({
            rate: value
        });
    };

    render() {
        const { trips = [], priceFont, large, showBtn = true } = this.props;
        const isEmpty = _.isEmpty(trips);

        return (
            <>
                {isEmpty ? (
                    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                ) : (
                    <ul>
                        {_.map(trips, (item, index) => {
                            return (
                                <li
                                    className={
                                        index !== 0 ? 'd-flex mt-3' : 'd-flex'
                                    }
                                    key={index}
                                >
                                    <div className="flex-basic-25">
                                        <div className="d-flex align-items-center mb-1">
                                            {item.locationFrom}
                                            <FaArrowRight className="mx-2" />
                                            {item.locationTo}
                                        </div>
                                        <div className="d-flex align-items-center">
                                            <FaCalendarAlt
                                                className="mr-1"
                                            />
                                            2/2/1993
                                        </div>
                                    </div>
                                    <div className="flex-grow-1">
                                        <div className="mb-1">Honda</div>
                                        <div className="d-flex align-items-center">
                                            <FaUsers
                                                className="mr-1"
                                            />
                                            {item.availableSeats}
                                        </div>
                                    </div>
                                    <Link
                                        className="flex-grow-1 d-inline-flex text-dark"
                                        to={`/driver-profile/${item.driverID._id}`}
                                    >
                                        <Thumb
                                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSivuKfPqK-w1-eXntjE5MgV1VtoLLxZMtagarm5zVNoXBK3KpE"
                                            alt="driver"
                                            className="mr-2"
                                        />
                                        <div>
                                            <p className="mb-0">
                                                {item.driverID.fullName}
                                            </p>
                                            <div className="d-flex align-items-center">
                                                <FaStar
                                                    className="mr-1"
                                                    style={{color: '#ffc107'}}
                                                />
                                                {item.driverID.rate}
                                            </div>
                                        </div>
                                    </Link>
                                    <Price
                                        priceFont={priceFont}
                                        className="flex-grow-2"
                                    >
                                        {item.fee} <sup>vnd</sup>
                                    </Price>
                                    <div className="flex-grow-0">
                                        {showBtn ? (
                                            <Link
                                                to={`/booking-trip/${item._id}`}
                                                className={`btn btn-success ${large &&
                                                    'btn-lg'}`}
                                            >
                                                Book now
                                            </Link>
                                        ) : (
                                            <Button
                                                onClick={() =>
                                                    this.handleFinish(
                                                        item._id,
                                                        item.driverID._id
                                                    )
                                                }
                                                type="primary"
                                                disabled={
                                                    item.isFinished && true
                                                }
                                            >
                                                Finish trip
                                            </Button>
                                        )}
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                )}
            </>
        );
    }
}

export default TripItem;
