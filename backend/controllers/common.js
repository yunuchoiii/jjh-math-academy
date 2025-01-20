// 공통된 목록 조회 함수
export async function getPaginatedList({model, attributes, page = 1, size = 10, notFoundMessage = "Data not found", filter = {}}) {
  try {
    const limit = parseInt(size);
    const offset = (parseInt(page) - 1) * limit;
    const totalDataCount = await model.count({ where: filter });
    const data = await model.findAll({ attributes, limit, offset, where: filter });
    const totalPages = Math.ceil(totalDataCount / limit);
    const isLastPage = page >= totalPages;
    const isFirstPage = page <= 1;

    if (data.length === 0) {
      return { status: 404, message: notFoundMessage };
    }

    return {
      status: 200,
      data,
      page: {
        totalDataCount,
        totalPages,
        isLastPage,
        isFirstPage,
        requestPage: parseInt(page),
        requestSize: limit
      }
    };
  } catch (error) {
    return { status: 500, message: "Internal server error", error: error.message };
  }
}