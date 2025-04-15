import balanceDinamicByMonths from '../balanceDinamicByMonths';

const testObj = {
  account: '58',
  balance: 60,

  transactions: [
    {
      date: '2025-02-14T13:11:05.300Z',
      to: '58',
      amount: 100,
    },
    {
      date: '2025-03-14T13:11:05.300Z',
      to: '8',
      amount: 10,
    },
    {
      date: '2025-03-15T13:11:05.300Z',
      to: '8',
      amount: 10,
    },
    {
      date: '2025-04-14T13:11:05.300Z',
      to: '8',
      amount: 20,
    },
  ],
};

test('функция верно расчитывает динамику баланса за указанное число месяцев', () => {
  const result = balanceDinamicByMonths(testObj, 6);
  expect(result).toEqual([
    { month: 'фев', balance: 100 },
    { month: 'мар', balance: 80 },
    { month: 'апр', balance: 60 },
  ]);
});
