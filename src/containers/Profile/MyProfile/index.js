import React, { PureComponent } from 'react';
import AvatarImg from 'assets/images/user-ic.png';
import { Avatar, UploadCustom } from './styled';
import { Icon } from 'antd';
import { connect } from 'react-redux';
import moment from 'moment';
import apiCaller from 'utils/apiCaller';
import PersonalForm from './PersonalForm';
import PasswordForm from './PasswordForm';
import _ from 'lodash';
import {Wrapper,BodyWrapper} from 'styled';
class MyProfile extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            data: {},
            fullName: '',
            registerDate: '',
            avatar: '',
            email: '',
            phoneNumber: '',
            DOB: undefined
        };
    }

    componentDidMount() {
        const { auth } = this.props;

        if (!auth.authenticate) return this.props.history.push('/');

        apiCaller(`users/${auth.user.id}`, 'GET', null)
            .then(res => {
                // TODO upload now fullName
                this.setState({
                    data: {
                        email: res.data.email,
                        phoneNumber: res.data.phoneNumber,
                        DOB: res.data.DOB,
                        fullName: res.data.fullName
                    },
                    registerDate: moment(res.data.registerDate).format(
                        'DD/MM/YYYY'
                    )
                });
            })
            .catch(err => console.log(err.response.data));
    }

    render() {
        const { auth } = this.props;

        const { registerDate, avatar, data } = this.state;

        let abc = _.isEmpty(data);

        return (
            <div className="container">
                <BodyWrapper>
                    <div className="row">
                        <div className="col-3">
                            <Avatar>
                                <div className="text-center">
                                    <UploadCustom
                                        name="avatar"
                                        listType="picture-card"
                                        className={
                                            avatar !== ''
                                                ? 'avatar-uploader'
                                                : 'avatar-uploader img-uploaded'
                                        }
                                    >
                                        <img
                                            className="avatar"
                                            src={avatar}
                                            alt="avatar"
                                        />
                                        <div className="btn-upload">
                                            <Icon
                                                type="upload"
                                                style={{ fontSize: '24px' }}
                                            />
                                        </div>
                                    </UploadCustom>
                                    <h5 className="mb-0">{data.fullName}</h5>
                                </div>
                                <div className="mt-3 info fz-14">
                                    <p className="mb-0">
                                        <strong>Active day:</strong>
                                        {' '}{registerDate}
                                    </p>
                                    <p className="mb-0">
                                        <strong>Your rating:</strong>
                                    </p>
                                    <p className="mb-0">
                                        <strong>Total booking trip:</strong>
                                    </p>
                                </div>
                            </Avatar>
                        </div>
                        <div className="col-9">
                            <Wrapper>
                                <h5 className="font-weight-normal d-flex align-items-center mb-4">
                                    <Icon type="user" className="mr-1" />
                                    Personal info
                                </h5>
                                {!abc && (
                                    <PersonalForm
                                        email={data.email}
                                        fullName={data.fullName}
                                        DOB={data.DOB}
                                        phoneNumber={data.phoneNumber}
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
        auth: state.Authenticate
    };
};

export default connect(
    mapStateToProps,
    null
)(MyProfile);
