import React from "react";

import styled, { css } from "~/theme";

interface Props {
  fullName: string;
}

const Profile = ({ fullName }: Props): JSX.Element => (
  <StyledWrapper>
    <StyledInfo>
      <StyledImageHolder>
        <StyledImage src="/images/profile_img.png" alt="User" />
      </StyledImageHolder>

      {fullName && <StyledName>{fullName}</StyledName>}
      <StyledStatus>Status</StyledStatus>
    </StyledInfo>

    <StyledMenu>
      <StyledList>
        <StyledListItem>
          <StyledListLink href="#">
            <StyledListIcon envelope />
            Написать
          </StyledListLink>
        </StyledListItem>
        <StyledListItem>
          <StyledListLink href="#">
            <StyledListIcon star />
            Добавить в избранное
          </StyledListLink>
        </StyledListItem>
        <StyledListItem>
          <StyledListLink href="#">
            <StyledListIcon complain />
            Оценить
          </StyledListLink>
        </StyledListItem>
      </StyledList>
    </StyledMenu>
  </StyledWrapper>
);

const StyledWrapper = styled.div`
  background: ${({ theme }) => theme.colors.darkBlueLighter};
  border-radius: ${({ theme }) => theme.rem(10)};
  box-shadow: 0 0 ${({ theme }) => theme.rem(14)} 0 rgba(57, 61, 92, 0.3);
  margin-bottom: ${({ theme }) => theme.rem(47)};
  overflow: hidden;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}px) {
    flex: 0 1 calc(50% - ${({ theme }) => theme.rem(5)});
    margin-right: ${({ theme }) => theme.rem(5)};
    width: calc(50% - ${({ theme }) => theme.rem(5)});
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}px) {
    display: flex;
    margin-bottom: ${({ theme }) => theme.rem(10)};
    padding-left: ${({ theme }) => theme.rem(15)};
    width: 100%;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.xs}px) {
    align-items: center;
    flex-direction: column;
    padding-left: 0;
  }
`;

const StyledInfo = styled.div`
  padding: ${({ theme }) => theme.rem(20)} 0;
  text-align: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}px) {
    padding: ${({ theme }) => theme.rem(15)} 0;
  }
`;

const StyledImageHolder = styled.div`
  align-items: center;
  background: ${({ theme }) => theme.colors.whiteLighter};
  border-radius: ${({ theme }) => theme.rem(5)};
  box-shadow: 0 0 ${({ theme }) => theme.rem(14)} 0 rgba(57, 61, 92, 0.3);
  display: flex;
  height: ${({ theme }) => theme.rem(165)};
  justify-content: center;
  margin: 0 auto ${({ theme }) => theme.rem(20)};
  width: ${({ theme }) => theme.rem(170)};
`;

const StyledImage = styled.img``;

const StyledName = styled.h2`
  color: white;
  font-family: ${({ theme }) => theme.fonts.fontBold};
  font-size: ${({ theme }) => theme.rem(18)};
  margin-bottom: ${({ theme }) => theme.rem(12)};
  line-height: 1;
`;

const StyledStatus = styled.p`
  color: white;
  font-family: ${({ theme }) => theme.fonts.fontLight};
  font-size: ${({ theme }) => theme.rem(16)};
  line-height: 1;
`;

const StyledMenu = styled.div`
  border-top: ${({ theme }) => theme.rem(2)} solid #282c49;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}px) {
    border-top: none;
    margin-left: ${({ theme }) => theme.rem(15)};
    margin-right: ${({ theme }) => theme.rem(15)};
    margin-top: ${({ theme }) => theme.rem(10)};
    width: 100%;
  }
`;

const StyledList = styled.ul``;

const StyledListItem = styled.li`
  border-bottom: ${({ theme }) => theme.rem(2)} solid #282c49;
  border-top: ${({ theme }) => theme.rem(2)} solid #545e84;
  height: ${({ theme }) => theme.rem(50)};

  &:first-of-type {
    @media (max-width: ${({ theme }) => theme.breakpoints.sm}px) {
      border-top: none;
    }
  }

  &:last-of-type {
    border-bottom: none;
  }
`;

const StyledListLink = styled.a`
  display: block;
  height: 100%;
  color: white;
  font-family: ${({ theme }) => theme.fonts.font};
  font-size: ${({ theme }) => theme.rem(15)};
  line-height: ${({ theme }) => theme.rem(47)};
  padding-left: ${({ theme }) => theme.rem(60)};
  position: relative;
  text-decoration: none;

  &:hover {
    background-color: #2e314a;
  }
`;

const StyledListIcon = styled.i<{
  complain?: boolean;
  envelope?: boolean;
  star?: boolean;
}>`
  background-image: url('/images/profile_menu_bg.png');
  background-position-x: center;
  background-repeat: no-repeat;
  display: block;
  height: ${({ theme }) => theme.rem(24)};
  position: absolute;
  width: ${({ theme }) => theme.rem(20)};
  left: ${({ theme }) => theme.rem(22)};
  top: 50%;
  transform: translateY(-50%);

  ${({ envelope }) =>
    envelope &&
    css`
      background-position-y: ${({ theme }) => theme.rem(4)};
    `}

  ${({ star }) =>
    star &&
    css`
      background-position-y: ${({ theme }) => theme.rem(-47)};
    `}

  ${({ complain }) =>
    complain &&
    `
  background-position-y: bottom;
  `}
`;

export default Profile;
