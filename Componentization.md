timeline page
---

- tell which event groups there are: allEventGroups. Depends on whether there are events of a certain kind.
- tell which event groups are checked: selectedEventGroups
- tell which events to list: events
- get notifed about event group selection changes
- where to navigate to when an item has been clicked (different per group)

- could be simplified to
- events
- selectedEventGroups
- onSelectionChange


genericListThingy<TItem>(items, itemTemplate, filterTemplate)
->if there are no items: don't display checkbox
->


itemsFactory(
arranger(items: ArbitraryComponent[])