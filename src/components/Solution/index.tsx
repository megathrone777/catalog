import React, { useState, useRef, SyntheticEvent, useContext } from "react";

import { cookie } from "~/utilites";
import Loader from "~/components/Loader";
import Author from "./Author";
import Container from "~/theme/global/container";
import Profile from "./Profile";
import Editorbox, { TEditor } from "./Editorbox";
import scrollbar from "~/theme/mixins/scrollbar";
import { GlobalContext } from "~/components/Layout";
import styled, { css } from "~/theme";

interface TSolutionStep {
  number: number | null;
  content: string;
  questionsAmount: number | null;
  placeholder: string | null;
}

export interface TSolution {
  category: {
    id: string | number;
    title: string;
  };
  createdAt: string;
  description: string;
  id: number;
  likes: number;
  solutionSteps: TSolutionStep[];
  steps: number;
  title: string;
  updatedAt: string;
  fromAuthor: string;
  author: {
    username: string;
    fullName: string;
    content: string;
  };
}

interface Props { 
  solution: TSolution;
}

const Solution = ({ solution }: Props): JSX.Element => {
  const { userInfo } = useContext(GlobalContext);
  const [loading, setLoading] = useState<boolean>(false);
  const [editors, setEditors] = useState<TEditor[]>(solution.solutionSteps);
  const editorsWrapperEl = useRef<HTMLDivElement>(null);
  const [removedSteps, setRemovedSteps] = useState<number[]>([]);
  const { isLoggedIn, fullName } = userInfo;

  const handleEditorAdd = (index: number): void => {
    setEditors((prevState: TEditor[]): TEditor[] => {
      const newEditors = [...prevState];
      newEditors.splice(index, 0, {
        placeholder: "Введите текст",
        id: 0,
        number: index + 1,
        questionsAmount: null,
        content: ""
      });

      return newEditors;
    });
  };

  const handleEditorUpdate = (content: string, index: number): void => {
    setEditors((prevState: TEditor[]): TEditor[] => {
      const newEditors = prevState.map((editor: TEditor, i: number) => {
        if (index === i + 1) {
          return {
            ...editor,
            content
          };
        }

        return editor;
      });

      return newEditors;
    });
  };

  const handleEditorRemove = (index: number, id: string | number): void => {
    setEditors(prevState => {
      const arr = [...prevState];

      if (index !== -1) {
        arr.splice(index, 1);
      }

      return [...arr];
    });

    setRemovedSteps(prevState => {
      return [...prevState, id as number];
    });
  };

  const handleToTop = (): void => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  const handleSubmit = (
    event: SyntheticEvent<HTMLButtonElement, MouseEvent>
  ): void => {
    event.preventDefault();

    setLoading(true);

    const authToken = cookie.parseCookie("authToken", document.cookie);

    if (authToken) {
      fetch("http://10.10.45.10/api/solution/update", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          id: solution.id,
          title: solution.title,
          category: {
            id: solution.category.id,
            title: solution.category.title
          },
          steps: [
            ...editors.map(({ id, number, content }: TEditor) => {
              return {
                id,
                number,
                text: content
              };
            })
          ],
          removedSteps
        })
      })
        .then(response => {
          if (response.status === 500) {
            alert("Save error");
            return;
          }
          response.json();
        })
        .then(() => {
          setLoading(false);
          alert("Solution updated");
        });
      return;
    }
  };

  return (
    <StyledWrapper>
      <Container>
        <StyledLayout>
          {loading && <Loader />}
          <StyledContent>
            <StyledHeading>
              <StyledHeadingOptions>
                {solution?.category?.title && (
                  <StyledHeadingCategory>
                    <StyledHeadingIcon>
                      <StyledSvgSymbol
                        xmlns="http://www.w3.org/2000/svg"
                        height="24"
                        viewBox="0 0 24 24"
                        width="24"
                      >
                        <StyledPathSymbol d="M0 0h24v24H0z" fill="none" />
                        <StyledPathSymbol
                          d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 
	   3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z"
                          fill="currentColor"
                        />
                      </StyledSvgSymbol>
                    </StyledHeadingIcon>
                    {solution.category.title}
                  </StyledHeadingCategory>
                )}
              </StyledHeadingOptions>

              <StyledSubscribe href="#">Подписаться на раздел</StyledSubscribe>
            </StyledHeading>

            <StyledInner>
              <StyledBar>
                {solution?.title && (
                  <StyledBarTitle>{solution.title}</StyledBarTitle>
                )}

                <StyledBarIcons>
                  <StyledBarIconsItem clock>
                    <StyledBarIconsLink href="#" />
                  </StyledBarIconsItem>

                  <StyledBarIconsItem like>
                    <StyledBarIconsLink href="#" />
                  </StyledBarIconsItem>

                  <StyledBarIconsItem alert>
                    <StyledBarIconsLink href="#" />
                  </StyledBarIconsItem>
                </StyledBarIcons>
              </StyledBar>

              <StyledOptions>
                <StyledDates>
                  <StyledDatesCreated>
                    Создано{" "}
                    {solution.createdAt && (
                      <StyledDatesChangedDate>
                        {solution.createdAt.substr(0, 10)}
                      </StyledDatesChangedDate>
                    )}
                  </StyledDatesCreated>
                  <StyledDatesDivider>|</StyledDatesDivider>
                  <StyledDatesChanged>
                    Последнее изменениe{" "}
                    {solution.updatedAt && (
                      <StyledDatesChangedDate>
                        {solution.updatedAt.substr(0, 10)}
                      </StyledDatesChangedDate>
                    )}
                  </StyledDatesChanged>
                </StyledDates>

                <StyledToTop onClick={handleToTop} type="button">
                  К первому шагу
                  <StyledToTopIcon>
                    <StyledSvgSymbol
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                    >
                      <StyledPathSymbol d="M0 0h24v24H0V0z" fill="none" />
                      <StyledPathSymbol
                        d="M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z"
                        fill="currentColor"
                      />
                    </StyledSvgSymbol>
                  </StyledToTopIcon>
                </StyledToTop>
              </StyledOptions>

              {editors && !!editors?.length && (
                <StyledEditorsWrapper ref={editorsWrapperEl}>
                  {editors.map(
                    (
                      { id, placeholder, questionsAmount, content }: TEditor,
                      index: number
                    ): JSX.Element => (
                      <Editorbox
                        isLoggedIn={
                          isLoggedIn && fullName === solution?.author?.fullName
                        }
                        key={index}
                        placeholder={placeholder}
                        questionsAmount={questionsAmount}
                        remove={() => handleEditorRemove(index, id as number)}
                        number={index + 1}
                        content={content}
                        add={() => handleEditorAdd(index + 1)}
                        update={(
                          content: string,
                          number: number | null
                        ): void =>
                          handleEditorUpdate(content, number as number)
                        }
                      />
                    )
                  )}
                </StyledEditorsWrapper>
              )}

              {isLoggedIn && fullName === solution?.author?.fullName && (
                <StyledButtons>
                  <StyledCreate type="submit" onClick={handleSubmit}>
                    Обновить решение
                  </StyledCreate>
                </StyledButtons>
              )}
            </StyledInner>
          </StyledContent>

          <StyledSide>
            <Profile fullName={solution.author.fullName} />
            <Author value={solution.fromAuthor} />
          </StyledSide>
        </StyledLayout>
      </Container>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  padding-top: ${({ theme }) => theme.rem(45)};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}px) {
    padding-top: ${({ theme }) => theme.rem(10)};
  }
