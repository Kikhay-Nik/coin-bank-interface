const dateOptions = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
};

export default (dateString) => {
  const temp = new Date(dateString).toLocaleString('ru', dateOptions);
  const result = temp.replace('г.', '');
  return result;
};
