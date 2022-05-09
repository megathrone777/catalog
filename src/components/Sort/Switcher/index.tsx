import React from "react";

import styled from "~/theme";

interface Props {
  switcherField: string | string[];
  text: string;
  enabled: boolean;
  enableSwitcher: (
    switcherField: string | string[],
    ordering: string | string[]
  ) => void;
}

const Switcher = ({
  enabled,
  enableSwitcher,
  switcherField,
  text
}: Props): JSX.Element => {
  const handleClick = () => {
    enableSwitcher(switcherField, "DESC");

    if (enabled) {
      enableSwitcher("", "ASC");
    }
  };

  return (
    <StyledWrapper onClick={handleClick}>
      <StyledIcon enabled={enabled}>
        <StyledSvgSymbol
          xmlns="http://www.w3.org/2000/svg"
          height="24"
          viewBox="0 0 24 24"
          width="24"
        >
          <StyledPathSymbol d="M0 0h24v24H0V0z" fill="none" />
          <StyledPathSymbol
            fill="currentColor"
            d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"
          />
        </StyledSvgSymbol>
      </StyledIcon>
      {text}
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  align-items: center;
  border-left: ${({ theme }) => theme.rem(1)} solid #545e84;
  border-right: ${({ theme }) => theme.rem(1)} solid #383d53;
  color: white;
  cursor: pointer;
  display: flex;
  padding-left: ${({ theme }) => theme.rem(35)};
  position: relative;
  width: 12.5%;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}px) {
    font-size: ${({ theme }) => theme.rem(15)};
    padding-left: ${({ theme }) => theme.rem(25)};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}px) {
    border-left: none;
    border-right: none;
    height: ${({ theme }) => theme.rem(50)};
    min-width: 100px;
    width: auto;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.xs}px) {
    width: 32%;
    min-width: 0;
  }
`;

const StyledIcon = styled.i<{
  enabled: boolean;
}>`
  color: white;
  display: block;
  height: ${({ theme }) => theme.rem(24)};
  left: ${({ theme }) => theme.rem(8)};
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: ${({ theme }) => theme.rem(24)};

  ${({ enabled, theme }) =>
    enabled &&
    `
	  color: ${theme.colors.orange};
	  transform: translateY(-50%) rotate(180deg);
  `}
  
  @media (max-width: ${({ theme }) => theme.breakpoints.lg}px) {
    left: ${({ theme }) => theme.rem(0)};
  }
`;

const StyledSvgSymbol = styled.svg`
  height: 100%;
  width: 100%;
`;

const StyledPathSymbol = styled.path``;

export default Switcher;
