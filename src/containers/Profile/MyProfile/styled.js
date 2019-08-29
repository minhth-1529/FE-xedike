import styled from 'styled-components';
import { Wrapper } from 'styled';

export const Avatar = styled(Wrapper)`
    img {
        border-radius: 100%;
        width: 100px;
        height: 100px;
    }

    .info {
        border: 1px solid rgba(0, 0, 0, 0.1);
        border-radius: 6px;
        padding: 8px 16px;
    }
`;

export const Body = styled(Wrapper)``;
