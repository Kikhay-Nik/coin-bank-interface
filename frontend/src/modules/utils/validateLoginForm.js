const errorsList = {
  required: 'Заполните поле.',
  short: 'Минимальная длина 6 символов.',
  space: 'Пробелы недопустимы.',
};

export default (stringValue) => {
  if (!stringValue) {
    return {
      valid: false,
      error: errorsList.required,
    };
  }

  if (stringValue.length < 6) {
    return {
      valid: false,
      error: errorsList.short,
    };
  }

  if (stringValue.includes(' ')) {
    return {
      valid: false,
      error: errorsList.space,
    };
  }

  return {
    valid: true,
    error: '',
  };
};
