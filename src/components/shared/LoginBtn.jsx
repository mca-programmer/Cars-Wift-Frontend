import React from "react";
import styled from "styled-components";
import { MdLogin } from "react-icons/md";

const LoginBtn = () => {
  return (
    <StyledWrapper>
      <button className="btn">
        <MdLogin /> Login
      </button>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .btn {
    font-size: 14px;
    background: transparent;
    border: none;
    border-radius: 8px; 
    color: #ededed;
    position: relative;
    cursor: pointer;
    box-shadow: none;
    transition: color 0.3s ease;
    padding: 8px 16px;
    overflow: hidden;
    display: flex;
    align-items: center;
    gap: 4px;
  }

  /* Bottom underline */
  .btn::before {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    height: 1px; 
    width: 0;
    background-color: #287cff;
    transition: width 0.5s ease;
  }

  .btn:hover::before {
    width: 100%;
  }

  /* Background animation */
  .btn::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 0;
    background-color: #287cff;
    z-index: -1;
    border-radius: 8px;
    transition: height 0.4s ease;
  }

  .btn:hover::after {
    height: 100%;
  }

  .btn:hover {
    color: #ededed; 
  }
`;

export default LoginBtn;
