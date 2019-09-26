import React, { PureComponent } from 'react';
import { Section } from './styled';
import TripItem from './TripItem';
import { Button, Skeleton } from 'antd';
import { connect } from 'react-redux';
import { getTrips } from 'services/Trip/actions';

class Trips extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            limit: 5
        };
    }

    componentDidMount() {
        this.props.getTrips(this.state.limit);
    }

    loadMore = () => {
        let { limit } = this.state;

        this.setState(
            {
                limit: limit + 5
            },
            () => {
                this.props.getTrips(this.state.limit);
            }
        );
    };

    render() {
        const { user, trips } = this.props;
        const length = trips.length;
        const { limit } = this.state;
        const { data, isLoading } = trips;

        return (
            <Section>
                <h2 className="text-center mb-5">Trip Recent</h2>
                {isLoading ? (
                    <Skeleton active />
                ) : (
                    <TripItem
                        userType={user.user.userType}
                        trips={data}
                        large
                        priceFont="30px"
                    />
                )}
                {limit === length && (
                    <div className="text-center mt-5">
                        <Button
                            onClick={this.loadMore}
                            type="dashed"
                            size="large"
                        >
                            Load more
                        </Button>
                    </div>
                )}
            </Section>
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.Authenticate,
        trips: state.Trips
    };
};

export default connect(
    mapStateToProps,
    { getTrips }
)(Trips);
