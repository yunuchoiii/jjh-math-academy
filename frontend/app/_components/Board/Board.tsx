"use client"

import { IBoard } from "@/app/_service/board";
import { IPaginatedResponse } from "@/app/_service/common";
import { IPost } from "@/app/_service/post";
import { formatDate, isNew } from "@/app/_utils";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from 'react';
import { useMediaQuery } from "usehooks-ts";
import NewBadge from "../Badge/NewBadge";
import NoticeBadge from "../Badge/NoticeBadge";
import RoundButton, { RoundButtonProps } from "../Button/RoundButton";
import Pagination from "../Pagination/Pagination";

interface BoardProps {
  board: IBoard;
  postList: IPaginatedResponse<IPost>;
}

const Board = ({ board, postList }: BoardProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const isMobile = useMediaQuery("(max-width: 640px)");

  const getNo = (index: number) => {
    return (postList.page.requestPage - 1) * postList.page.requestSize + index + 1;
  }

  const handleRowClick = (postId: number) => {
    router.push(`/board/${board.slug}/${postId}`);
  }

  const pageData = postList.page;
  const contentData = postList.data;

  const buttons:RoundButtonProps[] = [
    { 
      label: "글쓰기", 
      color: "green",
      onClick: () => router.push(`/board/${board.slug}/write`),
    },
  ];

  const boardButtonProps = [
    {label: "공지사항", slug: "notice"},
    {label: "초·중등 교과 수학", slug: "common-math"},
    {label: "요리수 연산", slug: "yorisu"},
    {label: "시그마 클래스", slug: "sigma-class"},
  ]

  const boardButtons:RoundButtonProps[] = boardButtonProps.map((button) => ({
    label: button.label,
    onClick: () => router.push(`/board/${button.slug}`),
    isActive: pathname.includes(`/board/${button.slug}`),
  }));

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);

  useEffect(() => {
    if (!isMobile) return; // 모바일이 아닐 경우, 아무것도 하지 않음

    const handleScroll = () => {
      if (scrollContainerRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
        setIsAtStart(scrollLeft === 0);
        setIsAtEnd(scrollLeft + clientWidth >= scrollWidth - 1);
      }
    };

    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll);
      handleScroll(); // 초기 상태 설정
    }

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener('scroll', handleScroll);
      }
    };
  }, [isMobile]);

  return <div className="w-full flex flex-col gap-10 text-base">
    <section className="flex flex-col gap-2.5">
      <div className="relative">
        <div className={`absolute z-10 left-0 top-0 bottom-0 w-20 bg-gradient-to-l from-transparent to-white pointer-events-none transition-opacity duration-300 ${isAtStart ? "opacity-0" : "opacity-100"}`}/>
        <div className={`absolute z-10 right-0 top-0 bottom-0 w-20 bg-gradient-to-r from-transparent to-white pointer-events-none transition-opacity duration-300 ${isAtEnd ? "opacity-0" : "opacity-100"}`}/>
        <div
          className="relative flex justify-start items-center gap-2.5 overflow-x-auto scrollbar-hidden"
          ref={scrollContainerRef}
        >
          {boardButtons.map((button, index) => (
            <RoundButton key={`board-button-${index}`} {...button} />
          ))}
        </div>
      </div>
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
    </section>
    <Pagination paginationInfo={pageData} />
  </div>;
};

export default Board;