import React, { Component } from 'react';
import TripItem from 'components/Trips/TripItem';
import { getHistoryTrips } from 'services/Trip/actions.js';
import { connect } from 'react-redux';
import { BodyWrapper, Wrapper } from 'styled';
import { Skeleton } from 'antd';

class HistoryTrips extends Component {
    componentDidMount() {
        this.props.getHistoryTrips();
    }

    render() {
        return (
            <main>
                <div className="container">
                    <BodyWrapper>
                        <Wrapper>
                            <Skeleton
                                active
                                loading={this.props.historyTrips.isLoading}
                            >
                                <TripItem
                                    trips={this.props.historyTrips.data}
                                    showBtn={false}
                                    large
                                    priceFont="30px"
                                />
                            </Skeleton>
                        </Wrapper>
                    </BodyWrapper>
                </div>
            </main>
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
