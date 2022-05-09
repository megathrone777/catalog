import React, { useState, useContext, useEffect } from "react";
import AnimateHeight from "react-animate-height";
import { useRouter } from "next/router";

import Loader from "~/components/Loader";
import Menu from "./Menu";
import styled, { css } from "~/theme";
import { TMenuItem } from "./Menu/Item";
import { GlobalContext } from "~/components/Layout";
import scrollbar from "~/theme/mixins/scrollbar";

export interface TCatalog {
  menu: TMenuItem[];
}

export interface TMatchedCategory {
  id: string | number;
  count: number;
  total: number;
}

interface Props {
  data: TCatalog;
  matchedCategories: TMatchedCategory[];
}

const Catalog = ({ data, matchedCategories: matches }: Props): JSX.Element => {
  const router = useRouter();

  const [loading, toggleLoading] = useState<boolean>(false);
  const [contentIsOpened, toggleContentIsOpened] = useState<boolean>(false);
  const [inactive, toggleInactive] = useState<boolean>(false);
  const { menu } = data;
  const { queryString, setQueryString, userInfo } = useContext(GlobalContext);
  const { isLoggedIn } = userInfo;
  const [matchedCategories, setMatchedCategories] = useState(matches);
  const [currentId, setCurrentId] = useState<string | string[]>();
  const [catalogExpanded, toggleCatalogExpanded] = useState<boolean>(
    queryString.categoryIds.length > 0
  );

  const checkContentSection = (): void => {
    if (window.innerWidth < 1000) {
      toggleContentIsOpened(false);
    } else {
      toggleContentIsOpened(true);
    }
  }

  const handleContentView = (): void => {
    toggleContentIsOpened(!contentIsOpened);
  };

  const handleInactive = (): void => {
    toggleInactive(!inactive);
  };

  const handleHome = (): void => {
    setQueryString({
      ...queryString,
      categoryIds: []
    });
  };

  const handleCreate = (): void => {
    router.push(
      {
        pathname: isLoggedIn ? `/create` : "/login",
        query: {
          currentId
        }
      },
      "/create"
    );
  };

  const handleCurrentId = (id: string | string[]): void => {
    setCurrentId(id);
  };

  useEffect((): void => {
    setMatchedCategories(matches);
  }, [matches]);

  useEffect((): void => {
    toggleCatalogExpanded(queryString.categoryIds.length > 0);
  }, [loading]);

  useEffect(() => {
    window.addEventListener('resize', checkContentSection);

    checkContentSection();

    const handleRouteStart = (url: string): void => {
      if (url.includes("?") || url === "/") toggleLoading(true);
    };

    const handleRouteEnd = (): void => {
      toggleLoading(false);
    };

    router.events.on("routeChangeStart", handleRouteStart);
    router.events.on("routeChangeComplete", handleRouteEnd);

    return () => {
      router.events.off("routeChangeStart", handleRouteStart);
      router.events.off("routeChangeComplete", handleRouteEnd);
    };
  }, []);

  return (
    <StyledWrapper>
      <StyledHeader>
        <StyledHomeButton
          onClick={handleHome}
          type="button"
          visible={catalogExpanded}
        >
          <StyledHomeIcon>
            <StyledSvgSymbol
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 576 512"
            >
              <StyledPathSymbol
                fill="currentColor"
                d="M280.37 148.26L96 300.11V464a16 16 0 0 0 16 16l112.06-.29a16 16 0 0 0 15.92-16V368a16 16 0 0 
			  1 16-16h64a16 16 0 0 1 16 16v95.64a16 16 0 0 0 16 16.05L464 480a16 16 0 0 0 16-16V300L295.67 148.26a12.19 12.19 0 0 0-15.3 
			  0zM571.6 251.47L488 182.56V44.05a12 12 0 0 0-12-12h-56a12 12 0 0 0-12 12v72.61L318.47 43a48 48 0 0 0-61 0L4.34 251.47a12 12 0 0 0-1.6 
			  16.9l25.5 31A12 12 0 0 0 45.15 301l235.22-193.74a12.19 12.19 0 0 1 15.3 0L530.9 301a12 12 0 0 0 16.9-1.6l25.5-31a12 12 0 0 0-1.7-16.93z"
              />
            </StyledSvgSymbol>
          </StyledHomeIcon>
        </StyledHomeButton>

        {catalogExpanded ? (
          <StyledToggleInactive>
            <StyledInactiveCheckbox
              id="inactive"
              type="checkbox"
              onChange={handleInactive}
              checked={inactive}
            />
            <StyledInactiveLabel htmlFor="inactive">
              Скрыть неактивные
            </StyledInactiveLabel>
          </StyledToggleInactive>
        ) : (
            <StyledTitle onClick={handleContentView}>Catalog</StyledTitle>
          )}

        {loading && (
          <StyledHeaderLoader>
            <Loader transparent small />
          </StyledHeaderLoader>
        )}

        <StyledFavourite type="button">
          <StyledFavouriteIcon>
            <StyledSvgSymbol
              xmlns="http://www.w3.org/2000/svg"
              height="24"
              viewBox="0 0 24 24"
              width="24"
            >
              <StyledPathSymbol d="M0 0h24v24H0z" fill="none" />
              <StyledPathSymbol d="M0 0h24v24H0z" fill="none" />
              <StyledPathSymbol
                d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                fill="currentColor"
              />
            </StyledSvgSymbol>
          </StyledFavouriteIcon>
        </StyledFavourite>
      </StyledHeader>

      <AnimateHeight height={contentIsOpened ? 'auto' : 0}>
        <StyledContent isOpened={contentIsOpened}>
          <Menu
            currentCategory={currentId ? currentId : ""}
            enableCategory={(id: string | string[]) => handleCurrentId(id)}
            items={menu}
            matchedCategories={matchedCategories}
            inactiveHidden={inactive}
          />

          <StyledCreateSolution
            underlined={currentId !== undefined}
            onClick={handleCreate}
          >
            Создать решение
          </StyledCreateSolution>
        </StyledContent>
      </AnimateHeight>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  background: ${({ theme }) => theme.colors.darkBlue};
  border-radius: ${({ theme }) => theme.rem(10)};
  position: relative;
  top: ${({ theme }) => theme.rem(-80)};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}px) {
    top: 0;
  }
