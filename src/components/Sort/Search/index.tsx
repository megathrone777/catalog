import React from 'react';

import SearchBox from './SearchBox';
import styled from '~/theme';

const Search: React.FC = (): JSX.Element => {
  return (
    <StyledWrapper>
      <SearchBox />
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  align-items: center;
  border-right: ${({ theme }) => theme.rem(1)} solid #383d53;
  display: flex;
  padding-left: ${({ theme }) => theme.rem(6)};
  padding-right: ${({ theme }) => theme.rem(6)};
  width: 40%;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}px) {
    border-right: none;
    padding-left: 0;
    padding-right: ${({ theme }) => theme.rem(5)};
    width: 50%;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.xs}px) {
    margin-bottom: ${({ theme }) => theme.rem(10)};
    padding-right: 0;
    width: 100%;
  }
`;

export default Search;
