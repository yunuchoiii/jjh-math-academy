"use client";
import { boardService, BoardSlugEnum, IBoard } from "@/app/_service/board";
import { IPaginatedResponse } from "@/app/_service/common";
import { IPost } from "@/app/_service/post";
import { useEffect, useState } from "react";

interface BoardSectionProps {
  title: string;
  titleColor: "green" | "yellow"
  slug: BoardSlugEnum
}

const BoardSection = ({ title, titleColor, slug }: BoardSectionProps) => {
  const [boardInfo, setBoardInfo] = useState<IBoard | null>(null);
  const [postList, setPostList] = useState<IPaginatedResponse<IPost> | null>(null);

  useEffect(() => {
    const fetchBoardInfo = async () => {
      try {
        const boardInfo = await boardService.getBoardInfoBySlug(slug);
        setBoardInfo(boardInfo);
        const postList = await boardService.getPostListByBoardId({
          boardId: boardInfo.id, 
          page: 1, 
          size: 10,
          isActive: true,
        }) as IPaginatedResponse<IPost>;
        setPostList(postList);
      } catch (error) {
        console.error(error);
      }
    }
    fetchBoardInfo();
  }, [slug]);

  return <div className="flex justify-center items-center">
    <div className="2xl:w-[80rem] xl:w-[72rem] lg:w-[56rem] md:w-[48rem] sm:w-[36rem] w-full min-w-[300px] px-5 md:py-[120px] py-[60px]">
      <h2 className={`text-3xl font-extrabold NanumSquare text-center ${titleColor === "yellow" ? "text-yellow-5" : "text-green-2"}`}>{title}</h2>
    </div>
  </div>
}

export default BoardSection;