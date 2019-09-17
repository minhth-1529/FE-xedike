import React, { PureComponent } from 'react';
import { Icon } from 'antd';
import { connect } from 'react-redux';
import apiCaller from 'utils/apiCaller';
import PersonalForm from './PersonalForm';
import PasswordForm from './PasswordForm';
import _ from 'lodash';
import { Wrapper, BodyWrapper } from 'styled';
import AvatarWrapper from 'components/Avatar';
import { getHistoryTrips } from 'services/Trip/actions.js';

class EditProfile extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            user: {}
        };
    }

    updateAvatar = value => {
        this.setState(prevState=>({
            user:{
                ...prevState.user,
                avatar: value
            }
        }));
    };

    componentDidMount() {
        const { auth } = this.props;

        this.props.getHistoryTrips();

        apiCaller(`users/${auth.user.id}`, 'GET', null)
            .then(res => {
                // TODO update now fullName
                _.map(Object.keys(res.data), item => {
                    this.setState({
                        [item]: res.data[item]
                    });
                });
            })
            .catch(err => console.log(err.response));
    }

    render() {
        const { auth, historyTrips } = this.props;

        const { user } = this.state;

        let emptyUser = _.isEmpty(user);

        const totalTrips = historyTrips.length;

        return (
            <div className="container">
                <BodyWrapper>
                    <div className="row">
                        <div className="col-3">
                            <AvatarWrapper
                                registerDate={user.registerDate}
                                fullName={user.fullName}
                                isMyProfile
                                userType={auth.user.userType}
                                rate={user.rate}
                                totalTrips={totalTrips}
                                avatar={user.avatar}
                                updateAvatar={this.updateAvatar}
                                id={auth.user.id}
                            />
                        </div>
                        <div className="col-9">
                            <Wrapper>
                                <h5 className="font-weight-normal d-flex align-items-center mb-4">
                                    <Icon type="user" className="mr-1" />
                                    Personal information
                                </h5>
                                {!emptyUser && (
                                    <PersonalForm
                                        email={user.email}
                                        fullName={user.fullName}
                                        DOB={user.DOB}
                                        phoneNumber={user.phoneNumber}
                                        id={auth.user.id}
                                    />
                                )}
                                <h5 className="font-weight-normal d-flex align-items-center mb-4 mt-5">
                                    <Icon type="lock" className="mr-1" /> Change
                                    password
                                </h5>
                                <PasswordForm id={auth.user.id} />
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
        auth: state.Authenticate,
        historyTrips: state.Trips
    };
};

export default connect(
    mapStateToProps,
    { getHistoryTrips }
)(EditProfile);
