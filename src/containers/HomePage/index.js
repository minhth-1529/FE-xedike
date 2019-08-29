import React, { Component } from 'react';
import TripBooking from 'components/TripBookingForm';
import Introduction from 'components/Introduction/index';
import WhyChoose from 'components/WhyChoose';
import Summary from 'components/Summary';
import Trips from 'components/Trips';

class HpmePage extends Component {
    render() {
        return (
            <>
                <TripBooking />
                <Trips />
                <Introduction />
                <WhyChoose />
                <Summary />
            </>
        );
    }
}

export default HpmePage;
