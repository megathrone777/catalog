import React, { useState, SyntheticEvent } from "react";
import AnimateHeight from "react-animate-height";

import SubItem from "./SubItem";
import styled, { css } from "~/theme";

export interface TTopic {
  id: string | number;
  title: string;
}

export interface TSubcategory {
  id: string | number;
  title: string;
  subCategories: TTopic[];
  enableCategory: (id: string | number, title: string) => void;
}

export interface TCategory {
  id: string | number;
  title: string;
  subCategories: TSubcategory[];
  enableCategory: (id: string | number, title: string) => void;
}

const Item = ({
  enableCategory,
  id,
  title,
  subCategories
}: TCategory): JSX.Element => {
  const [linkOpened, toggleLinkOpened] = useState<boolean>(false);

  const handleLink = (event: SyntheticEvent<HTMLAnchorElement, MouseEvent>) => {
    event.preventDefault();
    toggleLinkOpened(!linkOpened);
    enableCategory(id, title);
  };

  const handleSubItemId = (
    subItemId: string | number,
    subItemTitle: string
  ): void => {
    enableCategory(subItemId, subItemTitle);
  };

  return (
    <StyledItem>
      <StyledLink opened={linkOpened} href="#" onClick={handleLink}>
        {title}
      </StyledLink>
      {subCategories && !!subCategories.length && (
        <AnimateHeight height={linkOpened ? "auto" : 0}>
          <StyledList>
            {subCategories.map(
              ({
                id: subItemId,
                title: subItemTitle,
                subCategories
              }: TSubcategory): JSX.Element => (
                <SubItem
                  key={subItemId}
                  id={subItemId}
                  title={subItemTitle}
                  subCategories={subCategories}
                  enableCategory={(topicId, topicTitle) =>
                    handleSubItemId(topicId, topicTitle)
                  }
                />
              )
            )}
          </StyledList>
        </AnimateHeight>
      )}
    </StyledItem>
  );
};

const StyledItem = styled.li`
  border-radius: ${({ theme }) => theme.rem(5)};
  border: 1px solid transparent;

  &:hover {
    border-color: ${({ theme }) => theme.colors.darkBlueLighter};
  }
`;

const StyledLink = styled.a<{
  opened: boolean;
}>`
  align-items: center;
  color: ${({ theme }) => theme.colors.grayDarker};
  display: flex;
  font-size: ${({ theme }) => theme.rem(16)};
  height: 100%;
  padding-left: ${({ theme }) => theme.rem(22)};
  position: relative;
  text-decoration: none;

  &::before {
    ${({ opened }) =>
      opened
        ? css`
            content: "-";
          `
        : css`
            content: "+";
          `}

    display: inline-block;
    left: ${({ theme }) => theme.rem(9)};
    line-height: ${({ theme }) => theme.rem(26)};
    min-width: ${({ theme }) => theme.rem(9)};
    position: absolute;
    text-align: center;
    top: 50%;
    transform: translateY(-50%);
  }
`;

const StyledList = styled.ul`
  margin-top: ${({ theme }) => theme.rem(3)};
`;

export default Item;
