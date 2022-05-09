import React, {
  useContext,
  useState,
  useRef,
  SyntheticEvent,
  useEffect
} from "react";

import { GlobalContext } from "~/components/Layout";
import styled from "~/theme";

const SearchBox: React.FC = (): JSX.Element => {
  const firstUpdate = useRef(true);
  const { queryString, setQueryString } = useContext(GlobalContext);
  const [inputVal, setInputVal] = useState<string | string[]>(
    queryString.deepSearch || ""
  );

  const handleQueryChange = (): void => {
    setQueryString({ ...queryString, deepSearch: inputVal, page: "1" });
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
    setInputVal(queryString.deepSearch);
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
        placeholder="Расширенный поиск"
        type="text"
        onChange={handleInputChange}
        value={inputVal || ""}
      />
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  border-radius: ${({ theme }) => theme.rem(7)};
  height: ${({ theme }) => theme.rem(38)};
  overflow: hidden;
  position: relative;
  width: 100%;
`;

const StyledIcon = styled.i`
  display: block;
  height: ${({ theme }) => theme.rem(24)};
  left: ${({ theme }) => theme.rem(10)};
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

const StyledInput = styled.input`
  border: none;
  color: ${({ theme }) => theme.colors.grayLighter};
  font-size: ${({ theme }) => theme.rem(16)};
  height: 100%;
  padding: 0 ${({ theme }) => theme.rem(38)};
  width: 100%;

  &::placeholder,
  &::-webkit-input-placeholder {
    color: ${({ theme }) => theme.colors.grayLighter};
  }

  &:-ms-input-placeholder {
    color: ${({ theme }) => theme.colors.grayLighter};
  }

  &:focus {
    outline: none;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}px) {
    font-size: ${({ theme }) => theme.rem(15)};
  }
`;

export default SearchBox;
