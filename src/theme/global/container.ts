import styled from '~/theme';

const StyledContainer = styled.div`
  height: 100%;
  margin: 0 auto;
  max-width: ${({ theme }) => theme.rem(1430)};
  padding: 0 ${({ theme }) => theme.rem(10)};
`;

export default StyledContainer;
