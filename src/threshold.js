/**
 * Returns metrics regarding an element's position in the viewport
 * @method threshold
 * @param {Node} element
 * @returns {Object}
 */
function threshold(element) {
  var rects = element.getBoundingClientRect();

  var upperThreshold = (threshold._viewport.height - rects.top) / rects.height;
  var bottomThreshold = rects.bottom / rects.height;

  var leftThreshold = (threshold._viewport.width - rects.left) / rects.width;
  var rightThreshold = rects.right / rects.width;

  var horizontalTrajectory = rects.width + threshold._viewport.width;
  var verticalTrajectory = rects.height + threshold._viewport.height;

  /**
   * area
   *
   * This value represents the area of the component present in the viewport
   *
   * It is calculated by using the min value between the distance from the
   * top, right, bottom and left edges of the element and its height and weight
   *
   */

  var minXArea = Math.min(leftThreshold, rightThreshold);
  var xArea = Math.min(1, Math.max(minXArea, 0));

  var minYArea = Math.min(upperThreshold, bottomThreshold);
  var yArea = Math.min(1, Math.max(minYArea, 0));

  /**
   * trajectory
   *
   * This value represents the translation of the element from the moment
   * it enters the viewport until it gets out
   *
   * It is calculated by measuring the distance between the top and left edge
   * of the viewport and the bottom and right edge of the element
   *
   */
  var xTrajectory = (horizontalTrajectory - rects.right) / horizontalTrajectory;
  var yTrajectory = (verticalTrajectory - rects.bottom) / verticalTrajectory;

  return {
    area: xArea * yArea,
    trajectory: {
      x: xTrajectory,
      y: yTrajectory
    }
  };
}

// set as property for testing purposes
threshold._viewport = {
  height: window.innerHeight,
  width: window.innerWidth
};

/**
 * Updates memoized viewport metrics
 * @method updateViewport
 */
function updateViewport() {
  threshold._viewport.height = window.innerHeight;
  threshold._viewport.width = window.innerWidth;
}

// update viewport metrics when window is resized
window.addEventListener('scroll', updateViewport);

export default threshold;
