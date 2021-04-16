import Order from '../Order/order.model';

const getProfitByDay = async (fromDate, toDate) => {
  console.log(fromDate, toDate);
  const from = new Date(fromDate);
  const to = new Date(toDate);
  console.log(from);
  console.log(to);
  const reportData = await Order.aggregate()
    .match({ $and: [{ date: { $gte: fromDate } }, { date: { $lte: toDate } }] })
    .group({
      _id: { $dateToString: { format: '%Y-%m-%d', date: '$date' } },
      totalOrders: { $sum: 1 },
      totalRevenue: { $sum: '$totalPrice' }
    });
  console.log(reportData);
};
const getRevenueByProduct = async (fromDate, toDate) => {
  const reportData = await Order.aggregate().match({
    $and: [{ date: { $gte: fromDate } }, { date: { $lte: toDate } }]
  });
  console.log(reportData);
};

export default {
  getProfitByDay,
  getRevenueByProduct
};
