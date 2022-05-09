import React from 'react';

import styled from '~/theme';

const News = (): JSX.Element => {
  return (
    <StyledWrapper>
      <StyledHeading></StyledHeading>

      <StyledContent>
        <StyledList>
          <StyledItem>
            <StyledItemTitle href='#'>
              Здесь будет какой-то заголовок{' '}
            </StyledItemTitle>
            <StyledItemText>
              1. Давно выяснено, что при оценке дизайна и композиции читаемый
              текст мешает сосредоточиться.
            </StyledItemText>
            <StyledItemTopic href='#'>
              <StyledItemTopicIcon>
                <StyledSvgSymbol
                  xmlns='http://www.w3.org/2000/svg'
                  height='24'
                  viewBox='0 0 24 24'
                  width='24'
                >
                  <StyledPathSymbol d='M0 0h24v24H0z' fill='none' />
                  <StyledPathSymbol
                    d='M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 
 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z'
                    fill='currentColor'
                  />
                </StyledSvgSymbol>
              </StyledItemTopicIcon>
              Библиотеки
            </StyledItemTopic>

            <StyledFooter>
              <StyledRating>
                <StyledRatingList>
                  <StyledRatingItem filled>
                    <StyledSvgSymbol
                      xmlns='http://www.w3.org/2000/svg'
                      height='24'
                      viewBox='0 0 24 24'
                      width='24'
                    >
                      <StyledPathSymbol d='M0 0h24v24H0z' fill='none' />
                      <StyledPathSymbol d='M0 0h24v24H0z' fill='none' />
                      <StyledPathSymbol
                        fill='currentColor'
                        d='M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z'
                      />
                    </StyledSvgSymbol>
                    <StyledSvgSymbol
                      xmlns='http://www.w3.org/2000/svg'
                      height='24'
                      viewBox='0 0 24 24'
                      width='24'
                    >
                      <StyledPathSymbol d='M0 0h24v24H0z' fill='none' />
                      <StyledPathSymbol
                        d='M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4l-3.76 2.27 1-4.28-3.32-2.88 
					4.38-.38L12 6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z'
                        fill='currentColor'
                      />
                    </StyledSvgSymbol>
                  </StyledRatingItem>

                  <StyledRatingItem filled>
                    <StyledSvgSymbol
                      xmlns='http://www.w3.org/2000/svg'
                      height='24'
                      viewBox='0 0 24 24'
                      width='24'
                    >
                      <StyledPathSymbol d='M0 0h24v24H0z' fill='none' />
                      <StyledPathSymbol d='M0 0h24v24H0z' fill='none' />
                      <StyledPathSymbol
                        fill='currentColor'
                        d='M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z'
                      />
                    </StyledSvgSymbol>
                    <StyledSvgSymbol
                      xmlns='http://www.w3.org/2000/svg'
                      height='24'
                      viewBox='0 0 24 24'
                      width='24'
                    >
                      <StyledPathSymbol d='M0 0h24v24H0z' fill='none' />
                      <StyledPathSymbol
                        d='M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4l-3.76 2.27 1-4.28-3.32-2.88 
					4.38-.38L12 6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z'
                        fill='currentColor'
                      />
                    </StyledSvgSymbol>
                  </StyledRatingItem>

                  <StyledRatingItem filled>
                    <StyledSvgSymbol
                      xmlns='http://www.w3.org/2000/svg'
                      height='24'
                      viewBox='0 0 24 24'
                      width='24'
                    >
                      <StyledPathSymbol d='M0 0h24v24H0z' fill='none' />
                      <StyledPathSymbol d='M0 0h24v24H0z' fill='none' />
                      <StyledPathSymbol
                        fill='currentColor'
                        d='M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z'
                      />
                    </StyledSvgSymbol>
                    <StyledSvgSymbol
                      xmlns='http://www.w3.org/2000/svg'
                      height='24'
                      viewBox='0 0 24 24'
                      width='24'
                    >
                      <StyledPathSymbol d='M0 0h24v24H0z' fill='none' />
                      <StyledPathSymbol
                        d='M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4l-3.76 2.27 1-4.28-3.32-2.88 
					4.38-.38L12 6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z'
                        fill='currentColor'
                      />
                    </StyledSvgSymbol>
                  </StyledRatingItem>

                  <StyledRatingItem filled>
                    <StyledSvgSymbol
                      xmlns='http://www.w3.org/2000/svg'
                      height='24'
                      viewBox='0 0 24 24'
                      width='24'
                    >
                      <StyledPathSymbol d='M0 0h24v24H0z' fill='none' />
                      <StyledPathSymbol d='M0 0h24v24H0z' fill='none' />
                      <StyledPathSymbol
                        fill='currentColor'
                        d='M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z'
                      />
                    </StyledSvgSymbol>
                    <StyledSvgSymbol
                      xmlns='http://www.w3.org/2000/svg'
                      height='24'
                      viewBox='0 0 24 24'
                      width='24'
                    >
                      <StyledPathSymbol d='M0 0h24v24H0z' fill='none' />
                      <StyledPathSymbol
                        d='M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4l-3.76 2.27 1-4.28-3.32-2.88 
					4.38-.38L12 6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z'
                        fill='currentColor'
                      />
                    </StyledSvgSymbol>
                  </StyledRatingItem>

                  <StyledRatingItem>
                    <StyledSvgSymbol
                      xmlns='http://www.w3.org/2000/svg'
                      height='24'
                      viewBox='0 0 24 24'
                      width='24'
                    >
                      <StyledPathSymbol d='M0 0h24v24H0z' fill='none' />
                      <StyledPathSymbol d='M0 0h24v24H0z' fill='none' />
                      <StyledPathSymbol
                        fill='currentColor'
                        d='M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z'
                      />
                    </StyledSvgSymbol>
                    <StyledSvgSymbol
                      xmlns='http://www.w3.org/2000/svg'
                      height='24'
                      viewBox='0 0 24 24'
                      width='24'
                    >
                      <StyledPathSymbol d='M0 0h24v24H0z' fill='none' />
                      <StyledPathSymbol
                        d='M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4l-3.76 2.27 1-4.28-3.32-2.88 
					4.38-.38L12 6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z'
                        fill='currentColor'
                      />
                    </StyledSvgSymbol>
                  </StyledRatingItem>
                </StyledRatingList>
              </StyledRating>

              <StyledSteps>7</StyledSteps>
            </StyledFooter>
          </StyledItem>

          <StyledItem>
            <StyledItemTitle href='#'>
              Здесь будет какой-то заголовок{' '}
            </StyledItemTitle>
            <StyledItemText>
              1. Давно выяснено, что при оценке дизайна и композиции читаемый
              текст мешает сосредоточиться.
            </StyledItemText>
            <StyledItemTopic href='#'>
              <StyledItemTopicIcon>
                <StyledSvgSymbol
                  xmlns='http://www.w3.org/2000/svg'
                  height='24'
                  viewBox='0 0 24 24'
                  width='24'
                >
                  <StyledPathSymbol d='M0 0h24v24H0z' fill='none' />
                  <StyledPathSymbol
                    d='M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 
 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z'
                    fill='currentColor'
                  />
                </StyledSvgSymbol>
              </StyledItemTopicIcon>
              Библиотеки
            </StyledItemTopic>

            <StyledFooter>
              <StyledRating>
                <StyledRatingList>
                  <StyledRatingItem filled>
                    <StyledSvgSymbol
                      xmlns='http://www.w3.org/2000/svg'
                      height='24'
                      viewBox='0 0 24 24'
                      width='24'
                    >
                      <StyledPathSymbol d='M0 0h24v24H0z' fill='none' />
                      <StyledPathSymbol d='M0 0h24v24H0z' fill='none' />
                      <StyledPathSymbol
                        fill='currentColor'
                        d='M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z'
                      />
                    </StyledSvgSymbol>
                    <StyledSvgSymbol
                      xmlns='http://www.w3.org/2000/svg'
                      height='24'
                      viewBox='0 0 24 24'
                      width='24'
                    >
                      <StyledPathSymbol d='M0 0h24v24H0z' fill='none' />
                      <StyledPathSymbol
                        d='M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4l-3.76 2.27 1-4.28-3.32-2.88 
					4.38-.38L12 6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z'
                        fill='currentColor'
                      />
                    </StyledSvgSymbol>
                  </StyledRatingItem>

                  <StyledRatingItem filled>
                    <StyledSvgSymbol
                      xmlns='http://www.w3.org/2000/svg'
                      height='24'
                      viewBox='0 0 24 24'
                      width='24'
                    >
                      <StyledPathSymbol d='M0 0h24v24H0z' fill='none' />
                      <StyledPathSymbol d='M0 0h24v24H0z' fill='none' />
                      <StyledPathSymbol
                        fill='currentColor'
                        d='M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z'
                      />
                    </StyledSvgSymbol>
                    <StyledSvgSymbol
                      xmlns='http://www.w3.org/2000/svg'
                      height='24'
                      viewBox='0 0 24 24'
                      width='24'
                    >
                      <StyledPathSymbol d='M0 0h24v24H0z' fill='none' />
                      <StyledPathSymbol
                        d='M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4l-3.76 2.27 1-4.28-3.32-2.88 
					4.38-.38L12 6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z'
                        fill='currentColor'
                      />
                    </StyledSvgSymbol>
                  </StyledRatingItem>

                  <StyledRatingItem filled>
                    <StyledSvgSymbol
                      xmlns='http://www.w3.org/2000/svg'
                      height='24'
                      viewBox='0 0 24 24'
                      width='24'
                    >
                      <StyledPathSymbol d='M0 0h24v24H0z' fill='none' />
                      <StyledPathSymbol d='M0 0h24v24H0z' fill='none' />
                      <StyledPathSymbol
                        fill='currentColor'
                        d='M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z'
                      />
                    </StyledSvgSymbol>
                    <StyledSvgSymbol
                      xmlns='http://www.w3.org/2000/svg'
                      height='24'
                      viewBox='0 0 24 24'
                      width='24'
                    >
                      <StyledPathSymbol d='M0 0h24v24H0z' fill='none' />
                      <StyledPathSymbol
                        d='M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4l-3.76 2.27 1-4.28-3.32-2.88 
					4.38-.38L12 6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z'
                        fill='currentColor'
                      />
                    </StyledSvgSymbol>
                  </StyledRatingItem>

                  <StyledRatingItem filled>
                    <StyledSvgSymbol
                      xmlns='http://www.w3.org/2000/svg'
                      height='24'
                      viewBox='0 0 24 24'
                      width='24'
                    >
                      <StyledPathSymbol d='M0 0h24v24H0z' fill='none' />
                      <StyledPathSymbol d='M0 0h24v24H0z' fill='none' />
                      <StyledPathSymbol
                        fill='currentColor'
                        d='M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z'
                      />
                    </StyledSvgSymbol>
                    <StyledSvgSymbol
                      xmlns='http://www.w3.org/2000/svg'
                      height='24'
                      viewBox='0 0 24 24'
                      width='24'
                    >
                      <StyledPathSymbol d='M0 0h24v24H0z' fill='none' />
                      <StyledPathSymbol
                        d='M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4l-3.76 2.27 1-4.28-3.32-2.88 
					4.38-.38L12 6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z'
                        fill='currentColor'
                      />
                    </StyledSvgSymbol>
                  </StyledRatingItem>

                  <StyledRatingItem filled>
                    <StyledSvgSymbol
                      xmlns='http://www.w3.org/2000/svg'
                      height='24'
                      viewBox='0 0 24 24'
                      width='24'
                    >
                      <StyledPathSymbol d='M0 0h24v24H0z' fill='none' />
                      <StyledPathSymbol d='M0 0h24v24H0z' fill='none' />
                      <StyledPathSymbol
                        fill='currentColor'
                        d='M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z'
                      />
                    </StyledSvgSymbol>
                    <StyledSvgSymbol
                      xmlns='http://www.w3.org/2000/svg'
                      height='24'
                      viewBox='0 0 24 24'
                      width='24'
                    >
                      <StyledPathSymbol d='M0 0h24v24H0z' fill='none' />
                      <StyledPathSymbol
                        d='M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4l-3.76 2.27 1-4.28-3.32-2.88 
					4.38-.38L12 6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z'
                        fill='currentColor'
                      />
                    </StyledSvgSymbol>
                  </StyledRatingItem>
                </StyledRatingList>
              </StyledRating>

              <StyledSteps>7</StyledSteps>
            </StyledFooter>
          </StyledItem>

          <StyledItem>
            <StyledItemTitle href='#'>
              Здесь будет какой-то заголовок{' '}
            </StyledItemTitle>
            <StyledItemText>
              1. Давно выяснено, что при оценке дизайна и композиции читаемый
              текст мешает сосредоточиться.
            </StyledItemText>
            <StyledItemTopic href='#'>
              <StyledItemTopicIcon>
                <StyledSvgSymbol
                  xmlns='http://www.w3.org/2000/svg'
                  height='24'
                  viewBox='0 0 24 24'
                  width='24'
                >
                  <StyledPathSymbol d='M0 0h24v24H0z' fill='none' />
                  <StyledPathSymbol
                    d='M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 
 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z'
                    fill='currentColor'
                  />
                </StyledSvgSymbol>
              </StyledItemTopicIcon>
              Библиотеки
            </StyledItemTopic>

            <StyledFooter>
              <StyledRating>
                <StyledRatingList>
                  <StyledRatingItem filled>
                    <StyledSvgSymbol
                      xmlns='http://www.w3.org/2000/svg'
                      height='24'
                      viewBox='0 0 24 24'
                      width='24'
                    >
                      <StyledPathSymbol d='M0 0h24v24H0z' fill='none' />
                      <StyledPathSymbol d='M0 0h24v24H0z' fill='none' />
                      <StyledPathSymbol
                        fill='currentColor'
                        d='M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z'
                      />
                    </StyledSvgSymbol>
                    <StyledSvgSymbol
                      xmlns='http://www.w3.org/2000/svg'
                      height='24'
                      viewBox='0 0 24 24'
                      width='24'
                    >
                      <StyledPathSymbol d='M0 0h24v24H0z' fill='none' />
                      <StyledPathSymbol
                        d='M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4l-3.76 2.27 1-4.28-3.32-2.88 
					4.38-.38L12 6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z'
                        fill='currentColor'
                      />
                    </StyledSvgSymbol>
                  </StyledRatingItem>

                  <StyledRatingItem filled>
                    <StyledSvgSymbol
                      xmlns='http://www.w3.org/2000/svg'
                      height='24'
                      viewBox='0 0 24 24'
                      width='24'
                    >
                      <StyledPathSymbol d='M0 0h24v24H0z' fill='none' />
                      <StyledPathSymbol d='M0 0h24v24H0z' fill='none' />
                      <StyledPathSymbol
                        fill='currentColor'
                        d='M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z'
                      />
                    </StyledSvgSymbol>
                    <StyledSvgSymbol
                      xmlns='http://www.w3.org/2000/svg'
                      height='24'
                      viewBox='0 0 24 24'
                      width='24'
                    >
                      <StyledPathSymbol d='M0 0h24v24H0z' fill='none' />
                      <StyledPathSymbol
                        d='M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4l-3.76 2.27 1-4.28-3.32-2.88 
					4.38-.38L12 6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z'
                        fill='currentColor'
                      />
                    </StyledSvgSymbol>
                  </StyledRatingItem>

                  <StyledRatingItem filled>
                    <StyledSvgSymbol
                      xmlns='http://www.w3.org/2000/svg'
                      height='24'
                      viewBox='0 0 24 24'
                      width='24'
                    >
                      <StyledPathSymbol d='M0 0h24v24H0z' fill='none' />
                      <StyledPathSymbol d='M0 0h24v24H0z' fill='none' />
                      <StyledPathSymbol
                        fill='currentColor'
                        d='M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z'
                      />
                    </StyledSvgSymbol>
                    <StyledSvgSymbol
                      xmlns='http://www.w3.org/2000/svg'
                      height='24'
                      viewBox='0 0 24 24'
                      width='24'
                    >
                      <StyledPathSymbol d='M0 0h24v24H0z' fill='none' />
                      <StyledPathSymbol
                        d='M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4l-3.76 2.27 1-4.28-3.32-2.88 
					4.38-.38L12 6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z'
                        fill='currentColor'
                      />
                    </StyledSvgSymbol>
                  </StyledRatingItem>

                  <StyledRatingItem filled>
                    <StyledSvgSymbol
                      xmlns='http://www.w3.org/2000/svg'
                      height='24'
                      viewBox='0 0 24 24'
                      width='24'
                    >
                      <StyledPathSymbol d='M0 0h24v24H0z' fill='none' />
                      <StyledPathSymbol d='M0 0h24v24H0z' fill='none' />
                      <StyledPathSymbol
                        fill='currentColor'
                        d='M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z'
                      />
                    </StyledSvgSymbol>
                    <StyledSvgSymbol
                      xmlns='http://www.w3.org/2000/svg'
                      height='24'
                      viewBox='0 0 24 24'
                      width='24'
                    >
                      <StyledPathSymbol d='M0 0h24v24H0z' fill='none' />
                      <StyledPathSymbol
                        d='M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4l-3.76 2.27 1-4.28-3.32-2.88 
					4.38-.38L12 6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z'
                        fill='currentColor'
                      />
                    </StyledSvgSymbol>
                  </StyledRatingItem>

                  <StyledRatingItem filled>
                    <StyledSvgSymbol
                      xmlns='http://www.w3.org/2000/svg'
                      height='24'
                      viewBox='0 0 24 24'
                      width='24'
                    >
                      <StyledPathSymbol d='M0 0h24v24H0z' fill='none' />
                      <StyledPathSymbol d='M0 0h24v24H0z' fill='none' />
                      <StyledPathSymbol
                        fill='currentColor'
                        d='M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z'
                      />
                    </StyledSvgSymbol>
                    <StyledSvgSymbol
                      xmlns='http://www.w3.org/2000/svg'
                      height='24'
                      viewBox='0 0 24 24'
                      width='24'
                    >
                      <StyledPathSymbol d='M0 0h24v24H0z' fill='none' />
                      <StyledPathSymbol
                        d='M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4l-3.76 2.27 1-4.28-3.32-2.88 
					4.38-.38L12 6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z'
                        fill='currentColor'
                      />
                    </StyledSvgSymbol>
                  </StyledRatingItem>
                </StyledRatingList>
              </StyledRating>

              <StyledSteps>7</StyledSteps>
            </StyledFooter>
          </StyledItem>
        </StyledList>
      </StyledContent>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  @media (max-width: ${({ theme }) => theme.breakpoints.md}px) {
    flex: 0 1 calc(50% - ${({ theme }) => theme.rem(5)});
    margin-bottom: ${({ theme }) => theme.rem(25)};
    margin-left: ${({ theme }) => theme.rem(5)};
    width: calc(50% - ${({ theme }) => theme.rem(5)});
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}px) {
    margin-left: 0;
    width: 100%;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.xs}px) {
    align-items: center;
    flex-direction: column;
    padding-left: 0;
  }
