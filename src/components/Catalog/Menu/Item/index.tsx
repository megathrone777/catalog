import React, { useState, useEffect, SyntheticEvent } from "react";
import AnimateHeight from "react-animate-height";

import styled, { css } from "~/theme";
import SubItem from "./SubItem";
import { TMatchedCategory } from "~/components/Catalog";

export interface TMenuItem {
  id: string | string[];
  title: string;
  subCategories: TMenuItem[];
}

export interface TItem {
  itemId: string;
  itemTitle: string;
  itemSubCategories: TMenuItem[];
  itemCount: number | null;
  itemTotal: number | null;
  inactiveHidden: boolean;
  matchedCategories: TMatchedCategory[];
  toggleId: (id: string | string[]) => void;
  enableCategory: (id: string | string[]) => void;
  currentCategory: string | string[];
}

const Item = ({
  itemId,
  itemTitle,
  itemSubCategories,
  itemTotal,
  itemCount,
  inactiveHidden,
  matchedCategories: matches,
  toggleId,
  enableCategory,
  currentCategory
}: TItem): JSX.Element => {
  const [opened, toggleOpened] = useState<boolean>(false);
  const [matchedCategories, setMatchedCategories] = useState(matches);

  const handleClick = (): void => {
    toggleOpened(!opened);
  };

  const handleSelected = (
    event: SyntheticEvent<HTMLSpanElement, MouseEvent>
  ): void => {
    event.preventDefault();
    toggleId && toggleId(itemId);
    enableCategory && enableCategory(itemId);
  };

  const checkSelected = (
    itemCount: number | null,
    itemTotal: number | null
  ): boolean | null => {
    if (itemCount === null || itemTotal === null) return null;
    return itemCount === itemTotal;
  };

  const handleCategoryId = (id: string | string[]): void => {
    enableCategory && enableCategory(id);
  };

  const checkSubItems = () => {
    !!itemSubCategories.length &&
      itemSubCategories.map(
        ({ id: subItemId, subCategories: subItemTopics }: TMenuItem) => {
          const match = matchedCategories.find(
            (matchedCategory: TMatchedCategory): boolean => {
              return matchedCategory.id === subItemId;
            }
          );

          !!subItemTopics?.length &&
            subItemTopics.map(({ id: subItemId }: TMenuItem) => {
              const topicsMatch = matchedCategories.find(
                (matchedCategory: TMatchedCategory): boolean => {
                  return matchedCategory.id === subItemId;
                }
              );

              if (topicsMatch) {
                toggleOpened(true);
                return;
              }
            });

          if (match) {
            toggleOpened(true);
            return;
          }
        }
      );
  };

  useEffect(() => {
    setMatchedCategories(matches);
  }, [matches]);

  useEffect((): void => {
    checkSubItems();
  }, []);

  return (
    <StyledItem>
      <StyledItemHeading opened={opened}>
        <StyledItemIcon opened={opened}>
          <StyledItemIconHolder>
            <StyledSvgSymbol
              xmlns="http://www.w3.org/2000/svg"
              height="24"
              viewBox="0 0 24 24"
              width="24"
            >
              <StyledPathSymbol d="M0 0h24v24H0z" fill="none" />
              <StyledPathSymbol
                d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 
                  3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z"
                fill="currentColor"
              />
            </StyledSvgSymbol>
          </StyledItemIconHolder>
        </StyledItemIcon>

        <StyledArrowIcon onClick={handleClick} opened={opened} selected={checkSelected(itemCount, itemTotal)}>
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

        {itemTitle && <StyledItemText onClick={handleSelected} selected={checkSelected(itemCount, itemTotal)}>{itemTitle}{" "}{itemCount ? `(${itemCount}/` : ""}
          {itemTotal ? `${itemTotal})` : ""}</StyledItemText>}
      </StyledItemHeading>

      {itemSubCategories && !!itemSubCategories.length && (
        <AnimateHeight duration={200} height={opened ? "auto" : 0}>
          <StyledItemContent>
            <StyledItemList>
              {itemSubCategories.map(
                (
                  {
                    id: subItemId,
                    title: subItemTitle,
                    subCategories: subItemTopics
                  }: TMenuItem,
                  index: number
                ) => {
                  const subItemMatch:
                    | TMatchedCategory
                    | undefined = matchedCategories.find(
                      (matchedCategory: TMatchedCategory): boolean =>
                        matchedCategory.id === subItemId
                    );

                  return (
                    <SubItem
                      currentCategory={currentCategory}
                      enableCategory={(id: string | string[]) =>
                        handleCategoryId(id)
                      }
                      toggleId={(id: string | string[]) => toggleId(id)}
                      key={`${index}-${subItemId}`}
                      inactiveHidden={inactiveHidden}
                      isHidden={inactiveHidden && !subItemMatch}
                      subItemId={subItemId}
                      subItemCount={
                        subItemMatch !== undefined ? subItemMatch.count : null
                      }
                      subItemTotal={
                        subItemMatch !== undefined ? subItemMatch.total : null
                      }
                      subItemTitle={subItemTitle}
                      subItemTopics={subItemTopics}
                      matchedCategories={matchedCategories}
                    />
                  );
                }
              )}
            </StyledItemList>
          </StyledItemContent>
        </AnimateHeight>
      )}
    </StyledItem>
  );
};

