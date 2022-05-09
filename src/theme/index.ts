import * as styledComponents from 'styled-components';

import breakpoints, { Breakpoints } from './variables/breakpoints';
import colors, { Colors } from './variables/colors';
import fonts, { Fonts } from './variables/fonts';

export type ThemeInterface = {
  breakpoints: Breakpoints;
  colors: Colors;
  fonts: Fonts;
  rem: (px: number) => string;
  reactDatepicker: {
    fontSize: string;
    colors: {
      accessibility: string;
      selectedDay: string;
      selectedDayHover: string;
      primaryColor: string;
    };
  };
};

const {
  ThemeProvider,
  createGlobalStyle,
  default: styled,
  keyframes,
  css,
} = styledComponents as styledComponents.ThemedStyledComponentsModule<
ThemeInterface
>;

const theme: ThemeInterface = {
  breakpoints,
  colors,
  fonts,
  rem: (px) => {
    const baseFontSize = fonts.initialFontSize;
    return `${px / baseFontSize}rem`;
  },
  reactDatepicker: {
    fontSize: '22px',
    colors: {
      accessibility: '#D80249',
      selectedDay: '#393d5c',
      selectedDayHover: '#393d5c',
      primaryColor: '#393d5c',
    },
  },
};

export { theme, ThemeProvider, css, keyframes, createGlobalStyle };
export default styled;
