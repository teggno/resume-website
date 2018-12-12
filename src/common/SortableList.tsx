import React from "react";
import ButtonList from "../common/ButtonList";
import { list } from "../css";
import SparklineListItem from "../common/SparklineListItem";
import ListItem from "../common/ListItem";

export default class SortableList<TItem> extends React.Component<
  SortableListProps<TItem>,
  { sort: string }
> {
  constructor(props: SortableListProps<TItem>) {
    super(props);

    this.state = {
      sort: props.sortConfigs[0].name
    };

    this.sortChanged = this.sortChanged.bind(this);
  }

  render() {
    const button = this.props.sortConfigs.filter(
        b => b.name === this.state.sort
      )[0],
      sprk = button.sparkline ? button.sparkline(this.props.items) : null;
    return (
      <>
        <ButtonList
          buttons={this.props.sortConfigs.map(c => ({
            name: c.name,
            label: c.buttonLabel
          }))}
          value={this.state.sort}
          changed={this.sortChanged}
        />
        <ul className={list}>
          {button
            .sort(this.props.items)
            .map(i =>
              sprk ? (
                <SparklineListItem
                  title={button.itemTitle(i)}
                  sub={button.itemSub(i)}
                  href={this.props.href(i)}
                  chartMin={sprk.chartMin}
                  barFrom={sprk.barFrom(i)}
                  barTo={sprk.barTo(i)}
                  chartMax={sprk.chartMax}
                  key={button.itemTitle(i)}
                />
              ) : (
                <ListItem
                  title={button.itemTitle(i)}
                  sub={button.itemSub(i)}
                  href={this.props.href(i)}
                  key={button.itemTitle(i)}
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
  sortConfigs: {
    buttonLabel: string;
    name: string;
    sort: (items: TItem[]) => TItem[];
    itemTitle: (item: TItem) => string;
    itemSub: (item: TItem) => string;
    sparkline?: (
      items: TItem[]
    ) => {
      chartMin: number;
      barFrom: (item: TItem) => number;
      barTo: (item: TItem) => number;
      chartMax: number;
    };
  }[];
}
