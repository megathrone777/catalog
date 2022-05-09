import React, { useContext } from "react";
import Link from "next/link";
import { GlobalContext } from "~/components/Layout";

import styled, { css } from "~/theme";

interface TAuthor {
  fullName: string;
}

interface TFirstMatchedStep {
  text: string;
}

interface TCategory {
  title: string;
}

export interface TResultsItem {
  author: TAuthor;
  category: TCategory;
  createdAt: string;
  firstMatchedStep: TFirstMatchedStep;
  id: string | number;
  likes: string;
  steps: number;
  title: string;
}

interface Props {
  isListView: boolean;
  results: TResultsItem[];
}

const Results = ({ isListView, results }: Props): JSX.Element => {
  const { queryString } = useContext(GlobalContext);
  const { deepSearch } = queryString;

  const handleHightLight = (word: string, text: string) => {
    const ellipsis = isListView
      ? text.length > 82
        ? "..."
        : ""
      : text.length > 90
      ? "..."
      : "";
    if (!deepSearch || deepSearch.length === 0) {
      return text.substring(0, isListView ? 82 : 90) + ellipsis;
    }

    const newText = text.replace(new RegExp(word, "gi"), match => {
      return `<mark style="background: #fe9114">${match}</mark>`;
    });

    return isListView
      ? newText
          .substring(0, newText.lastIndexOf("</mark>") + 50)
          .substring(0, 100) + ellipsis
      : newText.substring(0, newText.lastIndexOf("</mark>") + 50) + ellipsis;
  };

  return (
    <StyledWrapper>
      {results && !!results.length && (
        <StyledList>
          {results.map(
            (
              {
                category,
                firstMatchedStep,
                likes,
                author,
                createdAt,
                id,
                steps,
                title
              }: TResultsItem,
              index
            ): JSX.Element => (
              <StyledItem isListView={isListView} key={index}>
                <StyledItemContent isListView={isListView}>
                  {category?.title && (
                    <StyledItemTopic
                      data-text={category.title}
                      href="#"
                      isListView={isListView}
                    >
                      <StyledItemTopicIcon>
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
                      </StyledItemTopicIcon>

                      <StyledItemTopicText isListView={isListView}>
                        {category.title}
                      </StyledItemTopicText>

                      {isListView && (
                        <StyledItemTopicTooltip>
                          {category.title}
                        </StyledItemTopicTooltip>
                      )}
                    </StyledItemTopic>
                  )}
                  {title && (
                    <Link
                      href={`/solution/[id]`}
                      as={`/solution/${id}`}
                      passHref
                    >
                      <StyledItemTitle>{title}</StyledItemTitle>
                    </Link>
                  )}
                  {firstMatchedStep?.text && (
                    <StyledItemDescription
                      dangerouslySetInnerHTML={{
                        __html: handleHightLight(
                          deepSearch as string,
                          firstMatchedStep.text
                        )
                      }}
                    />
                  )}
                </StyledItemContent>
                <StyledItemUser>
                  {author?.fullName ? (
                    <>
                      <StyledItemUserIcon>
                        <StyledSvgSymbol
                          fill="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <StyledPathSymbol
                            d="M3 5v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2H5c-1.11 0-2 .9-2 2zm12 4c0 1.66-1.34 3-3 3s-3-1.34-3-3 
			1.34-3 3-3 3 1.34 3 3zm-9 8c0-2 4-3.1 6-3.1s6 1.1 6 3.1v1H6v-1z"
                          />
                          <StyledPathSymbol d="M0 0h24v24H0z" fill="none" />
                        </StyledSvgSymbol>
                      </StyledItemUserIcon>
                      {author.fullName}
                    </>
                  ) : (
                    <>
                      <StyledItemUserIcon>
                        <StyledSvgSymbol
                          fill="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <StyledPathSymbol
                            d="M3 5v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2H5c-1.11 0-2 .9-2 2zm12 4c0 1.66-1.34 3-3 3s-3-1.34-3-3 
		  1.34-3 3-3 3 1.34 3 3zm-9 8c0-2 4-3.1 6-3.1s6 1.1 6 3.1v1H6v-1z"
                          />
                          <StyledPathSymbol d="M0 0h24v24H0z" fill="none" />
                        </StyledSvgSymbol>
                      </StyledItemUserIcon>
                      Unknown
                    </>
                  )}
                </StyledItemUser>
                <StyledItemDate>
                  {createdAt && (
                    <StyledItemDateBox>
                      {createdAt.split(" ")[0]}
                    </StyledItemDateBox>
                  )}
                </StyledItemDate>
                <StyledItemLikes>
                  {<StyledItemLikesBox>{likes}</StyledItemLikesBox>}
                </StyledItemLikes>
                <StyledItemSteps>
                  {<StyledItemStepsBox>{steps}</StyledItemStepsBox>}
                </StyledItemSteps>
              </StyledItem>
            )
          )}
        </StyledList>
      )}
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div``;

const StyledList = styled.div``;

const StyledItem = styled.div<{
  isListView: boolean;
}>`
  background: white;
  border-radius: ${({ theme }) => theme.rem(10)};
  box-shadow: 0px 0px 14px 0px rgba(57, 61, 92, 0.3);
  display: flex;
  min-height: ${({ theme }) => theme.rem(135)};
  margin-bottom: ${({ theme }) => theme.rem(5)};
  padding-bottom: ${({ theme }) => theme.rem(10)};
  padding-top: ${({ theme }) => theme.rem(10)};
  transition: all 0.2s ease-in;

  &:last-of-type {
    margin-bottom: 0;
  }

  &:hover {
    transform: scale(1.02);
  }

  ${({ isListView }) =>
    isListView &&
    css`
      min-height: ${({ theme }) => theme.rem(78)};
    `};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}px) {
    flex-wrap: wrap;
    height: auto;
    padding-bottom: ${({ theme }) => theme.rem(13)};
  }
`;

const StyledItemContent = styled.div<{
  isListView: boolean;
}>`
  padding-left: ${({ theme }) => theme.rem(15)};
  position: relative;
  width: 40%;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}px) {
    width: 100%;
  }

  ${({ isListView }) =>
    isListView &&
    `
    padding-left: 39px;
  `};
`;

const StyledItemTopicTooltip = styled.span`
  background: ${({ theme }) => theme.colors.grayDarker};
  border-radius: ${({ theme }) => theme.rem(5)};
  bottom: calc(100% + 5px);
  color: white;
  display: inline-block;
  font-size: ${({ theme }) => theme.rem(11)};
  height: ${({ theme }) => theme.rem(18)};
  line-height: ${({ theme }) => theme.rem(18)};
  opacity: 0;
  padding: 0 ${({ theme }) => theme.rem(9)};
  position: absolute;
  text-align: center;
  transition: all 0.2s ease-in;
  transform: translateX(calc(-50% + -12px)) translateY(5px);
  white-space: nowrap;

  &::after {
    content: "";
    background: url("/images/tooltip_bg.png") center center no-repeat;
    display: block;
    width: ${({ theme }) => theme.rem(8)};
    height: ${({ theme }) => theme.rem(5)};
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: ${({ theme }) => theme.rem(-4)};
  }
`;

const StyledItemTopic = styled.a<{
  isListView: boolean;
}>`
  color: ${({ theme }) => theme.colors.blueLighter};
  display: inline-block;
  font-size: ${({ theme }) => theme.rem(14)};
  line-height: ${({ theme }) => theme.rem(18)};
  margin-bottom: ${({ theme }) => theme.rem(16)};
  margin-top: ${({ theme }) => theme.rem(5)};
  position: relative;
  text-decoration: none;
  transition: all 0.2s ease-in;
  z-index: 20;

  &:hover {
    color: ${({ theme }) => theme.colors.blue};

    ${StyledItemTopicTooltip} {
      opacity: 1;
      transform: translateX(calc(-50% + -12px)) translateY(0);
    }
  }

  ${({ isListView }) =>
    isListView &&
    css`
      left: ${({ theme }) => theme.rem(13)};
      margin-bottom: 0;
      margin-top: 0;
      position: absolute;
      top: calc(50% - ${({ theme }) => theme.rem(5)});
      transform: translateY(-50%);
    `}
`;

const StyledItemTopicIcon = styled.i`
  color: ${({ theme }) => theme.colors.darkBlue};
  display: inline-block;
  height: ${({ theme }) => theme.rem(18)};
  margin-right: ${({ theme }) => theme.rem(3)};
  vertical-align: -4px;
  width: ${({ theme }) => theme.rem(18)};
`;

const StyledItemTopicText = styled.span<{
  isListView: boolean;
}>`
  color: inherit;

  ${({ isListView }) =>
    isListView &&
    `
    display: none;
  `}
`;

const StyledItemTitle = styled.a`
  color: ${({ theme }) => theme.colors.grayDarker};
  cursor: pointer;
  display: block;
  font-size: ${({ theme }) => theme.rem(16)};
  line-height: 1;
  margin-bottom: ${({ theme }) => theme.rem(5)};
  max-width: ${({ theme }) => theme.rem(369)};
  overflow: hidden;
  text-decoration: none;
  text-overflow: ellipsis;
  text-shadow: 0 0 1px ${({ theme }) => theme.colors.grayDarker};
  white-space: nowrap;

  &:hover {
    text-decoration: underline;
  }
`;

const StyledItemDescription = styled.div`
  color: ${({ theme }) => theme.colors.grayDarker};
  font-family: ${({ theme }) => theme.fonts.fontLight};
  font-size: ${({ theme }) => theme.rem(15)};
  position: relative;
  word-break: break-all;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}px) {
    font-size: ${({ theme }) => theme.rem(14)};
  }

  &::after {
    bottom: 0;
    box-shadow: inset 0px -8px 19px 0px rgba(255, 255, 255, 1);
    content: "";
    display: none;
    height: ${({ theme }) => theme.rem(16)};
    left: 0;
    position: absolute;
    right: 0;
    width: 100%;

    @media (max-width: ${({ theme }) => theme.breakpoints.lg}px) {
      display: block;
    }

    @media (max-width: ${({ theme }) => theme.breakpoints.sm}px) {
      display: none;
    }
  }
`;

const StyledItemUser = styled.div`
  color: ${({ theme }) => theme.colors.gray};
  font-family: ${({ theme }) => theme.fonts.fontLight};
  font-size: ${({ theme }) => theme.rem(18)};
  padding-left: ${({ theme }) => theme.rem(19)};
  padding-top: ${({ theme }) => theme.rem(6)};
  line-height: ${({ theme }) => theme.rem(27)};
  width: 22%;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}px) {
    font-size: ${({ theme }) => theme.rem(16)};
    padding-left: ${({ theme }) => theme.rem(13)};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}px) {
    margin-bottom: ${({ theme }) => theme.rem(10)};
    width: 100%;
  }
`;

const StyledItemUserIcon = styled.i`
  color: ${({ theme }) => theme.colors.orange};
  display: inline-block;
  height: ${({ theme }) => theme.rem(25)};
  margin-right: ${({ theme }) => theme.rem(8)};
  vertical-align: -6px;
  width: ${({ theme }) => theme.rem(25)};

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}px) {
    margin-right: ${({ theme }) => theme.rem(5)};
  }
`;

const StyledItemDate = styled.div`
  flex: 1;
  line-height: ${({ theme }) => theme.rem(20)};
  text-align: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}px) {
    flex: 0;
    flex-basis: ${({ theme }) => theme.rem(111)};
    padding-left: ${({ theme }) => theme.rem(15)};
    text-align: left;
  }
`;

const StyledItemDateBox = styled.span`
  background: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.rem(5)};
  color: ${({ theme }) => theme.colors.gray};
  display: inline-block;
  height: ${({ theme }) => theme.rem(40)};
  line-height: ${({ theme }) => theme.rem(42)};
  padding: 0 ${({ theme }) => theme.rem(10)};
  white-space: nowrap;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}px) {
    font-size: ${({ theme }) => theme.rem(15)};
  }
`;

const StyledItemLikes = styled.div`
  text-align: center;
  width: 12.5%;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}px) {
    padding-left: ${({ theme }) => theme.rem(15)};
    text-align: left;
    width: auto;
  }
`;

const StyledItemLikesBox = styled.span`
  background: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.rem(5)};
  color: ${({ theme }) => theme.colors.gray};
  display: inline-block;
  height: ${({ theme }) => theme.rem(40)};
  line-height: ${({ theme }) => theme.rem(42)};
  min-width: ${({ theme }) => theme.rem(40)};
  padding: 0 ${({ theme }) => theme.rem(10)};

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}px) {
    font-size: ${({ theme }) => theme.rem(15)};
  }
`;

const StyledItemSteps = styled.div`
  text-align: center;
  width: 12.5%;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}px) {
    padding-left: ${({ theme }) => theme.rem(15)};
    text-align: center;
    width: auto;
  }
`;

const StyledItemStepsBox = styled.span`
  background: ${({ theme }) => theme.colors.green};
  border-radius: ${({ theme }) => theme.rem(5)};
  color: white;
  display: inline-block;
  height: ${({ theme }) => theme.rem(40)};
  line-height: ${({ theme }) => theme.rem(42)};
  width: ${({ theme }) => theme.rem(40)};

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}px) {
    font-size: ${({ theme }) => theme.rem(15)};
  }
`;

const StyledSvgSymbol = styled.svg`
  height: 100%;
  width: 100%;
`;
const StyledPathSymbol = styled.path``;

export default Results;
