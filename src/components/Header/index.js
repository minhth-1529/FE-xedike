import React, { Component } from 'react';
import Logo from 'assets/images/logo.png';
import { Navbar, Nav, NavItem, Collapse } from 'reactstrap';
import { HeaderContainer } from './styled';
import { FaUserPlus } from 'react-icons/fa';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Avatar, Menu, Dropdown } from 'antd';
import _ from 'lodash';
class Header extends Component {
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
        const {authen} = this.props;

        const menu = (
            <Menu>
                <Menu.Item>
                    <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href="http://www.alipay.com/"
                    >
                        1st menu item
                    </a>
                </Menu.Item>
                <Menu.Item>
                    <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href="http://www.taobao.com/"
                    >
                        2nd menu item
                    </a>
                </Menu.Item>
                <Menu.Item>
                    <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href="http://www.tmall.com/"
                    >
                        3rd menu item
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
                                <a href="/" className="text-white">
                                    Trip
                                </a>
                            </NavItem>
                            {_.isEmpty(authen) ? (
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
                                            <FaUserPlus className="mr-1" />{' '}
                                            Register
                                        </button>
                                    </NavItem>
                                </>
                            ) : (
                                <NavItem>
                                    <Dropdown overlay={menu}>
                                        <Avatar icon="user" />
                                    </Dropdown>
                                </NavItem>
                            )}
                            <RegisterForm
                                registerVisible={registerVisible}
                                loginModal={this.loginModal}
                                registerModal={this.registerModal}
                            />
                        </Nav>
                    </Collapse>
                </Navbar>
            </HeaderContainer>
        );
    }
}

const mapStateToProps = state => {
    return {
        authen: state.Authenticate
    };
};

export default connect(
    mapStateToProps,
    null
)(Header);
