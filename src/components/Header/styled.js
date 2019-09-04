import styled from 'styled-components';
import { Modal } from 'antd';
import theme from 'theme';

export const HeaderContainer = styled.header`
    background-color: ${theme.headerColor};
    /* margin-bottom: 15px; */

    .logo {
        width: auto;
        height: 35px;
    }

    .login-link:hover {
        color: var(--primary-color) !important;
    }
`;

export const ModalCustom = styled(Modal)`
    .ant-modal-footer {
        display: none;
    }
`;
