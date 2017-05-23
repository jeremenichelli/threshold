# threshold [![Build Status](https://travis-ci.org/jeremenichelli/threshold.svg?branch=master)](https://travis-ci.org/jeremenichelli/threshold)

Small library to get metrics from a DOM element and its position on the viewport.


## Install

Download the library from the **dist** folder and include it in a script tag or install using **npm**.

```sh
npm install threshold --save
```


## Motivation

This library was created to gather specific numbers from an element's position in the viewport and animate or change styles of its children elements based on them.

When you call `threshold` passing an element, you get an object with two indicators.

```js
import threshold from 'threshold';

const element = document.querySelector('.test');

threshold(element);
// { threshold, trajectory }
```


### threshold

The first number represents the portion of visible area of the element.

This indicator goes from `0` when the element is completely out of sight, to `1` in case is possible for the element to be all visible at some point while the user scrolls.


### trajectory

The second indicates the fraction of the distance between the point in the viewport where the element becomes visible from the point where it vanishes on top. Different from `threshold`, this number can be less than `0` or higher than `1` since it might be necessary for some specific actions.

You can check these numbers working in this [demo](https://jeremenichelli.github.io/threshold/demo/).


### Gather metrics on scroll

Probably you are going to use this library inside a scroll event.

```js
import threshold from 'threshold';

const element = document.querySelector('.test');

// calculate on scroll
window.addEventListener('scroll', () => {
  threshold(element);
});
```

Though the library tries to figure out this numbers as fast as possible, be sure to measure performance in your project to make sure frames are not dropped. I recommend throttling the event as in the demo.


## License

```
MIT License

Copyright (c) 2017 Jeremias Menichelli

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
