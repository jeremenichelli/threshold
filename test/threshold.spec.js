import test from 'ava';
import clone from 'lodash.clone';

// mock window object
const window = {
  innerWidth: 0,
  innerHeight: 0,
  addEventListener() {}
};

global.window = clone(window);

// requiring package after window and document mock up
var threshold = require('../src/threshold.js').default;

// reset global and test mocks
test.afterEach(() => {
  global.window = clone(window);
  threshold._viewport = {
    width: 0,
    height: 0
  };
});

test('element is out of the viewport', t => {
  threshold._viewport = {
    height: 400,
    width: 400
  };

  const dummyElement = {
    getBoundingClientRect() {
      return {
        top: 500,
        bottom: 700,
        left: 500,
        right: 700,
        height: 200,
        width: 200
      }
    }
  };

  const dummyMetrics = threshold(dummyElement);

  t.true(dummyMetrics.area === 0);
  t.true(dummyMetrics.trajectory.x < 0);
  t.true(dummyMetrics.trajectory.y < 0);
});

test('element is visible in the viewport', t => {
  threshold._viewport = {
    height: 400,
    width: 400
  };

  const dummyElement = {
    getBoundingClientRect() {
      return {
        top: 300,
        bottom: 500,
        left: 300,
        right: 500,
        height: 200,
        width: 200
      }
    }
  };

  const dummyMetrics = threshold(dummyElement);

  t.true(dummyMetrics.area > 0);
  t.true(dummyMetrics.trajectory.x > 0);
  t.true(dummyMetrics.trajectory.y > 0);
});

test('top left area calculated correctly', t => {
  threshold._viewport = {
    height: 400,
    width: 400
  };

  const dummyElement = {
    getBoundingClientRect() {
      return {
        top: 200,
        bottom: 600,
        left: 200,
        right: 600,
        height: 400,
        width: 400
      }
    }
  };

  const dummyMetrics = threshold(dummyElement);

  t.deepEqual(dummyMetrics.area, 0.25);
});

test('bottom right area calculated correctly', t => {
  threshold._viewport = {
    height: 400,
    width: 400
  };

  const dummyElement = {
    getBoundingClientRect() {
      return {
        top: -200,
        bottom: 200,
        left: -200,
        right: 200,
        height: 400,
        width: 400
      }
    }
  };

  const dummyMetrics = threshold(dummyElement);

  t.deepEqual(dummyMetrics.area, 0.25);
});

test('horizontal trajectory calculated correctly', t => {
  threshold._viewport = {
    height: 600,
    width: 1000
  };

  const dummyElement = {
    getBoundingClientRect() {
      return {
        top: 100,
        bottom: 300,
        left: 300,
        right: 700,
        height: 400,
        width: 400
      }
    }
  };

  const dummyMetrics = threshold(dummyElement);

  t.deepEqual(dummyMetrics.trajectory.x, 0.5);
});


test('vertical trajectory calculated correctly', t => {
  threshold._viewport = {
    height: 800,
    width: 600
  };

  const dummyElement = {
    getBoundingClientRect() {
      return {
        top: -100,
        bottom: 300,
        left: 100,
        right: 300,
        height: 400,
        width: 400
      }
    }
  };

  const dummyMetrics = threshold(dummyElement);

  t.deepEqual(dummyMetrics.trajectory.y, 0.75);
});
