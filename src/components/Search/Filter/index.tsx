import React, { useState, useEffect, useRef, useContext } from "react";

import { GlobalContext } from "~/components/Layout";
import Item, { TFilterItem, TFilter } from "./Item";
import styled from "~/theme";

const iconLike = `<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0V0z" fill="none"/><path 
  d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 
  1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z" fill="currentColor" /></svg>`;

const iconSteps = `<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path 
  d="M0 0h24v24H0z" fill="none"/><circle cx="12" cy="19" r="2"/><path d="M10 3h4v12h-4z" fill="currentColor" /></svg>`;

const iconDate = `<svg fill='currentColor'
  xmlns='http://www.w3.org/2000/svg'
  viewBox='0 0 24 24' width="30"><path 
  d='M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 
  2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z' /><path d='M0 0h24v24H0z' fill='none' /></svg>`;

const Filter = () => {
  const [filters, updateFilters] = useState<TFilterItem[]>([
    {
      id: "likes",
      icon: iconLike,
      text: "Лайки",
      filters: [
        {
          id: "likes-1-10",
          isActive: false,
          val: "1 - 10",
          type: "likes",
          from: 1,
          to: 10
        },
        {
          id: "likes-11-20",
          isActive: false,
          val: "11 - 20",
          type: "likes",
          from: 11,
          to: 20
        },
        {
          id: "likes-21-30",
          isActive: false,
          val: "21 - 30",
          type: "likes",
          from: 21,
          to: 30
        },
        {
          id: "likes-31-40",
          isActive: false,
          val: "31 - 40",
          type: "likes",
          from: 31,
          to: 40
        },
        {
          id: "likes-41-50",
          isActive: false,
          val: "41 - 50",
          type: "likes",
          from: 41,
          to: 50
        }
      ]
    },
    {
      id: "steps",
      icon: iconSteps,
      text: "Шаги",
      filters: [
        {
          id: "steps-1-10",
          isActive: false,
          val: "1 - 10",
          type: "steps",
          from: 1,
          to: 10
        },
        {
          id: "steps-11-20",
          isActive: false,
          val: "11 - 20",
          type: "steps",
          from: 11,
          to: 20
        },
        {
          id: "steps-21-30",
          isActive: false,
          val: "21 - 30",
          type: "steps",
          from: 21,
          to: 30
        }
      ]
    },
    {
      id: "createdAt",
      text: "Дата",
      createdAt: null,
      icon: iconDate
    }
  ]);
  const { queryString, setQueryString } = useContext(GlobalContext);
  const [filtersQuery, setFiltersQuery] = useState<string | string[]>(
    queryString.filters || ""
  );
  const [filtersAdded, setFiltersAdded] = useState<TFilter[]>(
    queryString.filters
      ? (queryString.filters as string)
          .split("&")
          .reduce((arr: TFilter[], str: string) => {
            const parsedRow = str.split("_");
            const type = parsedRow[0];
            const id = `${type}-${parsedRow[1]}-${parsedRow[2]}`;
            const val = `${parsedRow[1]} - ${parsedRow[2]}`;

            arr.push({
              id: type === "createdAt" ? type : id,
              val,
              type: parsedRow[0],
              from: parsedRow[1],
              to: parsedRow[2]
            });
            return arr;
          }, [])
      : []
  );
  const [filtersOpened, toggleFiltersOpened] = useState<boolean>(false);
  const [dateFilter, setDateFilter] = useState<string | null>(null);
  const [dateRemoved, toggleDateRemoved] = useState<boolean>(false);
  const firstUpdate = useRef(true);
  const wrapperEl = useRef<HTMLDivElement>(null);

  const handleFiltersAdd = (
    type: string,
    id: string,
    createdAt?: string | null
  ): void => {
    updateFilters((prevState: TFilterItem[]): TFilterItem[] => {
      const currentFilters = prevState.find(
        (filter: TFilterItem): boolean => filter.id === type
      );

      const newFilters =
        currentFilters &&
        currentFilters.filters?.map(
          (filter: TFilter): TFilter => {
            if (filter.id === id) {
              setFiltersAdded((prevState: TFilter[]): TFilter[] => {
                const newFiltersAdded = [
                  ...prevState,
                  {
                    id: filter.id,
                    val: filter.val,
                    from: filter.from,
                    type: filter.type,
                    to: filter.to
                  }
                ];

                return newFiltersAdded;
              });

              return {
                ...filter,
                isActive: true
              };
            }

            return filter;
          }
        );

      const newState = prevState.map(
        (filterItem: TFilterItem): TFilterItem => {
          if (filterItem.id === type) {
            return {
              ...filterItem,
              filters: newFilters,
              createdAt: createdAt ? createdAt : null
            };
          }
          return filterItem;
        }
      );

      return newState;
    });

    if (type === "createdAt" && createdAt) setDateFilter(createdAt);
    toggleDateRemoved(false);
  };

  const handleFiltersRemove = (type: string, id: string): void => {
    if (type === "createdAt") {
      updateFilters((prevState: TFilterItem[]): TFilterItem[] => {
        const newState = prevState.map(filter => {
          if (filter.id === "createdAt") {
            setFiltersAdded((prevState: TFilter[]): TFilter[] => {
              const newFiltersAdded = prevState.filter(
                (filterAdded: TFilter) => filterAdded.id !== "createdAt"
              );

              return newFiltersAdded;
            });

            return {
              ...filter,
              createdAt: null
            };
          }
          return filter;
        });

        return newState;
      });

      setDateFilter(null);
      toggleDateRemoved(true);
      return;
    }

    updateFilters((prevState: TFilterItem[]): TFilterItem[] => {
      const currentFilters = prevState.find(
        (filter: TFilterItem): boolean => filter.id === type
      );
      const newFilters =
        currentFilters &&
        currentFilters.filters?.map(
          (filter: TFilter): TFilter => {
            if (filter.id === id) {
              setFiltersAdded((prevState: TFilter[]): TFilter[] => {
                const newFiltersAdded = prevState.filter(
                  (filterAdded: TFilter) => filterAdded.id !== filter.id
                );

                return newFiltersAdded;
              });

              return {
                ...filter,
                isActive: false
              };
            }

            return filter;
          }
        );

      const newState = [...prevState].map(
        (filterItem: TFilterItem): TFilterItem => {
          if (filterItem.id === type) {
            return {
              ...filterItem,
              filters: newFilters
            };
          }

          return filterItem;
        }
      );

      return newState;
    });
  };

  const handleDateRemove = () => {
    updateFilters((prevState: TFilterItem[]): TFilterItem[] => {
      const newState = prevState.map(filter => {
        if (filter.id === "createdAt") {
          return {
            ...filter,
            createdAt: null
          };
        }
        return filter;
      });

      return newState;
    });

    setDateFilter(null);
    toggleDateRemoved(true);
  };

  const handleQueryString = (newFiltersQuery: string | string[]): void => {
    setQueryString({
      ...queryString,
      filters: newFiltersQuery,
      page: "1"
    });
  };

  const checkFilters = (
    type: string,
    id: string,
    createdAt?: string | null
  ): void => {
    updateFilters((prevState: TFilterItem[]): TFilterItem[] => {
      const currentFilters = prevState.find(
        (filter: TFilterItem): boolean => filter.id === type
      );
      const newFilters =
        currentFilters &&
        currentFilters.filters?.map(
          (filter: TFilter): TFilter => {
            if (filter.id === id) {
              return {
                ...filter,
                isActive: true
              };
            }

            return filter;
          }
        );

      const newState = prevState.map(
        (filterItem: TFilterItem): TFilterItem => {
          if (filterItem.id === type) {
            return {
              ...filterItem,
              filters: newFilters,
              createdAt: createdAt ? createdAt : null
            };
          }
          return filterItem;
        }
      );

      return newState;
    });
  };

  useEffect((): void => {
    const filtersQuery =
      filtersAdded &&
      filtersAdded
        .reduce((array: string[], element: TFilter): string[] => {
          array.push(
            encodeURIComponent(`${element.type}_${element.from}_${element.to}`)
          );
          return array;
        }, [])
        .join("&");

    setFiltersQuery(filtersQuery);

    if (dateFilter) {
      const dateFilterQuery = (dateFilter as string).split(" - ");
      setFiltersQuery((prevState: string | string[]) => {
        const newDate = prevState.concat(
          `${prevState.length === 0 ? "" : "&"}${encodeURIComponent(
            `createdAt_${dateFilterQuery[0]}_${dateFilterQuery[1]}`
          )}`
        );

        return newDate;
      });
    }
  }, [filtersAdded, dateFilter]);

  useEffect((): void => {
    if (firstUpdate.current) {
      firstUpdate.current = false;

      return;
    }

    handleQueryString(filtersQuery);
  }, [filtersQuery]);

  useEffect((): void => {
    if (queryString.filters === "") {
      setFiltersAdded([]);

      updateFilters((prevState: TFilterItem[]): TFilterItem[] => {
        const newState = prevState.map(
          (filterItem: TFilterItem): TFilterItem => {
            const newFilters = filterItem.filters?.map(
              (filter: TFilter): TFilter => {
                return {
                  ...filter,
                  isActive: false
                };
              }
            );

            return {
              ...filterItem,
              filters: newFilters,
              createdAt: null
            };
          }
        );

        return newState;
      });
    }
  }, [queryString]);

  useEffect((): void => {
    filtersAdded.map(({ type, id }: TFilter) => {
      checkFilters(type, id);
    });

    document.addEventListener("click", (event: MouseEvent): void => {
      if (
        wrapperEl.current &&
        wrapperEl.current &&
        event.target instanceof HTMLElement
      ) {
        const isClickInside = wrapperEl.current.contains(event.target);

        if (!isClickInside) {
          toggleFiltersOpened(false);
        }
      }
    });
  }, []);

  return (
    <StyledWrapper ref={wrapperEl}>
      <StyledIcon>
        <StyledSvgSymbol
          xmlns="http://www.w3.org/2000/svg"
          enable-background="new 0 0 24 24"
          height="24"
          viewBox="0 0 24 24"
          width="24"
        >
          <StyledGroupSymbol>
            <StyledPathSymbol d="M0,0h24 M24,24H0" fill="none" />
            <StyledPathSymbol
              d="M4.25,5.61C6.27,8.2,10,13,10,13v6c0,0.55,0.45,1,1,1h2c0.55,0,1-0.45,1-1v-6c0,0,3.72-4.8,5.74-7.39 
				C20.25,4.95,19.78,4,18.95,4H5.04C4.21,4,3.74,4.95,4.25,5.61z"
            />
          </StyledGroupSymbol>
        </StyledSvgSymbol>
      </StyledIcon>

      <StyledInputWrapper>
        <StyledInput
          onFocus={() => toggleFiltersOpened(true)}
          filled={
            (filtersAdded && filtersAdded.length > 0) || dateFilter !== null
          }
          placeholder={!filtersOpened ? "Выберите фильтры" : ""}
          type="text"
        />

        <StyledFiltersAdded>
          {filtersAdded &&
            !!filtersAdded.length &&
            filtersAdded.map(
              ({ id, val, type }: TFilter): JSX.Element => (
                <StyledFilterBadge key={id}>
                  <StyledFilterBadgeRemove
                    onClick={() => handleFiltersRemove(type, id)}
                    type="button"
                  >
                    <StyledSvgSymbol
                      xmlns="http://www.w3.org/2000/svg"
                      height="24"
                      viewBox="0 0 24 24"
                      width="24"
                    >
                      <StyledPathSymbol d="M0 0h24v24H0z" fill="none" />
                      <StyledPathSymbol
                        d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 
            17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"
                        fill="currentColor"
                      />
                    </StyledSvgSymbol>
                  </StyledFilterBadgeRemove>
                  {val}
                </StyledFilterBadge>
              )
            )}

          {dateFilter && dateFilter.length && (
            <StyledFilterBadge>
              <StyledFilterBadgeRemove onClick={handleDateRemove} type="button">
                <StyledSvgSymbol
                  xmlns="http://www.w3.org/2000/svg"
                  height="24"
                  viewBox="0 0 24 24"
                  width="24"
                >
                  <StyledPathSymbol d="M0 0h24v24H0z" fill="none" />
                  <StyledPathSymbol
                    d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 
        17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"
                    fill="currentColor"
                  />
                </StyledSvgSymbol>
              </StyledFilterBadgeRemove>
              {dateFilter}
            </StyledFilterBadge>
          )}
        </StyledFiltersAdded>
      </StyledInputWrapper>

      <StyledFiltersBox isOpened={filtersOpened}>
        <StyledFiltersBoxHeading>
          Фильтры
          <StyledBoxClose onClick={() => toggleFiltersOpened(false)}>
            <StyledSvgSymbol
              xmlns="http://www.w3.org/2000/svg"
              height="24"
              viewBox="0 0 24 24"
              width="24"
            >
              <StyledPathSymbol d="M0 0h24v24H0z" fill="none" />
              <StyledPathSymbol
                fill="currentColor"
                d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
              />
            </StyledSvgSymbol>
          </StyledBoxClose>
        </StyledFiltersBoxHeading>
        {filters && !!filters.length && (
          <StyledFiltersBoxContent>
            {filters.map(
              ({ filters, id, icon, text }: TFilterItem): JSX.Element => (
                <Item
                  add={(type, id, createdAt): void =>
                    handleFiltersAdd(type, id, createdAt)
                  }
                  dateRemoved={dateRemoved}
                  filters={filters}
                  icon={icon}
                  id={id}
                  key={id}
                  text={text}
                />
              )
            )}
          </StyledFiltersBoxContent>
        )}
      </StyledFiltersBox>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  background: white;
  border-radius: ${({ theme }) => theme.rem(25)};
  border: ${({ theme }) => theme.rem(1)} solid
    ${({ theme }) => theme.colors.white};
  flex: 1;
  height: ${({ theme }) => theme.rem(45)};
  position: relative;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}px) {
    flex: auto;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}px) {
    flex: 0 1 ${({ theme }) => theme.rem(215)};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.xs}px) {
    flex: 0 1 auto;
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
const StyledGroupSymbol = styled.g``;

const StyledInputWrapper = styled.div`
  height: 100%;
  overflow: hidden;
  position: relative;
`;

const StyledInput = styled.input<{
  filled: boolean | null;
}>`
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.colors.grayDarker};
  font-size: ${({ theme }) => theme.rem(16)};
  height: 100%;
  padding-left: ${({ theme }) => theme.rem(37)};
  text-shadow: 0 0 1px ${({ theme }) => theme.colors.grayDarker};
  width: 100%;

  &::placeholder,
  &::-webkit-input-placeholder {
    color: ${({ theme }) => theme.colors.grayDarker};
    text-shadow: 0 0 1px ${({ theme }) => theme.colors.grayDarker};

    ${({ filled }) =>
      filled &&
      `
        color: transparent;
        text-shadow: none;
      `}
  }

  &:-ms-input-placeholder {
    color: ${({ theme }) => theme.colors.grayDarker};
    text-shadow: 0 0 1px ${({ theme }) => theme.colors.grayDarker};

    ${({ filled }) =>
      filled &&
      `
        color: transparent;
        text-shadow: none;
      `}
  }

  &:focus {
    outline: none;

    &::placeholder,
    &::-webkit-input-placeholder {
      color: transparent;
      text-shadow: none;
    }

    &:-ms-input-placeholder {
      color: transparent;
      text-shadow: none;
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}px) {
    font-size: ${({ theme }) => theme.rem(15)};
  }
`;

const StyledFiltersAdded = styled.div`
  display: flex;
  flex-wrap: wrap;
  position: absolute;
  height: 100%;
  padding: ${({ theme }) => theme.rem(3)} 0;
  left: ${({ theme }) => theme.rem(37)};
  top: 50%;
  transform: translateY(-50%);
`;

const StyledFilterBadge = styled.span`
  align-items: center;
  background: ${({ theme }) => theme.colors.darkBlue};
  border-radius: ${({ theme }) => theme.rem(15)};
  color: white;
  display: inline-flex;
  font-size: ${({ theme }) => theme.rem(13)};
  height: ${({ theme }) => theme.rem(17)};
  line-height: ${({ theme }) => theme.rem(16)};
  margin-bottom: ${({ theme }) => theme.rem(2)};
  margin-right: ${({ theme }) => theme.rem(5)};
  padding-left: ${({ theme }) => theme.rem(2)};
  padding-right: ${({ theme }) => theme.rem(6)};
  white-space: nowrap;
`;

const StyledFilterBadgeRemove = styled.button`
  align-items: center;
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  display: inline-flex;
  margin-right: ${({ theme }) => theme.rem(3)};
  padding: 0;
  width: ${({ theme }) => theme.rem(13)};

  &:hover {
    opacity: 0.8;
  }

  &:focus {
    outline: none;
  }
`;

const StyledFiltersBox = styled.div<{
  isOpened: boolean;
}>`
  background: white;
  border-radius: ${({ theme }) => theme.rem(10)};
  box-shadow: 0px 0px 14px 0px rgba(57, 61, 92, 0.3);
  position: absolute;
  right: ${({ theme }) => theme.rem(-1)};
  top: calc(100% + ${({ theme }) => theme.rem(10)});
  display: none;
  width: ${({ theme }) => theme.rem(360)};
  z-index: 20;

  @media (max-width: ${({ theme }) => theme.breakpoints.xs}px) {
    width: ${({ theme }) => theme.rem(300)};
  }

  ${({ isOpened }) =>
    isOpened &&
    `
	display: block;
  `};
`;

const StyledFiltersBoxHeading = styled.div`
  background: ${({ theme }) => theme.colors.darkBlue};
  border-top-left-radius: ${({ theme }) => theme.rem(10)};
  border-top-right-radius: ${({ theme }) => theme.rem(10)};
  color: white;
  font-size: ${({ theme }) => theme.rem(18)};
  height: ${({ theme }) => theme.rem(50)};
  line-height: ${({ theme }) => theme.rem(50)};
  padding-left: ${({ theme }) => theme.rem(37)};
  position: relative;
`;

const StyledBoxClose = styled.button`
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 0;
  position: absolute;
  right: ${({ theme }) => theme.rem(15)};
  top: 50%;
  transform: translateY(-50%);
  width: ${({ theme }) => theme.rem(24)};

  &:hover {
    opacity: 0.8;
  }

  &:focus {
    outline: none;
  }
`;

const StyledFiltersBoxContent = styled.div`
  background: white;
  padding: ${({ theme }) => theme.rem(20)} ${({ theme }) => theme.rem(20)} 0;
`;

export default Filter;
