import "./Icons.css";
import "./Animations.css";
import "./Grid.css";
import "./Columns.css";

const fontFamily = "sans-serif";
const fontColor = "dark-gray";
export const normalFontSize = "f5";
const normalFontSizeResponsive = `f6 ${normalFontSize}-ns`;

const nearWhite = "near-white";
export const stripedBackground = `striped--${nearWhite}`;
const nearWhiteBackground = `bg-${nearWhite}`;

const lightSilver = "light-silver";
const lightSilverBorder = `b--${lightSilver}`;

const lightBlue = "light-blue";
const lightBlueBackground = `bg-${lightBlue}`;

const lightestBlue = "lightest-blue";
const lightestBlueBackground = `bg-${lightestBlue}`;

const blue = "blue";
const blueBackground = `bg-${blue}`;

export const componentSpacingVertical = "ml4-ns";
export const link = `${blue} link hover-blue`;
export const blackLink = `${fontColor} link hover-blue`;
export const dl = "ma0";
export const dt = "fw6 mt2";
export const dd = "ml0 pv2";

const allButtons = "pointer link dim br2 dib tc ba";
// normal sized buttons
const normalSizedButton = `${allButtons} f6 ph3 pv2 `;
export const normalButton = `${normalSizedButton} white ${blueBackground}`;
export const clickedButton = `${normalSizedButton} white ${lightBlueBackground}`;
export const deemphasizedButton = `${normalSizedButton} ${fontColor} b--${fontColor}`;

// big button
export const bigButton = `${allButtons} ${blueBackground} white f5 ph4 pv3`;

export const checkboxListItem = "nowrap";

export const textParagraph = `${normalFontSizeResponsive} lh-copy ma0`;
export const list = "list pa0 ma0";
export const stripedStringList = `lh-copy pa2 ${stripedBackground}`;
export const card = `br3 ba ${lightSilverBorder}`;
export const cardTitle = `${nearWhiteBackground} br3 br--top mv0 pv2 ph3`;
/** Container for the content of the card below the title bar. */
export const cardContent = "pa3 bt b--black-10";

export const listItem = `relative bb pa2 ${lightSilverBorder}`;
export const listItemTitle = "f4 fw6 pb1";
export const listItemSub = `w-70 dib ${normalFontSizeResponsive}`;
export const sparklineContainer = `w-30 dib relative h1 v-btm`;
export const sparkline = `absolute top-0 grow-width move-h h1 ${lightestBlueBackground}`;

export const grid2 = `grid2-l`;
export const grid4 = `grid4-l grid2-m`;
export const gridItem = "pa2 mw6";
export const gridCard = `h-100 ${card}`;

export const chartBackground = nearWhiteBackground;

export const icon = "w1 h1 v-mid-i";
export const iconInText = "v-mid-i icon-in-text";

export const circle = "dib br4 w1 h1 mr2 v-top";

export const twoColumns = "cc2-l";

export const mainContainer = `${fontFamily} ${fontColor} ${normalFontSizeResponsive}`;
