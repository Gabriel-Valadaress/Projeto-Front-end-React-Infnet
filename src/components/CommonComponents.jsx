import { styled } from "styled-components";

export const TitleNormal = styled.h2`
    font-size: 26px;
    font-weight: 700;
    color: #000000;

    @media (min-width: 576px){
        font-size: 30px;
    }

    @media (min-width: 768px){
        font-size: 32px;
    }
`;

export const TitleWithBorder = styled.h2`
    font-size: 26px;
    font-weight: 700;
    color: #000000;
    border-left: 4px solid #4a90e2;
    padding-left: 12px;

    @media (min-width: 576px){
        font-size: 30px;
        border-left: 5px solid #4a90e2;
    }

    @media (min-width: 768px){
        font-size: 32px;
        border-left: 6px solid #4a90e2;
    }
`;

export const SmallRoundedImage = styled.img`
    width: 80px;
    height: 80px;
    border-radius: 50%;
    object-fit: cover;

    @media (min-width: 768px){
        width: 100px;
        height: 100px;
    }

    @media (min-width: 992px){
        width: 110px;
        height: 110px;
    }

`;