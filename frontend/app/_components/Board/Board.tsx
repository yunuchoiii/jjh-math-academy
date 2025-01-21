"use client"

import { IBoard } from "@/app/_service/board";
import { IPaginatedResponse } from "@/app/_service/common";
import { IPost } from "@/app/_service/post";
import { formatDate, isNew } from "@/app/_utils";
import { useRouter } from "next/navigation";
import NewBadge from "../Badge/NewBadge";
import NoticeBadge from "../Badge/NoticeBadge";
import Pagination from "../Pagination/Pagination";

interface BoardProps {
  board: IBoard;
  postList: IPaginatedResponse<IPost>;
}

const Board = ({ board, postList }: BoardProps) => {
  const router = useRouter();

  const getNo = (index: number) => {
    return (postList.page.requestPage - 1) * postList.page.requestSize + index + 1;
  }

  const handleRowClick = (postId: number) => {
    router.push(`/board/${board.slug}/${postId}`);
  }

  const pageData = postList.page;
  const contentData = postList.data;

  return <section className="w-full flex flex-col gap-10 text-base">
    <div className="border-t-2 border-t-green-1 border-b border-b-[#CCCCCC]">
      <div className="hidden md:flex items-center h-12 font-bold">
        <div className="w-16 text-center">번호</div>
        <div className="flex-1 text-center">제목</div>
        <div className="w-16 text-center">조회수</div>
        <div className="w-28 text-center">작성일자</div>
      </div>
      <div>
        {contentData.map((post, index) => (
          <div key={`pc-${board.slug}-${post.id}`}>
            {/* PC */}
            <div 
              onClick={() => handleRowClick(post.id)}
              className="hidden md:flex items-center h-12 border-t border-[#CCCCCC] cursor-pointer hover:bg-[#F5F5F5]"
            >
              <div className="w-16 text-center">{getNo(index)}</div>
              <div className="flex-1 flex items-center min-w-0">
                {post.isNotice && (
                  <div className="flex items-center mr-2.5 flex-shrink-0">
                    <NoticeBadge />
                  </div>
                )}
                <span className="font-medium ellipsis">{post.title}</span>
                {isNew(new Date(post.createdAt)) && (
                  <div className="flex items-center ml-2.5 flex-shrink-0">
                    <NewBadge />
                  </div>
                )}
              </div>
              <div className="w-16 text-center">{post.views}</div>
              <div className="w-28 text-center">{formatDate(post.createdAt, '-')}</div>
            </div>
            {/* Mobile */}
            <div 
              onClick={() => handleRowClick(post.id)}
              className="flex md:hidden border-t border-[#CCCCCC] cursor-pointer active:bg-[#F5F5F5] py-2 px-2.5"
            >
              {post.isNotice && (
                <div className="flex items-center mr-3 flex-shrink-0">
                  <NoticeBadge />
                </div>
              )}
              <div className="flex-1 flex flex-col min-w-0">
                <div className="leading-loose font-medium ellipsis">{post.title}</div>
                <div className="flex gap-2.5 text-xs text-[#777]">
                  <div>{formatDate(post.createdAt, '-')}</div>
                  <div>조회 {post.views}</div>
                </div>
              </div>
              {isNew(new Date(post.createdAt)) && (
                <div className="flex items-center ml-2.5 flex-shrink-0">
                  <NewBadge />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
    <Pagination paginationInfo={pageData} />
  </section>;
};

export default Board;