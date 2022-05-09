import React, { useState, useRef, useEffect, SyntheticEvent } from "react";

import scrollbar from "~/theme/mixins/scrollbar";
import styled, { css } from "~/theme";
import Item, { TCategory } from "./Item";

interface Props {
  categories: TCategory[];
  currentId: string | number;
  enableCategory: (id: string | number) => void;
}

const HeadingMenu = ({
  currentId,
  enableCategory,
  categories
}: Props): JSX.Element => {
  const [opened, toggleOpened] = useState<boolean>(false);
  const [currentTitle, setCurrentTitle] = useState<string>(categories[0].title);
  const wrapperEl = useRef<HTMLDivElement>(null);

  const handleMenu = (
    event: SyntheticEvent<HTMLAnchorElement | HTMLButtonElement, MouseEvent>
  ): void => {
    event.preventDefault();
    toggleOpened(!opened);
  };

  const handleTitle = (id: string | number, title: string): void => {
    enableCategory(id);
    setCurrentTitle(title);
  };

  useEffect((): void => {
    fetch(`http://10.10.45.10/api/category/${currentId}`)
      .then(response => response.json())
	  .then(data => setCurrentTitle(data.title));
  }, [currentId]);

  useEffect((): void => {
    document.addEventListener("click", (event: MouseEvent): void => {
      if (
        wrapperEl.current &&
        wrapperEl.current &&
        event.target instanceof HTMLElement
      ) {
        const isClickInside = wrapperEl.current.contains(event.target);

        if (!isClickInside) {
          toggleOpened(false);
        }
      }
    });
  }, []);

  return (
    <StyledWrapper ref={wrapperEl}>
      <StyledHeadingButton onClick={handleMenu} opened={opened} type="button">
        <StyledHeadingIcon>
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
        </StyledHeadingIcon>
        {currentTitle}
        <StyledHeadingArrow>
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
        </StyledHeadingArrow>
      </StyledHeadingButton>

      <StyledHeadingBranch href="#">Создать подветку</StyledHeadingBranch>

      <StyledContent opened={opened}>
        {categories && !!categories.length && (
          <StyledList>
            {categories.map(
              ({ id, title, subCategories }: TCategory): JSX.Element => (
                <Item
                  key={id}
                  id={id}
                  title={title}
                  subCategories={subCategories}
                  enableCategory={(id: string | number, title: string) =>
                    handleTitle(id, title)
                  }
                />
              )
            )}
          </StyledList>
        )}

        <StyledOptions>
          <StyledOptionsLink href="#">Создать раздел</StyledOptionsLink>
          <StyledOptionsLink href="#" onClick={handleMenu}>
            Выбрать
          </StyledOptionsLink>
        </StyledOptions>
      </StyledContent>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const StyledContent = styled.div<{ opened: boolean }>`
  background: ${({ theme }) => theme.colors.whiteLighter};
  border-bottom-left-radius: ${({ theme }) => theme.rem(10)};
  border-bottom-right-radius: ${({ theme }) => theme.rem(10)};
  max-width: ${({ theme }) => theme.rem(260)};
  opacity: 0;
  position: absolute;
  top: ${({ theme }) => theme.rem(50)};
  visibility: hidden;
  width: 100%;
  z-index: 5;

  ${({ opened }) =>
    opened &&
    `
		visibility: visible;
		opacity: 1;
  `}
  
  @media (max-width: ${({ theme }) => theme.breakpoints.xs}px) {
    top: ${({ theme }) => theme.rem(40)};
  }
`;

const StyledList = styled.ul`
  margin-bottom: ${({ theme }) => theme.rem(15)};
  max-height: ${({ theme }) => theme.rem(140)};
  min-height: ${({ theme }) => theme.rem(24)};
  overflow-y: auto;
  padding-left: ${({ theme }) => theme.rem(5)};
  padding-right: ${({ theme }) => theme.rem(15)};

  ${scrollbar};
`;

const StyledOptions = styled.div`
  display: flex;
  height: ${({ theme }) => theme.rem(35)};
  justify-content: space-between;
  padding: 0 ${({ theme }) => theme.rem(14)};
`;

const StyledOptionsLink = styled.a`
  color: #4a4a4b;
  font-family: ${({ theme }) => theme.fonts.fontBold};
  font-size: ${({ theme }) => theme.rem(14)};
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const StyledHeadingBranch = styled.a`
  color: ${({ theme }) => theme.colors.white};
  font-family: ${({ theme }) => theme.fonts.font};
  font-size: ${({ theme }) => theme.rem(14)};
  text-decoration: none;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}px) {
    text-align: center;
    text-decoration: underline;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.xs}px) {
    margin-bottom: ${({ theme }) => theme.rem(15)};
  }

  &:hover {
    text-decoration: underline;
  }
`;

const StyledHeadingIcon = styled.i`
  color: #f1f3f7;
  display: block;
  height: ${({ theme }) => theme.rem(24)};
  width: ${({ theme }) => theme.rem(24)};
  left: ${({ theme }) => theme.rem(10)};
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
`;

const StyledHeadingArrow = styled.i`
  color: white;
  display: inline-block;
  height: ${({ theme }) => theme.rem(24)};
  margin-left: ${({ theme }) => theme.rem(10)};
  transform-origin: 50% 50%;
  transition: transform 0.2s ease-in;
  width: ${({ theme }) => theme.rem(24)};
  position: absolute;
  top: 52%;
  transform: translateY(-50%) rotate(90deg);
`;

const StyledSvgSymbol = styled.svg`
  height: 100%;
  width: 100%;
`;

const StyledPathSymbol = styled.path``;

const StyledHeadingButton = styled.button<{
  opened: boolean;
}>`
  align-items: center;
  appearance: none;
  background: ${({ opened }) =>
    opened ? ({ theme }) => theme.colors.whiteLighter : "none"};
  border-top-left-radius: ${({ theme }) => theme.rem(10)};
  border-top-right-radius: ${({ theme }) => theme.rem(10)};
  border: none;
  color: ${({ theme }) => theme.colors.blueLighter};
  cursor: pointer;
  display: block;
  font-family: ${({ theme }) => theme.fonts.font};
  font-size: ${({ theme }) => theme.rem(15)};
  height: ${({ theme }) => theme.rem(40)};
  line-height: ${({ theme }) => theme.rem(40)};
  margin-right: ${({ theme }) => theme.rem(30)};
  padding-left: ${({ theme }) => theme.rem(40)};
  position: relative;
  text-align: left;
  white-space: nowrap;
  width: ${({ theme }) => theme.rem(260)};

  ${({ opened }) =>
    opened &&
    css`
      ${StyledHeadingIcon}, ${StyledHeadingArrow} {
        color: ${({ theme }) => theme.colors.darkBlueLighter};
      }

      ${StyledHeadingArrow} {
        transform: translateY(-50%) rotate(0);
      }
    `};

  &:focus {
    outline: none;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.xs}px) {
    margin-bottom: ${({ theme }) => theme.rem(10)};
    margin-right: 0;
  }
`;

export default HeadingMenu;
