import React, { useRef, useEffect, SyntheticEvent } from "react";
import autosize from "autosize";

import styled, { css } from "~/theme";

export interface TEditor {
  id?: string | number;
  add?: () => void;
  onKeyDown?: () => void;
  placeholder: string | null;
  questionsAmount: number | null;
  remove?: () => void;
  update?: (content: string, number: number | null) => void;
  number: number | null;
  content: string | null;
  isLoggedIn?: boolean | null;
}

const Editorbox = ({
  add,
  placeholder,
  questionsAmount,
  remove,
  update,
  number,
  content,
  isLoggedIn
}: TEditor): JSX.Element => {
  const textareaEl = useRef<HTMLTextAreaElement>(null);

  useEffect((): void => {
    if (textareaEl && textareaEl.current) {
      autosize(textareaEl.current);
    }
  });

  const handleEditorValue = (
    event: SyntheticEvent<HTMLTextAreaElement>
  ): void => {
    update && update(event.currentTarget.value, number);
  };

  return (
    <StyledWrapper isLoggedIn={isLoggedIn !== null}>
      {questionsAmount && questionsAmount > 0 ? (
        <StyledQuestions>Вопросов: 5</StyledQuestions>
      ) : null}

      {isLoggedIn !== null && (
        <StyledIcons>
          <StyledIconsLink href="#">
            <StyledSvgSymbol
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <StyledPathSymbol d="M0 0h24v24H0z" fill="none" />
              <StyledPathSymbol
                fill="currentColor"
                d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"
              />
            </StyledSvgSymbol>
            <StyledTooltip>Copy link</StyledTooltip>
          </StyledIconsLink>
          <StyledIconsLink href="#">
            ?<StyledTooltip>Clarification</StyledTooltip>
          </StyledIconsLink>
        </StyledIcons>
      )}

      <StyledTextarea
        maxLength={1000}
        onChange={handleEditorValue}
        placeholder={placeholder || ""}
        ref={textareaEl}
        value={content || ""}
      />
      {number && <StyledStep>{number}</StyledStep>}

      {isLoggedIn && isLoggedIn !== null && (
        <StyledAddWrapper>
          <StyledAdd onClick={add} type="button">
            <StyledAddIcon>
              <StyledSvgSymbol
                xmlns="http://www.w3.org/2000/svg"
                height="24"
                viewBox="0 0 24 24"
                width="24"
              >
                <StyledPathSymbol d="M0 0h24v24H0z" fill="none" />
                <StyledPathSymbol
                  d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"
                  fill="currentColor"
                />
              </StyledSvgSymbol>
            </StyledAddIcon>

            <StyledTooltip>Add block</StyledTooltip>
          </StyledAdd>
        </StyledAddWrapper>
      )}

      {number && number > 1 && isLoggedIn && isLoggedIn !== null && (
        <StyledRemove onClick={remove} type="button">
          <StyledRemoveIcon>
            <StyledSvgSymbol
              xmlns="http://www.w3.org/2000/svg"
              height="24"
              viewBox="0 0 24 24"
              width="24"
            >
              <StyledPathSymbol d="M0 0h24v24H0z" fill="none" />
              <StyledPathSymbol
                d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
                fill="currentColor"
              />
            </StyledSvgSymbol>
          </StyledRemoveIcon>
        </StyledRemove>
      )}
    </StyledWrapper>
  );
};

const StyledStep = styled.span`
  background: white;
  color: #e3e6ee;
  display: block;
  font-family: ${({ theme }) => theme.fonts.fontBold};
  font-size: ${({ theme }) => theme.rem(58)};
  left: ${({ theme }) => theme.rem(-33)};
  text-align: center;
  position: absolute;
  top: ${({ theme }) => theme.rem(30)};
  width: ${({ theme }) => theme.rem(67)};
`;

