(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.threshold = factory());
}(this, (function () { 'use strict';

var viewport = {
  height: window.innerHeight
};

/**
 * Returns metrics regarding an element's position in the viewport
 * @method threshold
 * @param {Node} element
 * @returns {Object}
 */
function threshold(element) {
  var rects = element.getBoundingClientRect();

  var upperThreshold = ((viewport.height - rects.top) / rects.height);
  var bottomThreshold = rects.bottom / rects.height;
  var trajectoryLength = rects.height + viewport.height;

  /**
   * threshold
   *
   * This value represents the area of the component present in the viewport.
   *
   * It is calculated by using the min value between the distance from the
   * top and bottom edges of the element and its height.
   *
   */
  var threshold = Math.min(1, Math.max(Math.min(upperThreshold, bottomThreshold), 0));

  /**
   * trajectory
   *
   * This value represents the translation of the element from the moment
   * it enters the viewport until it gets out.
   *
   * It is calculated by measuring the distance between the top of the
   * viewport and the bottom edge of the element.
   *
   */
  var trajectory = ((trajectoryLength - rects.bottom) / (trajectoryLength));

  return {
    threshold: threshold,
    trajectory: trajectory
  }
}

return threshold;

})));
