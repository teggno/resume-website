import React from "react";

/**
 * Adds a <style> tag to the page. Style tag will contain the vendor specific
 * css rules to place the cells of a CSS grid.
 */
export default class GridCellsAutoPlacementCss extends React.Component<
  GridCellsAutoPlacementCssProps
> {
  constructor(props: GridCellsAutoPlacementCssProps) {
    super(props);

    this.style = this.createStyleSheet();
  }
  private style: HTMLStyleElement;

  componentDidMount() {
    document.head.appendChild(this.style);
    this.style.innerHTML = this.css();
    console.debug("added style");
  }

  componentWillUnmount() {
    document.head.removeChild(this.style);
    console.debug("removed style");
  }

  componentDidUpdate() {
    this.style.innerHTML = this.css();
    console.debug("filled style");
  }

  private css() {
    return [this.cssRules(this.props.defaultColumns)]
      .concat(
        this.props.defs.map(
          d => `@media ${d.query}{${this.cssRules(d.columns)}}`
        )
      )
      .join("");
  }

  private cssRules(columns: number) {
    return cssRules(this.props.count, this.props.cellCssSelector, columns);
  }

  private createStyleSheet() {
    const style = document.createElement("style");

    // WebKit hack :(
    style.appendChild(document.createTextNode(""));

    return style;
  }

  render() {
    return null;
  }
}

interface GridCellsAutoPlacementCssProps {
  count: number;
  cellCssSelector: string;
  defaultColumns: number;
  defs: {
    query: string;
    columns: number;
  }[];
}

const columnProperties = ["-ms-grid-column"];
const rowProperties = ["-ms-grid-row"];

/**
 * @returns Contents for a CSS style sheet like
 ```
  .theCell:nth-child(1){
    -ms-grid-column:1;
    -ms-grid-row:1;
  }
 ```
 * */
function cssRules(cellCount: number, cellCssSelector: string, columns: number) {
  const rules = [];
  let i = 0;
  for (; i < cellCount; i++) {
    rules.push(
      `${cellCssSelector}:nth-child(${i + 1}){${columnProperties
        .map(p => `${p}:${(i % columns) + 1};`)
        .join("")}${rowProperties
        .map(p => `${p}:${Math.floor(i / columns) + 1};`)
        .join("")}}`
    );
  }
  return rules.join("");
}
