import React, { useState, SyntheticEvent, useEffect } from "react";
import AnimateHeight from "react-animate-height";

import styled, { css } from "~/theme";
import Topic from "./Topic";
import { TMenuItem } from "../";
import { TMatchedCategory } from "~/components/Catalog";

export interface TSubItem {
  inactiveHidden: boolean;
  isHidden: boolean;
  subItemId: string | string[];
  subItemTitle: string;
  subItemTopics: TMenuItem[];
  subItemCount: number | null;
  subItemTotal: number | null;
  matchedCategories: TMatchedCategory[];
  toggleId: (id: string | string[]) => void;
  enableCategory: (id: string | string[]) => void;
  currentCategory: string | string[];
}

const SubItem = ({
  inactiveHidden,
  isHidden,
  subItemId,
  toggleId,
  subItemTitle,
  subItemCount,
  subItemTopics,
  subItemTotal,
  matchedCategories,
  enableCategory,
  currentCategory
}: TSubItem): JSX.Element => {
  const [opened, toggleOpened] = useState<boolean>(false);

  const handleClick = (
    event: SyntheticEvent<HTMLElement, MouseEvent>
  ): void => {
    event.preventDefault();
    toggleOpened(!opened);
  };

  const handleSelected = (
    event: SyntheticEvent<HTMLSpanElement, MouseEvent>
  ): void => {
    event.preventDefault();
    toggleId && toggleId(subItemId);
    enableCategory && enableCategory(subItemId);
  };

  const handleCategoryId = (id: string | string[]): void => {
    enableCategory && enableCategory(id);
  };

  const checkTopics = () => {
    !!subItemTopics?.length &&
      subItemTopics.map(({ id: subItemId }: TMenuItem) => {
        const match = matchedCategories.find(
          (matchedCategory: TMatchedCategory): boolean => {
            return matchedCategory.id === subItemId;
          }
        );

        if (match) {
          toggleOpened(true);
          return;
        }
      });
  };

  const checkHighlighted = (
    subItemCount: number | null,
    subItemTotal: number | null
  ): boolean | null => {
    if (subItemCount === null || subItemTotal === null) return null;
    return subItemCount < subItemTotal;
  };

  const checkSelected = (
    subItemCount: number | null,
    subItemTotal: number | null
  ): boolean | null => {
    if (subItemCount === null || subItemTotal === null) return null;
    return subItemCount === subItemTotal;
  };

  useEffect((): void => {
    checkTopics();
  }, []);

  return (
    <StyledContentItem>
      {!isHidden && (
        <StyledContentLink
          href="#"
          selected={checkSelected(subItemCount, subItemTotal)}
          highlighted={checkHighlighted(subItemCount, subItemTotal)}
        >
          <StyledArrowIcon onClick={handleClick} opened={opened}>
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
          <StyledContentLinkText
            onClick={handleSelected}
            underlined={currentCategory === subItemId}
          >
            {subItemTitle} {subItemCount ? `(${subItemCount}/` : ""}
            {subItemTotal ? `${subItemTotal})` : ""}
          </StyledContentLinkText>
        </StyledContentLink>
      )}

      {subItemTopics && !!subItemTopics?.length && (
        <AnimateHeight duration={200} height={opened ? "auto" : 0}>
          <StyledContentItemList>
            {subItemTopics.map(
              (
                { id: topicId, title: topicTitle }: TMenuItem,
                index: number
              ): JSX.Element => {
                const topicMatch:
                  | TMatchedCategory
                  | undefined = matchedCategories.find(
                  (matchedCategory: TMatchedCategory) =>
                    matchedCategory.id === topicId
                );

                return (
                  <Topic
                    key={`${index}-${topicId}`}
                    currentCategory={currentCategory}
                    enableCategory={(id: string | string[]) =>
                      handleCategoryId(id)
                    }
                    toggleId={(id: string | string[]) => toggleId(id)}
                    isHidden={inactiveHidden && !topicMatch}
                    topicId={topicId}
                    topicTitle={topicTitle}
                    topicCount={
                      topicMatch !== undefined ? topicMatch.count : null
                    }
                    topicTotal={
                      topicMatch !== undefined ? topicMatch.total : null
                    }
                  />
                );
              }
            )}
          </StyledContentItemList>
        </AnimateHeight>
      )}
    </StyledContentItem>
  );
};

const StyledContentItem = styled.li``;

const StyledSvgSymbol = styled.svg`
  height: 100%;
  width: 100%;
`;

const StyledPathSymbol = styled.path``;

const StyledArrowIcon = styled.i<{
  opened?: boolean;
}>`
  color: ${({ theme }) => theme.colors.grayLightest};
  display: block;
  height: ${({ theme }) => theme.rem(24)};
  color: inherit;
  left: ${({ theme }) => theme.rem(-25)};
  position: absolute;
  top: 50%;
  transform: translateY(-50%) rotate(-90deg);
  width: ${({ theme }) => theme.rem(24)};

  ${({ opened }) =>
    opened &&
    `
		transform: translateY(-50%) rotate(0deg);
	`}
`;

const StyledContentLink = styled.a<{
  selected: boolean | null;
  highlighted: boolean | null;
}>`
  align-items: center;
  color: ${({ theme }) => theme.colors.darkBlue};
  display: flex;
  font-size: ${({ theme }) => theme.rem(15)};
  margin-bottom: ${({ theme }) => theme.rem(10)};
  position: relative;
  text-decoration: none;
  text-shadow: 0 0 1px ${({ theme }) => theme.colors.darkBlue};

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

const StyledContentLinkText = styled.span<{
  underlined: boolean;
}>`
  align-items: center;
  border-bottom: 2px solid transparent;
  display: inline-flex;
  height: 100%;

  ${({ underlined }) =>
    underlined &&
    `
border-bottom-color: inherit;
`}
`;

const StyledContentItemList = styled.ul``;

export default SubItem;
