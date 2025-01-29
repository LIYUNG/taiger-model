import { helloWorldFunc, helloWorldSring } from '../src/index';

test('helloWorldFunc', () => {
  expect(helloWorldFunc()).toBe('Hello, world function!');
});

test('helloWorldSring', () => {
  expect(helloWorldSring).toBe('Hello, world String!');
});
