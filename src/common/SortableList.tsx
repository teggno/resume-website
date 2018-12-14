import React from "react";
import ButtonList from "../common/ButtonList";
import { list } from "../css";
import SparklineListItem from "../common/SparklineListItem";
import ListItem from "../common/ListItem";
import { find, isEmpty } from "ramda";

export default class SortableList<TItem> extends React.Component<
  SortableListProps<TItem>,
  { sort: string | null }
> {
  constructor(props: SortableListProps<TItem>) {
    super(props);

    this.state = {
      sort: isEmpty(props.sortConfigs) ? null : props.sortConfigs[0].name
    };

    this.sortChanged = this.sortChanged.bind(this);
  }

  render() {
    const sortConfig = find(
      b => b.name === this.state.sort,
      this.props.sortConfigs
    );

    return sortConfig
      ? this.renderWithConfig(sortConfig)
      : "Cannot render list without config.";
  }

  private renderWithConfig(sortConfig: SortConfig<TItem>) {
    const sparkline = sortConfig.sparkline
      ? sortConfig.sparkline(this.props.items)
      : null;
    return (
      <>
        <span className="ph2">Sort by</span><ButtonList
          buttons={this.props.sortConfigs.map(c => ({
            name: c.name,
            label: c.buttonLabel
          }))}
          value={sortConfig.name}
          changed={this.sortChanged}
          className="dib"
        />
        <ul className={list + " mt1"}>
          {sortConfig
            .sort(this.props.items)
            .map(i =>
              sparkline ? (
                <SparklineListItem
                  title={sortConfig.itemTitle(i)}
                  sub={sortConfig.itemSub(i)}
                  href={this.props.href(i)}
                  chartMin={sparkline.chartMin}
                  barFrom={sparkline.barFrom(i)}
                  barTo={sparkline.barTo(i)}
                  chartMax={sparkline.chartMax}
                  key={sortConfig.itemTitle(i)}
                />
              ) : (
                <ListItem
                  title={sortConfig.itemTitle(i)}
                  sub={sortConfig.itemSub(i)}
                  href={this.props.href(i)}
                  key={sortConfig.itemTitle(i)}
                />
              )
            )}
        </ul>
      </>
    );
  }

  private sortChanged(name: string) {
    this.setState({
      sort: name
    });
  }
}

interface SortableListProps<TItem> {
  items: TItem[];
  href: (item: TItem) => string;
  sortConfigs: SortConfig<TItem>[];
}

interface SortConfig<T> {
  buttonLabel: string;
  name: string;
  sort: (items: T[]) => T[];
  itemTitle: (item: T) => string;
  itemSub: (item: T) => string;
  sparkline?: (
    items: T[]
  ) => {
    chartMin: number;
    barFrom: (item: T) => number;
    barTo: (item: T) => number;
    chartMax: number;
  };
}
