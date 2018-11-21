## Interactive resume web site

### Development

#### CSS


#### Icons

Icons are created as SVG. The file ./src/components/Icons.tsx contains a
component for each icon.

##### Icon CSS

Whenever possible we try to add SVG specific properties to existing Tachyons classes that
should also affect the SVG icons. The css necessary goes into the file
`./src/icons.css`.

Example

```css
/* ./src/icons.css */
.white {
  stroke: white;
}
```

The css in the example above ensures Tachyons' `white` class not only sets
the normal `color` property but also SVG's `stroke` property.

#### Animations
##### CSS
The CSS classes needed for animations go into the file `./src/Animations.css`. These classes should be similar to Tachyons' classes in that they only modify
few properties. As with the other Tachyons classes, their names are then
concatenated to form `className` properties in the file `css.ts`.

#### React
To help with animations (usually using CSS `transition`) that require `ClassName` or CSS properties to be changed, the react addon [react-transition-group](https://reactcommunity.org/react-transition-group/) is used.