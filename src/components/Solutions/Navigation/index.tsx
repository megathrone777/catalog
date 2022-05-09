import React, { useContext } from "react";
import Pagination from "react-js-pagination";

import { GlobalContext } from "~/components/Layout";
import styled from "~/theme";

interface Props {
  page: number;
  total: number;
  perPage: number;
}

const Navigation: React.FC<Props> = ({ page, perPage, total }: Props): React.ReactElement => {
  const { queryString, setQueryString } = useContext(GlobalContext);
  const totalPages = Math.round(total / perPage);

  const handlePaginationQuery = (
    pageNumber: number
  ): void => {
    setQueryString({
      ...queryString,
      page: `${pageNumber}`
    });
  };

  return <>
    <StyledWrapper>
      <StyledPagination>
        <Pagination
          activeLinkClass="pagination__link--active"
          activePage={page}
          hideNavigation
          hideFirstLastPages
          itemsCountPerPage={perPage}
          totalItemsCount={total}
          pageRangeDisplayed={4}
          onChange={handlePaginationQuery}
          itemClass="pagination__item"
          linkClass="pagination__link"
        />

        {totalPages > 4 && (
          <>
            {page >= totalPages - 2 ? null : (
              <>
                <StyledRange>
                  <StyledLink>...</StyledLink>
                </StyledRange>

                <StyledItem>
                  <StyledLink href="#" onClick={() => handlePaginationQuery(totalPages)}>{totalPages}</StyledLink>
                </StyledItem>
              </>
            )}
          </>
        )}
      </StyledPagination>
    </StyledWrapper>
  </>
};

const StyledWrapper = styled.div`
  flex: 0 1 ${({ theme }) => theme.rem(210)};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}px) {
    flex: 0 1 auto;
    margin-top: ${({ theme }) => theme.rem(20)};
  }
`;

const StyledPagination = styled.div`
  display: flex;
  justify-content: center;

  .pagination {
    display: flex;
    justify-content: center;
  }
  
  .pagination__item {
    border-radius: ${({ theme }) => theme.rem(5)};
    height: ${({ theme }) => theme.rem(35)};
    overflow: hidden;
    width: ${({ theme }) => theme.rem(35)};
  }

  .pagination__link {
    color: ${({ theme }) => theme.colors.grayLightest};
    display: block;
    font-size: ${({ theme }) => theme.rem(16)};
    height: 100%;
    line-height: ${({ theme }) => theme.rem(37)};
    text-align: center;
    text-decoration: none;

    &:hover {
      background: ${({ theme }) => theme.colors.darkBlue};
      color: white;
    }

    @media (max-width: ${({ theme }) => theme.breakpoints.lg}px) {
      font-size: ${({ theme }) => theme.rem(15)};
    }
  }

  .pagination__link--active {
    background: ${({ theme }) => theme.colors.darkBlue};
    color: white;
  }
`;

const StyledRange = styled.span`
  border-radius: ${({ theme }) => theme.rem(5)};
  color: ${({ theme }) => theme.colors.grayLightest};
  height: ${({ theme }) => theme.rem(35)};
  width: ${({ theme }) => theme.rem(35)};
`;

const StyledItem = styled.span`
  border-radius: ${({ theme }) => theme.rem(5)};
  color: ${({ theme }) => theme.colors.grayLightest};
  height: ${({ theme }) => theme.rem(35)};
  width: ${({ theme }) => theme.rem(35)};

  &:hover {
    background: ${({ theme }) => theme.colors.darkBlue};
    color: white;
  }
`;

const StyledLink = styled.a`
  color: inherit;
  display: block;
  font-size: ${({ theme }) => theme.rem(16)};
  height: 100%;
  line-height: ${({ theme }) => theme.rem(37)};
  text-align: center;
  text-decoration: none;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}px) {
    font-size: ${({ theme }) => theme.rem(15)};
  }
`;

export default Navigation;
