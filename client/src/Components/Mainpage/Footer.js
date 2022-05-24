import React from "react";
import styled from "styled-components";
import { BsGithub } from "react-icons/bs";
import { Link } from "react-router-dom";
const FooterContainer = styled.footer`
  display: flex;
  background-color: #3e3e3e;
  color: white;

  .github_icons {
    font-size: 30px;
    color: white;
  }
  .currentColor {
    font-size: 25px;
  }

  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`;

const FooterInfo = styled.ul`
  list-style-type: none;
  flex: 1 1 auto;
  margin-left: 200px;
  text-decoration: none;
`;

const SiteNameContainer = styled.li``;
const SiteName = styled.div`
  width: 200px;
  height: 100px;
  font-size: 50px;
  color: white;
`;
const SiteCopyright = styled.li``;

const FooterGitHubContainer = styled.div`
  flex: 1 1 auto;
  margin-left: 0 0 0 auto;
`;

const FooterGitHub = styled.ul`
  margin-left: 20px;
`;

const GitHubTitle = styled.li`
  margin: 10px;
`;
const GitHubMembers = styled.li`
  display: flex;
`;

const Member = styled.div`
  padding: 3px 5px;
  margin: 5px 10px;
  height: 50px;
`;
const GitHubLink = styled.a`
  text-decoration: none;
  color: white;
`;
const Footer = () => {
  return (
    <FooterContainer>
      <FooterInfo>
        <SiteNameContainer>
          <Link to="/" style={{ textDecoration: "none" }}>
            <SiteName>MOMUKZZI</SiteName>
          </Link>
        </SiteNameContainer>
        <SiteCopyright>Copyright @ 2022 All right Reserved</SiteCopyright>
      </FooterInfo>
      <FooterGitHubContainer>
        <FooterGitHub>
          <GitHubTitle>TEAM MEMBERS</GitHubTitle>
          <GitHubMembers className="footer_github_members">
            <Member>
              <GitHubLink
                href="https://github.com/codestates/Momukzzi"
                target="_blank"
              >
                <BsGithub className="github_icons" />
              </GitHubLink>
            </Member>
            <Member>
              <GitHubLink href="https://github.com/EuilimChoi" target="_blank">
                최의림
              </GitHubLink>
            </Member>
            <Member>
              <GitHubLink href="https://github.com/rkdghwnd" target="_blank">
                강호중
              </GitHubLink>
            </Member>
            <Member>
              <GitHubLink href="https://github.com/hyukzz" target="_blank">
                정윤혁
              </GitHubLink>
            </Member>
            <Member>
              <GitHubLink href="https://github.com/yomae" target="_blank">
                김여명
              </GitHubLink>
            </Member>
          </GitHubMembers>
        </FooterGitHub>
      </FooterGitHubContainer>
    </FooterContainer>
  );
};

export default Footer;
