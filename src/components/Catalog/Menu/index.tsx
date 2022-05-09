import React, { useState, useEffect, useContext } from "react";

import styled from "~/theme";
import { GlobalContext } from "~/components/Layout";
import { TMatchedCategory } from "../";
import Item from "./Item";

interface Props {
  items: any[];
  matchedCategories: TMatchedCategory[];
  inactiveHidden: boolean;
  enableCategory: (id: string | string[]) => void;
  currentCategory: string | string[];
}

const Menu = ({
  inactiveHidden,
  items,
  matchedCategories: matches,
  enableCategory,
  currentCategory
}: Props): JSX.Element => {
  const { queryString, setQueryString } = useContext(GlobalContext);
  const [matchedCategories, setMatchedCategories] = useState(matches);
  const [currentIds, toggleCurrentIds] = useState<string[]>(
    queryString.categoryIds || []
  );

  const handleCurrentIds = (id: string | string[]): void => {
    toggleCurrentIds((prevState: string | string[]) => {
      if (prevState.includes(id as string)) {
        const ids = [...prevState];
        const index = ids.indexOf(id as string);

        if (index > -1) {
          ids.splice(index, 1);
        }

        return ids;
      } else {
        return [...prevState, id as string];
      }
    });
  };

  const checkCurrentIds = (ids: string | string[]): void => {
    if (
      (ids as string)[0] ===
      decodeURIComponent(queryString.categoryIds.toString())
    ) {
      setQueryString({
        ...queryString
      });

      return;
    }

    setQueryString({
      ...queryString,
      categoryIds: currentIds,
      page: "1"
    });
  };

  const handleCurrentId = (id: string | string[]): void => {
    enableCategory && enableCategory(id);
  };

  useEffect((): void => {
    setMatchedCategories(matches);
  }, [matches]);

  useEffect((): void => {
    checkCurrentIds(currentIds);
  }, [currentIds]);

  return (
    <StyledWrapper>
      {items && !!items.length && (
        <StyledList>
          {items.map(
            ({ id, title, subCategories }): JSX.Element => {
              const itemMatch:
                | TMatchedCategory
                | undefined = matchedCategories.find(
                  (matchedCategory: TMatchedCategory): boolean =>
                    matchedCategory.id === id
                );

              return (
                <Item
                  key={id}
                  itemId={id}
                  currentCategory={currentCategory}
                  enableCategory={(id: string | string[]) =>
                    handleCurrentId(id)
                  }
                  toggleId={(id: string | string[]) => handleCurrentIds(id)}
                  inactiveHidden={inactiveHidden}
                  itemTitle={title}
                  itemCount={itemMatch !== undefined ? itemMatch.count : null}
                  itemTotal={itemMatch !== undefined ? itemMatch.total : null}
                  itemSubCategories={subCategories}
                  matchedCategories={matchedCategories}
                />
              );
            }
          )}
        </StyledList>
      )}
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  border-bottom: ${({ theme }) => theme.rem(1)} solid
    ${({ theme }) => theme.colors.white};
  margin-bottom: ${({ theme }) => theme.rem(20)};
  padding-bottom: ${({ theme }) => theme.rem(10)};
`;

const StyledList = styled.div``;

export default Menu;
