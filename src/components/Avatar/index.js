import React, { PureComponent } from 'react';
import AvatarImg from 'assets/images/user-ic.png';
import { Avatar, UploadCustom } from './styled';
import { Icon, Rate, message } from 'antd';
import moment from 'moment';
import apiCaller from 'utils/apiCaller';
import { withRouter } from 'react-router-dom';
import _ from 'lodash';

const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
};

const beforeUpload = file => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
};

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
                // TODO noti rating
                console.log(res);
            })
            .catch(err => console.log(err.response));
    };

    uploadAvatar = info => {
        if (info.file.status === 'uploading') {
            this.setState({ isLoading: true });
            return;
        }

        if (info.file.status === 'done') {
            getBase64(info.file.originFileObj, imageUrl =>
                this.setState({
                    imageUrl: imageUrl,
                    isLoading: false
                })
            );
            console.log(info.file)
            apiCaller('','POST',info.file).then(res=>{
                console.log(res)
            }).catch(err=>console.log(err))
        }
    };

    UNSAFE_componentWillReceiveProps(nextProps) {
        this.setState({
            rate: nextProps.rate
        });
        console.log('sdsds')
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

        const { imageUrl, isLoading } = this.state;

        return (
            <Avatar>
                <div className="text-center">
                    <form onSubmit={this.handleSubmit}>
                        <UploadCustom
                            name="avatar"
                            listType="picture-card"
                            className="avatar-uploader"
                            action=""
                            showUploadList={false}
                            beforeUpload={beforeUpload}
                            onChange={this.uploadAvatar}
                            loading={isLoading}
                        >
                            <img
                                className="avatar"
                                src={imageUrl ? imageUrl : AvatarImg}
                                alt="avatar"
                            />
                            <div className="btn-upload">
                                <Icon
                                    type={
                                        isLoading
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
