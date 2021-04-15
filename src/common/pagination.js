const makePaginationData = ({
  totalPage = null,
  currentPage = 1,
  perPage = 10
}) => {
  return {
    totalPage,
    currentPage,
    perPage
  }
}
const handlePaginationFromQuery = (req) => {
  let { page, perPage } = req.query
  page = isNaN(parseInt(page)) ? undefined : parseInt(page)
  perPage = isNaN(parseInt(perPage)) ? 10 : parseInt(perPage)
  return {
    page,
    perPage
  }
}
export default {
  makePaginationData,
  handlePaginationFromQuery
}
