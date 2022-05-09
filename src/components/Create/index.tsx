import React, { useState, SyntheticEvent } from "react";
import fetch from "isomorphic-unfetch";
import { useRouter } from "next/router";

import styled from "~/theme";
import { cookie } from "~/utilites";
import Container from "~/theme/global/container";
import Loader from "~/components/Loader";
import Editorbox, { TEditor } from "./Editorbox";
import HeadingMenu from "./HeadingMenu";
import { TCategory } from "./HeadingMenu/Item";
import News from "./News";
import Author from "./Author";

interface Props {
  categories: TCategory[];
}

const Create = ({ categories }: Props): JSX.Element => {
  const router = useRouter();
  const [currentTitle, setCurrentTitle] = useState<string>("");
  const [fromAuthor, setFromAuthor] = useState<string>("");
  const [currentCategoryId, setCurrentCategoryId] = useState<string | number>(
    router.query?.currentId !== undefined
      ? (router.query.currentId as string)
      : categories[0].id
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [editors, setEditors] = useState<TEditor[]>([
    {
      step: 1,
      placeholder: "",
      value: null
    }
  ]);

  const handleEditorUpdate = (value: string, index: number): void => {
    setEditors((prevState: TEditor[]): TEditor[] => {
      const newEditors = [...prevState].map((editor: TEditor, i: number) => {
        if (index === i + 1) {
          return {
            ...editor,
            value
          };
        }

        return editor;
      });

      return newEditors;
    });
  };

  const handleEditorAdd = (index: number): void => {
    setEditors((prevState: TEditor[]): TEditor[] => {
      const newEditors = [...prevState];
      newEditors.splice(index, 0, {
        step: index + 1,
        placeholder: "Введите текст",
        value: null
      });

      return newEditors;
    });
  };

  const handleEditorRemove = (index: number): void => {
    setEditors(prevState => {
      const arr = [...prevState];

      if (index !== -1) {
        arr.splice(index, 1);
      }

      return [...arr];
    });
  };

  const handleEditorsClear = (): void => {
    setEditors([
      {
        step: 1,
        placeholder: "",
        value: null
      }
    ]);
  };

  const handleCurrentTitle = (
    event: SyntheticEvent<HTMLInputElement>
  ): void => {
    setCurrentTitle(event.currentTarget.value);
  };

  const handleFromAuthor = (value: string): void => {
    setFromAuthor(value);
  };

  const handleCategoryId = (id: string | number): void => {
    setCurrentCategoryId(id);
  };

  const handleSubmit = (
    event: SyntheticEvent<HTMLButtonElement, MouseEvent>
  ): void => {
    event.preventDefault();

    if (fromAuthor.length === 0) {
      alert("Заполните блок от автора");
      return;
    }

    setLoading(true);

    const authToken = cookie.parseCookie("authToken", document.cookie);

    if (authToken) {
      fetch("http://10.10.45.10/api/solution/create", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          categoryId: currentCategoryId,
          title: currentTitle,
          fromAuthor,
          steps: [
            ...editors.map(({ value }: TEditor) => {
              return {
                text: value
              };
            })
          ]
        })
      })
        .then(response => response.json())
        .then(() => {
          setLoading(false);
          setCurrentTitle("");
          handleEditorsClear();
          router.push("/");
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
                <HeadingMenu
                  categories={categories}
                  currentId={
                    router.query?.currentId !== undefined
                      ? (router.query.currentId as string)
                      : "3"
                  }
                  enableCategory={(id: string | number) => handleCategoryId(id)}
                />
              </StyledHeadingOptions>
            </StyledHeading>

            <StyledForm action="#" method="post">
              <StyledFormItem>
                <StyledFormItemHeading>
                  <StyledFormItemStar>*</StyledFormItemStar>
                  Заголовок решения
                  <StyledFormItemLabelHint>
                    (не более 100 символов)
                  </StyledFormItemLabelHint>
                </StyledFormItemHeading>

                <StyledFormItemInput
                  onChange={handleCurrentTitle}
                  maxLength={100}
                  placeholder="Например:  “Полезные советы по саморазвитию”"
                  value={currentTitle}
                  type="text"
                />
              </StyledFormItem>

              {editors && !!editors?.length && (
                <StyledFormItem>
                  <StyledFormItemLabel>
                    Максимальное число знаков в шаге: 300
                  </StyledFormItemLabel>

                  {editors.map(
                    (
                      { placeholder, value }: TEditor,
                      index: number
                    ): JSX.Element => (
                      <Editorbox
                        add={() => handleEditorAdd(index + 1)}
                        handleValue={(value, step): void =>
                          handleEditorUpdate(value, step)
                        }
                        key={index}
                        placeholder={placeholder}
                        remove={() => handleEditorRemove(index)}
                        step={index + 1}
                        value={value}
                      />
                    )
                  )}
                </StyledFormItem>
              )}

              <StyledButtons>
                <StyledCreate type="submit" onClick={handleSubmit}>
                  Создать решение
                </StyledCreate>
              </StyledButtons>
            </StyledForm>
          </StyledContent>

          <StyledSide>
            <Author
              value={fromAuthor}
              handleValue={value => handleFromAuthor(value)}
            />
            <News />
          </StyledSide>
        </StyledLayout>
      </Container>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  padding-top: ${({ theme }) => theme.rem(45)};
  position: relative;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}px) {
    padding-top: ${({ theme }) => theme.rem(10)};
  }
`;

const StyledLayout = styled.div`
  display: flex;
  justify-content: space-between;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}px) {
    flex-direction: column-reverse;
  }
