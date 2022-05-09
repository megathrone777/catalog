import React from "react";

import Layout from "~/components/Layout";
import styled from "~/theme";

const ErrorPage = (): JSX.Element => (
  <Layout title="Page not found">
    <StyledTitle>Page not found</StyledTitle>
  </Layout>
);

const StyledTitle = styled.h1`
  font-size: ${({ theme }) => theme.rem(40)};
  margin-top: ${({ theme }) => theme.rem(40)};
  text-align: center;
`;

export default ErrorPage;