`;

const StyledHeader = styled.div`
  align-items: center;
  display: flex;
  height: ${({ theme }) => theme.rem(75)};
  justify-content: space-between;
  overflow: hidden;
  padding-left: ${({ theme }) => theme.rem(50)};
  padding-right: ${({ theme }) => theme.rem(20)};
  position: relative;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}px) {
    padding-left: ${({ theme }) => theme.rem(20)};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.xs}px) {
    padding-left: ${({ theme }) => theme.rem(10)};
    padding-right: ${({ theme }) => theme.rem(15)};
  }
`;

const StyledHeaderLoader = styled.div`
  position: absolute;
  right: ${({ theme }) => theme.rem(70)};
  margin-top: ${({ theme }) => theme.rem(20)};
`;

const StyledToggleInactive = styled.div`
  align-items: center;
  display: flex;
  padding-left: ${({ theme }) => theme.rem(20)};
`;

const StyledInactiveLabel = styled.label`
  color: white;
  cursor: pointer;
  font-family: ${({ theme }) => theme.fonts.fontLight};
  line-height: 1;
  margin-left: ${({ theme }) => theme.rem(10)};
  user-select: none;
`;

const StyledInactiveCheckbox = styled.input`
  appearance: none;
  background: url("/images/check_bg.svg") ${({ theme }) => theme.rem(-30)}
    center/ ${({ theme }) => theme.rem(10)} auto no-repeat;
  border: ${({ theme }) => theme.rem(1)} solid white;
  border-radius: ${({ theme }) => theme.rem(3)};
  cursor: pointer;
  height: ${({ theme }) => theme.rem(20)};
  margin: 0;
  overflow: hidden;
  padding: 0;
  width: ${({ theme }) => theme.rem(20)};

  &:checked {
    background-position: center center;
    border-color: ${({ theme }) => theme.colors.orange};
  }

  &:focus {
    outline: none;
  }
