import React from 'react';

import styled from '~/theme';
import InputBox from './InputBox';

const Name: React.FC = (): JSX.Element => {
  return (
    <StyledWrapper>
      <InputBox />
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  align-items: center;
  border-left: ${({ theme }) => theme.rem(1)} solid #545e84;
  border-right: ${({ theme }) => theme.rem(1)} solid #383d53;
  display: flex;
  padding: 0 ${({ theme }) => theme.rem(10)};
  width: 22%;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}px) {
    border-left: none;
    border-right: none;
    flex: 0 1 50%;
    padding-left: ${({ theme }) => theme.rem(5)};
    padding-right: 0;
    width: 50%;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.xs}px) {
    flex: 0 1 100%;
    padding-left: 0;
    width: 100%;
  }
`;

export default Name;
