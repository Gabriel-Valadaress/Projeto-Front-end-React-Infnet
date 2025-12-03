import { Link } from "react-router-dom";
import { styled } from "styled-components";

import MenuDropdown from "./MenuDropdown";

const Header = styled.header`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 4px 16px;
    align-items: center;
    width: 100%;
    height: 60px;
    position: sticky;
    top: 0;
    border: 1px solid rgba(0,0,0,0.4);
    background-color: white;
`;

const NavLink = styled(Link)`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    
    &:hover {
        background-color: ${({ mode }) => (mode === "dark" ? "#030303" : "#e3e3e3")};
    }

    &: active {
        background-color: ${({ mode }) => (mode === "dark" ? "#030303" : "#e3e3e3")};
    }
`;

const Svg = styled.svg`
    width: 28px;
    height: 28px;
    transition: fill .3s ease;
    fill: ${({ mode }) => (mode === "dark" ? "#e3e3e3" : "#030303")};

    &:hover {
        opacity: 0.7;
        background-color: ;
    }

    &:active {
        opacity: 0.7;
    }
`;

export default function MobileHeader ({ mode }) {
    return (
        <Header>
            <h1>Projeto de Bloco</h1>
            <MenuDropdown
            mode={mode}
            Links={[<NavLink mode={mode} to="/">teste</NavLink>, <NavLink mode={mode} to="/">teste</NavLink>,<NavLink mode={mode} to="/">teste</NavLink>]}
            mainIcon={<Svg mode={mode} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"><path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" /></Svg>} />
        </Header>
    );
}