`;

const StyledHomeButton = styled.button<{
  visible: boolean;
}>`
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  left: 0;
  transform: translateX(${({ theme }) => theme.rem(-25)}) translateY(-50%);
  padding: 0;
  transition: transform 0.1s ease-in;
  position: absolute;
  top: 52%;
  width: ${({ theme }) => theme.rem(25)};

  &:focus {
    outline: none;
  }

  ${({ visible }) =>
    visible &&
    css`
      transform: translateX(${({ theme }) => theme.rem(13)}) translateY(-50%);
    `};
`;

const StyledHomeIcon = styled.i``;

const StyledContent = styled.div<{
  isOpened: boolean;
}>`
  background: white;
  border-top-left-radius: ${({ theme }) => theme.rem(10)};
  margin-left: ${({ theme }) => theme.rem(50)};
  min-height: calc(100vh - ${({ theme }) => theme.rem(290)});
  padding-bottom: ${({ theme }) => theme.rem(17)};
  padding-top: ${({ theme }) => theme.rem(10)};
  position: relative;
  transition: all 0.1s ease-in;

  ${scrollbar};

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}px) {
    margin-left: ${({ theme }) => theme.rem(35)};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}px) {
    border-bottom-left-radius: ${({ theme }) => theme.rem(10)};
    border-bottom-right-radius: ${({ theme }) => theme.rem(10)};
    border-top-left-radius: 0;
    height: 0;
    min-height: 0;
    margin-left: 0;
    overflow-y: auto;
    padding-bottom: 0;
    padding-top: 0;

    ${({ isOpened }) =>
    isOpened &&
    css`
        height: ${({ theme }) => theme.rem(300)};
        padding-bottom: ${({ theme }) => theme.rem(17)};
      `}
  }
`;

const StyledTitle = styled.div`
  align-items: center;
  background: url("/images/catalog_bg.png") left ${({ theme }) => theme.rem(2)}
    center no-repeat;
  color: white;
  display: flex;
  font-size: ${({ theme }) => theme.rem(18)};
  padding-left: ${({ theme }) => theme.rem(38)};
  line-height: 1;
`;

const StyledFavourite = styled.button`
  align-items: center;
  background-color: transparent;
  border: ${({ theme }) => theme.rem(1)} solid
    ${({ theme }) => theme.colors.blue};
  border-radius: ${({ theme }) => theme.rem(5)};
  color: ${({ theme }) => theme.colors.blue};
  cursor: pointer;
  display: flex;
  height: ${({ theme }) => theme.rem(30)};
  justify-content: center;
  padding: 0;
  width: ${({ theme }) => theme.rem(30)};

  &:focus {
    outline: none;
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors.blue};
    color: white;
  }
`;

const StyledFavouriteIcon = styled.i`
  display: block;
  height: ${({ theme }) => theme.rem(20)};
  width: ${({ theme }) => theme.rem(20)};
`;

const StyledSvgSymbol = styled.svg`
  height: 100%;
  width: 100%;
`;

const StyledPathSymbol = styled.path``;

const StyledCreateSolution = styled.a<{ underlined: boolean }>`
  background: ${({ theme }) => theme.colors.orange};
  border-radius: ${({ theme }) => theme.rem(8)};
  box-shadow: 0px 5px 5px 0px rgba(254, 145, 20, 0.38);
  color: white;
  cursor: pointer;
  display: block;
  font-size: ${({ theme }) => theme.rem(16)};
  height: ${({ theme }) => theme.rem(46)};
  line-height: ${({ theme }) => theme.rem(46)};
  margin: 0 auto;
  text-align: center;
  text-decoration: none;
  width: ${({ theme }) => theme.rem(200)};

  ${({ underlined }) =>
    underlined &&
    `
	text-decoration: underline;
  `}

  &:hover {
    filter: brightness(95%);
  }

  &:focus {
    filter: brightness(90%);
  }
`;

export default Catalog;