`;

const StyledLayout = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}px) {
    flex-direction: column-reverse;
  }
`;

const StyledContent = styled.div`
  display: flex;
  flex-direction: column;
  flex: 0 1 ${({ theme }) => theme.rem(1050)};
  margin-bottom: ${({ theme }) => theme.rem(35)};
  margin-right: ${({ theme }) => theme.rem(5)};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}px) {
    margin-right: 0;
  }
`;

const StyledSide = styled.div`
  flex: 0 1 ${({ theme }) => theme.rem(300)};
  margin-left: ${({ theme }) => theme.rem(5)};
  min-width: ${({ theme }) => theme.rem(300)};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}px) {
    align-items: flex-start;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-left: 0;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}px) {
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: flex-start;
  }
`;

const StyledHeading = styled.h2`
  align-items: center;
  background: ${({ theme }) => theme.colors.darkBlueLighter};
  border-top-left-radius: ${({ theme }) => theme.rem(10)};
  border-top-right-radius: ${({ theme }) => theme.rem(10)};
  display: flex;
  height: ${({ theme }) => theme.rem(60)};
  justify-content: space-between;
  padding-left: ${({ theme }) => theme.rem(32)};
  padding-right: ${({ theme }) => theme.rem(22)};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}px) {
    padding-left: ${({ theme }) => theme.rem(10)};
    padding-right: ${({ theme }) => theme.rem(10)};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.xs}px) {
    flex-direction: column;
    height: auto;
  }
`;

