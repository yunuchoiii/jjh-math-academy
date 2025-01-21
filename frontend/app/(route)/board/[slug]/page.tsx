import Board from "@/app/_components/Board/Board";
import Title from "@/app/_components/Title/Title";
import { boardService, BoardSlugEnum } from "@/app/_service/board";
import { IPaginatedResponse } from "@/app/_service/common";
import { IPost } from "@/app/_service/post";

interface BoardPageProps { 
  params: { slug: BoardSlugEnum }, 
  searchParams: { page?: number } 
}

const BoardPage = async ({ params, searchParams }: BoardPageProps) => {
  const { slug } = params;
  const page = searchParams.page || 1; // 기본값을 1로 설정

  const boardInfo = await boardService.getBoardInfoBySlug(slug);
  const postList = await boardService.getPostListByBoardId({
    boardId: boardInfo.id, 
    page, 
    size: 10
  }) as IPaginatedResponse<IPost>;

  return <div>
    <Title 
      title={boardInfo.name} 
      color="green" 
    />
    <Board 
      board={boardInfo} 
      postList={postList} 
    />
  </div>;
};

export default BoardPage;