`;

const StyledSvgSymbol = styled.svg`
  height: 100%;
  width: 100%;
`;

const StyledPathSymbol = styled.path``;

const StyledContent = styled.div`
  background: white;
  overflow: hidden;
  padding: ${({ theme }) => theme.rem(25)} ${({ theme }) => theme.rem(15)} 0;
  border-bottom-left-radius: ${({ theme }) => theme.rem(10)};
  border-bottom-right-radius: ${({ theme }) => theme.rem(10)};
`;

const StyledHeading = styled.h2`
  background: ${({ theme }) => theme.colors.darkBlueLighter};
  border-top-left-radius: ${({ theme }) => theme.rem(10)};
  border-top-right-radius: ${({ theme }) => theme.rem(10)};
  color: ${({ theme }) => theme.colors.white};
  display: block;
  height: ${({ theme }) => theme.rem(50)};
  line-height: ${({ theme }) => theme.rem(50)};
  padding-left: ${({ theme }) => theme.rem(74)};
`;

const StyledList = styled.ul``;

const StyledItem = styled.li`
  border-bottom: ${({ theme }) => theme.rem(1)} solid ${({ theme }) => theme.colors.whiteDarker};
  margin-bottom: ${({ theme }) => theme.rem(20)};
`;

const StyledItemTitle = styled.a`
  color: ${({ theme }) => theme.colors.grayDarker};
  display: block;
  line-height: 1;
  margin-bottom: ${({ theme }) => theme.rem(5)};
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const StyledItemText = styled.p`
  color: ${({ theme }) => theme.colors.gray};
  font-family: ${({ theme }) => theme.fonts.fontLight};
  font-size: ${({ theme }) => theme.rem(15)};
  line-height: ${({ theme }) => theme.rem(20)};
  margin-bottom: ${({ theme }) => theme.rem(8)};
`;