const StyledHeadingCategory = styled.h2`
  align-items: center;
  color: ${({ theme }) => theme.colors.blueLighter};
  display: block;
  font-family: ${({ theme }) => theme.fonts.font};
  font-size: ${({ theme }) => theme.rem(15)};
  height: ${({ theme }) => theme.rem(40)};
  line-height: ${({ theme }) => theme.rem(40)};
  margin-right: ${({ theme }) => theme.rem(30)};
  padding-left: ${({ theme }) => theme.rem(40)};
  position: relative;
  text-align: left;
  white-space: nowrap;
  width: ${({ theme }) => theme.rem(260)};

  @media (max-width: ${({ theme }) => theme.breakpoints.xs}px) {
    margin-bottom: ${({ theme }) => theme.rem(10)};
    margin-right: 0;
  }
`;

const StyledHeadingIcon = styled.i`
  color: #f1f3f7;
  display: block;
  height: ${({ theme }) => theme.rem(24)};
  width: ${({ theme }) => theme.rem(24)};
  left: ${({ theme }) => theme.rem(10)};
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
`;

const StyledHeadingOptions = styled.div`
  align-items: center;
  display: flex;
  position: relative;

  @media (max-width: ${({ theme }) => theme.breakpoints.xs}px) {
    flex-direction: column;
  }
`;

const StyledSvgSymbol = styled.svg`
  height: 100%;
  width: 100%;
`;

const StyledPathSymbol = styled.path``;

const StyledSubscribe = styled.a`
  background-color: transparent;
  border-radius: ${({ theme }) => theme.rem(10)};
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.rem(14)};
  height: ${({ theme }) => theme.rem(40)};
  line-height: ${({ theme }) => theme.rem(40)};
  padding: 0 ${({ theme }) => theme.rem(22)};
  text-decoration: none;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}px) {
    height: auto;
    line-height: 1;
    text-align: center;
    text-decoration: underline;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.xs}px) {
    margin-bottom: ${({ theme }) => theme.rem(15)};
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors.darkBlue};
    color: ${({ theme }) => theme.colors.blueLighter};
    text-shadow: 0 0 1px ${({ theme }) => theme.colors.blueLighter};
  }
`;

const StyledInner = styled.div`
  background: white;
  border-bottom-left-radius: ${({ theme }) => theme.rem(10)};
  border-bottom-right-radius: ${({ theme }) => theme.rem(10)};
  flex-grow: 1;
`;

const StyledBar = styled.div`
  align-items: center;
  background: white;
  border-bottom: ${({ theme }) => theme.rem(1)} solid
    ${({ theme }) => theme.colors.whiteDarker};
  display: flex;
  height: ${({ theme }) => theme.rem(60)};
  justify-content: space-between;
  margin: 0 ${({ theme }) => theme.rem(45)};
  position: sticky;
  top: 0;
  z-index: 20;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}px) {
    margin-left: ${({ theme }) => theme.rem(10)};
    margin-right: ${({ theme }) => theme.rem(10)};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.xs}px) {
    flex-direction: column;
    height: auto;
    padding: ${({ theme }) => theme.rem(15)} 0;
    text-align: center;
  }
`;

const StyledBarTitle = styled.h3`
  color: ${({ theme }) => theme.colors.grayDarker};
  font-size: ${({ theme }) => theme.rem(22)};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}px) {
    font-size: ${({ theme }) => theme.rem(18)};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.xs}px) {
    margin-bottom: ${({ theme }) => theme.rem(10)};
  }
`;

const StyledBarIcons = styled.ul`
  display: flex;
`;

const StyledBarIconsItem = styled.li<{
  clock?: boolean;
  like?: boolean;
  alert?: boolean;
}>`
  background-image: url('/images/solution_options_bg.png');
  background-repeat: no-repeat;
  background-size: auto 100%;
  height: ${({ theme }) => theme.rem(25)};
  margin-left: ${({ theme }) => theme.rem(20)};
  width: ${({ theme }) => theme.rem(26)};

  ${({ clock }) =>
    clock &&
    `
    background-position: left center;
  `}

  ${({ like }) =>
    like &&
    css`
      background-position: ${({ theme }) => theme.rem(-40)} center;
    `}

  ${({ alert }) =>
    alert &&
    `
  background-position: right center;
`}

&:first-of-type {
  @media (max-width: ${({ theme }) => theme.breakpoints.xs}px) {
    margin-left: 0;
  }
}
`;

