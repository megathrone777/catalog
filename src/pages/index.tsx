import React from "react";
import fetch from "isomorphic-unfetch";
import { NextPageContext } from "next";

import Catalog, { TCatalog } from "~/components/Catalog";
import Layout from "~/components/Layout";
import Search from "~/components/Search";
import Solutions, { TSolutions } from "~/components/Solutions";
import Container from "~/theme/global/container";
import styled from "~/theme";

interface Props {
  catalog: TCatalog;
  solutions: TSolutions;
}

const IndexPage = ({ catalog, solutions }: Props): JSX.Element => (
  <Layout title="Main page">
    <Search />

    <StyledContent>
      <Container>
        <StyledLayout>
          <StyledColLeft>
            <Catalog
              data={catalog}
              matchedCategories={solutions.matchedCategories}
            />
          </StyledColLeft>

          <StyledColRight>
            <Solutions data={solutions} />
          </StyledColRight>
        </StyledLayout>
      </Container>
    </StyledContent>
  </Layout>
);

const StyledContent = styled.div`
  padding-top: ${({ theme }) => theme.rem(5)};
`;

const StyledLayout = styled.div`
  display: flex;
  justify-content: space-between;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}px) {
    flex-direction: column;
  }
`;

const StyledColLeft = styled.div`
  flex: 0 1 ${({ theme }) => theme.rem(390)};
  margin-right: ${({ theme }) => theme.rem(5)};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}px) {
    flex: auto;
    margin-right: 0;
    margin-bottom: ${({ theme }) => theme.rem(5)};
    position: relative;
    z-index: 2;
  }
`;

const StyledColRight = styled.div`
  flex: 0 1 ${({ theme }) => theme.rem(960)};
  margin-left: ${({ theme }) => theme.rem(5)};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}px) {
    flex: auto;
    margin-left: 0;
    min-height: ${({ theme }) => theme.rem(295)};
    position: relative;
    z-index: 1;
  }
`;

IndexPage.getInitialProps = async ({ query }: NextPageContext) => {
  const {
    author,
    categoryIds,
    deepSearch,
    search,
    page,
    filters,
    orderField,
    orderWay
  } = query;

  const parsedCategoryIds = categoryIds && (categoryIds as string).split("&");

  const parsedFilters =
    filters &&
    (filters as string).split("&").reduce((arr: any[], str: any) => {
      const parsedRow = str.split("_");

      arr.push({
        type: parsedRow[0],
        from: parsedRow[1],
        to: parsedRow[2]
      });

      return arr;
    }, []);

  const categories = await fetch(`http://10.10.45.10/api/category`)
    .then(response => response.json())
    .then(data => data)
    .catch(() => []);

  const solutions = await fetch(`http://10.10.45.10/api/solution/list`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      author,
      categoryIds: parsedCategoryIds || [],
      deepSearch,
      perPage: parsedCategoryIds || search || deepSearch || filters ? 10 : 50,
      search,
      filters: parsedFilters,
      page: page || 1,
      orderField,
      orderWay
    })
  })
    .then(response => {
      return response.json();
    })
    .then(data => {
      return data;
    });

  return {
    catalog: {
      menu: [...categories]
    },

    solutions: {
      results: (solutions.data && [...solutions.data]) || [],
      total: parseFloat(solutions.meta?.total) || 0,
      page: parseFloat(solutions.meta?.page) || 1,
      perPage: parseFloat(solutions.meta?.perPage) || 10,
      deepSearch: solutions.meta?.deepSearch || "",
      matchedCategories: solutions.matchedCategories || []
    }
  };
};

export default IndexPage;
