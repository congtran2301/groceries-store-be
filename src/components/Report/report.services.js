import Order from '../Order/order.model';

const getProfitByDay = async (fromDate, toDate) => {
  const reportData = await Order.aggregate()
    .match({ $and: [{ date: { $gte: fromDate } }, { date: { $lte: toDate } }] })
    .group({
      _id: { $dateToString: { format: '%Y-%m-%d', date: '$date' } },
      totalOrders: { $sum: 1 },
      totalRevenue: { $sum: '$totalPrice' }
    });
  return reportData;
};
const getRevenueByProduct = async (fromDate, toDate) => {
  const reportData = await Order.aggregate()
    .match({
      $and: [{ date: { $gte: fromDate } }, { date: { $lte: toDate } }]
    })
    .unwind('$products')
    .lookup({
      from: 'products',
      localField: 'products.productId',
      foreignField: '_id',
      as: 'productInfo'
    })
    .group({
      _id: '$products.productId',
      totalSold: { $sum: '$products.quantity' },
      productInfo: { $first: { $first: '$productInfo' } },
      totalRevenue: { $sum: '$products.price' },
      totalOrder: { $addToSet: '$_id' }
    })
    .project({
      _id: 1,
      totalSold: 1,
      productInfo: 1,
      totalRevenue: 1,
      totalOrder: { $size: '$totalOrder' }
    });
  return reportData;
};
const getRevenueByCategory = async (fromDate, toDate) => {
  const reportData = await Order.aggregate()
    .match({
      $and: [{ date: { $gte: fromDate } }, { date: { $lte: toDate } }]
    })
    .unwind('$products')
    .lookup({
      from: 'products',
      localField: 'products.productId',
      foreignField: '_id',
      as: 'productInfo'
    })
    .project({
      products: 1,
      productInfo: { $first: '$productInfo' }
    })
    .lookup({
      from: 'categories',
      localField: 'productInfo.categoryId',
      foreignField: '_id',
      as: 'categoryInfo'
    })
    .project({
      products: 1,
      productInfo: 1,
      categoryInfo: { $first: '$categoryInfo' }
    })
    .group({
      _id: '$categoryInfo._id',
      totalRevenue: { $sum: '$products.price' },
      categoryInfo: { $first: '$categoryInfo' },
      totalOrder: { $addToSet: '$_id' }
    })
    .project({
      totalRevenue: 1,
      categoryInfo: 1,
      totalOrder: { $size: '$totalOrder' }
    });
  return reportData;
};
const getRevenueByStaff = async (fromDate, toDate) => {
  const reportData = await Order.aggregate()
    .match({
      $and: [
        { date: { $gte: fromDate } },
        { date: { $lte: toDate } },
        { isPaid: true }
      ]
    })
    .lookup({
      from: 'users',
      localField: 'staffId',
      foreignField: '_id',
      as: 'staffInfo'
    })
    .group({
      _id: '$staffId',
      totalRevenue: { $sum: '$totalPrice' },
      staffInfo: { $first: '$staffInfo' },
      totalOrder: { $addToSet: '$_id' }
    })
    .project({
      totalRevenue: 1,
      staffInfo: { $first: '$staffInfo' },
      totalOrder: { $size: '$totalOrder' }
    });
  return reportData;
};
export default {
  getProfitByDay,
  getRevenueByProduct,
  getRevenueByCategory,
  getRevenueByStaff
};