const StyledBarIconsLink = styled.a`
  display: block;
  height: 100%;
`;

const StyledOptions = styled.div`
  align-items: center;
  background: white;
  display: flex;
  height: ${({ theme }) => theme.rem(43)};
  justify-content: space-between;
  margin: 0 ${({ theme }) => theme.rem(45)};
  position: sticky;
  top: ${({ theme }) => theme.rem(60)};
  z-index: 20;

  @media (max-width: ${({ theme }) => theme.breakpoints.xs}px) {
    flex-wrap: wrap;
    height: auto;
    justify-content: center;
    margin-left: ${({ theme }) => theme.rem(10)};
    margin-right: ${({ theme }) => theme.rem(10)};
    margin-top: ${({ theme }) => theme.rem(10)};
    text-align: center;
  }
`;

const StyledDates = styled.div`
  align-items: center;
  display: flex;

  @media (max-width: ${({ theme }) => theme.breakpoints.xs}px) {
    margin-bottom: ${({ theme }) => theme.rem(15)};
  }
`;

const StyledToTop = styled.button`
  appearance: none;
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.green};
  cursor: pointer;
  font-family: ${({ theme }) => theme.fonts.fontLight};
  font-size: ${({ theme }) => theme.rem(16)};
  padding: 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}px) {
    font-size: ${({ theme }) => theme.rem(15)};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.xs}px) {
    line-height: ${({ theme }) => theme.rem(22)};
  }

  &:focus {
    outline: none;
  }
`;

const StyledToTopIcon = styled.i`
  align-items: center;
  border-radius: ${({ theme }) => theme.rem(5)};
  border: ${({ theme }) => theme.rem(1)} solid
    ${({ theme }) => theme.colors.green};
  color: ${({ theme }) => theme.colors.green};
  display: inline-flex;
  height: ${({ theme }) => theme.rem(22)};
  justify-content: center;
  margin-left: ${({ theme }) => theme.rem(10)};
  vertical-align: middle;
  width: ${({ theme }) => theme.rem(22)};
`;

const StyledDatesCreated = styled.p`
  color: ${({ theme }) => theme.colors.grayLighter};
  font-family: ${({ theme }) => theme.fonts.fontLight};
  font-size: ${({ theme }) => theme.rem(14)};
`;

const StyledDatesDivider = styled.span`
  color: ${({ theme }) => theme.colors.grayLighter};
  display: inline-block;
  font-family: ${({ theme }) => theme.fonts.fontLight};
  font-size: ${({ theme }) => theme.rem(14)};
  margin: 0 ${({ theme }) => theme.rem(23)};
`;

const StyledDatesChanged = styled.p`
  color: ${({ theme }) => theme.colors.grayLighter};
  font-family: ${({ theme }) => theme.fonts.fontLight};
  font-size: ${({ theme }) => theme.rem(14)};
`;

const StyledDatesChangedDate = styled.span`
  color: ${({ theme }) => theme.colors.orange};
  font-family: ${({ theme }) => theme.fonts.font};
`;

const StyledEditorsWrapper = styled.div`
  margin-bottom: ${({ theme }) => theme.rem(35)};
  padding: ${({ theme }) => theme.rem(40)} ${({ theme }) => theme.rem(45)} 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}px) {
    padding-left: ${({ theme }) => theme.rem(20)};
    padding-right: ${({ theme }) => theme.rem(20)};
    padding-top: ${({ theme }) => theme.rem(20)};
  }

  ${scrollbar};
`;

const StyledButtons = styled.div`
  margin: 0 ${({ theme }) => theme.rem(45)} ${({ theme }) => theme.rem(65)};
  max-width: ${({ theme }) => theme.rem(960)};
`;

const StyledCreate = styled.button`
  background: none;
  border-radius: ${({ theme }) => theme.rem(10)};
  border: ${({ theme }) => theme.rem(1)} solid
    ${({ theme }) => theme.colors.orange};
  color: ${({ theme }) => theme.colors.orange};
  cursor: pointer;
  font-family: ${({ theme }) => theme.fonts.fontMedium};
  font-size: ${({ theme }) => theme.rem(24)};
  height: ${({ theme }) => theme.rem(60)};
  width: ${({ theme }) => theme.rem(300)};

  @media (max-width: ${({ theme }) => theme.breakpoints.xs}px) {
    font-size: ${({ theme }) => theme.rem(20)};
    height: ${({ theme }) => theme.rem(45)};
    width: 100%;
  }

  &:focus {
    outline: none;
  }
`;

export default Solution;
