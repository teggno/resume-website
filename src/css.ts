import "./Icons.css";
import "./Animations.css";
import "./Grid.css";
import "./Columns.css";

const fontFamily = "sans-serif";
const fontColor = "dark-gray";
const normalFontSize = "f6 f5-ns"

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

const button = "f6 link dim br1 ph3 pv2 dib tc";
export const normalButton = `${button} ${blueBackground} white`;
export const clickedButton = `${button} ${lightBlueBackground} white`;
export const deemphasizedButton = `${button} ba ${fontColor}`;

export const checkboxListItem = "nowrap";

export const textParagraph = `${normalFontSize} lh-copy ma0`;
export const list = "list pa0 ma0";
export const stripedStringList = `lh-copy pa2 ${stripedBackground}`;
export const card = `br3 ba ${lightSilverBorder}`;
export const cardTitle = `${nearWhiteBackground} br3 br--top mv0 pv2 ph3`;
/** Container for the content of the card below the title bar. */
export const cardContent = "pa3 bt b--black-10";

export const listItem = `relative bb pa2 ${lightSilverBorder}`;
export const listItemTitle = "f4 fw6";
export const listItemSub = `w-70 dib ${normalFontSize}`;
export const sparklineContainer = `w-30 dib relative h1 v-btm`;
export const sparkline = `absolute top-0 grow-width move-h h1 ${lightestBlueBackground}`;

export const grid2 = `grid2-l`;
export const grid4 = `grid4-l grid2-m`;
export const gridItem = "pa2 mw6";
export const gridCard = `h-100 ${card}`

export const chartBackground = nearWhiteBackground;

export const icon = "w1 h1 v-mid-i";

export const circle = "dib br4 w1 h1 mr2 v-top";

export const twoColumns = "cc2-l cr1 cr--light-silver"

export const mainContainer = `${fontFamily} ${fontColor} ${normalFontSize} pv2`;

