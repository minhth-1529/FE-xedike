import React, { PureComponent } from 'react';
import { Wrapper } from 'styled';
import { Icon, Skeleton } from 'antd';
import TripItem from 'components/Trips/TripItem';
import BookingForm from 'components/TripBookingForm/BookingForm';
import { BodyWrapper } from 'styled';
import { getTrips } from 'services/Trip/actions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import _ from 'lodash';
import GoBack from 'components/GoBack';
class Trips extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true
        };
    }

    componentDidMount() {
        const { location } = this.props;

        if (!_.isEmpty(location.search)) return;

        this.props.getTrips();
    }

    isLoading = value => {
        this.setState({
            isLoading: value
        });
    };

    UNSAFE_componentWillReceiveProps(nextProps){
        this.setState({
            isLoading: nextProps.isLoading
        });
    }

    render() {
        const { trips, user } = this.props;
        const { data } = trips;
        const { isLoading } = this.state;

        return (
            <div className="container">
                <GoBack />
                <BodyWrapper>
                    <div className="row">
                        <div className="col-3">
                            <Wrapper>
                                <h5 className="font-weight-normal d-flex align-items-center mb-4">
                                    <Icon type="filter" className="mr-1" />
                                    Search
                                </h5>
                                <BookingForm isLoading={this.isLoading} />
                            </Wrapper>
                        </div>
                        <div className="col-9">
                            <Wrapper>
                                <h5 className="font-weight-normal d-flex align-items-center mb-4">
                                    <Icon type="car" className="mr-1" />
                                    Trips
                                </h5>
                                <Skeleton active loading={isLoading}>
                                    <TripItem
                                        userType={user.user.userType}
                                        trips={data}
                                    />
                                </Skeleton>
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
        trips: state.SearchTrips,
        user: state.Authenticate
    };
};

export default connect(
    mapStateToProps,
    { getTrips }
)(withRouter(Trips));
