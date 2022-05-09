import React, { useContext } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import { GlobalContext } from "~/components/Layout";
import styled from "~/theme";

interface TMenuLink {
  url: string;
  text: string;
}

const Menu = (): JSX.Element => {
  const { pathname } = useRouter();
  const { userInfo } = useContext(GlobalContext);
  const { isLoggedIn } = userInfo;

  const MenuLink = ({ url, text }: TMenuLink): JSX.Element => (
    <Link href={url} as={url} passHref>
      <StyledLink className={pathname === url ? "active" : ""}>
        {text}
      </StyledLink>
    </Link>
  );

  return (
    <StyledWrapper>
      <StyledList>
        <StyledItem>
          <MenuLink text="Make new" url={isLoggedIn ? "/create" : "/login"} />
        </StyledItem>
        <StyledItem>
          <MenuLink text="Themes" url="/#" />
        </StyledItem>
        <StyledItem>
          <MenuLink text="My space" url="/#" />
        </StyledItem>
        <StyledItem>
          <MenuLink text="About us" url="/#" />
        </StyledItem>
      </StyledList>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  height: 100%;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}px) {
    height: auto;
  }
`;

const StyledList = styled.ul`
  display: flex;
  height: 100%;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}px) {
    flex-direction: column;
    align-items: center;
  }
`;

const StyledItem = styled.li`
  margin-right: ${({ theme }) => theme.rem(74)};

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}px) {
    margin-right: ${({ theme }) => theme.rem(40)};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}px) {
    margin-bottom: ${({ theme }) => theme.rem(20)};
    margin-right: 0;
    text-align: center;
  }

  &:last-of-type {
    margin-right: 0;

    @media (max-width: ${({ theme }) => theme.breakpoints.md}px) {
      margin-bottom: 0;
    }
  }
`;

const StyledLink = styled.a`
  align-items: center;
  color: ${({ theme }) => theme.colors.whiteLighter};
  cursor: pointer;
  display: flex;
  font-weight: 300;
  height: 100%;
  position: relative;
  text-decoration: none;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}px) {
    font-size: ${({ theme }) => theme.rem(24)};
  }

  &::after {
    bottom: 0;
    background: ${({ theme }) => theme.colors.orange};
    content: "";
    display: block;
    height: ${({ theme }) => theme.rem(4)};
    left: 0;
    position: absolute;
    right: 0;
    width: 100%;
    transform: scaleX(0);
    transition: all 0.1s ease-in;
    transform-origin: center center;

    @media (max-width: ${({ theme }) => theme.breakpoints.md}px) {
      bottom: ${({ theme }) => theme.rem(-5)};
    }
  }

  &:hover,
  &.active {
    &::after {
      transform: scaleX(1);
    }
  }
`;

export default Menu;
