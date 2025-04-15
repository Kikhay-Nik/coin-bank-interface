import dateStringFormated from '../dateStringFormated';

test('Функция корректно обрабатывает строку даты в формате ISO', () => {
  const result = dateStringFormated('2025-04-08T12:26:11.225Z');
  expect(result).toBe('8 апреля 2025');
});

test('Функция выбрасывает ошибку, если передать некорректное значение', () => {
  const result = dateStringFormated('25.08.2020');
  expect(result).toBe('Invalid DateTime');
});
