import styled from 'styled-components';
import { Timeline } from 'antd';

export const Thumb = styled.img`
    width: 45px;
    height: 45px;
`;

export const Price = styled.div`
    font-size: ${props=>props.priceFont || '15px'};
`;

export const TimelineItem = styled(Timeline.Item)`
    .ant-timeline-item-content{
        flex-grow: 1;
        display: flex;
    }
`;