import React from "react";
import { NextPageContext } from "next";
import fetch from "isomorphic-unfetch";

import Layout from "~/components/Layout";
import Breadcrumbs from "~/components/Breadcrumbs";
import Solution, { TSolution } from "~/components/Solution";

interface Props {
  solution: TSolution;
}

const SolutionPage = ({ solution }: Props): JSX.Element => (
  <Layout title={solution.title}>
    <Breadcrumbs solution={solution.title} />
    <Solution solution={solution} />
  </Layout>
);

SolutionPage.getInitialProps = async ({ query }: NextPageContext) => {
  const { id } = query;

  const solution = await fetch(`http://10.10.45.10/api/solution/details/${id}`)
    .then(response => response.json())
    .then(data => data)
    .catch(() => []);

  return {
    solution
  };
};

export default SolutionPage;
