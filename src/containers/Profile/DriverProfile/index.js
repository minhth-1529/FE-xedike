import React, { PureComponent } from 'react';
import AvatarImg from 'assets/images/user-ic.png';
import { Avatar, UploadCustom } from './styled';
import { Icon } from 'antd';
import moment from 'moment';
import apiCaller from 'utils/apiCaller';
import _ from 'lodash';
import { Wrapper, BodyWrapper } from 'styled';
import { withRouter } from 'react-router-dom';

class DriverProfile extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            avatar: '',
            user: {},
            cars: []
        };
    }

    componentDidMount() {
        const { match } = this.props;

        apiCaller(`users/${match.params.id}`, 'GET', null)
            .then(res => {
                _.map(Object.keys(res.data), item => {
                    this.setState({
                        [item]: res.data[item]
                    });
                });
            })
            .catch(err => console.log(err.response));
    }

    render() {
        const { user, cars,avatar } = this.state;

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
                                    <h5 className="mb-0">{user.fullName}</h5>
                                </div>
                                <div className="mt-3 info fz-14">
                                    <p className="mb-0">
                                        <strong>Active day:</strong>{' '}
                                        {moment(user.registerDate).format(
                                            'DD/MM/YYYY'
                                        )}
                                    </p>
                                    <p className="my-1">
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
                                    Driver information
                                </h5>
                                <div className="form-group row">
                                    <label className="col-sm-3">Email:</label>
                                    <div className="col-sm-9">{user.email}</div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-sm-3">
                                        Full Name:
                                    </label>
                                    <div className="col-sm-9">{user.fullName}</div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-sm-3">
                                        Day of birth:
                                    </label>
                                    <div className="col-sm-9">{user.DOB}</div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-sm-3">
                                        Phone number:
                                    </label>
                                    <div className="col-sm-9">
                                        {user.phoneNumber}
                                    </div>
                                </div>
                                {_.map(cars, (car, index) => {
                                    return (
                                        <div key={index}>
                                            <h5 className="font-weight-normal d-flex align-items-center mb-4 mt-5">
                                                <Icon
                                                    type="car"
                                                    className="mr-1"
                                                />{' '}
                                                Car information
                                            </h5>
                                            <div className="form-group row">
                                                <label className="col-sm-3">
                                                    Carmakers:
                                                </label>
                                                <div className="col-sm-9">
                                                    {car.autoMakers}
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label className="col-sm-3">
                                                    Car Name:
                                                </label>
                                                <div className="col-sm-9">
                                                    {car.carName}
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label className="col-sm-3">
                                                    Car seats:
                                                </label>
                                                <div className="col-sm-9">
                                                    {car.carSeats}
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label className="col-sm-3">
                                                    Car model:
                                                </label>
                                                <div className="col-sm-9">
                                                    {car.carModel}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </Wrapper>
                        </div>
                    </div>
                </BodyWrapper>
            </div>
        );
    }
}
export default withRouter(DriverProfile);
