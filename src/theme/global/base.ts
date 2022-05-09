import { css } from "~/theme";
import scrollbar from "~/theme/mixins/scrollbar";

const base = css`
  * {
    box-sizing: border-box;
    scrollbar-width: thin;
  }

  html {
    font-size: ${({ theme }): string | number => theme.fonts.initialFontSize}px;
  }

  body {
    font-family: ${({ theme }): string => theme.fonts.font};
    overflow-y: scroll;

    ${scrollbar};
  }

  .custom-select-theme {
    --styled-select-arrow-zone__width: ${({ theme }) => theme.rem(45)};
    --styled-select-arrow__size: 22;
    --styled-select-arrow__color: ${({ theme }) => theme.colors.darkBlue};
    --styled-select-placeholder__color: ${({ theme }) =>
      theme.colors.grayLighter};
    --styled-select__color: ${({ theme }) => theme.colors.grayDarker};
    --styled-select__background-color: ${({ theme }) =>
      theme.colors.whiteLighter};
    --styled-select__border-color: black;
    --styled-select__border-width: 0;
    --styled-select__border-radius: ${({ theme }) => theme.rem(5)};
    --styled-select-control__min-height: ${({ theme }) => theme.rem(60)};

    --styled-select-input__padding: 0 ${({ theme }) => theme.rem(16)};
    --styled-select-input__height: ${({ theme }) => theme.rem(60)};
    --styled-select-input__line-height: ${({ theme }) => theme.rem(60)};

    --styled-select-menu-outer__padding: 0;
    --styled-select-menu-outer__background-color: ${({ theme }) =>
      theme.colors.darkBlue};
    --styled-select-menu-outer__border-color: transparent;
    --styled-select-menu-outer__border-style: solid;
    --styled-select-menu-outer__border-width: 1px;
    --styled-select-menu-outer__margin: 0 0 0 0;

    --styled-select-placeholder__font-size: ${({ theme }) => theme.rem(16)};
    --styled-select-placeholder__line-height: ${({ theme }) => theme.rem(60)};
    --styled-select-placeholder__padding: 0 ${({ theme }) => theme.rem(16)};

    --styled-select-option__background-color: #444;
    --styled-select-option__background-color: #fff;
    --styled-select-option__background-color--focused: transparent;
    --styled-select-option__background-color--selected: transparent;
    --styled-select-option__color: ${({ theme }) => theme.colors.darkBlue};
    --styled-select-option__color--focused: white;
    --styled-select-option__color--selected: white;
    --styled-select-option__padding: 8px 10px;

    --styled-select-control__border-color--focused: transparent;

    --styled-select-value-icon__background-color: red;
    --styled-select-value-icon__background-color--hover: rgba(0, 0, 0, 0.1);
    --styled-select-value-icon__font-family: arial;
    --styled-select-value-icon__padding: 1px 15px;

    --styled-select-value-wrapper__padding: 0 ${({ theme }) => theme.rem(16)};
    --styled-select-option__color--selected: white;
    --styled-select-option__background-color--selected: ${({ theme }) =>
      theme.colors.darkBlue};
    --styled-select-value__font-size: ${({ theme }) => theme.rem(16)};
    --styled-select-value-label__padding: 0 ${({ theme }) => theme.rem(16)};
    --styled-select__color: ${({ theme }) => theme.colors.blueLighter};

    [data-select-control] {
      cursor: pointer;
    }

    [data-select-multi-value-wrapper]:focus {
      outline: none;
    }
  }
`;

export default base;