const StyledTextarea = styled.textarea`
  border-radius: ${({ theme }) => theme.rem(10)};
  border: ${({ theme }) => theme.rem(1)} solid #e3e6ee;
  color: ${({ theme }) => theme.colors.gray};
  font-family: ${({ theme }) => theme.fonts.fontLight};
  font-size: ${({ theme }) => theme.rem(16)};
  height: auto;
  line-height: ${({ theme }) => theme.rem(30)};
  min-height: ${({ theme }) => theme.rem(180)};
  overflow: hidden;
  padding: ${({ theme }) => theme.rem(35)} ${({ theme }) => theme.rem(10)}
    ${({ theme }) => theme.rem(35)} ${({ theme }) => theme.rem(43)};
  resize: none;
  text-align: left;
  text-shadow: 0 0 ${({ theme }) => theme.rem(1)}
    ${({ theme }) => theme.colors.grayDarker};
  width: 100%;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}px) {
    font-size: ${({ theme }) => theme.rem(15)};
    line-height: ${({ theme }) => theme.rem(20)};
    padding-bottom: ${({ theme }) => theme.rem(20)};
    padding-left: ${({ theme }) => theme.rem(40)};
    padding-top: ${({ theme }) => theme.rem(20)};
  }

  &::placeholder,
  &::-webkit-input-placeholder {
    color: ${({ theme }) => theme.colors.grayLightest};
    font-family: ${({ theme }) => theme.fonts.fontBold};
    font-size: ${({ theme }) => theme.rem(24)};
    text-shadow: none;
  }

  &:-ms-input-placeholder {
    color: ${({ theme }) => theme.colors.grayLightest};
    font-family: ${({ theme }) => theme.fonts.fontBold};
    font-size: ${({ theme }) => theme.rem(24)};
    text-shadow: none;
  }

  &:focus {
    outline: none;
  }
`;

const StyledSvgSymbol = styled.svg`
  height: 100%;
  width: 100%;
`;

const StyledPathSymbol = styled.path``;

const StyledTooltip = styled.span`
  background: ${({ theme }) => theme.colors.grayDarker};
  border-radius: ${({ theme }) => theme.rem(5)};
  bottom: calc(100% + 5px);
  color: white;
  display: inline-block;
  font-size: ${({ theme }) => theme.rem(11)};
  height: ${({ theme }) => theme.rem(18)};
  line-height: ${({ theme }) => theme.rem(18)};
  opacity: 0;
  padding: 0 ${({ theme }) => theme.rem(9)};
  position: absolute;
  text-align: center;
  transition: all 0.2s ease-in;
  transform: translateY(5px);
  white-space: nowrap;

  &::after {
    content: "";
    background: url(/images/tooltip_bg.png) center center no-repeat;
    display: block;
    width: ${({ theme }) => theme.rem(8)};
    height: ${({ theme }) => theme.rem(5)};
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: ${({ theme }) => theme.rem(-4)};
  }
`;

const StyledAddWrapper = styled.div`
  align-items: center;
  display: flex;
  height: ${({ theme }) => theme.rem(30)};
  justify-content: center;
  left: 0;
  position: absolute;
  right: 0;
  width: 100%;
  display: none;

  &::before,
  &::after {
    border-bottom: ${({ theme }) => theme.rem(1)} dashed
      ${({ theme }) => theme.colors.grayLightest};
    content: "";
    display: block;
    height: ${({ theme }) => theme.rem(1)};
    position: absolute;
    right: ${({ theme }) => theme.rem(8)};
    width: calc(50% - ${({ theme }) => theme.rem(30)});
  }

  &::before {
    left: ${({ theme }) => theme.rem(8)};
  }

  &::after {
    right: ${({ theme }) => theme.rem(8)};
  }
`;

const StyledAddIcon = styled.i`
  color: ${({ theme }) => theme.colors.grayLighter};
  display: inline-block;
  height: ${({ theme }) => theme.rem(20)};
  transition: all 0.2s ease-in;
  width: ${({ theme }) => theme.rem(20)};
`;

