import { css } from '~/theme';

const scrollbar = (): any => css`
  &::-webkit-scrollbar {
    width: ${({ theme }) => theme.rem(11)};
	cursor: grab;
  }

  &::-webkit-scrollbar-track {
    border-radius: ${({ theme }) => theme.rem(6)};
    border: ${({ theme }) => theme.rem(1)} solid #dbdce1;
	cursor: grabbing;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }): string => theme.colors.darkBlueLighter};
    border-radius: ${({ theme }) => theme.rem(6)};
	cursor: grab;
  }
`;

export default scrollbar;
