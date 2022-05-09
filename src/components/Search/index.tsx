import React from 'react';

import SearchBox from './SearchBox';
import Filter from './Filter';
import styled from '~/theme';
import StyledContainer from '~/theme/global/container';

const Search: React.FC = (): JSX.Element => {
  return (
    <StyledWrapper>
      <StyledContainer>
        <StyledLayout>
          <StyledColLeft />
  
          <StyledColRight>
            <SearchBox />
            <Filter />
          </StyledColRight>
        </StyledLayout>
      </StyledContainer>
    </StyledWrapper>
  );
}


const StyledWrapper = styled.div`
  background: ${({ theme }) => theme.colors.whiteDarker};
  border-top: ${({ theme }) => theme.rem(1)} solid
    ${({ theme }) => theme.colors.white};
  height: ${({ theme }) => theme.rem(90)};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}px) {
    height: auto;
    padding-bottom: ${({ theme }) => theme.rem(10)};
    padding-top: ${({ theme }) => theme.rem(10)};
  }
`;

const StyledLayout = styled.div`
  display: flex;
  height: 100%;
  justify-content: space-between;
  padding-top: ${({ theme }) => theme.rem(28)};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}px) {
    padding-top: 0;
  }
`;

const StyledColLeft = styled.div`
  flex: 0 1 ${({ theme }) => theme.rem(390)};
  margin-right: ${({ theme }) => theme.rem(5)};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}px) {
    flex: auto;
    display: none;
  }
`;

const StyledColRight = styled.div`
  display: flex;
  flex: 0 1 ${({ theme }) => theme.rem(960)};
  margin-left: ${({ theme }) => theme.rem(5)};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}px) {
    flex: auto;
    margin-left: 0;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.xs}px) {
    flex-direction: column;
  }
`;

export default Search;
