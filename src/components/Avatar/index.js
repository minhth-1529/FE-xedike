import React, { PureComponent } from 'react';
import AvatarImg from 'assets/images/user-ic.png';
import { Avatar, UploadCustom } from './styled';
import { Icon, Rate } from 'antd';
import moment from 'moment';
import apiCaller from 'utils/apiCaller';
import { withRouter } from 'react-router-dom';
import _ from 'lodash';

function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

class AvatarWrapper extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            imageUrl: '',
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
            .then(res => {
                console.log(res);
            })
            .catch(err => console.log(err.response));
    };

    handleChange = info => {
        if (info.file.status === 'uploading') {
            this.setState({ isLoading: true });
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, imageUrl =>
                this.setState({
                    imageUrl: imageUrl,
                    isLoading: false
                })
            );
        }
    };

    UNSAFE_componentWillReceiveProps(nextProps) {
        this.setState({
            rate: nextProps.rate
        });
    }

    render() {
        const {
            avatar,
            fullName,
            registerDate,
            isMyProfile,
            userType,
            totalTrips
        } = this.props;

        return (
            <Avatar>
                <div className="text-center">
                    <form onSubmit={this.handleSubmit}>
                        <UploadCustom
                            // name="avatar"
                            // listType="picture-card"
                            // onChange={this.handleChange}
                            // className={
                            //     avatar !== ''
                            //         ? 'avatar-uploader'
                            //         : 'avatar-uploader img-uploaded'
                            // }
                            name="avatar"
                            listType="picture-card"
                            className="avatar-uploader"
                            showUploadList={false}
                            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                            // beforeUpload={beforeUpload}
                            onChange={this.handleChange}
                        >
                            <img
                                className="avatar"
                                src={avatar ? avatar : AvatarImg}
                                alt="avatar"
                            />
                            <div className="btn-upload">
                                <Icon
                                    type={
                                        this.state.loading
                                            ? 'loading'
                                            : 'upload'
                                    }
                                    style={{ fontSize: '24px' }}
                                />
                            </div>
                        </UploadCustom>
                    </form>
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
