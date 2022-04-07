import React, { useRef, useState } from "react";
import { useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { BsGithub } from "react-icons/bs";
import { Link } from "react-router-dom";
const FooterContainer = styled.footer`
  display: flex;
  border: 1px solid black;
  height: 150px;
  background-color: #3e3e3e;
  color: white;

  .footer_info {
    list-style-type: none;
    flex: 1 1 auto;
    margin-left: 200px;
    text-decoration: none;
  }

  .footer_info > li div {
    width: 200px;
    height: 100px;
    font-size: 50px;

    color: white;
  }

  .footer_github {
    flex: 1 1 auto;
    margin-left: 200px;
  }

  .footer_github > ul {
    list-style-type: none;
    font-size: 25px;
  }

  .footer_github_members {
    display: flex;
  }

  .footer_github_members > div {
    padding: 3px 5px;
    margin: 5px 10px;
  }

  .github_icons {
    font-size: 50px;
    color: white;
  }
  .currentColor {
    font-size: 25px;
  }

  .footer_github_members_name {
    height: 50px;
    line-height: 50px;
  }

  .footer_github_members_name > a {
    text-decoration: none;
    color: white;
  }

  #github_title {
    margin: 10px;
  }
`;
const Footer = () => {
  return (
    <FooterContainer>
      <ul className="footer_info">
        <li>
          <Link to="/" textDecoration="none">
            <div>MUMUKZZI</div>
          </Link>
        </li>
        <li>Copyright @ 2022 All right Reserved</li>
      </ul>
      <div className="footer_github">
        <ul>
          <li id="github_title">TEAM MEMBERS</li>
          <li className="footer_github_members">
            <div>
              <a href="https://github.com/codestates/Momukzzi" target="_blank">
                <BsGithub className="github_icons" />
              </a>
            </div>
            <div className="footer_github_members_name">
              <a href="https://github.com/EuilimChoi" target="_blank">
                최의림
              </a>
            </div>
            <div className="footer_github_members_name">
              <a href="https://github.com/rkdghwnd" target="_blank">
                강호중
              </a>
            </div>
            <div className="footer_github_members_name">
              <a href="https://github.com/hyukzz" target="_blank">
                정윤혁
              </a>
            </div>
            <div className="footer_github_members_name">
              <a href="https://github.com/yomae" target="_blank">
                김여명
              </a>
            </div>
          </li>
        </ul>
      </div>
    </FooterContainer>
  );
};

export default Footer;
