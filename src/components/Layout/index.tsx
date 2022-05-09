import React, { createContext } from "react";
import Head from "next/head";

import Footer from "~/components/Footer";
import GlobalStyle from "~/theme/global-style";
import Header from "~/components/Header";
import styled, { theme, ThemeProvider } from "~/theme";

interface TUserInfo {
  isLoggedIn: boolean | null;
  fullName: string | null;
}

export interface TQueryString {
  categoryIds: string[];
  search: string | string[];
  filters: string | string[];
  page: string | string[];
  orderField: string | string[];
  orderWay: string | string[];
  deepSearch: string | string[];
  author: string | string[];
}

interface TGlobalContext {
  userInfo: TUserInfo;
  setUserInfo: (userInfo: TUserInfo) => void;
  queryString: TQueryString;
  setQueryString: (query: TQueryString) => void;
}

export const GlobalContext = createContext<TGlobalContext>({
  userInfo: {
    isLoggedIn: null,
    fullName: null
  },
  queryString: {
    categoryIds: [],
    search: "",
    filters: "",
    page: "1",
    orderField: "",
    orderWay: "",
    deepSearch: "",
    author: ""
  },
  setQueryString: (): void => {},
  setUserInfo: (): void => {}
});

interface TLayout {
  children?: any;
  title: string;
}

const Layout = ({ title, children }: TLayout): JSX.Element => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <>
          <GlobalStyle />

          <StyledWrapper>
            <Header />
            <StyledMain>{children}</StyledMain>
            <Footer />
          </StyledWrapper>
        </>
      </ThemeProvider>
    </>
  );
};

const StyledWrapper = styled.div``;

const StyledMain = styled.main`
  background: ${({ theme }) => theme.colors.white};
  min-height: calc(100vh - ${({ theme }) => theme.rem(120)});

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}px) {
    min-height: calc(100vh - ${({ theme }) => theme.rem(100)});
  }
`;

export default Layout;
