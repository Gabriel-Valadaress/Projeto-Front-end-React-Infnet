import { Link } from "react-router-dom";
import { styled } from "styled-components";

const NavBar = styled.nav`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    width: 100%;
    height: 50px;
    position: fixed;
    bottom: 0;
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

export default function MobileNavigation({ mode }) {
    return (
        <NavBar>
            <NavLink mode={mode} to="/"><Svg mode={mode} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"><path d="M240-200h120v-240h240v240h120v-360L480-740 240-560v360Zm-80 80v-480l320-240 320 240v480H520v-240h-80v240H160Zm320-350Z" /></Svg></NavLink>
            <NavLink mode={mode} to="/torneios"><Svg mode={mode} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"><path d="M280-120v-80h160v-124q-49-11-87.5-41.5T296-442q-75-9-125.5-65.5T120-640v-40q0-33 23.5-56.5T200-760h80v-80h400v80h80q33 0 56.5 23.5T840-680v40q0 76-50.5 132.5T664-442q-18 46-56.5 76.5T520-324v124h160v80H280Zm0-408v-152h-80v40q0 38 22 68.5t58 43.5Zm200 128q50 0 85-35t35-85v-240H360v240q0 50 35 85t85 35Zm200-128q36-13 58-43.5t22-68.5v-40h-80v152Zm-200-52Z" /></Svg></NavLink>
            <NavLink mode={mode} to="/jogadores"><Svg mode={mode} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"><path d="M0-240v-63q0-43 44-70t116-27q13 0 25 .5t23 2.5q-14 21-21 44t-7 48v65H0Zm240 0v-65q0-32 17.5-58.5T307-410q32-20 76.5-30t96.5-10q53 0 97.5 10t76.5 30q32 20 49 46.5t17 58.5v65H240Zm540 0v-65q0-26-6.5-49T754-397q11-2 22.5-2.5t23.5-.5q72 0 116 26.5t44 70.5v63H780Zm-455-80h311q-10-20-55.5-35T480-370q-55 0-100.5 15T325-320ZM160-440q-33 0-56.5-23.5T80-520q0-34 23.5-57t56.5-23q34 0 57 23t23 57q0 33-23 56.5T160-440Zm640 0q-33 0-56.5-23.5T720-520q0-34 23.5-57t56.5-23q34 0 57 23t23 57q0 33-23 56.5T800-440Zm-320-40q-50 0-85-35t-35-85q0-51 35-85.5t85-34.5q51 0 85.5 34.5T600-600q0 50-34.5 85T480-480Zm0-80q17 0 28.5-11.5T520-600q0-17-11.5-28.5T480-640q-17 0-28.5 11.5T440-600q0 17 11.5 28.5T480-560Zm1 240Zm-1-280Z" /></Svg></NavLink>
            <NavLink mode={mode} to="/perfil"><Svg mode={mode} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"><path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Zm80-80h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T560-640q0-33-23.5-56.5T480-720q-33 0-56.5 23.5T400-640q0 33 23.5 56.5T480-560Zm0-80Zm0 400Z"/></Svg></NavLink>
        </NavBar>
    );
}