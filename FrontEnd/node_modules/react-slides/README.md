# react-slides

## Install

`npm install react-slides --save`

## Usage

### Speakerdeck

```js

var React  = require('react/addons'),
    slides = require('react-slides'),
    Slides = React.createFactory(slides);

React.render(<Slides service="speakerdeck" id="mydataid" />, mountNode);
```

### Generic iFrame

```js

var React  = require('react/addons'),
    slides = require('react-slides'),
    Slides = React.createFactory(slides);

React.render(<Slides url="http://my.sweet.presentation.whatever" />, mountNode);
```
