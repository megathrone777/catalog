import React from "react";

import Layout from "~/components/Layout";
import Breadcrumbs from "~/components/Breadcrumbs";
import Login from "~/components/Login";

const LoginPage = (): JSX.Element => (
  <Layout title="Login">
    <Breadcrumbs />
    <Login />
  </Layout>
);

export default LoginPage;
