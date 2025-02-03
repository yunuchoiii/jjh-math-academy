"use client";

import NoticeBadge from "@/app/_components/Badge/NoticeBadge";
import BackButton from "@/app/_components/Button/BackButton";
import Title from "@/app/_components/Title/Title";
import { useToast } from "@/app/_components/Toast/ToastProvider";
import { boardService, IBoard } from "@/app/_service/board";
import { IPost, postService } from "@/app/_service/post";
import { formatDate } from "@/app/_utils";
import 'ckeditor5/ckeditor5.css';
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface PostPageProps {
  params: {
    postId: string;
  }
  searchParams: {
    slug: string;
    page: string;
  }
}

const PostHeader = ({ post, deletePost }: { post: IPost, deletePost: () => Promise<void> }) => (
  <div className="flex flex-col gap-1.5 lg:gap-3 px-2.5 pb-3 lg:pb-5">
    {post.isNotice && <div className="mb-1.5 block lg:hidden w-fit"><NoticeBadge /></div>}
    <div className="flex items-center">
      {post.isNotice && <div className="mr-3 hidden lg:block"><NoticeBadge /></div>}
      <h1 className="text-xl font-bold NanumSquare flex-1">{post.title}</h1>
    </div>
    <div className="flex items-center gap-2 text-sm text-[#999999]">
      <span>{formatDate(post.createdAt)}</span>
      <span>조회 {post.views}</span>
      <Link href={`/post/${post.id}/edit`}>
        <span className="hover:underline text-green-1">수정</span>
      </Link>
      <button className="hover:underline text-green-1" onClick={deletePost}>삭제</button>
    </div>
  </div>
);

const PostContent = ({ content }: { content: string }) => (
  <div className="px-2.5 py-10 lg:py-20 border-t border-b border-[#CCCCCC] ck-content">
    <div dangerouslySetInnerHTML={{ __html: content }} />
  </div>
);

const PostPage = ({ params, searchParams }: PostPageProps) => {
  const postId = Number(params.postId);
  const router = useRouter();
  const { addToast } = useToast();

  const [post, setPost] = useState<IPost | null>(null);
  const [board, setBoard] = useState<IBoard | null>(null);

  // 게시글 조회
  useEffect(() => {
    const fetch = async () => {
      try {
        const post = await postService.getPost(postId);
        const board = await boardService.getBoardInfoById(post.boardId);
        setPost(post);
        setBoard(board);
      } catch (error) {
        console.error(error);
      }
    }
  
    fetch();
  }, [postId]);

  // 조회수 증가
  useEffect(() => {
    if (post) {
      postService.updateViewCount(post.id);
    }
  }, [post]);

  const deletePost = async () => {
    if (confirm("게시글을 삭제하시겠습니까?")) {
      try {
        await postService.deletePost({
          callback: () => {
            router.push(`/board/${searchParams.slug}?page=${searchParams.page}`);
            router.refresh();
            addToast({
              type: "success",
              message: "게시글이 삭제되었습니다."
            });
          },
          errorCallback: (error) => {
            console.error(error);
          },
          postId
        });
      } catch (error) {
        console.error(error);
      }
    }
  }

  const backButtonLink = `/board/${searchParams.slug || board?.slug}?page=${searchParams.page || 1}`;

  if (!post || !board) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Link href={`/board/${board.slug}`}>
        <Title title={board.name} color="green" />
      </Link>
      <section>
        <PostHeader post={post} deletePost={deletePost} />
        <PostContent content={post.content} />
        <div className="flex justify-center pt-5 lg:pt-10">
          <BackButton 
            text="목록" 
            link={backButtonLink}
            hideIcon 
          />
        </div>
      </section>
    </div>
  );
}

export default PostPage;