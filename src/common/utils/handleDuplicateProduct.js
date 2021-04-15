export default (productIds) => {
  let arr = [];

  productIds.forEach((p) => {
    const productExist = arr.find(
      (product) => product.id.toString() == p.id.toString()
    );

    if (productExist) {
      const newArr = arr.map((product) => {
        if (product.id == p.id)
          return { ...product, quantity: p.quantity + product.quantity };
      });
      arr = newArr;
    } else {
      arr.push(p);
    }
  });
  return arr;
};
