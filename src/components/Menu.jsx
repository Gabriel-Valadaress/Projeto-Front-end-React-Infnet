import { styled } from "styled-components";
import { useState, useRef, useEffect } from "react";

const MenuWrapper = styled.div`
  position: relative;
`;

const MenuButton = styled.button`
  background-color: transparent;
  padding: 4px 6px;
  border: none;
  cursor: pointer;
  border-radius: 4px;
  display: flex;
  align-items: center;
  gap: 6px;
  
  &:hover,
  &:active {
    border: 1px solid ${({ mode }) => (mode === "dark" ? "#030303" : "#e3e3e3")};
  }
  
  @media (min-width: 992px) {
    display: none;
  }
`;

const MenuList = styled.ul`
  position: absolute;
  top: 42px;
  right: 0;
  background: ${({ mode }) => (mode === "dark" ? "#1a1a1a" : "#ffffff")};
  border: 1px solid ${({ mode }) => (mode === "dark" ? "#030303" : "#e3e3e3")};
  border-radius: 4px;
  width: 180px;
  list-style: none;
  margin: 0;
  padding: 0;
  display: ${({ $open }) => ($open ? "block" : "none")};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  flex-direction: column;
  
  @media (min-width: 576px) {
    width: 220px;
  }
  
  @media (min-width: 768px) {
    width: 240px;
  }
  
  @media (min-width: 992px) {
    position: static;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: auto;
    background: transparent;
    border: none;
    box-shadow: none;
    gap: 8px;
  }
`;

const MenuItem = styled.li`
  padding: 0;
  margin: 0;
  
  &:hover {
    background: ${({ mode }) => (mode === "dark" ? "#333333" : "#f5f5f5")};
  }
  
  @media (min-width: 992px) {
    &:hover {
      background: transparent;
    }
  }
  
  a {
    color: ${({ mode }) => (mode === "dark" ? "#e3e3e3" : "#000000")};
    text-decoration: none;
    width: 100%;
    padding: 10px 16px;
    display: block;
    font-size: 16px;
    transition: background-color 0.2s ease;
    
    @media (min-width: 576px) {
      font-size: 18px;
    }
    
    @media (min-width: 768px) {
      font-size: 20px;
    }
    
    @media (min-width: 992px) {
      font-size: 22px;
      
      &:hover {
        background: transparent;
        text-decoration: underline;
      }
    }
  }
`;

export default function Menu({ mainIcon, Links, mode = "light" }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <MenuWrapper ref={ref}>
      <MenuButton 
        onClick={() => setOpen(!open)} 
        mode={mode}
        aria-label="Menu"
        aria-expanded={open}
      >
        {mainIcon}
      </MenuButton>
      
      <MenuList $open={open} mode={mode}>
        {Links.map((item, index) => (
          <MenuItem key={index} mode={mode}>
            {item}
          </MenuItem>
        ))}
      </MenuList>
    </MenuWrapper>
  );
}