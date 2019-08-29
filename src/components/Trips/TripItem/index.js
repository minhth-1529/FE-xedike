import React, { PureComponent } from 'react';
import { Icon, Alert } from 'antd';
import _ from 'lodash';
import { connect } from 'react-redux';
import { fetchTripsRequest } from 'services/Trip/actions';
import { Price, Thumb } from './styled';

class TripItem extends PureComponent {
    componentDidMount() {
        this.props.fetchAllTrip();
    }

    render() {
        const { trips, priceFont, large } = this.props;

        return (
            <>
                { _.map(trips, (item, index) => {
                    return (
                        <div
                            className={index !== 0 ? 'd-flex mt-3' : 'd-flex'}
                            key={index}
                        >
                            <div className="flex-grow-1">
                                <div className="d-flex align-items-center mb-1">
                                    {item.locationFrom}
                                    <Icon type="arrow-right" className="mx-2" />
                                    {item.locationTo}
                                </div>
                                <div className="d-flex align-items-center">
                                    <Icon type="calendar" className="mr-1" />
                                    2/2/1993
                                </div>
                            </div>
                            <div className="flex-grow-1">
                                <div className="mb-1">Honda</div>
                                <div className="d-flex align-items-center">
                                    <Icon type="team" className="mr-1" />
                                    {item.availableSeats}
                                </div>
                            </div>
                            <div className="flex-grow-1 d-inline-flex">
                                <Thumb
                                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSivuKfPqK-w1-eXntjE5MgV1VtoLLxZMtagarm5zVNoXBK3KpE"
                                    alt="driver"
                                    className="mr-2"
                                />
                                <div>
                                    <p className="mb-1">
                                        {_.get(item.driverID, 'fullName', '')}
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
                            </div>
                            <Price
                                priceFont={priceFont}
                                className="flex-grow-1"
                            >
                                {item.fee} <sup>vnd</sup>
                            </Price>
                            <div className="flex-grow-0">
                                <button className={`btn btn-success ${large && 'btn-lg'}`}>
                                    Book now
                                </button>
                            </div>
                        </div>
                    );
                }) }
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        trips: state.Trips
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllTrip: () => {
            dispatch(fetchTripsRequest());
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TripItem);
