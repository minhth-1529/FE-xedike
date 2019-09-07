import React, { PureComponent } from 'react';
import { Section } from './styled';
import TripItem from './TripItem';
import { Button } from 'antd';
import { connect } from 'react-redux';
import { getTrips } from 'services/Trip/actions';

class Trips extends PureComponent {

    componentDidMount() {
        this.props.getTrips();
    }
    

    render() {
        const {trips = []} = this.props;

        return (
            <Section>
                <h2 className="text-center mb-5">Trip Recent</h2>
                <ul>
                    <TripItem trips={trips} large priceFont="30px" />
                </ul>
                <div className="text-center mt-5">
                    <Button type="dashed" size="large">
                        Load more
                    </Button>
                </div>
            </Section>
        );
    }
}

const mapStateToProps = state => {
    return {
        trips: state.Trips
    };
};

export default connect(
    mapStateToProps,
    {getTrips}
)(Trips);
