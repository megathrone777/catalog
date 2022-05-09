import React, {
  useState,
  ChangeEvent,
  useEffect,
  SyntheticEvent,
  useContext
} from "react";
import fetch from "isomorphic-unfetch";
import { useRouter } from "next/router";
import Link from "next/link";

import { GlobalContext } from "~/components/Layout";
import styled from "~/theme";
import Loader from "~/components/Loader";

const Login = (): JSX.Element => {
  const router = useRouter();
  const [login, setLogin] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [allowSubmit, toggleAllowSubmit] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [loginError, setLoginError] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const { setUserInfo } = useContext(GlobalContext);

  const handleRouteComplete = (): void => {
    setLoading(false);
  };

  const handleSubmit = (event: SyntheticEvent): void => {
    event.preventDefault();

    if (login && login.length > 0 && password && password.length > 0) {
      setLoading(true);
      setLoginError(false);
      setPasswordError(false);

      fetch("http://10.10.45.10/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          login,
          password
        })
      })
        .then(response => {
          if (response.status === 404) {
            setLoading(false);
            throw new Error("User not found");
          }

          if (response.status === 400) {
            setLoading(false);
            throw new Error("Login or password is too short");
          }

          return response.json();
        })
        .then(data => {
          const { accessToken, user } = data;

          if (accessToken && accessToken.length > 0) {
            router.push("/");
            document.cookie = `authToken=${accessToken}`;
            setUserInfo({
              isLoggedIn: true,
              fullName: user.fullName
            });
            router.events.on("routeChangeComplete", handleRouteComplete);
          }
        })
        .catch((error: Error) => {
          setLoading(false);
          setError(error.message);
        });
    }
  };

  const handleLoginChange = (event: ChangeEvent<HTMLInputElement>) => {
    setLogin(event.currentTarget.value);
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.currentTarget.value);
  };

  const checkFields = () => {
    if (login.length > 0 && password.length > 0) {
      toggleAllowSubmit(true);
    } else {
      toggleAllowSubmit(false);
    }
  };

  useEffect((): void => {
    checkFields();
  }, [login, password]);

  useEffect(() => {
    return () => {
      router.events.off("routeChangeComplete", handleRouteComplete);
    };
  }, []);

  return (
    <StyledWrapper>
      {loading && <Loader />}
      <StyledErrors>
        {error && <StyledErrorsItem>{error}</StyledErrorsItem>}
        {loginError && (
          <StyledErrorsItem>Please fill login field</StyledErrorsItem>
        )}
        {passwordError && (
          <StyledErrorsItem>Please fill password field</StyledErrorsItem>
        )}
      </StyledErrors>

      <StyledForm action="#" method="post" onSubmit={handleSubmit}>
        <StyledFormItem>
          <StyledFormInput
            onChange={handleLoginChange}
            type="text"
            placeholder="Login"
          />
        </StyledFormItem>
        <StyledFormItem>
          <StyledFormInput
            onChange={handlePasswordChange}
            type="password"
            placeholder="Password"
          />
        </StyledFormItem>

        <StyledSubmit disabled={!allowSubmit} type="submit">
          Log in
        </StyledSubmit>
      </StyledForm>

      <StyledForgot>
        <StyledForgotLink href="#">Forgot Password?</StyledForgotLink>
        <Link href="/registration" as="/registration" passHref>
          <StyledRegisterLink href="#">Registration</StyledRegisterLink>
        </Link>
      </StyledForgot>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  background: white;
  border-bottom-width: ${({ theme }) => theme.rem(27)};
  border-color: #c7c9cd;
  border-left-width: ${({ theme }) => theme.rem(8)};
  border-radius: ${({ theme }) => theme.rem(10)};
  border-right-width: ${({ theme }) => theme.rem(8)};
  border-style: solid;
  margin: ${({ theme }) => theme.rem(75)} auto;
  max-width: ${({ theme }) => theme.rem(445)};
  padding-top: ${({ theme }) => theme.rem(30)};
  position: relative;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}px) {
    margin-top: ${({ theme }) => theme.rem(10)};
  }
`;

const StyledErrors = styled.div`
  color: red;
  text-align: center;
`;

const StyledErrorsItem = styled.p`
  margin-bottom: ${({ theme }) => theme.rem(20)};
`;

const StyledForm = styled.form`
  max-width: ${({ theme }) => theme.rem(385)};
  margin: 0 auto;
`;

const StyledFormItem = styled.div`
  background: #f6f6f6;
  height: ${({ theme }) => theme.rem(60)};
  margin-bottom: ${({ theme }) => theme.rem(25)};

  @media (max-width: ${({ theme }) => theme.breakpoints.xs}px) {
    margin-left: ${({ theme }) => theme.rem(10)};
    margin-right: ${({ theme }) => theme.rem(10)};
  }
`;

const StyledFormInput = styled.input`
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.colors.grayDarker};
  font-size: ${({ theme }) => theme.rem(15)};
  height: 100%;
  padding: 0;
  text-align: center;
  width: 100%;

  &::placeholder,
  &::-webkit-input-placeholder {
    color: ${({ theme }) => theme.colors.grayDarker};
    text-shadow: 0 0 1px ${({ theme }) => theme.colors.grayDarker};
  }

  &:-ms-input-placeholder {
    color: ${({ theme }) => theme.colors.grayDarker};
    text-shadow: 0 0 1px ${({ theme }) => theme.colors.grayDarker};
  }

  &:focus {
    outline: none;

    &::placeholder,
    &::-webkit-input-placeholder {
      color: transparent;
      text-shadow: none;
    }

    &:-ms-input-placeholder {
      color: transparent;
      text-shadow: none;
    }
  }
`;

const StyledSubmit = styled.button`
  background: ${({ theme }) => theme.colors.orange};
  border-radius: ${({ theme }) => theme.rem(10)};
  border: none;
  box-shadow: 0px 8px 21px 10px rgba(199, 201, 205, 1);
  cursor: pointer;
  display: block;
  font-size: ${({ theme }) => theme.rem(24)};
  height: ${({ theme }) => theme.rem(54)};
  margin: 0 auto ${({ theme }) => theme.rem(25)};
  padding: 0;
  text-align: center;
  width: ${({ theme }) => theme.rem(200)};

  &:focus {
    outline: none;
  }
`;

const StyledForgot = styled.div`
  align-items: center;
  background: #f6f6f6;
  display: flex;
  flex-direction: column;
  height: ${({ theme }) => theme.rem(75)};
  justify-content: center;
`;

const StyledForgotLink = styled.a`
  color: #017cff;
  display: block;
  font-size: ${({ theme }) => theme.rem(14)};
  margin-bottom: ${({ theme }) => theme.rem(10)};
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const StyledRegisterLink = styled.a`
  color: #017cff;
  display: block;
  font-size: ${({ theme }) => theme.rem(14)};
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

export default Login;
