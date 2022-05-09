import React from "react";

import Layout from "~/components/Layout";
import Breadcrumbs from "~/components/Breadcrumbs";
import Create from "~/components/Create";
import { TCategory } from "~/components/Create/HeadingMenu/Item";

interface Props {
  categories: TCategory[];
}

const CreatePage = ({ categories }: Props): JSX.Element => {
  return (
    <Layout title="Создать решение">
      <Breadcrumbs />
      <Create categories={categories} />
    </Layout>
  );
};

CreatePage.getInitialProps = async () => {
  const categories = await fetch(`http://10.10.45.10/api/category`)
    .then(res => res.json())
    .then(data => data)
	.catch(() => []);

  return {
    categories: [...categories]
  };
};

export default CreatePage;
