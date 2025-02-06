"use client";
import { boardService, BoardSlugEnum, IBoard } from "@/app/_service/board";
import { IPaginatedResponse } from "@/app/_service/common";
import { IPost } from "@/app/_service/post";
import { formatDate } from "@/app/_utils";
import Link from "next/link";
import { useEffect, useState } from "react";

interface BoardSectionProps {
  title: string;
  color: "green" | "yellow"
  slug: BoardSlugEnum
}

const parseHTMLToText = (html: string): string => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  return doc.body.textContent || "";
};

const BoardSection = ({ title, color, slug }: BoardSectionProps) => {
  const [boardInfo, setBoardInfo] = useState<IBoard | null>(null);
  const [postList, setPostList] = useState<IPost[] | null>(null);

  useEffect(() => {
    const fetchBoardInfo = async () => {
      try {
        const boardInfo = await boardService.getBoardInfoBySlug(slug);
        setBoardInfo(boardInfo);
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {postList?.map((post) => (
          <Link key={post.id} href={`/post/${post.id}/view?slug=${slug}&page=1`} className="w-full h-full shadow-2 p-[15px] rounded-[30px]">
            <div className="w-full h-[180px] object-cover rounded-[15px] mb-2.5 overflow-hidden">
              <img 
                src={post.thumbnail} 
                alt={post.title} 
                className="w-full h-full object-cover" 
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.src = "/images/logos/logo_green.png";
                  e.currentTarget.style.objectFit = "contain";
                  e.currentTarget.style.objectPosition = "center";
                  e.currentTarget.style.scale = "70%";
                }}
              />
            </div>
            <div className="flex flex-col gap-1.5 px-0.5">
              <h3 className="font-bold ellipsis">{post.title}</h3>
              <p className="text-sm text-gray-5 ellipsis-2">
                {parseHTMLToText(post.content)}
              </p>
              <p className="text-xs text-[#888] text-right">
                {formatDate(post.createdAt, "-")}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  </div>
}

export default BoardSection;