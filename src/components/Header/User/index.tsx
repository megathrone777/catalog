import React, { useContext, useState } from "react";
import Link from "next/link";
import fetch from "isomorphic-unfetch";
import { useRouter } from "next/router";

import { cookie } from "~/utilites";
import { GlobalContext } from "~/components/Layout";
import Loader from "~/components/Loader";
import styled from "~/theme";

interface Props {
  isLoggedIn: boolean | null;
  fullName: string | null;
}

const User = ({ isLoggedIn, fullName }: Props): JSX.Element => {
  const router = useRouter();
  const { setUserInfo } = useContext(GlobalContext);
  const [loading, setLoading] = useState<boolean>(false);

  const handleLogout = (): void => {
    const authToken =
      document.cookie && cookie.parseCookie("authToken", document.cookie);

    setLoading(true);
    fetch("http://10.10.45.10/api/auth/logout", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${authToken}`
      }
    }).then(response => {
      if (response.ok) {
        setUserInfo({
          isLoggedIn: false,
          fullName: null
        });
        document.cookie =
          "authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        router.push("/");
      }
      setLoading(false);
    });
  };

  loading && <Loader />;

  return (
    <StyledWrapper>
      {isLoggedIn === null ? (
        <div />
      ) : (
        <>
          {isLoggedIn ? (
            <>
              {fullName && <StyledText>Hello, {fullName}</StyledText>}
              <StyledLogout onClick={handleLogout} type="button">
                <StyledLogoutIcon>
                  <StyledSvgSymbol
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                  >
                    <StyledPathSymbol
                      fill="white"
                      d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 
					  16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"
                    />
                  </StyledSvgSymbol>
                </StyledLogoutIcon>
              </StyledLogout>
            </>
          ) : (
            <>
              <Link href="/registration" as="/registration" passHref>
                <StyledLink>Registration</StyledLink>
              </Link>

              <Link href="/login" as="/login" passHref>
                <StyledLink>Log In</StyledLink>
              </Link>
            </>
          )}
        </>
      )}
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: flex-end;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}px) {
    margin-bottom: ${({ theme }) => theme.rem(40)};
  }
`;

const StyledLink = styled.a`
  color: ${({ theme }) => theme.colors.whiteLighter};
  cursor: pointer;
  font-size: ${({ theme }) => theme.rem(16)};
  margin-left: ${({ theme }) => theme.rem(50)};
  text-decoration: none;

  &:first-of-type {
    margin-left: 0;
  }

  &:hover {
    text-decoration: underline;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}px) {
    margin-left: ${({ theme }) => theme.rem(40)};
  }
`;

const StyledText = styled.p`
  color: ${({ theme }) => theme.colors.whiteLighter};
  margin-right: ${({ theme }) => theme.rem(20)};
`;

const StyledLogout = styled.button`
  background: ${({ theme }) => theme.colors.orange};
  border-radius: ${({ theme }) => theme.rem(5)};
  border: 0;
  cursor: pointer;
  height: ${({ theme }) => theme.rem(28)};
  padding: 0;
  text-align: center;
  width: ${({ theme }) => theme.rem(28)};
`;

const StyledLogoutIcon = styled.i`
  display: inline-block;
  width: ${({ theme }) => theme.rem(14)};
`;

const StyledSvgSymbol = styled.svg``;
const StyledPathSymbol = styled.path``;

export default User;
