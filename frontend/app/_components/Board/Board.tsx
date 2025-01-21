"use client"

import { IBoard } from "@/app/_service/board";
import { IPaginatedResponse } from "@/app/_service/common";
import { IPost } from "@/app/_service/post";
import { formatDate } from "@/app/_utils";
import { useRouter } from "next/navigation";
import Pagination from "../Pagination/Pagination";
import styles from "./Board.module.css";

interface BoardProps {
  board: IBoard;
  postList: IPaginatedResponse<IPost>;
}

const Board = ({ board, postList }: BoardProps) => {
  const router = useRouter();

  const handleRowClick = (postId: number) => {
    router.push(`/board/${board.slug}/${postId}`);
  }

  const pageData = postList.page;
  const contentData = postList.data;

  return <div className="w-full flex flex-col gap-10">
    <table className={styles.boardTable}>
      <thead>
        <tr>
          <th>번호</th>
          <th>제목</th>
          <th>조회수</th>
          <th>작성일자</th>
        </tr>
      </thead>
      <tbody>
        {contentData.map((post, index) => (
          <tr 
            key={`${board.slug}-${post.id}`} 
            onClick={() => handleRowClick(post.id)}
          >
            <td>{(pageData.requestPage-1)*pageData.requestSize+index+1}</td>
            <td>{post.title}</td>
            <td>{post.views}</td>
            <td>{formatDate(post.createdAt, '-')}</td>
          </tr>
        ))}
      </tbody>
    </table>
    <Pagination paginationInfo={pageData} />
  </div>;
};

export default Board;