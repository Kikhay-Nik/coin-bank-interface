import { DateTime } from 'luxon';
import months from '../constants/months';

// Вычисление сумм входящих/исходящих транзакций за последние month месяцев
export default (account, monthsCount) => {
  const id = account.account;
  const { transactions } = account;
  let income = 0;
  let outcome = 0;

  const date = DateTime.now();

  // Вычисляем начало текущего месяца для сравнения
  let firstDayCurrentMonth = DateTime.local(date.year, date.month, 1);

  const monthlyTransactions = [];

  // Если транзакций нет, создаем элемент с нулевыми значениями
  if (!transactions.length) {
    monthlyTransactions.push({
      month: months[firstDayCurrentMonth.month - 1],
      income,
      outcome,
    });
    return monthlyTransactions;
  }

  for (let i = 0; i < transactions.length; i++) {
    // Перебираем транзакции с конца, т.к. идем с последнего месяца назад
    const transaction = transactions[transactions.length - i - 1];
    const incoming = transaction.to === id;
    const transactionDate = DateTime.fromISO(transaction.date);

    if (transactionDate > firstDayCurrentMonth) {
      // eslint-disable-next-line max-len
      // Если мы еще в текущем месяце, корректируем суммы в зависимости от типа транзакции (входящая/исходящая)
      if (incoming) income += transaction.amount;
      else outcome += transaction.amount;
    } else {
      // Если транзакции текущего месяца закончились
      monthlyTransactions.push({
        month: months[firstDayCurrentMonth.month - 1],
        income,
        outcome,
      });

      // Переводим нашу переменную на месяц назад
      firstDayCurrentMonth = firstDayCurrentMonth.minus({ month: 1 });

      // Добавляем элемент с актуальными суммами транзакций за месяц в массив

      // Обнуляем суммы для корректного вычисления в предыдущем месяце
      income = 0;
      outcome = 0;

      if (incoming) income += transaction.amount;
      else outcome += transaction.amount;

      // Заканчиваем перебор, как только набрали заданное количество месяцев данных
      if (monthlyTransactions.length === monthsCount) {
        income = 0;
        outcome = 0;
        break;
      }
    }
  }

  if (income !== 0 || outcome !== 0) {
    monthlyTransactions.push({
      month: months[firstDayCurrentMonth.month - 1],
      income,
      outcome,
    });
  }

  // Возвращаем массив наоборот, т.к. мы начинали с конца
  return monthlyTransactions.reverse();
};
