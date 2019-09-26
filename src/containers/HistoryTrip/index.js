import React, { Component } from 'react';
import TripItem from 'components/Trips/TripItem';
import { getHistoryTrips } from 'services/Trip/actions.js';
import { connect } from 'react-redux';
import _ from 'lodash';
import { BodyWrapper, Wrapper } from 'styled';

class HistoryTrips extends Component {
    componentDidMount() {
        this.props.getHistoryTrips();
    }

    render() {
        return (
            <div className="container">
                <BodyWrapper>
                    <Wrapper>
                        {!_.isEmpty(this.props.historyTrips) && (
                            <TripItem
                                trips={this.props.historyTrips}
                                showBtn={false}
                                large
                                priceFont="30px"
                            />
                        )}
                    </Wrapper>
                </BodyWrapper>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        historyTrips: state.Trips
    };
};

export default connect(
    mapStateToProps,
    { getHistoryTrips }
)(HistoryTrips);
