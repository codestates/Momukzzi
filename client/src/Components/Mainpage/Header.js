import React, { useRef, useState } from "react";
import { useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { Provider, useSelector, useDispatch, connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { BsPersonCircle } from "react-icons/bs";
import { MdMenu } from "react-icons/md";
const HeaderContainer = styled.div`
  margin: 30px auto;
  a {
    text-decoration: none;
    color: #f0f4f5;
  }

  .navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #263343;
    padding: 9px 12px;
  }

  .navbar_logo {
    font-size: 24px;
    color: #f0f4f5;
    flex: 1 1 auto;
  }

  .navbar_logo img {
    background-color: #d49466;
    width: 200px;
  }

  .navbar_menu {
    display: flex;
    list-style: none;
  }

  .navbar_menu li {
    padding: 9px 12px;
    margin: 15px;
  }

  .navbar_menu li:hover {
    background-color: #d49466;
    border-radius: 4px;
  }

  .navbar_icons {
    list-style: none;
    color: #f0f4f5;
    display: flex;
    padding-left: 0;
  }

  .navbar_icons li {
    padding: 8px 12px;
  }

  .navbar_toggleBtn {
    position: absolute;
    right: 32px;
    width: 23px;
    display: none;
  }
  .person_circle {
    font-size: 25px;
  }

  @media screen and (max-width: 768px) {
    .navbar {
      flex-direction: column;
      align-items: flex-start;
    }

    .navbar_menu {
      display: none;
      flex-direction: column;
      align-items: center;
      width: 100%;
    }

    .navbar_menu li {
      width: 100%;
      text-align: center;
    }

    .navbar_icons {
      display: none;
      justify-content: center;
      width: 100%;
    }

    .navbar_toggleBtn {
      display: block;
    }

    .navbar_menu_active,
    .navbar_icons_active {
      display: flex;
    }
  }
`;

const Header = () => {
  const [active, setActive] = useState(false);

  const clickToggleBtn = () => {
    setActive(!active);
  };

  return (
    <HeaderContainer>
      <nav class="navbar">
        <div class="navbar_logo">
          <img src="img/logo.png" />
        </div>
        <ul class={active ? "navbar_menu_active" : "navbar_menu"}>
          <li>
            <a href="">로그인</a>
          </li>
          <li>
            <a href="">회원가입</a>
          </li>
          <li>
            <a href="">ㅁㅁㅁ님</a>
          </li>
          <li>
            <a href="">마이페이지</a>
          </li>
          <li>
            <a href="">로그아웃</a>
          </li>
        </ul>
        <ul class={active ? "navbar_icons_active" : "navbar_icons"}>
          <li>
            {/* <img src="./favorite.png" /> */}
            <BsPersonCircle className="person_circle" />
          </li>
        </ul>
        <a href="#" class="navbar_toggleBtn" onClick={clickToggleBtn}>
          <MdMenu />
        </a>
      </nav>
    </HeaderContainer>
  );
};

export default Header;
