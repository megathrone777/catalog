import React, { useState, useContext } from "react";

import Logo from "./Logo";
import Menu from "./Menu";
import User from "./User";
import StyledContainer from "~/theme/global/container";
import styled, { css } from "~/theme";
import { GlobalContext } from "~/components/Layout";

const Header = (): JSX.Element => {
  const { userInfo } = useContext(GlobalContext);
  const [menuOpened, toggleMenuOpened] = useState<boolean>(false);

  const handleMenuView = () => {
    toggleMenuOpened(!menuOpened);
  };

  return (
    <StyledHeader>
      <StyledContainer>
        <StyledLayout>
          <Logo />
          <StyledWrap isOpened={menuOpened}>
            <Menu />
            <User
              isLoggedIn={userInfo.isLoggedIn}
              fullName={userInfo.fullName}
            />
          </StyledWrap>

          <StyledToggle
            isOpened={menuOpened}
            onClick={handleMenuView}
            type="button"
          >
            <StyledToggleHelper isOpened={menuOpened} />
          </StyledToggle>
        </StyledLayout>
      </StyledContainer>
    </StyledHeader>
  );
};

const StyledHeader = styled.header`
  background: ${({ theme }) => theme.colors.darkBlue};
  height: ${({ theme }) => theme.rem(80)};

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}px) {
    height: ${({ theme }) => theme.rem(60)};
  }
`;

const StyledLayout = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  height: 100%;
`;

const StyledWrap = styled.div<{
  isOpened: boolean;
}>`
  display: flex;
  flex: 0 1 ${({ theme }) => theme.rem(960)};
  justify-content: space-between;
  height: 100%;
  padding-left: ${({ theme }) => theme.rem(15)};
  transition: all 0.2s ease-in;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}px) {
    align-items: center;
    background: ${({ theme }) => theme.colors.darkBlue};
    bottom: 0;
    flex-direction: column-reverse;
    height: 100%;
    justify-content: center;
    left: 0;
    opacity: 0;
    padding-left: 0;
    position: fixed;
    right: 0;
    top: 0;
    visibility: hidden;
    width: 100%;
    z-index: 200;

    ${({ isOpened }) =>
      isOpened &&
      `
      visibility: visible;
      opacity: 1;
    `}
  }
`;

const StyledToggleHelper = styled.span<{
  isOpened: boolean;
}>`
  background-color: white;
  border-radius: ${({ theme }) => theme.rem(4)};
  height: ${({ theme }) => theme.rem(4)};
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
  transition-duration: 0.15s;
  transition-property: transform;
  transition-timing-function: ease;
  width: ${({ theme }) => theme.rem(40)};

  ${({ isOpened }) =>
    isOpened &&
    `
    top: 0;
    transition-delay: 75ms;
    transform: translate3d(0, 10px, 0) rotate(135deg);
  `}

  &::before,
  &::after {
    content: "";
    position: absolute;
    width: ${({ theme }) => theme.rem(40)};
    height: ${({ theme }) => theme.rem(4)};
    left: 0;
    transition-timing-function: ease;
    transition-duration: 0.15s;
    transition-property: transform;
    border-radius: ${({ theme }) => theme.rem(4)};
    background-color: white;
  }

  &::before {
    top: ${({ theme }) => theme.rem(10)};

    ${({ isOpened }) =>
      isOpened &&
      `
      transition-delay: 0s;
      opacity: 0;
    `}
  }

  &::after {
    top: ${({ theme }) => theme.rem(20)};

    ${({ isOpened }) =>
      isOpened &&
      css`
        top: ${({ theme }) => theme.rem(20)};
        transition-delay: 75ms;
        transform: translate3d(0, -20px, 0) rotate(-270deg);
      `}
  }
`;

const StyledToggle = styled.button<{
  isOpened: boolean;
}>`
  background: none;
  border: none;
  cursor: pointer;
  display: none;
  height: ${({ theme }) => theme.rem(24)};
  margin-right: ${({ theme }) => theme.rem(5)};
  padding: 0;
  position: relative;
  width: ${({ theme }) => theme.rem(40)};
  z-index: 300;

  &:focus {
    outline: none;
    background: none;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}px) {
    display: block;
  }
`;

export default Header;
