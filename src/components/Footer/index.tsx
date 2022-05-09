import React from 'react';

import styled from '~/theme';

const Footer: React.FC = (): JSX.Element => <StyledFooter />;

const StyledFooter = styled.footer`
  background: ${({ theme }) => theme.colors.darkBlue};
  height: ${({ theme }) => theme.rem(40)};
`;

export default Footer;
