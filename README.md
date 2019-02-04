## Interactive resume website
This repo contains a website that can be used to browse resume information that
is stored in a JSON file.

The resume website is created as a Single Page Application (SPA) and developed
using the following technologies:

* [React](https://reactjs.org/)
* [Tachyons](https://tachyons.io/)
* [TypeScript](https://www.typescriptlang.org/)
* [webpack](https://webpack.js.org/)

### Features for visitors of the website
* Limit the number of years data is taken into account from.
* Filter technologies
* A master/detail page showing a list of projects and, when a project is
  selected, the details of that project including the technologies that were
  used in it.
* A master/detail page showing a list of technologies and, when a technology is
  selected, the details of tha technology including the projects it was used in.
* A page showing the timeline including job titles, technologies, projects and
  certificates. The user can choose which of these should be displayed.

### Browser Compatibility

Tested:
* Chrome for android 71
* Microsoft Edge 42
* Internet Explorer 11

### Development

#### Folder Structure
`/src`: Container for source code files (tsx, ts, js, jsx, html, css) and
folders making up the application go here. Source code used for the build
doesn't go here.  
`/src/app`: All source code that is **specific to the application's domain**
(i.e. specific to a resume website) goes here.  
`/src/common`: All source code that is **not specific** to the application's
domain goes here.  

#### CSS
Generally, the Tachyons CSS framework is used for styling. Some reusable
combinations of class names are assigned to variables in the `/src/css.ts` file.

#### Icons

Icons are created as SVG but exposed and kept as react components. The file
./src/components/Icons.tsx contains a component for each icon.

Icons may also be placed in the `/src/common/icons` folder as individual files. 

##### Icon CSS

Whenever possible we try to add SVG specific properties to existing Tachyons
classes that should also affect the SVG icons. The css necessary goes into the
file `./src/Icons.css`.

Example

```css
/* ./src/Icons.css */
.white {
  stroke: white;
}
```

The css in the example above ensures Tachyons' `white` class not only sets the
normal `color` property but also SVG's `stroke` property.

#### Animations
##### CSS
The CSS classes needed for animations go into the file `/src/Animations.css`.
These classes should be similar to Tachyons' classes in that they only modify
few properties. As with the other Tachyons classes, their names are then
concatenated to form `className` properties in the file `/src/css.ts`.

#### React
To help with animations (usually using CSS `transition`) that require
`ClassName` or CSS properties to be changed, the react addon
[react-transition-group](https://reactcommunity.org/react-transition-group/) is
used.

### Build
Run the command `npm run build` which will put the build output into the `/dist`
folder.