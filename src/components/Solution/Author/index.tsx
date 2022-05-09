import React, { useContext } from "react";
import Link from "next/link";

import { GlobalContext } from "~/components/Layout";
import styled from "~/theme";

interface Props {
  value: string;
}

const Author = ({ value }: Props): JSX.Element => {
  const { userInfo } = useContext(GlobalContext);
  const { isLoggedIn } = userInfo;

  return (
    <StyledWrapper>
      <StyledHeading>От автора:</StyledHeading>

      <StyledContent>
        {value && value.length > 0 && <StyledText>{value}</StyledText>}
        <StyledBack href="#">Вернуться к таблице...</StyledBack>
      </StyledContent>

      <Link href={`${isLoggedIn ? "/create" : "/login"}`} passHref>
        <StyledSuggest href="#">Предложить свое Решение</StyledSuggest>
      </Link>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  @media (max-width: ${({ theme }) => theme.breakpoints.md}px) {
    flex: 0 1 calc(50% - ${({ theme }) => theme.rem(5)});
    margin-left: ${({ theme }) => theme.rem(5)};
    width: calc(50% - ${({ theme }) => theme.rem(5)});
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}px) {
    margin-left: 0;
    text-align: center;
    width: 100%;
  }
`;

const StyledContent = styled.div`
  background: white;
  padding: ${({ theme }) => theme.rem(25)} ${({ theme }) => theme.rem(15)} ${({ theme }) => theme.rem(20)};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}px) {
    padding-bottom: ${({ theme }) => theme.rem(10)};
    padding-top: ${({ theme }) => theme.rem(10)};
  }
`;

const StyledHeading = styled.h2`
  background: ${({ theme }) => theme.colors.darkBlueLighter};
  color: ${({ theme }) => theme.colors.white};
  display: block;
  height: ${({ theme }) => theme.rem(50)};
  padding-left: ${({ theme }) => theme.rem(74)};
  border-top-left-radius: ${({ theme }) => theme.rem(10)};
  border-top-right-radius: ${({ theme }) => theme.rem(10)};
  line-height: ${({ theme }) => theme.rem(50)};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}px) {
    padding-left: ${({ theme }) => theme.rem(15)};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.xs}px) {
    padding-left: 0;
  }
`;

const StyledText = styled.div`
  border-radius: ${({ theme }) => theme.rem(10)};
  color: ${({ theme }) => theme.colors.gray};
  font-family: ${({ theme }) => theme.fonts.fontLight};
  font-size: ${({ theme }) => theme.rem(16)};
  line-height: ${({ theme }) => theme.rem(24)};
  margin-bottom: ${({ theme }) => theme.rem(25)};
  text-align: left;
  text-shadow: 0 0 ${({ theme }) => theme.rem(1)} ${({ theme }) => theme.colors.grayDarker};
  width: 100%;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}px) {
    font-size: ${({ theme }) => theme.rem(15)};
    line-height: ${({ theme }) => theme.rem(20)};
    margin-bottom: ${({ theme }) => theme.rem(15)};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.xs}px) {
    text-align: justify;
  }
`;

const StyledBack = styled.a`
  color: ${({ theme }) => theme.colors.darkBlue};
  font-size: ${({ theme }) => theme.rem(14)};
  line-height: 1;
  opacity: 0.8;
  text-decoration: none;

  &:hover {
    opacity: 1;
    text-decoration: underline;
  }
`;

const StyledSuggest = styled.a`
  align-items: center;
  background: ${({ theme }) => theme.colors.blueLighter};
  border-radius: ${({ theme }) => theme.rem(5)};
  color: white;
  display: flex;
  font-size: ${({ theme }) => theme.rem(16)};
  height: ${({ theme }) => theme.rem(77)};
  justify-content: center;
  margin: ${({ theme }) => theme.rem(35)} auto;
  padding: 0 ${({ theme }) => theme.rem(35)};
  text-align: center;
  text-decoration: none;
  width: ${({ theme }) => theme.rem(210)};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}px) {
    display: inline-flex;
    height: ${({ theme }) => theme.rem(40)};
    width: auto;
    margin-top: ${({ theme }) => theme.rem(10)};
    padding: 0 ${({ theme }) => theme.rem(15)};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}px) {
    margin-bottom: ${({ theme }) => theme.rem(25)};
    margin-top: ${({ theme }) => theme.rem(15)};
  }
`;

export default Author;