const StyledItemIcon = styled.span<{
  opened: boolean;
}>`
	  align-items: center;
	  color: white;
	  display: flex;
	  height: ${({ theme }) => theme.rem(45)};
	  justify-content: center;
	  left: ${({ theme }) => theme.rem(-50)};
	  position: absolute;
	  width: ${({ theme }) => theme.rem(50)};
	
	  ${({ opened }) =>
    opened &&
    css`
        color: ${({ theme }) => theme.colors.orange};
      `}
	
	  @media (max-width: ${({ theme }) => theme.breakpoints.lg}px) {
		left: ${({ theme }) => theme.rem(-36)};
		width: ${({ theme }) => theme.rem(35)};
	  }
	
	  @media (max-width: ${({ theme }) => theme.breakpoints.md}px) {
		color: ${({ theme }) => theme.colors.orange};
		left: 0;
		width: ${({ theme }) => theme.rem(50)};
	  }
	`;

const StyledItemIconHolder = styled.i`
  display: inline-flex;
  width: ${({ theme }) => theme.rem(16)};
`;

const StyledArrowIcon = styled.i<{
  opened: boolean;
  selected: boolean | null;
}>`
	color: ${({ theme }) => theme.colors.grayLightest};
	display: block;
	height: ${({ theme }) => theme.rem(24)};
	left: ${({ theme }) => theme.rem(8)};
	position: absolute;
	top: 50%;
	transform: translateY(-50%) rotate(-90deg);
	width: ${({ theme }) => theme.rem(24)};
  
	${({ opened }) =>
    opened &&
    css`
      color: ${({ theme }) => theme.colors.darkBlue};
      transform: translateY(-50%) rotate(0deg);
    `}

  ${({ selected }) => selected && css`
    color: ${({ theme }) => theme.colors.red};
  `}

	@media (max-width: ${({ theme }) => theme.breakpoints.lg}px) {
	  left: ${({ theme }) => theme.rem(4)};
	}
  
	@media (max-width: ${({ theme }) => theme.breakpoints.md}px) {
	  left: ${({ theme }) => theme.rem(45)};
	}
  `;

const StyledItemText = styled.span<{
  selected: boolean | null;
}>`
  align-items: center;
  display: flex;
  height: 100%;
  width: 100%;

  ${({ selected }) => selected && css`
    color: ${({ theme }) => theme.colors.red};
  `}
`;

const StyledItemContent = styled.div`
  padding-bottom: ${({ theme }) => theme.rem(15)};
  padding-left: ${({ theme }) => theme.rem(60)};
  padding-top: ${({ theme }) => theme.rem(15)};
`;

const StyledItemList = styled.ul``;

const StyledItem = styled.div``;

const StyledItemHeading = styled.div<{
  opened: boolean;
}>`
  align-items: center;
  color: ${({ theme }) => theme.colors.darkBlue};
  cursor: pointer;
  display: flex;
  font-family: ${({ theme }) => theme.fonts.fontMedium};
  font-size: ${({ theme }) => theme.rem(15)};
  height: ${({ theme }) => theme.rem(45)};
  padding-left: ${({ theme }) => theme.rem(40)};
  position: relative;

  &:hover {
    background: ${({ theme }) => theme.colors.whiteDarker};

    ${StyledItemIcon} {
      color: ${({ theme }) => theme.colors.orange};
    }
  }

  ${({ opened }) =>
    opened &&
    css`
      background: ${({ theme }) => theme.colors.whiteDarker};
      font-family: ${({ theme }) => theme.fonts.fontBold};
    `};

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}px) {
    padding-left: ${({ theme }) => theme.rem(30)};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}px) {
    padding-left: ${({ theme }) => theme.rem(70)};
  }
`;

const StyledSvgSymbol = styled.svg`
  height: 100%;
  width: 100%;
`;

const StyledPathSymbol = styled.path``;

export default Item;
