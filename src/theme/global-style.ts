import base from "./global/base";
import reset from "./global/reset";
import { createGlobalStyle } from "~/theme";

const GlobalStyle = createGlobalStyle`
	${reset}
	${base}
`;

export default GlobalStyle;
