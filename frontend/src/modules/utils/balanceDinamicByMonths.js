import { DateTime } from 'luxon';
import months from '../constants/months';

export default (data, monthCount) => {
  const { account, transactions } = data;
  let { balance } = data;
  const now = DateTime.now();
  const currentYear = now.year;
  const currentMonth = now.month;
  let beginCurrentMonth = DateTime.local(currentYear, currentMonth, 1);

  const balanceByMonth = [
    {
      month: months[currentMonth - 1],
      balance: balance || 0,
    },
  ];

  for (let i = 0; i < transactions.length; i++) {
    const transaction = transactions[transactions.length - i - 1];

    const incoming = transaction.to === account;

    if (DateTime.fromISO(transaction.date) > beginCurrentMonth) {
      balance -= incoming ? transaction.amount : -transaction.amount;
    } else {
      beginCurrentMonth = beginCurrentMonth.minus({ month: 1 });
      balanceByMonth.push({
        month: months[beginCurrentMonth.month - 1],
        balance: balance || 0,
      });

      if (balanceByMonth.length === monthCount) break;
    }
  }

  return balanceByMonth.reverse();
};
