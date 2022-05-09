import React, { SyntheticEvent } from "react";

import styled from "~/theme";

export interface TEditor {
  add?: () => void;
  placeholder: string;
  remove?: () => void;
  step: number;
  value: string | null;
  handleValue?: (value: string, step: number) => void;
}

const Editorbox = ({
  add,
  placeholder,
  remove,
  step,
  handleValue,
  value
}: TEditor): JSX.Element => {
  const handleEditorValue = (event: SyntheticEvent<HTMLTextAreaElement>) => {
    handleValue && handleValue(event.currentTarget.value, step);
  };

  return (
    <StyledWrapper>
      <StyledTextarea
        maxLength={500}
        onChange={handleEditorValue}
        placeholder={placeholder}
        value={value || ""}
      />
      <StyledStep>{step}</StyledStep>
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

      {step > 1 && (
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
  color: ${({ theme }) => theme.colors.grayLightest};
  display: block;
  font-family: ${({ theme }) => theme.fonts.fontBold};
  font-size: ${({ theme }) => theme.rem(58)};
  left: -33px;
  text-align: center;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: ${({ theme }) => theme.rem(67)};

  &::after {
    color: ${({ theme }) => theme.colors.grayLightest};
    content: "...";
    font-family: ${({ theme }) => theme.fonts.fontBold};
    font-size: ${({ theme }) => theme.rem(28)};
    left: ${({ theme }) => theme.rem(50)};
    line-height: 1;
    position: absolute;
    top: 38%;
    transform: translateY(-50%);
  }
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

const StyledAddWrapper = styled.div`
  align-items: center;
  display: flex;
  height: ${({ theme }) => theme.rem(30)};
  justify-content: center;
  left: 0;
  opacity: 0;
  position: absolute;
  right: 0;
  visibility: hidden;
  width: 100%;

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

const StyledWrapper = styled.div`
  margin-bottom: ${({ theme }) => theme.rem(35)};
  max-width: ${({ theme }) => theme.rem(960)};
  position: relative;
  opacity: 0.7;

  &:hover {
    opacity: 1.2;

    ${StyledRemove} {
      display: flex;
    }

    ${StyledAddWrapper} {
      opacity: 1;
      visibility: visible;
    }
  }
`;

const StyledAddIcon = styled.i`
  color: ${({ theme }) => theme.colors.grayLighter};
  display: inline-block;
  height: ${({ theme }) => theme.rem(20)};
  transition: all 0.2s ease-in;
  width: ${({ theme }) => theme.rem(20)};
`;

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
  transform: translateX(calc(20% + -13px)) translateY(5px);
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

const StyledSvgSymbol = styled.svg`
  height: 100%;
  width: 100%;
`;
const StyledPathSymbol = styled.path``;

const StyledTextarea = styled.textarea`
  border-radius: ${({ theme }) => theme.rem(10)};
  border: ${({ theme }) => theme.rem(1)} solid
    ${({ theme }) => theme.colors.grayLightest};
  color: ${({ theme }) => theme.colors.grayDarker};
  display: block;
  font-family: ${({ theme }) => theme.fonts.font};
  font-size: ${({ theme }) => theme.rem(16)};
  height: ${({ theme }) => theme.rem(120)};
  overflow: hidden;
  padding: ${({ theme }) => theme.rem(10)} ${({ theme }) => theme.rem(45)};
  resize: none;
  text-shadow: 0 0 1px ${({ theme }) => theme.colors.grayDarker};
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
    background: transparent;
    border-color: ${({ theme }) => theme.colors.blueLighter};
    outline: none;

    &::placeholder,
    &::-webkit-input-placeholder {
      color: transparent;
    }

    &:-ms-input-placeholder {
      color: transparent;
    }
  }
`;

export default Editorbox;