const StyledRemove = styled.button`
  align-items: center;
  background: none;
  border-radius: 50%;
  border: ${({ theme }) => theme.rem(1)} solid
    ${({ theme }) => theme.colors.red};
  cursor: pointer;
  display: none;
  height: ${({ theme }) => theme.rem(32)};
  justify-content: center;
  opacity: 0.8;
  position: absolute;
  right: ${({ theme }) => theme.rem(-37)};
  top: 50%;
  transform: translateY(-50%);
  width: ${({ theme }) => theme.rem(32)};
  transition: all 0.2s ease-in;

  &::before {
    left: ${({ theme }) => theme.rem(-5)};
    content: "";
    display: block;
    height: ${({ theme }) => theme.rem(184)};
    position: absolute;
    width: ${({ theme }) => theme.rem(32)};
  }

  &:hover {
    display: flex;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}px) {
    right: ${({ theme }) => theme.rem(-16)};
    background: white;
    opacity: 1;
  }

  &:hover {
    opacity: 1;
  }

  &:focus {
    outline: none;
  }
`;

const StyledRemoveIcon = styled.i`
  color: ${({ theme }) => theme.colors.red};
  display: inline-block;
  height: ${({ theme }) => theme.rem(20)};
  transition: all 0.2s ease-in;
  width: ${({ theme }) => theme.rem(20)};
`;

const StyledAdd = styled.button`
  align-items: center;
  background: white;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  display: flex;
  height: ${({ theme }) => theme.rem(25)};
  justify-content: center;
  margin-top: ${({ theme }) => theme.rem(2)};
  padding: 0;
  position: relative;
  transition: all 0.2s ease-in;
  width: ${({ theme }) => theme.rem(25)};

  &:hover {
    background: ${({ theme }) => theme.colors.orange};
    box-shadow: 0px 0px 5px 0px rgba(254, 145, 20, 1);

    ${StyledAddIcon} {
      color: white;
    }

    ${StyledTooltip} {
      opacity: 1;
      transform: translateX(calc(20% + -13px)) translateY(0);
    }
  }

  &:focus {
    outline: none;
  }
`;

const StyledQuestions = styled.p`
  color: ${({ theme }) => theme.colors.red};
  font-family: ${({ theme }) => theme.fonts.fontLight};
  font-size: ${({ theme }) => theme.rem(15)};
  line-height: 1;
  position: absolute;
  right: ${({ theme }) => theme.rem(16)};
  text-shadow: 0 0 ${({ theme }) => theme.rem(1)}
    ${({ theme }) => theme.colors.red};
  top: ${({ theme }) => theme.rem(8)};
  z-index: 1;
`;

const StyledIcons = styled.div`
  border-radius: ${({ theme }) => theme.rem(20)};
  box-shadow: 0 0 ${({ theme }) => theme.rem(10)} 0 rgba(199, 205, 221, 1);
  display: none;
  height: ${({ theme }) => theme.rem(35)};
  position: absolute;
  right: ${({ theme }) => theme.rem(10)};
  top: ${({ theme }) => theme.rem(9)};
  z-index: 1;
`;

const StyledIconsLink = styled.a`
  align-items: center;
  color: ${({ theme }) => theme.colors.grayLightest};
  display: flex;
  font-family: ${({ theme }) => theme.fonts.fontBold};
  justify-content: center;
  text-decoration: none;
  width: ${({ theme }) => theme.rem(45)};

  &:first-of-type {
    border-right: ${({ theme }) => theme.rem(1)} solid #f4f5f8;

    &:hover {
      color: ${({ theme }) => theme.colors.blue};
    }
  }

  &:last-of-type {
    &:hover {
      color: ${({ theme }) => theme.colors.orange};
    }
  }

  ${StyledSvgSymbol} {
    max-width: ${({ theme }) => theme.rem(16)};
  }

  &:hover {
    ${StyledTooltip} {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const StyledWrapper = styled.div<{ isLoggedIn: boolean | undefined }>`
  margin-bottom: ${({ theme }) => theme.rem(35)};
  max-width: ${({ theme }) => theme.rem(960)};
  position: relative;
  opacity: 0.7;

  &:hover {
    opacity: 1.2;

    ${StyledRemove} {
      display: flex;
    }
  }

  ${({ isLoggedIn }) =>
    isLoggedIn
      ? css`
          &:hover {
            ${StyledAddWrapper} {
              display: flex;
            }

            ${StyledIcons} {
              display: flex;
            }
          }
        `
      : css`
          &:hover {
            ${StyledIcons} {
              display: flex;
            }
          }
        `}
`;

export default Editorbox;
