import React, {
  useState,
  useRef,
  useEffect,
  useContext,
  SyntheticEvent
} from "react";
import { GlobalContext } from "~/components/Layout";

import styled from "~/theme";

const InputBox: React.FC = (): JSX.Element => {
  const { queryString, setQueryString } = useContext(GlobalContext);
  const [inputOpened, setInputOpened] = useState(false);
  const [searchText, setSearchText] = useState<string | string[]>(
    queryString.author
  );
  const inputEl = useRef<HTMLInputElement>(null);
  const inputOpenedEl = useRef<HTMLInputElement>(null);

  const toggleInput = (): void => {
    setInputOpened(!inputOpened);

    setTimeout((): void => {
      inputOpenedEl.current && inputOpenedEl.current.focus();
    }, 1);
  };

  const handleQueryChange = (): void => {
    setQueryString({ ...queryString, author: searchText, page: "1" });
  };

  const handleSearchText = (event: SyntheticEvent<HTMLInputElement>): void => {
    setSearchText(event.currentTarget.value);
  };

  useEffect((): void => {
    handleQueryChange();
  }, [searchText]);

  useEffect((): void => {
    setSearchText(queryString.author);
  }, [queryString]);

  useEffect(() => {
    document.addEventListener("click", (event: MouseEvent): void => {
      if (
        inputOpenedEl.current &&
        inputEl.current &&
        event.target instanceof HTMLElement
      ) {
        const isClickInside =
          inputOpenedEl.current.contains(event.target) ||
          inputEl.current.contains(event.target);

        if (!isClickInside) {
          setInputOpened(false);
        }
      }
    });
  }, []);

  return (
    <StyledWrapper>
      <StyledIcon>
        <StyledSvgSymbol
          fill="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <StyledPathSymbol
            d="M3 5v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2H5c-1.11 0-2 .9-2 2zm12 4c0 1.66-1.34 3-3 3s-3-1.34-3-3 
			1.34-3 3-3 3 1.34 3 3zm-9 8c0-2 4-3.1 6-3.1s6 1.1 6 3.1v1H6v-1z"
          />
          <StyledPathSymbol d="M0 0h24v24H0z" fill="none" />
        </StyledSvgSymbol>
      </StyledIcon>
      <StyledInput
        onClick={toggleInput}
        placeholder="Автор"
        ref={inputEl}
        type="text"
        defaultValue={searchText}
      />
      <StyledInputOpened
        isOpened={inputOpened}
        onChange={handleSearchText}
        placeholder="Найти автора"
        ref={inputOpenedEl}
        type="text"
        value={searchText || ""}
      />
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  border-radius: ${({ theme }) => theme.rem(7)};
  border: ${({ theme }) => theme.rem(1)} solid #9da1b8;
  height: ${({ theme }) => theme.rem(38)};
  position: relative;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}px) {
    width: 100%;
  }
`;

const StyledInputOpened = styled.input<{
  isOpened: boolean;
}>`
  border-radius: ${({ theme }) => theme.rem(5)};
  border: ${({ theme }) => theme.rem(1)} solid
    ${({ theme }) => theme.colors.grayLightest};
  color: ${({ theme }) => theme.colors.grayLighter};
  display: none;
  font-size: ${({ theme }) => theme.rem(16)};
  height: ${({ theme }) => theme.rem(60)};
  left: -${({ theme }) => theme.rem(10)};
  padding-left: ${({ theme }) => theme.rem(17)};
  padding-right: ${({ theme }) => theme.rem(17)};
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: calc(100% + 19px);

  ${({ isOpened }) =>
    isOpened &&
    `
  		display: block;
  `}

  &:focus {
    outline: none;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}px) {
    font-size: ${({ theme }) => theme.rem(15)};
  }
`;

const StyledInput = styled.input`
  background: transparent;
  border: none;
  color: white;
  font-size: ${({ theme }) => theme.rem(16)};
  height: 100%;
  padding-left: ${({ theme }) => theme.rem(39)};
  padding-right: ${({ theme }) => theme.rem(10)};
  width: 100%;

  &::placeholder,
  &::-webkit-input-placeholder {
    color: white;
  }

  &:-ms-input-placeholder {
    color: white;
  }

  &:focus {
    outline: none;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}px) {
    font-size: ${({ theme }) => theme.rem(15)};
  }
`;

const StyledIcon = styled.i`
  color: white;
  display: block;
  height: ${({ theme }) => theme.rem(24)};
  left: ${({ theme }) => theme.rem(8)};
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: ${({ theme }) => theme.rem(24)};
`;

const StyledSvgSymbol = styled.svg`
  height: 100%;
  width: 100%;
`;

const StyledPathSymbol = styled.path``;

export default InputBox;
