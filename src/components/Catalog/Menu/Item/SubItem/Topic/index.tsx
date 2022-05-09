import React, { SyntheticEvent } from "react";

import styled, { css } from "~/theme";

export interface TTopic {
  isHidden: boolean;
  topicId: string | string[];
  topicTitle: string;
  topicCount: number | null;
  topicTotal: number | null;
  toggleId: (id: string | string[]) => void;
  enableCategory: (id: string | string[]) => void;
  currentCategory: string | string[];
}

const Topic = ({
  isHidden,
  topicId,
  toggleId,
  topicTitle,
  topicCount,
  topicTotal,
  enableCategory,
  currentCategory
}: TTopic): JSX.Element => {
  const handleSelected = (
    event: SyntheticEvent<HTMLSpanElement, MouseEvent>
  ): void => {
    event.preventDefault();
    toggleId && toggleId(topicId);
    enableCategory && enableCategory(topicId);
  };

  const checkHighlighted = (
    topicCount: number | null,
    topicTotal: number | null
  ): boolean | null => {
    if (topicCount === null || topicTotal === null) return null;
    return topicCount < topicTotal;
  };

  const checkSelected = (
    topicCount: number | null,
    topicTotal: number | null
  ): boolean | null => {
    if (topicCount === null || topicTotal === null) return null;
    return topicCount === topicTotal;
  };

  return (
    <StyledWrapper isHidden={isHidden}>
      <StyledLink
        href="#"
        onClick={handleSelected}
        selected={checkSelected(topicCount, topicTotal)}
        highlighted={checkHighlighted(topicCount, topicTotal)}
      >
        <StyledArrowIcon
          selected={checkSelected(topicCount, topicTotal)}
          highlighted={checkHighlighted(topicCount, topicTotal)}
        >
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
        </StyledArrowIcon>
        {topicTitle && (
          <StyledText underlined={currentCategory === topicId}>
            {topicTitle} {topicCount ? `(${topicCount}/` : ""}
            {topicTotal ? `${topicTotal})` : ""}
          </StyledText>
        )}
      </StyledLink>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.li<{
  isHidden: boolean;
}>`
  margin-bottom: ${({ theme }) => theme.rem(8)};

  ${({ isHidden }) =>
    isHidden &&
    `
	display: none;
  `};
`;

const StyledSvgSymbol = styled.svg`
  height: 100%;
  width: 100%;
`;

const StyledPathSymbol = styled.path``;

const StyledArrowIcon = styled.i<{
  selected: boolean | null;
  highlighted: boolean | null;
}>`
  color: ${({ theme }) => theme.colors.darkBlue};
  display: block;
  height: ${({ theme }) => theme.rem(24)};
  left: ${({ theme }) => theme.rem(-8)};
  position: absolute;
  top: 50%;
  transform: translateY(-50%) rotate(-90deg);
  width: ${({ theme }) => theme.rem(24)};

  ${({ highlighted, selected }) =>
    selected
      ? css`
          color: ${({ theme }) => theme.colors.red};
          text-shadow: 0 0 1px ${({ theme }) => theme.colors.red};
        `
      : highlighted === null
      ? css`
          color: ${({ theme }) => theme.colors.darkBlue};
          text-shadow: 0 0 1px ${({ theme }) => theme.colors.darkBlue};
        `
      : highlighted &&
        css`
          color: ${({ theme }) => theme.colors.orange};
          text-shadow: 0 0 1px ${({ theme }) => theme.colors.orange};
        `}
`;

const StyledLink = styled.a<{
  selected: boolean | null;
  highlighted: boolean | null;
}>`
  color: ${({ theme }) => theme.colors.darkBlue};
  font-size: ${({ theme }) => theme.rem(15)};
  padding-left: ${({ theme }) => theme.rem(15)};
  position: relative;
  text-decoration: none;
  text-shadow: 0 0 1px ${({ theme }) => theme.colors.darkBlue};

  &:hover {
    text-decoration: underline;
  }

  ${({ highlighted, selected }) =>
    selected
      ? css`
          color: ${({ theme }) => theme.colors.red};
          text-shadow: 0 0 1px ${({ theme }) => theme.colors.red};
        `
      : highlighted === null
      ? css`
          color: ${({ theme }) => theme.colors.darkBlue};
          text-shadow: 0 0 1px ${({ theme }) => theme.colors.darkBlue};
        `
      : highlighted &&
        css`
          color: ${({ theme }) => theme.colors.orange};
          text-shadow: 0 0 1px ${({ theme }) => theme.colors.orange};
        `}
`;

const StyledText = styled.span<{
  underlined: boolean;
}>`
  border-bottom: 2px solid transparent;

  ${({ underlined }) =>
    underlined &&
    `
  border-bottom-color: inherit;
`}
`;

export default Topic;
