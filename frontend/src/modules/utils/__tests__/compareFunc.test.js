import compare from '../compareFunc';

const testArray = [
  {
    account: '74213041477477406320783754',
    balance: 1190417.39,
    transactions: [
      {
        date: '2025-04-14T15:02:22.838Z',
      },
    ],
  },
  {
    account: '27847153583603074320035541',
    balance: 1004280.26,
    transactions: [
      {
        date: '2025-04-14T13:11:05.380Z',
      },
    ],
  },
  {
    account: '32304087711648753801534067',
    balance: 0,
    transactions: [],
  },
];

test('Функция корректно сортирует обьекты по номеру счета', () => {
  const result = testArray.slice().sort(compare('account'));
  expect(result).toEqual([
    {
      account: '27847153583603074320035541',
      balance: 1004280.26,
      transactions: [
        {
          date: '2025-04-14T13:11:05.380Z',
        },
      ],
    },

    {
      account: '32304087711648753801534067',
      balance: 0,
      transactions: [],
    },

    {
      account: '74213041477477406320783754',
      balance: 1190417.39,
      transactions: [
        {
          date: '2025-04-14T15:02:22.838Z',
        },
      ],
    },
  ]);
});

test('Функция корректно сортирует обьекты по балансу', () => {
  const result = testArray.slice().sort(compare('balance'));
  expect(result).toEqual([
    {
      account: '32304087711648753801534067',
      balance: 0,
      transactions: [],
    },
    {
      account: '27847153583603074320035541',
      balance: 1004280.26,
      transactions: [
        {
          date: '2025-04-14T13:11:05.380Z',
        },
      ],
    },
    {
      account: '74213041477477406320783754',
      balance: 1190417.39,
      transactions: [
        {
          date: '2025-04-14T15:02:22.838Z',
        },
      ],
    },
  ]);
});

test('Функция корректно сортирует обьекты по дате последней транзакции', () => {
  const result = testArray.slice().sort(compare('transactions.date'));
  expect(result).toEqual([
    {
      account: '27847153583603074320035541',
      balance: 1004280.26,
      transactions: [
        {
          date: '2025-04-14T13:11:05.380Z',
        },
      ],
    },
    {
      account: '74213041477477406320783754',
      balance: 1190417.39,
      transactions: [
        {
          date: '2025-04-14T15:02:22.838Z',
        },
      ],
    },
    {
      account: '32304087711648753801534067',
      balance: 0,
      transactions: [],
    },
  ]);
});
