import randomNumber from '../randomNumber';

test('функция возвращает случайное число в заданном диапозоне', () => {
  const result = randomNumber(10, 20);
  expect(result).toBeGreaterThanOrEqual(10);
  expect(result).toBeLessThanOrEqual(20);
});
