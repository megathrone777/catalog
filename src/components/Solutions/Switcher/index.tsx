import React from 'react';

import styled, { css } from '~/theme';

interface Props {
  isListView: boolean;
  onChange: (isList: boolean) => void;
}

const Switcher = ({ isListView, onChange }: Props): JSX.Element => (
  <StyledWrapper>
    <StyledButton
      isListView={!isListView}
      onClick={() => onChange(false)}
      type='button'
    >
      <StyledSvgSymbol
        focusable='false'
        role='img'
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 512 512'
      >
        <StyledPathSymbol
          fill='currentColor'
          d='M149.333 56v80c0 13.255-10.745 24-24 24H24c-13.255 0-24-10.745-24-24V56c0-13.255 10.745-24 24-24h101.333c13.255 0 
			24 10.745 24 24zm181.334 240v-80c0-13.255-10.745-24-24-24H205.333c-13.255 0-24 10.745-24 24v80c0 13.255 10.745 24 24 
			24h101.333c13.256 0 24.001-10.745 24.001-24zm32-240v80c0 13.255 10.745 24 24 24H488c13.255 0 24-10.745 
			24-24V56c0-13.255-10.745-24-24-24H386.667c-13.255 0-24 10.745-24 24zm-32 80V56c0-13.255-10.745-24-24-24H205.333c-13.255 
			0-24 10.745-24 24v80c0 13.255 10.745 24 24 24h101.333c13.256 0 24.001-10.745 24.001-24zm-205.334 56H24c-13.255 0-24 
			10.745-24 24v80c0 13.255 10.745 24 24 24h101.333c13.255 0 24-10.745 24-24v-80c0-13.255-10.745-24-24-24zM0 376v80c0 
			13.255 10.745 24 24 24h101.333c13.255 0 24-10.745 24-24v-80c0-13.255-10.745-24-24-24H24c-13.255 0-24 10.745-24 
			24zm386.667-56H488c13.255 0 24-10.745 24-24v-80c0-13.255-10.745-24-24-24H386.667c-13.255 0-24 10.745-24 24v80c0 
			13.255 10.745 24 24 24zm0 160H488c13.255 0 24-10.745 24-24v-80c0-13.255-10.745-24-24-24H386.667c-13.255 0-24 
			10.745-24 24v80c0 13.255 10.745 24 24 24zM181.333 376v80c0 13.255 10.745 24 24 24h101.333c13.255 0 24-10.745 
			24-24v-80c0-13.255-10.745-24-24-24H205.333c-13.255 0-24 10.745-24 24z'
        />
      </StyledSvgSymbol>
      <StyledTooltip>grid view</StyledTooltip>
    </StyledButton>

    <StyledButton
      isListView={isListView}
      onClick={() => onChange(true)}
      type='button'
    >
      <StyledSvgSymbol
        focusable='false'
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 512 512'
      >
        <StyledPathSymbol
          fill='currentColor'
          d='M149.333 216v80c0 13.255-10.745 24-24 24H24c-13.255 0-24-10.745-24-24v-80c0-13.255 10.745-24 24-24h101.333c13.255 0 24 
			10.745 24 24zM0 376v80c0 13.255 10.745 24 24 24h101.333c13.255 0 24-10.745 24-24v-80c0-13.255-10.745-24-24-24H24c-13.255 0-24 10.745-24 24zM125.333 
			32H24C10.745 32 0 42.745 0 56v80c0 13.255 10.745 24 24 24h101.333c13.255 0 24-10.745 24-24V56c0-13.255-10.745-24-24-24zm80 448H488c13.255 0 
			24-10.745 24-24v-80c0-13.255-10.745-24-24-24H205.333c-13.255 0-24 10.745-24 24v80c0 13.255 10.745 24 24 24zm-24-424v80c0 13.255 10.745 24 24 
			24H488c13.255 0 24-10.745 24-24V56c0-13.255-10.745-24-24-24H205.333c-13.255 0-24 10.745-24 24zm24 264H488c13.255 0 24-10.745 
			24-24v-80c0-13.255-10.745-24-24-24H205.333c-13.255 0-24 10.745-24 24v80c0 13.255 10.745 24 24 24z'
        />
      </StyledSvgSymbol>
      <StyledTooltip>list view</StyledTooltip>
    </StyledButton>
  </StyledWrapper>
);

const StyledWrapper = styled.div`
  display: flex;
  flex: 1;
  justify-content: flex-end;
  padding-right: ${({ theme }) => theme.rem(35)};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}px) {
    display: none;
  }
`;

const StyledTooltip = styled.span`
  background: ${({ theme }) => theme.colors.grayDarker};
  border-radius: ${({ theme }) => theme.rem(5)};
  bottom: calc(100% + 5px);
  color: white;
  display: inline-block;
  font-size: ${({ theme }) => theme.rem(11)};
  height: ${({ theme }) => theme.rem(18)};
  line-height: ${({ theme }) => theme.rem(18)};
  opacity: 0;
  padding: 0 ${({ theme }) => theme.rem(9)};
  position: absolute;
  text-align: center;
  transition: all 0.2s ease-in;
  transform: translateX(calc(-50% + -12px)) translateY(5px);
  white-space: nowrap;

  &::after {
    content: '';
    background: url('/images/tooltip_bg.png') center center no-repeat;
    display: block;
    width: ${({ theme }) => theme.rem(8)};
    height: ${({ theme }) => theme.rem(5)};
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: ${({ theme }) => theme.rem(-4)};
  }
`;

const StyledButton = styled.button<{
  isListView: boolean;
}>`
  background: transparent;
  border: none;
  color: ${({ isListView, theme }) =>
    isListView ? theme.colors.orange : theme.colors.grayLightest};
  cursor: pointer;
  display: block;
  height: ${({ theme }) => theme.rem(20)};
  padding: 0;
  position: relative;
  width: ${({ theme }) => theme.rem(20)};
  margin-left: ${({ theme }) => theme.rem(15)};

  &:first-of-type {
    margin-left: 0;
  }

  &:focus {
    outline: none;
  }

  ${css`
    &:hover ${StyledTooltip} {
      opacity: 1;
      transform: translateX(calc(-50% + -10px)) translateY(0);
    }
  `}
`;

const StyledSvgSymbol = styled.svg`
  height: 100%;
  width: 100%;
`;
const StyledPathSymbol = styled.path``;

export default Switcher;
