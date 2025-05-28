import transactionsSum from '../transactionsSum';

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

test('Функция корректно считает суммы входящих и исходящи операций по месяцам', () => {
  const result = transactionsSum(testObj, 6);
  expect(result).toEqual([
    { month: 'фев', income: 100, outcome: 0 },
    { month: 'мар', income: 0, outcome: 20 },
    { month: 'апр', income: 0, outcome: 20 },
    { month: 'май', income: 0, outcome: 0 },
  ]);
});
