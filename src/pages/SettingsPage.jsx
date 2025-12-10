import Navigation from "../components/Navigation";

import { styled } from "styled-components";

const SettingsPageContainer = styled.div`
    @media (min-width: 992px) {
        margin-top: 75px;
    }
`;

export default function SettingsPage(){
    return (
        <SettingsPageContainer>
            <Navigation />
            <p>Settings page</p>
        </SettingsPageContainer>
    );
}