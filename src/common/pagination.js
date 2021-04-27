const makePaginationData = ({
  numberOfDocument = null,
  currentPage = 1,
  perPage = 10
}) => {
  const totalPage = Math.ceil(numberOfDocument / perPage);
  return {
    totalPage,
    currentPage,
    perPage
  };
};
const handlePaginationFromQuery = (req) => {
  let { page, perPage } = req.query;
  page = isNaN(parseInt(page)) ? undefined : parseInt(page);
  perPage = isNaN(parseInt(perPage)) ? 10 : parseInt(perPage);
  return {
    page,
    perPage
  };
};
export default {
  makePaginationData,
  handlePaginationFromQuery
};
