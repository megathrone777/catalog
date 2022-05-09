import React, { useEffect, useRef, SyntheticEvent } from "react";
import autosize from "autosize";

import styled from "~/theme";

interface Props {
  handleValue: (value: string) => void;
  value: string;
}

const Author = ({ handleValue, value }: Props): JSX.Element => {
  const textareaEl = useRef<HTMLTextAreaElement>(null);

  const handleTextarea = (event: SyntheticEvent<HTMLTextAreaElement>) => {
    handleValue(event.currentTarget.value);
  };

  useEffect((): void => {
    if (textareaEl && textareaEl.current) {
      autosize(textareaEl.current);
    }
  });

  return (
    <StyledWrapper>
      <StyledHeading>От автора:</StyledHeading>

      <StyledContent>
        <StyledTextarea
          onChange={handleTextarea}
          placeholder="Введите текст"
          ref={textareaEl}
          value={value || ""}
        />
      </StyledContent>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  margin-bottom: ${({ theme }) => theme.rem(45)};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}px) {
    flex: 0 1 calc(50% - ${({ theme }) => theme.rem(5)});
    margin-bottom: ${({ theme }) => theme.rem(10)};
    margin-right: ${({ theme }) => theme.rem(5)};
    width: calc(50% - ${({ theme }) => theme.rem(5)});
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}px) {
    margin-left: 0;
    text-align: center;
    width: 100%;
  }
`;

const StyledContent = styled.div`
  background: white;
  padding: ${({ theme }) => theme.rem(25)} ${({ theme }) => theme.rem(15)} ${({ theme }) => theme.rem(20)};
`;

const StyledHeading = styled.h2`
  background: ${({ theme }) => theme.colors.darkBlueLighter};
  color: ${({ theme }) => theme.colors.white};
  display: block;
  height: ${({ theme }) => theme.rem(50)};
  padding-left: ${({ theme }) => theme.rem(74)};
  border-top-left-radius: ${({ theme }) => theme.rem(10)};
  border-top-right-radius: ${({ theme }) => theme.rem(10)};
  line-height: ${({ theme }) => theme.rem(50)};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}px) {
    padding-left: ${({ theme }) => theme.rem(15)};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.xs}px) {
    padding-left: 0;
  }
`;

const StyledTextarea = styled.textarea`
  border: none;
  resize: none;
  color: ${({ theme }) => theme.colors.gray};
  font-family: ${({ theme }) => theme.fonts.fontLight};
  font-size: ${({ theme }) => theme.rem(16)};
  line-height: ${({ theme }) => theme.rem(24)};
  margin-bottom: ${({ theme }) => theme.rem(25)};
  text-align: left;
  text-shadow: 0 0 1px ${({ theme }) => theme.colors.grayDarker};
  width: 100%;

  &:focus {
    outline: none;
  }
`;

export default Author;
