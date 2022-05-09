import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import styled from "~/theme";
import Container from "~/theme/global/container";

interface Props {
  solution?: string;
}

const Breadcrumbs = ({ solution }: Props): JSX.Element => {
  const router = useRouter();
  const { asPath, query } = router;
  const { id } = query;
  const text =
    id && id?.length
      ? asPath.replace(`/${id}`, "").replace("/", "")
      : asPath.replace("/", "");

  return (
    <StyledWrapper>
      <Container>
        <StyledList>
          <StyledItem>
            <Link href="/" as="/" passHref>
              <StyledLink>Main page</StyledLink>
            </Link>
          </StyledItem>
          <StyledItem>
            <StyledText>{text}</StyledText>
          </StyledItem>
          {solution && (
            <StyledItem>
              <StyledText>{solution}</StyledText>
            </StyledItem>
          )}
        </StyledList>
      </Container>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  background: ${({ theme }) => theme.colors.whiteDarker};
  height: ${({ theme }) => theme.rem(48)};
`;

const StyledList = styled.ul`
  align-items: center;
  display: flex;
  height: 100%;
  margin-left: ${({ theme }) => theme.rem(22)};

  @media (max-width: ${({ theme }) => theme.breakpoints.xs}px) {
    margin-left: 0;
  }
`;

const StyledItem = styled.li`
  &::after {
    content: "/";
    color: ${({ theme }) => theme.colors.grayDarker};
    display: inline-block;
    margin: 0 ${({ theme }) => theme.rem(5)};
  }

  &:last-of-type::after {
    display: none;
  }
`;

const StyledLink = styled.a`
  color: ${({ theme }) => theme.colors.grayLighter};
  cursor: pointer;
  font-size: ${({ theme }) => theme.rem(14)};
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const StyledText = styled.span`
  color: ${({ theme }) => theme.colors.grayDarker};
  font-size: ${({ theme }) => theme.rem(14)};
  text-shadow: 0 0 1px ${({ theme }) => theme.colors.grayDarker};
  text-transform: capitalize;
`;

export default Breadcrumbs;
