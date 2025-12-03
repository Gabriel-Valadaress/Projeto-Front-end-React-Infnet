import { styled } from "styled-components";
import { useState, useRef, useEffect } from "react";

const DropdownWrapper = styled.div`
  position: relative;
`;

const DropdownButton = styled.button`
  background-color: transparent;
  padding: 4px 6px;
  border: none;
  cursor: pointer;
  border-radius: 4px;
  display: flex;
  align-items: center;
  gap: 6px;

  &:hover {
    border: 1px solid ${({ mode }) => (mode === "dark" ? "#030303" : "#e3e3e3")};
  }

  &:active {
    border: 1px solid ${({ mode }) => (mode === "dark" ? "#030303" : "#e3e3e3")};
  }
`;

const DropdownMenu = styled.ul`
  position: absolute;
  top: 42px;
  right: 0;
  background: white;
  border: 1px solid ${({ mode }) => (mode === "dark" ? "#030303" : "#e3e3e3")};
  border-radius: 4px;
  width: 180px;
  list-style: none;
  margin: 0;
  display: ${({ open }) => (open ? "block" : "none")};
`;

const DropdownItem = styled.li`
  padding: 0;
  margin: 0;
  cursor: pointer;
  display: flex;

  &:hover {
    background: #333;
  }

  &:active {
    background: #333;
  }

  a {
    color: ${({ mode }) => (mode === "dark" ? "#e3e3e3" : "#000000")};
    text-decoration: none;
    width: 100%;
    padding: 10px 16px;
    display: block;
  }
`;

export default function MenuDropdown({ mainIcon, Links, mode }) {
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
    <DropdownWrapper ref={ref}>
      <DropdownButton onClick={() => setOpen(!open)}>
        {mainIcon}
      </DropdownButton>

      <DropdownMenu open={open}>
        {Links.map((item, index) => (
          <DropdownItem key={index}>{item}</DropdownItem>
        ))}
      </DropdownMenu>
    </DropdownWrapper>
  );
}
