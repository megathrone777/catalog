import React from "react";

import styled, { css, keyframes } from "~/theme";

interface Props {
  small?: boolean;
  transparent?: boolean;
}

const Loader = ({ small, transparent }: Props): JSX.Element => (
  <StyledWrapper transparent={transparent}>
    <StyledLoader small={small} />
  </StyledWrapper>
);

const rotateLoader = keyframes`
	from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(359deg);
    }
`;

const StyledWrapper = styled.div<Props>`
  background: ${({ transparent }) =>
    transparent ? "transparent" : "rgba(255, 255, 255, 0.9)"};
  bottom: 0;
  display: block;
  height: 100%;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
  width: 100%;
  z-index: 999999;
`;

const StyledLoader = styled.div<Props>`
  animation: ${rotateLoader} 2s infinite linear;
  border-radius: 50%;
  border: 8px rgba(245, 155, 0, 0.25) solid;
  border-top: 8px orange solid;
  display: block;
  height: ${({ small }) =>
    small
      ? css`
          ${({ theme }) => theme.rem(40)}
        `
      : css`
          ${({ theme }) => theme.rem(62)}
        `};
  left: 50%;
  margin-left: ${({ theme }) => theme.rem(-31)};
  margin-top: ${({ theme }) => theme.rem(-31)};
  position: absolute;
  top: 50%;
  width: ${({ small }) =>
    small
      ? css`
          ${({ theme }) => theme.rem(40)}
        `
      : css`
          ${({ theme }) => theme.rem(62)}
        `};
`;

export default Loader;
