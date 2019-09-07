import React from 'react';
import { Wrapper } from 'styled';
import { Icon } from 'antd';
import TripItem from 'components/Trips/TripItem';
import BookingForm from 'components/TripBookingForm/BookingForm';
import { BodyWrapper } from 'styled';

export const Trips = () => {
    return (
        <div className="container">
            <BodyWrapper>
                <div className="row">
                    <div className="col-3">
                        <Wrapper>
                            <h5 className="font-weight-normal d-flex align-items-center mb-4">
                                <Icon type="filter" className="mr-1" />
                                Search
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
            </BodyWrapper>
        </div>
    );
};

export default Trips;
