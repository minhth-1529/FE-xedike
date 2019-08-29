import React, { Component } from 'react';
import Logo from 'assets/images/logo.png';
import { Navbar, NavbarBrand, Nav, NavItem, Collapse } from 'reactstrap';
import { HeaderContainer } from './styled';
import { FaUserPlus } from 'react-icons/fa';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm'
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

        return (
            <HeaderContainer>
                <Navbar expand="md">
                    <NavbarBrand href="/" className="px-0 py-0 mr-0">
                        <img className="logo" src={Logo} alt="logo" />
                    </NavbarBrand>
                    <Collapse navbar>
                        <Nav className="ml-auto align-items-center" navbar>
                            <NavItem className="mr-3">
                                <a href="/" className="text-white">
                                    Trip
                                </a>
                            </NavItem>
                            <NavItem className="mr-3">
                                <p
                                    className="login-link text-white cursor-point mb-0"
                                    onClick={() => this.loginModal(true)}
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
                                    onClick={() => this.registerModal(true)}
                                >
                                    <FaUserPlus className="mr-1" /> Register
                                </button>
                                <RegisterForm registerVisible={registerVisible} loginModal={this.loginModal}  registerModal={this.registerModal}/>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
            </HeaderContainer>
        );
    }
}

export default Header;
