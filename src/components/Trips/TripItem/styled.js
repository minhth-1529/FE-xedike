import styled from 'styled-components';

export const Thumb = styled.img`
    width: 50px;
    height: 50px;
`;

export const Price = styled.div`
    font-size: ${props=>props.priceFont || '15px'};
`;
