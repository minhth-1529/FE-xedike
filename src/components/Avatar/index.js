import React, { PureComponent } from 'react';
import AvatarImg from 'assets/images/user-ic.png';
import { Avatar, UploadAvatar } from './styled';
import { Icon, Rate } from 'antd';
import moment from 'moment';
import apiCaller from 'utils/apiCaller';
import { withRouter } from 'react-router-dom';
import _ from 'lodash';
import { URL } from 'constants/config';
import swal from 'sweetalert';

class AvatarWrapper extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            file: null,
            rate: 0
        };
    }

    handleInfo = (isMyProfile, userType, totalTrips = 0) => {
        if (isMyProfile && userType === 'driver') {
            return (
                <>
                    <p className="mb-0">
                        <strong>Your rating:</strong>
                    </p>
                    <Rate value={this.state.rate} disabled />
                </>
            );
        } else if (isMyProfile && userType === 'passenger') {
            return (
                <p className="mb-0">
                    <strong>Total booking trip: </strong>
                    {totalTrips}
                </p>
            );
        } else if (!isMyProfile && userType === 'driver') {
            return (
                <>
                    <p className="mb-0">
                        <strong>Your rating:</strong>
                    </p>
                    <Rate value={this.state.rate} disabled />
                </>
            );
        } else if (!isMyProfile) {
            return (
                <>
                    <p className="mb-0">
                        <strong>Rating for driver:</strong>
                    </p>
                    <Rate
                        value={this.state.rate}
                        onChange={this.handleRating}
                        disabled={userType === 'driver' && true}
                    />
                </>
            );
        }
    };

    handleRating = value => {
        const { match } = this.props;
        const { id } = match.params;

        this.setState({
            rate: value
        });

        if (_.isEmpty(match.params)) return;

        apiCaller(`users/rating/${id}`, 'PUT', { rate: value })
            .then(() => {
                swal({
                    text: 'Rating successfully',
                    icon: 'success',
                    buttons: false,
                    timer: 1500
                });
            })
            .catch(err => console.log(err.response));
    };

    UNSAFE_componentWillReceiveProps(nextProps) {
        this.setState({
            rate: nextProps.rate
        });
    }

    onHandleAvatar = e => {
        const { id } = this.props;
        let file = e.target.files[0];

        const formData = new FormData();

        formData.append('avatar', file);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };
        this.setState({
            isLoading: true
        });
        apiCaller(`users/upload-avatar/${id}`, 'POST', formData, config)
            .then(res => {
                this.props.updateAvatar(res.data.avatar);
                this.setState({
                    isLoading: false
                });
            })
            .catch(err => {
                console.log(err.response);
            });
        // axios
        //     .post(
        //         'http://localhost:5000/api/5d6f71ce7163941bc0990b31',
        //         formData,
        //         config
        //     )
        //     .then(res => {
        //         this.props.updateAvatar(res.data.avatar);
        //         this.setState({
        //             isLoading: false
        //         });
        //     })
        //     .catch(err => {
        //         console.log(err.response);
        //     });
    };

    render() {
        const {
            avatar,
            fullName,
            registerDate,
            isMyProfile,
            userType,
            totalTrips
        } = this.props;

        const { isLoading } = this.state;

        return (
            <Avatar>
                <div className="text-center">
                    <UploadAvatar isLoading={isLoading}>
                        <label className="cursor-point mb-0">
                            <img
                                src={!avatar ? AvatarImg : `${URL}/${avatar}`}
                                alt="avatar"
                            />
                            <input
                                className="d-none"
                                type="file"
                                onChange={this.onHandleAvatar}
                            />
                        </label>
                        <div className="btn-upload">
                            <Icon type={isLoading ? 'loading' : 'plus'} />
                            <div className="ant-upload-text">Upload</div>
                        </div>
                    </UploadAvatar>

                    <h5 className="mb-0">{fullName}</h5>
                </div>
                <div className="mt-3 info fz-14">
                    <p className="mb-1">
                        <strong>Active day:</strong>{' '}
                        {moment(registerDate).format('DD/MM/YYYY')}
                    </p>
                    {this.handleInfo(isMyProfile, userType, totalTrips)}
                </div>
            </Avatar>
        );
    }
}

export default withRouter(AvatarWrapper);
