import React, {
  useEffect,
  useState,
  useContext,
  useRef,
  SyntheticEvent
} from "react";
import { GlobalContext } from "~/components/Layout";

import styled from "~/theme";

const SearchBox: React.FC = (): JSX.Element => {
  const firstUpdate = useRef(true);
  const { queryString, setQueryString } = useContext(GlobalContext);
  const [inputVal, setInputVal] = useState<string | string[]>("");

  const handleQueryChange = (): void => {
    setQueryString({
      ...queryString,
      search: inputVal,
      page: "1",
      categoryIds: []
    });
  };

  const handleInputChange = (event: SyntheticEvent<HTMLInputElement>): void => {
    setInputVal(event.currentTarget.value);
  };

  useEffect((): void => {
    if (firstUpdate.current) {
      firstUpdate.current = false;

      return;
    }

    handleQueryChange();
  }, [inputVal]);

  useEffect((): void => {
    setInputVal(queryString.search);
  }, [queryString]);

  return (
    <StyledWrapper>
      <StyledIcon>
        <StyledSvgSymbol xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <StyledPathSymbol
            d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 
        0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
          />
          <StyledPathSymbol d="M0 0h24v24H0z" fill="none" />
        </StyledSvgSymbol>
      </StyledIcon>
      <StyledInput
        onChange={handleInputChange}
        placeholder="Поисковой запрос"
        type="text"
        value={inputVal && inputVal?.length > 0 ? inputVal : ""}
      />
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  background: white;
  border-radius: ${({ theme }) => theme.rem(25)};
  border: ${({ theme }) => theme.rem(1)} solid
    ${({ theme }) => theme.colors.white};
  flex: 0 1 ${({ theme }) => theme.rem(593)};
  height: ${({ theme }) => theme.rem(45)};
  margin-right: ${({ theme }) => theme.rem(7)};
  overflow: hidden;
  position: relative;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}px) {
    flex: 0 1 calc(100% - ${({ theme }) => theme.rem(215)});
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.xs}px) {
    flex: 0 1 auto;
    margin-bottom: ${({ theme }) => theme.rem(10)};
    margin-right: 0;
  }
`;

const StyledIcon = styled.i`
  display: block;
  height: ${({ theme }) => theme.rem(20)};
  left: ${({ theme }) => theme.rem(12)};
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: ${({ theme }) => theme.rem(20)};
`;

const StyledSvgSymbol = styled.svg`
  height: 100%;
  width: 100%;
`;
const StyledPathSymbol = styled.path``;

const StyledInput = styled.input`
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.colors.grayDarker};
  font-size: ${({ theme }) => theme.rem(16)};
  height: 100%;
  padding-left: ${({ theme }) => theme.rem(37)};
  padding-right: ${({ theme }) => theme.rem(37)};
  text-shadow: 0 0 1px ${({ theme }) => theme.colors.grayDarker};
  width: 100%;

  &::placeholder,
  &::-webkit-input-placeholder {
    color: ${({ theme }) => theme.colors.grayDarker};
    text-shadow: 0 0 1px ${({ theme }) => theme.colors.grayDarker};
  }

  &:-ms-input-placeholder {
    color: ${({ theme }) => theme.colors.grayDarker};
    text-shadow: 0 0 1px ${({ theme }) => theme.colors.grayDarker};
  }

  &:focus {
    outline: none;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}px) {
    font-size: ${({ theme }) => theme.rem(15)};
  }
`;

export default SearchBox;
