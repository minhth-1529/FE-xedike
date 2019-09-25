import React, { PureComponent } from 'react';
import { Wrapper } from 'styled';
import { Icon } from 'antd';
import TripItem from 'components/Trips/TripItem';
import BookingForm from 'components/TripBookingForm/BookingForm';
import { BodyWrapper } from 'styled';
import { getTrips } from 'services/Trip/actions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import _ from 'lodash';

class Trips extends PureComponent {
    componentDidMount() {
        const { location } = this.props;

        if (!_.isEmpty(location.search)) return;

        this.props.getTrips();
    }

    render() {
        const { trips, user } = this.props;

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
                                <TripItem
                                    userType={user.user.userType}
                                    trips={trips}
                                />
                            </Wrapper>
                        </div>
                    </div>
                </BodyWrapper>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        trips: state.Trips,
        user: state.Authenticate
    };
};

export default connect(
    mapStateToProps,
    { getTrips }
)(withRouter(Trips));
