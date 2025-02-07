"use client";
import { boardService, BoardSlugEnum } from "@/app/_service/board";
import { IPaginatedResponse } from "@/app/_service/common";
import { IPost } from "@/app/_service/post";
import { useEffect, useState } from "react";
import PostCard from "../Post/PostCard";

interface BoardSectionProps {
  title: string;
  color: "green" | "yellow"
  slug: BoardSlugEnum
}

const BoardSection = ({ title, color, slug }: BoardSectionProps) => {
  const [postList, setPostList] = useState<IPost[] | null>(null);

  useEffect(() => {
    const fetchBoardInfo = async () => {
      try {
        const boardInfo = await boardService.getBoardInfoBySlug(slug);
        const paginatedPostList = await boardService.getPostListByBoardId({
          boardId: boardInfo.id, 
          page: 1, 
          size: 10,
          isActive: true,
        }) as IPaginatedResponse<IPost>;
        setPostList(paginatedPostList.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchBoardInfo();
  }, [slug]);

  if (postList && postList.length === 0) return null;

  return <div className="flex justify-center items-center">
    <div className="2xl:w-[80rem] xl:w-[72rem] lg:w-[56rem] md:w-[48rem] sm:w-[36rem] w-full min-w-[300px] px-5 md:py-[120px] py-[60px]">
      <h2 className={`text-3xl font-extrabold NanumSquare text-center mb-10 ${color === "yellow" ? "text-yellow-5" : "text-green-2"}`}>{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {postList?.map((post) => (
          <PostCard 
            key={`${slug}-post-${post.id}`} 
            slug={slug} 
            post={post} 
          />
        ))}
      </div>
    </div>
  </div>
}

export default BoardSection;