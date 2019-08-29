import React, { Component } from 'react';
import { Section } from './styled';
import TripItem from './TripItem';

class Trips extends Component {
    render() {
        return (
            <Section>
                <h2 className="text-center mb-5">Trip Recent</h2>
                <div>
                    <TripItem large priceFont="30px" />
                </div>
                <div className="text-center mt-5">
                    <button className="btn btn-outline-secondary btn-lg">
                        Load more
                    </button>
                </div>
            </Section>
        );
    }
}

export default Trips;
