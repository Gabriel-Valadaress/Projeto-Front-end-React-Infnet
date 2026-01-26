import Navigation from "../components/Navigation";

import { styled } from "styled-components";

const HomePageContainer = styled.div`
        margin-top: 75px;
`;

export default function HomePage(){
    return (
        <HomePageContainer>
            <Navigation />
            <p>Home page</p>
        </HomePageContainer>
    );
}