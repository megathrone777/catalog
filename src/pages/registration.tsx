import React from 'react';

import Layout from '~/components/Layout';
import Breadcrumbs from '~/components/Breadcrumbs';
import Registration from '~/components/Registration';

const RegistrationPage = (): JSX.Element => {
  return (
    <Layout title='Registration'>
      <Breadcrumbs />
      <Registration />
    </Layout>
  );
};

export default RegistrationPage;