`;

const StyledContent = styled.div`
  background: white;
  border-top-left-radius: ${({ theme }) => theme.rem(10)};
  border-top-right-radius: ${({ theme }) => theme.rem(10)};
  flex: 0 1 ${({ theme }) => theme.rem(1050)};
  margin-bottom: ${({ theme }) => theme.rem(100)};
  margin-right: ${({ theme }) => theme.rem(5)};
  overflow: hidden;
  padding-bottom: ${({ theme }) => theme.rem(80)};

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

const StyledHeading = styled.div`
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

const StyledHeadingOptions = styled.div`
  display: flex;
  position: relative;

  @media (max-width: ${({ theme }) => theme.breakpoints.xs}px) {
    flex-direction: column;
  }
`;

const StyledForm = styled.form`
  padding: 0 ${({ theme }) => theme.rem(40)} 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}px) {
    padding: 0 ${({ theme }) => theme.rem(15)} 0;
  }
`;

const StyledFormItemHeading = styled.div`
  align-items: center;
  color: ${({ theme }) => theme.colors.grayDarker};
  cursor: pointer;
  display: flex;
  flex-wrap: wrap;
  font-size: ${({ theme }) => theme.rem(18)};
  height: ${({ theme }) => theme.rem(40)};
  justify-content: flex-start;
  margin-top: ${({ theme }) => theme.rem(30)};
  text-shadow: 0 0 1px ${({ theme }) => theme.colors.grayDarker};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}px) {
    font-size: ${({ theme }) => theme.rem(15)};
    line-height: 1;
  }
`;

const StyledFormItemInput = styled.input`
  background: ${({ theme }) => theme.colors.whiteDarker};
  border-radius: ${({ theme }) => theme.rem(5)};
  border: none;
  font-family: ${({ theme }) => theme.fonts.font};
  font-size: ${({ theme }) => theme.rem(16)};
  height: ${({ theme }) => theme.rem(60)};
  max-width: ${({ theme }) => theme.rem(650)};
  padding: 0 ${({ theme }) => theme.rem(15)};
  text-shadow: 0 0 1px ${({ theme }) => theme.colors.grayDarker};
  width: 100%;

  &::-webkit-input-placeholder {
    color: ${({ theme }) => theme.colors.grayLighter};
    font-family: ${({ theme }) => theme.fonts.fontLight};
  }

  &:-moz-placeholder {
    color: ${({ theme }) => theme.colors.grayLighter};
    font-family: ${({ theme }) => theme.fonts.fontLight};
  }

  &:focus {
    outline: none;

    &::-webkit-input-placeholder {
      color: transparent;
    }

    &:-moz-placeholder {
      color: transparent;
    }
  }
`;

const StyledFormItemLabel = styled.label`
  color: ${({ theme }) => theme.colors.grayDarker};
  cursor: pointer;
  display: inline-block;
  font-size: ${({ theme }) => theme.rem(18)};
  line-height: ${({ theme }) => theme.rem(45)};
  text-shadow: 0 0 1px ${({ theme }) => theme.colors.grayDarker};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}px) {
    align-items: center;
    display: flex;
    font-size: ${({ theme }) => theme.rem(15)};
    height: ${({ theme }) => theme.rem(40)};
    line-height: 1.2;
    margin-bottom: ${({ theme }) => theme.rem(20)};
  }
`;

const StyledFormItemStar = styled.span`
  color: ${({ theme }) => theme.colors.red};
  display: inline-block;
  font-family: ${({ theme }) => theme.fonts.fontBold};
  margin-right: ${({ theme }) => theme.rem(5)};
`;

const StyledFormItemLabelHint = styled.span`
  color: ${({ theme }) => theme.colors.grayLighter};
  font-size: ${({ theme }) => theme.rem(15)};
  margin-left: ${({ theme }) => theme.rem(10)};
  text-shadow: none;
`;

const StyledFormItem = styled.div`
  margin-bottom: ${({ theme }) => theme.rem(30)};
`;

const StyledButtons = styled.div`
  margin-bottom: ${({ theme }) => theme.rem(50)};
  margin-top: ${({ theme }) => theme.rem(50)};
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

export default Create;
