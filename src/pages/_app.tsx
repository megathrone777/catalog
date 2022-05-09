import React, { useEffect, useState, useRef } from "react";
import App, { AppContext, AppProps } from "next/app";
import { useRouter } from "next/router";
import fetch from "isomorphic-unfetch";

import { cookie } from "~/utilites";
import { GlobalContext, TQueryString } from "~/components/Layout";

interface Props extends AppProps {
  authToken: string;
}

const CatalogApp = ({
  Component,
  pageProps,
  authToken
}: Props): JSX.Element => {
  const firstUpdate = useRef(true);
  const router = useRouter();
  const { pathname, query } = router;
  const {
    deepSearch,
    search,
    filters,
    page,
    orderField,
    orderWay,
    categoryIds,
    author
  } = query;
  const [userInfo, setUserInfo] = useState<{
    isLoggedIn: boolean | null;
    fullName: string | null;
  }>({
    isLoggedIn: null,
    fullName: null
  });
  const [queryString, setQueryString] = useState<TQueryString>({
    categoryIds: categoryIds
      ? decodeURIComponent(categoryIds.toString()).split("&")
      : [],
    search,
    filters,
    page: page || "1",
    orderField: orderField || "",
    orderWay: orderWay || "ASC",
    deepSearch,
    author
  });
  const { isLoggedIn, fullName } = userInfo;

  const handleToken = () => {
    if (authToken) {
      fetch("http://10.10.45.10/api/auth/user", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      })
        .then(response => {
          if (response.ok) return response.json();

          return {
            isLoggedIn: false,
            fullName: ""
          };
        })
        .then(({ fullName }) => {
          setUserInfo({
            isLoggedIn: fullName.length > 0,
            fullName
          });
        });
      return;
    }

    setUserInfo({
      isLoggedIn: false,
      fullName: ""
    });
  };

  const handleQueryString = (): void => {
    const searchString =
      queryString?.search?.length > 0
        ? `search=${encodeURIComponent(queryString.search as string)}&`
        : "";
    const filtersString =
      queryString?.filters?.length > 0
        ? `filters=${encodeURIComponent(queryString.filters as string)}&`
        : "";
    const solutionsPage =
      queryString?.page && parseFloat(queryString.page as string) > 1
        ? `page=${encodeURIComponent(queryString.page as string)}&`
        : "";
    const orderField =
      queryString?.orderField?.length > 0
        ? `orderField=${encodeURIComponent(queryString.orderField as string)}&`
        : "";
    const orderWay =
      queryString?.orderWay !== "ASC"
        ? `orderWay=${encodeURIComponent(queryString.orderWay as string)}&`
        : "";
    ``;
    const categoryIds =
      queryString?.categoryIds?.length > 0
        ? `categoryIds=${encodeURIComponent(
            queryString.categoryIds.join("&")
          )}&`
        : "";
    const deepSearch =
      queryString?.deepSearch?.length > 0
        ? `deepSearch=${encodeURIComponent(queryString.deepSearch as string)}&`
        : "";
    const author =
      queryString?.author?.length > 0
        ? `author=${encodeURIComponent(queryString.author as string)}&`
        : "";

    const q = `${deepSearch}${searchString}${filtersString}${solutionsPage}${orderField}${orderWay}${categoryIds}${author}`;
    const newQuery = q.length > 0 ? `/?${q.substr(0, q.length - 1)}` : pathname;

    router.push(newQuery, undefined, { shallow: false });
  };

  useEffect((): void => {
    if (firstUpdate.current) {
      firstUpdate.current = false;

      return;
    }

    handleQueryString();
  }, [queryString]);

  useEffect((): void => {
    handleToken();
  }, []);

  return (
    <>
      <GlobalContext.Provider
        value={{
          userInfo: {
            isLoggedIn,
            fullName
          },
          queryString,
          setQueryString,
          setUserInfo
        }}
      >
        <Component {...pageProps} />
      </GlobalContext.Provider>

      <style jsx global>{`
        @font-face {
          font-family: "Roboto";
          src: url("/fonts/Roboto-Regular.ttf");
          font-weight: bold;
          font-style: normal;
        }
        @font-face {
          font-family: "RobotoLight";
          src: url("/fonts/Roboto-Light.ttf");
          font-weight: bold;
          font-style: normal;
        }
        @font-face {
          font-family: "RobotoMedium";
          src: url("/fonts/Roboto-Medium.ttf");
          font-weight: bold;
          font-style: normal;
        }
        @font-face {
          font-family: "RobotoBold";
          src: url("/fonts/Roboto-Bold.ttf");
          font-weight: bold;
          font-style: normal;
        }
      `}</style>
    </>
  );
};

CatalogApp.getInitialProps = async (appContext: AppContext) => {
  const appProps = await App.getInitialProps(appContext);
  const cookies = appContext.ctx.req?.headers.cookie;
  const authToken = cookies && cookie.parseCookie("authToken", cookies);

  return { ...appProps, authToken };
};

export default CatalogApp;
