import React, { useState, SyntheticEvent } from "react";
import AnimateHeight from "react-animate-height";

import styled, { css } from "~/theme";
import { TSubcategory, TTopic } from "../";

const SubItem = ({
  enableCategory,
  id,
  title,
  subCategories
}: TSubcategory): JSX.Element => {
  const [opened, toggleOpened] = useState<boolean>(false);
  const handleClick = (
    event: SyntheticEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    event.preventDefault();
    toggleOpened(!opened);
    enableCategory(id, title);
  };

  const handleTopicClick = (
    event: SyntheticEvent<HTMLAnchorElement, MouseEvent>,
    topicId: string | number,
    topicTitle: string
  ) => {
    event.preventDefault();

    enableCategory(topicId, topicTitle);
  };

  return (
    <StyledItem>
      <StyledLink
        href="#"
        onClick={event => handleClick(event)}
        opened={opened}
      >
        {title}
      </StyledLink>
      {subCategories && !!subCategories.length && (
        <AnimateHeight height={opened ? "auto" : 0} duration={200}>
          <StyledList>
            {subCategories.map(
              ({ id: topicId, title: topicTitle }: TTopic): JSX.Element => (
                <StyledListItem key={topicId}>
                  <StyledListLink
                    href="#"
                    onClick={(
                      event: SyntheticEvent<HTMLAnchorElement, MouseEvent>
                    ) => handleTopicClick(event, topicId, topicTitle)}
                  >
                    {topicTitle}
                  </StyledListLink>
                </StyledListItem>
              )
            )}
          </StyledList>
        </AnimateHeight>
      )}
    </StyledItem>
  );
};

const StyledItem = styled.li`
  margin-bottom: ${({ theme }) => theme.rem(4)};
`;

const StyledLink = styled.a<{ opened: boolean }>`
  color: ${({ theme }) => theme.colors.blueLighter};
  font-family: ${({ theme }) => theme.fonts.font};
  font-size: ${({ theme }) => theme.rem(15)};
  padding-left: ${({ theme }) => theme.rem(35)};
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
    left: ${({ theme }) => theme.rem(22)};
    line-height: ${({ theme }) => theme.rem(26)};
    min-width: ${({ theme }) => theme.rem(9)};
    position: absolute;
    text-align: center;
    top: 50%;
    transform: translateY(-50%);
  }

  &:hover {
    text-decoration: underline;
  }

  &:focus {
    color: ${({ theme }) => theme.colors.orange};
  }
`;

const StyledList = styled.ul``;

const StyledListItem = styled.li`
  margin-bottom: ${({ theme }) => theme.rem(4)};
`;

const StyledListLink = styled.a`
  color: #4a4a4b;
  font-family: ${({ theme }) => theme.fonts.fontBold};
  font-size: ${({ theme }) => theme.rem(14)};
  margin-left: ${({ theme }) => theme.rem(45)};
  text-decoration: none;

  &:hover,
  &:focus {
    text-decoration: underline;
  }

  &:focus {
    color: ${({ theme }) => theme.colors.orange};
  }
`;

export default SubItem;
