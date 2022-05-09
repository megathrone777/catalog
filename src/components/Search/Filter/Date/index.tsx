import React, { useState, useEffect, useRef, useReducer } from "react";
import { DateRangeInput } from "@datepicker-react/styled";

import styled, { css } from "~/theme";

const initialDateState = {
  startDate: null,
  endDate: null,
  focusedInput: null
};

const dateReducer = (dateState: any, action: any) => {
  switch (action.type) {
    case "focusChange":
      return { ...dateState, focusedInput: action.payload };
    case "dateChange":
      return action.payload;
    default:
      throw new Error();
  }
};

interface Props {
  dateRemoved?: boolean;
  onDateChange: (date: string | null) => void;
}

const Date = ({ dateRemoved, onDateChange }: Props): JSX.Element => {
  const [inputOpened, setInputOpened] = useState<boolean>(false);
  const [dateState, dispatch] = useReducer(dateReducer, initialDateState);
  const [formattedDate, setFormattedDate] = useState<string | null>(null);
  const wrapperEl = useRef<HTMLInputElement>(null);
  const inputWrapper = useRef<HTMLDivElement>(null);
  const { startDate, endDate } = dateState;

  const checkDate = (): void => {
    if (startDate !== null && endDate !== null) {
      setFormattedDate(
        `${("0" + startDate.getDate()).slice(-2)}-${(
          "0" + (startDate.getMonth() + 1)
        ).slice(-2)}-${startDate.getFullYear()} - ${(
          "0" + endDate.getDate()
        ).slice(-2)}-${("0" + (endDate.getMonth() + 1)).slice(
          -2
        )}-${endDate.getFullYear()}`
      );

      return;
    }

    setFormattedDate(null);
  };

  const toggleInput = (): void => {
    setInputOpened(true);
  };

  const hideInput = (): void => {
    setInputOpened(false);
  };

  const handleDatesChange = (data: any) => {
    dispatch({ type: "dateChange", payload: data });
  };

  useEffect((): void => {
    document.addEventListener("click", (event: MouseEvent): void => {
      if (
        inputWrapper.current &&
        wrapperEl.current &&
        event.target instanceof HTMLElement
      ) {
        const isClickInside =
          wrapperEl.current.contains(event.target) ||
          inputWrapper.current.contains(event.target);
        if (!isClickInside) {
          hideInput();
        }
      }
    });

    if (formattedDate !== null) {
      onDateChange(formattedDate);
    }

    checkDate();
  }, [startDate, endDate, formattedDate]);

  useEffect((): void => {
    if (dateRemoved) {
      dispatch({
        type: "dateChange",
        payload: {
          endDate: null,
          startDate: null
        }
      });
      setFormattedDate(null);
    }
  }, [dateRemoved]);

  return (
    <StyledWrapper ref={wrapperEl} onClick={toggleInput}>
      <StyledLabel dateAdded={formattedDate}>
        {formattedDate ? formattedDate : "Выберите дату"}
      </StyledLabel>
      <StyledInputWrapper isOpened={inputOpened} ref={inputWrapper}>
        <DateRangeInput
          displayFormat={`dd-MM-yyyy`}
          onDatesChange={data => handleDatesChange(data)}
          onFocusChange={focusedInput =>
            dispatch({ type: "focusChange", payload: focusedInput })
          }
          startDate={dateState.startDate}
          endDate={dateState.endDate}
          focusedInput={dateState.focusedInput}
          showResetDates={false}
        />
      </StyledInputWrapper>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  font-family: ${({ theme }) => theme.fonts.fontMedium};
`;

const StyledLabel = styled.span<{
  dateAdded: string | null;
}>`
  background: ${({ theme }) => theme.colors.darkBlueLighter};
  border-radius: ${({ theme }) => theme.rem(5)};
  color: white;
  cursor: pointer;
  display: block;
  font-family: ${({ theme }) => theme.fonts.fontLight};
  font-size: ${({ theme }) => theme.rem(13)};
  height: ${({ theme }) => theme.rem(25)};
  margin-bottom: ${({ theme }) => theme.rem(8)};
  margin-right: ${({ theme }) => theme.rem(8)};
  min-width: ${({ theme }) => theme.rem(60)};
  padding: 0 ${({ theme }) => theme.rem(5)};
  text-align: center;
  white-space: nowrap;

  &:hover {
    opacity: 0.8;
  }

  ${({ dateAdded }) =>
    dateAdded &&
    css`
      background: ${({ theme }) => theme.colors.orange};
    `}
`;

const StyledInputWrapper = styled.div<{
  isOpened: boolean;
}>`
  background: ${({ theme }) => theme.colors.darkBlueLighter};
  display: none;
  left: -50%;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: ${({ theme }) => theme.rem(427)};
  z-index: 20;

  ${({ isOpened }) =>
    isOpened &&
    `
    display: block;
  `}
`;

export default Date;
