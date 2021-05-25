export default {
  importProduct(req, res, next) {
    try {
      const { warehouseItemId, quantity, type } = req.body;
    } catch (err) {
      next(err);
    }
  }
};
