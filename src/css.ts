const fontFamily = "sans-serif";
const fontColor = "dark-gray";
const normalFontSize = "f6 f5-ns"

const nearWhite = "near-white";
const stripedBackground = `striped--${nearWhite}`;
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
export const link = `${fontColor} link hover-blue`;
export const dt = "fw6";
export const dd = "ma0 mb2";

const button = "f6 link br1 ph3 pv2 mb2 dib white mh2";
export const normalButton = `${button} ${blueBackground}`;
export const clickedButton = `${button} ${lightBlueBackground}`;

export const checkboxListItem = "nowrap";

export const textParagraph = `${normalFontSize} lh-copy`;
export const list = "list pa0";
export const stripedStringList = `lh-copy pa2 ${stripedBackground}`;
export const card = `br3 hidden ba ${lightSilverBorder}`;
export const cardTitle = `${nearWhiteBackground} f4 br3 br--top mv0 pv2 ph3`;
/** Container for the content of the card below the title bar. */
export const cardContent = "pa3 bt b--black-10";

export const skillListItem = `relative bb pa2 ${lightSilverBorder}`;
export const skillListBar = `absolute bottom-0 left-0 ${lightestBlueBackground}`;
export const skillLinkTitle = "f4 fw6";
export const skillLinkSub = `${normalFontSize}`;

export const wrappingList = `${list} cf`;
export const wrappingListItem = "fl mr4 mb4 w-100 w-40-l";

export const chartBackground = nearWhiteBackground;

export const mainContainer = `${fontFamily} ${fontColor} ${normalFontSize} pv2`;
