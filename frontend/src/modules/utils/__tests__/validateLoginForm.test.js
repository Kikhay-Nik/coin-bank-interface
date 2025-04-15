import validateLoginForm from '../validateLoginForm';

test('Функция валидации пропускает корректное значение', () => {
  const result = validateLoginForm('developer');
  expect(result.valid).toBe(true);
});

test('Функция валидации не пропускает пустое значение', () => {
  const result = validateLoginForm('   ');
  expect(result.valid).toBe(false);
});

test('Функция валидации не пропускает значение меньше 6 символов', () => {
  const result = validateLoginForm('devel');
  expect(result.valid).toBe(false);
});

test('Функция валидации не пропускает значение с пробелами', () => {
  const result = validateLoginForm('deve loper');
  expect(result.valid).toBe(false);
});
