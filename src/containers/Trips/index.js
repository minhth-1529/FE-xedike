import React, { Component } from 'react';
import { Wrapper } from 'styled';
import { Icon } from 'antd';
import TripItem from 'components/Trips/TripItem';
import BookingForm from 'components/TripBookingForm/BookingForm';

class Trips extends Component {
    render() {
        return (
            <div className="trips-page mt-4">
                <div className="row">
                    <div className="col-3">
                        <Wrapper>
                            <h5 className="font-weight-normal d-flex align-items-center mb-2">
                                <Icon type="filter" className="mr-1" />
                                Filter
                            </h5>
                            <BookingForm />
                        </Wrapper>
                    </div>
                    <div className="col-9">
                        <Wrapper>
                            <h5 className="font-weight-normal d-flex align-items-center mb-4">
                                <Icon type="car" className="mr-1" />
                                Trips
                            </h5>
                            <TripItem />
                        </Wrapper>
                    </div>
                </div>
            </div>
        );
    }
}

export default Trips;
