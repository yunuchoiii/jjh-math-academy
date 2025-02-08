"use client";

import useUser from "@/app/_hooks/useUser";
import { BoardSlugEnum } from "@/app/_service/board";
import { IPost, postService } from "@/app/_service/post";
import { formatDate } from "@/app/_utils";
import Link from "next/link";
import NoticeBadge from "../Badge/NoticeBadge";
import { useToast } from "../Toast/ToastProvider";

interface PostHeaderProps {
  post: IPost;
  slug: BoardSlugEnum;
  page: number;
}

const PostHeader = ({ post, slug, page }: PostHeaderProps) => {
  const {user} = useUser();
  const {addToast} = useToast();

  const deletePost = async () => {
    if (confirm("게시글을 삭제하시겠습니까?")) {
      try {
        await postService.deletePost({
          callback: () => {
            window.location.href = `/board/${slug}?page=${page}`;
            addToast({
              message: "게시글이 삭제되었습니다.",
              type: "success"
            });
          },
          errorCallback: (error) => {
            console.error(error);
          },
          postId: post.id
        });
      } catch (error) {
        console.error(error);
      }
    }
  }

  return (
    <section className="flex flex-col gap-1.5 lg:gap-3 px-2.5 pb-3 lg:pb-5">
      {post.isNotice && <div className="mb-1.5 block lg:hidden w-fit"><NoticeBadge /></div>}
      <div className="flex items-center">
        {post.isNotice && <div className="mr-3 hidden lg:block"><NoticeBadge /></div>}
        <h1 className="text-xl font-bold NanumSquare flex-1">{post.title}</h1>
      </div>
      <div className="flex items-center gap-2 text-sm text-[#999999]">
        <span>{formatDate(post.createdAt)}</span>
        <span>조회 {post.views}</span>
        {user?.userId === post.authorId && (
          <>
            <Link href={`/board/${slug}/${post.id}/edit`}>
              <span className="hover:underline text-green-1">수정</span>
            </Link>
            <button className="hover:underline text-green-1" onClick={deletePost}>삭제</button>
          </>
        )}
      </div>
    </section>
  );
};

export default PostHeader;