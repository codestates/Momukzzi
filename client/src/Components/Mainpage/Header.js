import React, { useRef, useState } from "react";
import { useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { Provider, useSelector, useDispatch, connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { BsPersonCircle } from "react-icons/bs";
import { MdMenu } from "react-icons/md";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { Nav } from "react-bootstrap";

const HeaderContainer = styled.div`
  margin: 0 auto;
  .navbar {
    height: 120px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #f1c83e;
    padding: 9px 12px;
  }

  .navbar_logo {
    flex: 1 1 auto;
  }

  .navbar_logo img {
    background-color: #d49466;
    width: 200px;
  }

  .navbar_menu {
    display: flex;
    list-style: none;
    font-size: 20px;
  }

  .navbar_menu li {
    padding: 9px 12px;
    margin: 15px 30px;
    cursor: pointer;
    text-decoration: none;
  }

  .navbar_menu li:hover {
    background-color: #d49466;
    border-radius: 4px;
  }

  .navbar_menu li > div {
    color: #533026;
  }

  .navbar_link {
    text-decoration: none;
    color: #533026;
  }

  .navbar_icons {
    list-style: none;
    color: #533026;
    display: flex;
    margin-right: 20px;
  }

  .navbar_icons li {
    padding: 8px 12px;
  }
  .navbar_icons li:hover {
    background-color: #d49466;
    border-radius: 4px;
  }
  .navbar_toggleBtn {
    position: absolute;
    right: 32px;
    width: 23px;
    display: none;
  }
  .person_circle {
    font-size: 30px;
  }
  .navbar_icons > li {
    cursor: pointer;
  }
`;

const Header = () => {
  const dispatch = useDispatch();
  return (
    <HeaderContainer>
      <nav className="navbar">
        <div className="navbar_logo">
          <Link to="/">
            <img src="https://euilimchoibucket.s3.amazonaws.com/logo-removebg-preview.png" />
          </Link>
        </div>
        {localStorage.getItem("accessToken") ? (
          <ul className="navbar_menu">
            <li>
              <Link to="/" className="navbar_link">
                Home
              </Link>
            </li>
            <li>
              <div>{localStorage.getItem("nickname")}님</div>
            </li>
            <Link to="/mypage" className="navbar_link">
              <li>
                <div>마이페이지</div>
              </li>
            </Link>
            <li
              onClick={() => {
                localStorage.removeItem("accessToken");
                localStorage.removeItem("nickname");
                localStorage.removeItem("Oauth");
                axios.get("https://localhost:4000/users/logout", {
                  withCredentials: true,
                });
                window.location.replace(window.location.pathname);
              }}
            >
              <div>로그아웃</div>
            </li>
          </ul>
        ) : (
          <ul className="navbar_menu">
            <li>
              <Link to="/" className="navbar_link">
                Home
              </Link>
            </li>
            <li
              onClick={() => {
                dispatch({ type: "login modal" });
              }}
            >
              <div>로그인</div>
            </li>
            <li
              onClick={() => {
                dispatch({ type: "signup modal" });
              }}
            >
              <div>회원가입</div>
            </li>
          </ul>
        )}

        <ul className="navbar_icons">
          <li>
            {/* <img src="./favorite.png" /> */}
            <BsPersonCircle
              className="person_circle"
              onClick={() => {
                dispatch({ type: "favorite modal" });
              }}
            />
          </li>
        </ul>
      </nav>
    </HeaderContainer>
  );
};

export default Header;
