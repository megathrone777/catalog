import React, { useState, FormEvent, SyntheticEvent, useEffect } from "react";
import { useRouter } from "next/router";

import styled from "~/theme";
import Loader from "~/components/Loader";

const Registration = (): JSX.Element => {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [allowSubmit, toggleAllowSubmit] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const checkFields = () => {
    if (
      password.length > 0 &&
      confirmPassword.length > 0 &&
      password === confirmPassword
    ) {
      toggleAllowSubmit(true);
    } else {
      toggleAllowSubmit(false);
    }
  };

  const handleEmailChange = (event: SyntheticEvent<HTMLInputElement>) => {
    setEmail(event.currentTarget.value);
  };

  const handleUsernameChange = (event: SyntheticEvent<HTMLInputElement>) => {
    setUsername(event.currentTarget.value);
  };

  const handlePasswordChange = (event: SyntheticEvent<HTMLInputElement>) => {
    setPassword(event.currentTarget.value);
  };

  const handleConfirmPasswordChange = (
    event: SyntheticEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(event.currentTarget.value);
  };

  const handleSubmit = (event: FormEvent): void => {
    event.preventDefault();

    if (
      allowSubmit &&
      email &&
      email.length > 0 &&
      username &&
      username.length > 0 &&
      password &&
      password.length > 0
    ) {
      setLoading(true);

      fetch("http://10.10.45.10/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          fullName: username,
          username,
          password
        })
      })
        .then(response => {
          if (response.status === 409) {
            setLoading(false);
            throw new Error("User exists, please try another");
          }
          return response.json();
        })
        .then(data => {
          if (data.accessToken && data.accessToken.length > 0) {
            alert("Confirmation sent on email");
            router.push("/login");
            router.events.on("routeChangeComplete", () => setLoading(false));
          } else {
            setLoading(true);
          }
        })
        .catch((error: Error) => {
          setLoading(false);
          if (error.message === "Failed to fetch") {
            setError("No connection");
            return;
          }
          setError(error.message);
        });
    }
  };

  useEffect((): void => {
    checkFields();
  }, [password, confirmPassword]);

  return (
    <StyledWrapper>
      {loading && <Loader />}

      <StyledErrors>
        {password !== confirmPassword && (
          <StyledErrorsItem>Passwords mismatch</StyledErrorsItem>
        )}
        {error && error.length > 0 && (
          <StyledErrorsItem>{error}</StyledErrorsItem>
        )}
      </StyledErrors>

      <StyledForm action="#" method="post" onSubmit={handleSubmit}>
        <StyledFormItem>
          <StyledFormInput
            onChange={handleUsernameChange}
            type="text"
            placeholder="Full Name *"
          />
        </StyledFormItem>
        <StyledFormItem>
          <StyledFormInput
            onChange={handleEmailChange}
            type="email"
            placeholder="Your Email *"
          />
        </StyledFormItem>
        <StyledFormItem>
          <StyledFormInput
            onChange={handlePasswordChange}
            type="password"
            placeholder="Your Password *"
          />
        </StyledFormItem>
        <StyledFormItem>
          <StyledFormInput
            onChange={handleConfirmPasswordChange}
            type="password"
            placeholder="Confirm Password *"
          />
        </StyledFormItem>

        <StyledSubmit disabled={!allowSubmit} type="submit">
          Submit
        </StyledSubmit>
      </StyledForm>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  background: white;
  margin: ${({ theme }) => theme.rem(75)} auto;
  max-width: ${({ theme }) => theme.rem(1050)};
  min-height: ${({ theme }) => theme.rem(600)};
  padding-top: ${({ theme }) => theme.rem(90)};
  position: relative;
  border-bottom-width: ${({ theme }) => theme.rem(27)};
  border-color: #c7c9cd;
  border-left-width: ${({ theme }) => theme.rem(8)};
  border-radius: ${({ theme }) => theme.rem(10)};
  border-right-width: ${({ theme }) => theme.rem(8)};
  border-style: solid;

  @media (max-width: ${({ theme }) => theme.breakpoints.xs}px) {
    margin-top: ${({ theme }) => theme.rem(10)};
    padding-top: ${({ theme }) => theme.rem(30)};
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
  max-width: ${({ theme }) => theme.rem(480)};
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
  margin: ${({ theme }) => theme.rem(30)} auto 0;
  padding: 0;
  text-align: center;
  width: ${({ theme }) => theme.rem(200)};

  &:focus {
    outline: none;
  }
`;

export default Registration;
