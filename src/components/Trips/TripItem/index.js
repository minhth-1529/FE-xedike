import React, { PureComponent } from 'react';
import { Icon, Empty } from 'antd';
import _ from 'lodash';
import { Price, Thumb } from './styled';
import { Link } from 'react-router-dom';

class TripItem extends PureComponent {
    render() {
        const { trips = [], priceFont, large } = this.props;
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
                                    <div className="flex-grow-2">
                                        <div className="d-flex align-items-center mb-1">
                                            {item.locationFrom}
                                            <Icon
                                                type="arrow-right"
                                                className="mx-2"
                                            />
                                            {item.locationTo}
                                        </div>
                                        <div className="d-flex align-items-center">
                                            <Icon
                                                type="calendar"
                                                className="mr-1"
                                            />
                                            2/2/1993
                                        </div>
                                    </div>
                                    <div className="flex-grow-1">
                                        <div className="mb-1">Honda</div>
                                        <div className="d-flex align-items-center">
                                            <Icon
                                                type="team"
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
                                                <Icon
                                                    type="star"
                                                    theme="twoTone"
                                                    className="mr-1"
                                                    twoToneColor="#ffc107"
                                                />
                                                4
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
                                        <Link
                                            to={`/booking-trip/${item._id}`}
                                            className={`btn btn-success ${large &&
                                                'btn-lg'}`}
                                        >
                                            Book now
                                        </Link>
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
