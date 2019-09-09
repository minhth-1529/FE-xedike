import React, { PureComponent } from 'react';
import Logo from 'assets/images/logo.png';
import { Navbar, Nav, NavItem, Collapse } from 'reactstrap';
import { HeaderContainer } from './styled';
import { FaUserPlus } from 'react-icons/fa';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Avatar, Menu, Dropdown } from 'antd';
import { authLogout } from 'services/Auth/actions.js';

class Header extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            signInVisible: false,
            registerVisible: false
        };
    }

    loginModal = value => {
        this.setState({
            signInVisible: value,
            registerVisible: false
        });
    };

    registerModal = value => {
        this.setState({
            registerVisible: value,
            signInVisible: false
        });
    };

    render() {
        const { signInVisible, registerVisible } = this.state;
        const { auth } = this.props;

        const menu = (
            <Menu>
                <Menu.Item>
                    <Link to="/my-profile">Personal info</Link>
                </Menu.Item>
                <Menu.Item>
                    <Link to="/profile">History trips</Link>
                </Menu.Item>
                <Menu.Item>
                    <a
                        onClick={() => {
                            this.props.authLogout();
                            this.props.history.push('/');
                        }}
                    >
                        Logout
                    </a>
                </Menu.Item>
            </Menu>
        );

        return (
            <HeaderContainer>
                <Navbar expand="md">
                    <Link to="/" className="px-0 py-0 mr-0">
                        <img className="logo" src={Logo} alt="logo" />
                    </Link>
                    <Collapse navbar>
                        <Nav className="ml-auto align-items-center" navbar>
                            <NavItem className="mr-3">
                                <Link to="/trips/search" className="text-white">
                                    Trip
                                </Link>
                            </NavItem>
                            {!auth.authenticate ? (
                                <>
                                    <NavItem className="mr-3">
                                        <p
                                            className="login-link text-white cursor-point mb-0"
                                            onClick={() =>
                                                this.loginModal(true)
                                            }
                                        >
                                            Login
                                        </p>
                                        <LoginForm
                                            registerModal={this.registerModal}
                                            loginModal={this.loginModal}
                                            signInVisible={signInVisible}
                                        />
                                    </NavItem>
                                    <NavItem>
                                        <button
                                            type="button"
                                            className="btn btn-primary btn-sm"
                                            onClick={() =>
                                                this.registerModal(true)
                                            }
                                        >
                                            <FaUserPlus className="mr-1" />
                                            Register
                                        </button>
                                        <RegisterForm
                                            registerVisible={registerVisible}
                                            loginModal={this.loginModal}
                                            registerModal={this.registerModal}
                                        />
                                    </NavItem>
                                </>
                            ) : (
                                <>
                                    {auth.user.userType === 'driver' && (
                                        <NavItem className="mr-3">
                                            <p
                                                className="login-link text-white cursor-point mb-0"
                                                onClick={() =>
                                                    this.loginModal(true)
                                                }
                                            >
                                                Add car
                                            </p>
                                            <LoginForm
                                                registerModal={
                                                    this.registerModal
                                                }
                                                loginModal={this.loginModal}
                                                signInVisible={signInVisible}
                                            />
                                        </NavItem>
                                    )}
                                    <NavItem>
                                        <Dropdown overlay={menu}>
                                            <Avatar
                                                icon="user"
                                                className="cursor-point"
                                            />
                                        </Dropdown>
                                    </NavItem>
                                </>
                            )}
                        </Nav>
                    </Collapse>
                </Navbar>
            </HeaderContainer>
        );
    }
}

const mapStateToProps = state => {
    return {
        auth: state.Authenticate
    };
};

const mapDispatchToProps = dispatch => {
    return {
        authLogout: () => {
            dispatch(authLogout());
        }
    };
};

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(Header)
);
