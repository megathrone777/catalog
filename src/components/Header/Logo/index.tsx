import React from "react";
import Link from "next/link";

import styled from "~/theme";

const Logo: React.FC = (): JSX.Element => (
  <StyledWrapper>
    <Link href="/" as="/" passHref>
      <StyledLink>Logo</StyledLink>
    </Link>
  </StyledWrapper>
);

const StyledWrapper = styled.div`
  flex: 0 1 ${({ theme }) => theme.rem(390)};
  padding-left: ${({ theme }) => theme.rem(22)};
  position: relative;
  z-index: 300;

  @media (max-width: ${({ theme }) => theme.breakpoints.xs}px) {
    flex: 0 1 ${({ theme }) => theme.rem(200)};
    padding-left: 0;
  }
`;

const StyledLink = styled.a`
  color: ${({ theme }) => theme.colors.whiteLighter};
  font-size: ${({ theme }) => theme.rem(40)};
  text-decoration: none;
  text-transform: uppercase;
`;

export default Logo;
