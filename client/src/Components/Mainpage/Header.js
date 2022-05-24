import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useDispatch } from "react-redux";
import { BsPersonCircle } from "react-icons/bs";
import { AiOutlineMenu } from "react-icons/ai";
import { Link } from "react-router-dom";

const HeaderContainer = styled.div`
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f1c83e;
  padding: 9px 12px;
  color: #533026;

  .navbar_link {
    text-decoration: none;
    color: #533026;
  }
  .person_circle {
    font-size: 30px;
  }

  @media screen and (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;
const NavBarLogo = styled.div`
  flex: 1 1 auto;
`;

const LogoImg = styled.img`
  width: 200px;
`;

const NavBarMenu = styled.ul`
  display: flex;
  list-style: none;
  font-size: 20px;
  display: ${(props) => (props.hide ? "none" : "flex")};
  @media screen and (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    width: 100%;
  }
  @media screen and (min-width: 769px) {
    display: flex;
  }
`;

const NavBarLi = styled.li`
  padding: 9px 12px;
  margin: 0 20px;
  cursor: pointer;
  text-decoration: none;

  &:hover {
    background-color: #d49466;
    border-radius: 4px;
  }
`;

const NavBarIcon = styled.div`
  padding: 9px 12px;
  margin: 0 20px;
  cursor: pointer;
  display: none;

  @media screen and (max-width: 768px) {
    display: initial;
    position: absolute;
    top: 20px;
    right: 20px;
  }

  .menu_icons {
    font-size: 30px;
  }
`;

const Header = () => {
  const dispatch = useDispatch();

  const [navBarMenuStyle, setNavBarMenuStyle] = useState(false);

  const spreadMenu = () => {
    setNavBarMenuStyle(!navBarMenuStyle);
  };

  return (
    <HeaderContainer>
      <NavBarLogo className="navbar_logo">
        <Link to="/">
          <LogoImg src="https://cdn.discordapp.com/attachments/947685049682247701/961421667157016686/logo-removebg-preview.png" />
        </Link>
      </NavBarLogo>
      {localStorage.getItem("accessToken") ? (
        <NavBarMenu hide={navBarMenuStyle}>
          <NavBarLi>
            <Link to="/" className="navbar_link">
              Home
            </Link>
          </NavBarLi>
          <NavBarLi>
            <div>{localStorage.getItem("nickname")}님</div>
          </NavBarLi>
          <Link to="/mypage" className="navbar_link">
            <NavBarLi>
              <div>마이페이지</div>
            </NavBarLi>
          </Link>
          <NavBarLi
            onClick={() => {
              localStorage.removeItem("accessToken");
              localStorage.removeItem("nickname");
              localStorage.removeItem("Oauth");
              axios.get(`${process.env.REACT_APP_API_URL}/users/logout`, {
                withCredentials: true,
              });
              window.location.replace(window.location.pathname);
            }}
          >
            <div>로그아웃</div>
          </NavBarLi>
          <NavBarLi>
            <BsPersonCircle
              className="person_circle"
              onClick={() => {
                dispatch({ type: "favorite modal" });
              }}
            />
          </NavBarLi>
        </NavBarMenu>
      ) : (
        <NavBarMenu hide={navBarMenuStyle}>
          <NavBarLi>
            <Link to="/" className="navbar_link">
              Home
            </Link>
          </NavBarLi>
          <NavBarLi
            onClick={() => {
              dispatch({ type: "login modal" });
            }}
          >
            <div>로그인</div>
          </NavBarLi>
          <NavBarLi
            onClick={() => {
              dispatch({ type: "signup modal" });
            }}
          >
            <div>회원가입</div>
          </NavBarLi>
          <NavBarLi>
            <BsPersonCircle
              className="person_circle"
              onClick={() => {
                dispatch({ type: "favorite modal" });
              }}
            />
          </NavBarLi>
        </NavBarMenu>
      )}
      <NavBarIcon onClick={spreadMenu}>
        <AiOutlineMenu className="menu_icons" />
      </NavBarIcon>
    </HeaderContainer>
  );
};

export default Header;
