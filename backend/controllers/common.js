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

    // 빈 데이터 처리
    if (data.length === 0) {
      return {
        status: 200,
        data: [],
        message: "No data available",
        page: {
          totalDataCount,
          totalPages,
          isLastPage,
          isFirstPage,
          requestPage: parseInt(page),
          requestSize: limit
        }
      };
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
    // 오류 처리
    return { status: 500, message: "Internal server error", error: error.message };
  }
}