const StyledItemTopic = styled.a`
  color: ${({ theme }) => theme.colors.blueLighter};
  display: inline-block;
  font-size: ${({ theme }) => theme.rem(14)};
  line-height: 1;
  margin-bottom: ${({ theme }) => theme.rem(10)};
  text-decoration: none;
  transition: all 0.2s ease-in;

  &:hover {
    color: ${({ theme }) => theme.colors.blue};
  }
`;

const StyledItemTopicIcon = styled.i`
  color: ${({ theme }) => theme.colors.darkBlue};
  display: inline-block;
  height: ${({ theme }) => theme.rem(18)};
  margin-right: ${({ theme }) => theme.rem(3)};
  vertical-align: -4px;
  width: ${({ theme }) => theme.rem(18)};
`;

const StyledFooter = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.rem(20)};
`;

const StyledRating = styled.div``;

const StyledRatingList = styled.ul`
  display: flex;
`;

const StyledRatingItem = styled.li<{
  filled?: boolean;
}>`
  color: #ffd700;
  height: ${({ theme }) => theme.rem(20)};
  width: ${({ theme }) => theme.rem(20)};

  ${StyledSvgSymbol} {
    display: none;

    &:last-of-type {
      display: block;
    }
  }

  ${({ filled }) =>
    filled &&
    `
	${StyledSvgSymbol} {
		&:first-of-type {
			display: block;
		};

		&:last-of-type {
			display: none;
		};
	}
  `}
`;

const StyledSteps = styled.span`
  background: ${({ theme }) => theme.colors.green};
  color: white;
  display: block;
  font-size: ${({ theme }) => theme.rem(16)};
  height: ${({ theme }) => theme.rem(25)};
  text-align: center;
  width: ${({ theme }) => theme.rem(25)};
  border-radius: ${({ theme }) => theme.rem(5)};
  line-height: ${({ theme }) => theme.rem(25)};
`;

export default News;
