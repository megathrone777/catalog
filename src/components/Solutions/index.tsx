import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

import Results, { TResultsItem } from "./Results";
import Sort from "~/components/Sort";
import Navigation from "./Navigation";
import Switcher from "./Switcher";
import Loader from "~/components/Loader";
import { TMatchedCategory } from "~/components/Catalog";
import styled from "~/theme";

export interface TSolutions {
  deepSearch: string;
  results: TResultsItem[];
  total: number;
  perPage: number;
  page: number;
  matchedCategories: TMatchedCategory[];
}

interface Props {
  data: TSolutions;
}

const Solutions = ({ data }: Props): JSX.Element => {
  const router = useRouter();
  const { deepSearch, results, total, perPage, page } = data;
  const [isListView, toggleListView] = useState(false);
  const [loading, toggleLoading] = useState<boolean>(false);

  useEffect(() => {
    const handleRouteStart = (url: string): void => {
      if (url.includes("?") || url === "/") toggleLoading(true);
    };

    const handleRouteEnd = (): void => toggleLoading(false);

    router.events.on("routeChangeStart", handleRouteStart);
    router.events.on("routeChangeComplete", handleRouteEnd);

    return () => {
      router.events.off("routeChangeStart", handleRouteStart);
      router.events.off("routeChangeComplete", handleRouteEnd);
    };
  }, []);

  return (
    <StyledWrapper>
      <>
        <Sort />
        {loading ? (
          <StyledLoaderWrapper>
            <Loader transparent={true} />
          </StyledLoaderWrapper>
        ) : (
            <>
              {results && !!results.length ? (
                <>
                  <StyledOptions>
                    {perPage === 50 ? (
                      <StyledAmountFound>
                        Последние<StyledAmountFoundHighlighted>50</StyledAmountFoundHighlighted>решений
                      </StyledAmountFound>
                    ) : (
                        <>
                          {deepSearch && deepSearch?.length > 0 ? (
                            <StyledAmountFound>
                              Найдено
                              <StyledAmountFoundHighlighted>
                                {results.length}
                              </StyledAmountFoundHighlighted>
                      из {total} Решений
                            </StyledAmountFound>
                          ) : (
                              <StyledAmountFound>
                                Найдено
                                <StyledAmountFoundHighlighted>
                                  {total}
                                </StyledAmountFoundHighlighted>
                      Решений
                              </StyledAmountFound>
                            )}
                        </>
                      )}

                    {perPage !== 50 && <Navigation total={total} perPage={perPage} page={page} />}

                    <Switcher
                      isListView={isListView}
                      onChange={isList => toggleListView(isList)}
                    />
                  </StyledOptions>

                  <Results isListView={isListView} results={results} />
                </>
              ) : (
                  <StyledNoResults>Нет результатов</StyledNoResults>
                )}
            </>
          )}
      </>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  margin-bottom: ${({ theme }) => theme.rem(75)};
`;

const StyledLoaderWrapper = styled.div`
  align-items: center;
  display: flex;
  height: ${({ theme }) => theme.rem(100)};
  position: relative;
`;

const StyledNoResults = styled.p`
  font-size: ${({ theme }) => theme.rem(26)};
  margin-top: ${({ theme }) => theme.rem(40)};
  text-align: center;
`;

const StyledOptions = styled.div`
  align-items: center;
  display: flex;
  height: ${({ theme }) => theme.rem(75)};

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}px) {
    height: ${({ theme }) => theme.rem(60)};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}px) {
    height: auto;
    flex-direction: column-reverse;
  }
`;

const StyledAmountFound = styled.div`
  color: #919191;
  flex: 0 1 ${({ theme }) => theme.rem(390)};
  font-size: ${({ theme }) => theme.rem(24)};
  line-height: 1;
  padding-left: ${({ theme }) => theme.rem(30)};
  white-space: nowrap;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}px) {
    flex: 0 1 ${({ theme }) => theme.rem(320)};
    font-size: ${({ theme }) => theme.rem(20)};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}px) {
    flex: 0 1 auto;
    margin-bottom: ${({ theme }) => theme.rem(25)};
    margin-top: ${({ theme }) => theme.rem(20)};
    padding-left: 0;
  }
`;

const StyledAmountFoundHighlighted = styled.span`
  color: ${({ theme }) => theme.colors.red};
  display: inline-block;
  margin: 0 ${({ theme }) => theme.rem(5)};
`;

export default Solutions;
