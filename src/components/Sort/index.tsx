import React, { useState, useContext, useEffect, useRef } from "react";

import { GlobalContext } from "~/components/Layout";
import Name from "./Name";
import Search from "./Search";
import Switcher from "./Switcher";
import styled from "~/theme";

const Sort: React.FC = (): JSX.Element => {
  const { queryString, setQueryString } = useContext(GlobalContext);
  const { orderWay, orderField } = queryString;
  const [currentSwitcher, setCurrentSwitcher] = useState<string | string[]>(
    orderField
  );
  const [currentOrdering, setCurrentOrdering] = useState<string | string[]>(
    orderWay
  );
  const firstUpdate = useRef(true);

  const handleOrderingQuery = () => {
    setQueryString({
      ...queryString,
      orderField: currentSwitcher,
      orderWay: currentOrdering
    });
  };

  const handleCurrentSwitcher = (
    switcherField: string | string[],
    ordering: string | string[]
  ): void => {
    setCurrentSwitcher(switcherField);
    setCurrentOrdering(ordering);
  };

  useEffect((): void => {
    if (firstUpdate.current) {
      firstUpdate.current = false;

      return;
    }
    handleOrderingQuery();
  }, [currentSwitcher]);

  useEffect((): void => {
    setCurrentSwitcher(queryString.orderField);
    setCurrentOrdering(queryString.orderWay);
  }, [queryString]);

  return (
    <StyledWrapper>
      <StyledLayout>
        <Search />
        <Name />
        <Switcher
          enabled={currentSwitcher === "createdAt"}
          enableSwitcher={(
            switcherField: string | string[],
            ordering: string | string[]
          ) => handleCurrentSwitcher(switcherField, ordering)}
          switcherField="createdAt"
          text="Дата"
        />
        <Switcher
          enabled={currentSwitcher === "likes"}
          enableSwitcher={(
            switcherField: string | string[],
            ordering: string | string[]
          ) => handleCurrentSwitcher(switcherField, ordering)}
          switcherField="likes"
          text="Лайков"
        />
        <Switcher
          enabled={currentSwitcher === "steps"}
          enableSwitcher={(
            switcherField: string | string[],
            ordering: string | string[]
          ) => handleCurrentSwitcher(switcherField, ordering)}
          switcherField="steps"
          text="Шаги"
        />
      </StyledLayout>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  background: ${({ theme }) => theme.colors.darkBlueLighter};
  border-radius: ${({ theme }) => theme.rem(10)};
  height: ${({ theme }) => theme.rem(50)};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}px) {
    height: ${({ theme }) => theme.rem(95)};
    padding: ${({ theme }) => theme.rem(9)} ${({ theme }) => theme.rem(10)} 0;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.xs}px) {
    height: auto;
  }
`;

const StyledLayout = styled.div`
  display: flex;
  height: 100%;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}px) {
    height: ${({ theme }) => theme.rem(50)};
    flex-wrap: wrap;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.xs}px) {
    height: auto;
  }

  > * {
    &:last-of-type {
      border-right: none;
    }
  }
`;

export default Sort;
