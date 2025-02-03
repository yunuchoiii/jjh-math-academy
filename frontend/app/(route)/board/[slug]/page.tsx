import Board from "@/app/_components/Board/Board";
import Title from "@/app/_components/Title/Title";
import { boardService, BoardSlugEnum } from "@/app/_service/board";
import { IPaginatedResponse } from "@/app/_service/common";
import { IPost, postService } from "@/app/_service/post";
import Link from "next/link";

interface BoardPageProps { 
  params: { slug: BoardSlugEnum }, 
  searchParams: { page?: number, searchKeyword?: string, searchType?: string } 
}

const fetchPostList = async (slug: BoardSlugEnum, boardInfo: any, searchParams: any) => {
  const page = searchParams.page || 1;
  const commonParams = {
    page,
    size: 10,
    isActive: true,
    searchKeyword: searchParams.searchKeyword,
    searchType: searchParams.searchType as "title" | "content" | "title+content" | undefined,
  };

  if (slug === BoardSlugEnum.ALL) {
    return await postService.getPostList(commonParams) as IPaginatedResponse<IPost>;
  } else {
    return await boardService.getPostListByBoardId({
      boardId: boardInfo.id,
      ...commonParams,
    }) as IPaginatedResponse<IPost>;
  }
};

const BoardPage = async ({ params, searchParams }: BoardPageProps) => {
  const { slug } = params;
  const boardInfo = await boardService.getBoardInfoBySlug(slug);
  const postList = await fetchPostList(slug, boardInfo, searchParams);

  return <div>
    <Link href={`/board/${slug}`}>
      <Title 
        title={boardInfo.name} 
        color="green" 
      />
    </Link>
    <Board 
      board={boardInfo} 
      postList={postList}
      page={searchParams.page}
    />
  </div>;
};

export default BoardPage;